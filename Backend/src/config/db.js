const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const msg = 'MONGODB_URI environment variable is not set. Please set MONGODB_URI in your Vercel Project Settings > Environment Variables.';
    console.error(`⚠️ ${msg}`);
    throw new Error(msg);
  }

  if (!cached.promise) {
    const opts = {
      dbName: process.env.MONGODB_DBNAME || 'trendai',
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host} (DB: ${mongooseInstance.connection.name})`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;

