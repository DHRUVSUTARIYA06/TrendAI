# TrandAI (TrendAI) 🚀

Full-Stack AI Template Generation Platform with:
- 📱 **Flutter Mobile App** (Android with native ChatGPT Intent & image attachments)
- 🖥️ **React + Vite Admin Studio** (Template and category management, live preview)
- ⚡ **Node.js + Express API** (Mongoose, MongoDB Atlas, Serverless-ready for Vercel)

---

## 📁 Project Structure

```
TrendAI/
├── App/                  # Flutter Mobile & Web application
│   ├── lib/              # App source code (Screens, Models, Services)
│   └── android/          # Android native platform code
├── Backend/              # Express.js REST API & MongoDB models
│   ├── api/index.js      # Vercel serverless function entrypoint
│   ├── src/              # Server source (Controllers, Models, Routes)
│   └── vercel.json       # Backend Vercel deployment configuration
├── Frontend/             # React (Vite) Admin Dashboard
│   ├── src/              # UI components & API client
│   └── vercel.json       # Frontend Vercel SPA routing configuration
└── README.md
```

---

## 🌐 Deploying to Vercel

You can deploy both **Backend** and **Frontend** on Vercel from this single repository using Vercel's **Root Directory** setting:

### 1. Deploy the Backend API
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select the **`TrendAI`** repository (`DHRUVSUTARIYA06/TrendAI`).
3. In **Root Directory**, click **Edit** and select **`Backend`**.
4. In **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://user:pass@cluster0...mongodb.net`)
   - `MONGODB_DBNAME`: `trendai`
5. Click **Deploy**.
6. Once deployed, copy your Backend URL (e.g., `https://trandai-backend.vercel.app`).
7. Test the health endpoint: `https://trandai-backend.vercel.app/api/health`.

### 2. Deploy the Frontend Admin Studio
1. In Vercel, click **"Add New Project"** again.
2. Select the same **`TrendAI`** repository (`DHRUVSUTARIYA06/TrendAI`).
3. In **Root Directory**, click **Edit** and select **`Frontend`**.
4. In **Framework Preset**, Vercel will auto-detect **Vite**.
5. In **Environment Variables**, add:
   - `VITE_API_BASE`: `https://your-backend-url.vercel.app/api`
6. Click **Deploy**.

---

## 💻 Local Development

### 1. Backend
```bash
cd Backend
npm install
# Set MONGODB_URI in Backend/.env
npm run dev
# Running on http://localhost:5000
```

### 2. Frontend
```bash
cd Frontend
npm install
npm run dev
# Running on http://localhost:3000
```

### 3. Flutter Mobile App
```bash
cd App
flutter pub get
flutter run
```

---

## 📄 License
ISC
