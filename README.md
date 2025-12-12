# Portfolio Website

A modern, responsive portfolio website built with React and Node.js.

## Tech Stack

### Frontend
- React 19 with Vite
- Framer Motion (animations)
- Tailwind CSS
- React Icons

### Backend
- Node.js + Express
- MongoDB
- LeetCode API Proxy

## 🚀 Deployment Guide

### Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free)

---

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FRONTEND_URL`: Your Vercel URL (add after frontend deployment)
6. Click **Create Web Service**
7. Copy your Render URL (e.g., `https://portfolio-backend-xxx.onrender.com`)

---

## Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL
6. Click **Deploy**

---

## Step 4: Update Backend CORS

After frontend deployment:
1. Go to Render Dashboard → Your service → Environment
2. Add/Update: `FRONTEND_URL` = Your Vercel URL
3. Redeploy the backend

---

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string and add to Render environment variables
