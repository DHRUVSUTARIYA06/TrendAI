const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const { seedDatabaseIfEmpty } = require('./utils/seedData');
const categoryRoutes = require('./routes/categoryRoutes');
const templateRoutes = require('./routes/templateRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database & seed if running standalone
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      seedDatabaseIfEmpty();
    })
    .catch((err) => {
      console.error('Initial DB connect/seed error:', err.message);
    });
}

// Middleware
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure database connection for serverless requests
app.use(async (req, res, next) => {
  // Allow health check to respond immediately
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB Connection middleware error:', err.message);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Serve uploaded template images statically (local fallback)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root info route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TrendAI Backend API is up and running!',
    endpoints: {
      health: '/api/health',
      categories: '/api/categories',
      templates: '/api/templates',
    },
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TrendAI Backend API is up and running!',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'standalone',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/templates', templateRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start local server if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`🚀 TrendAI Backend Server running on port ${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`🔗 Health:   http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });
}

module.exports = app;
