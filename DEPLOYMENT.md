# SAHYOG — Production Deployment Guide (Render + Vercel)

This repository contains the full-stack code for **SAHYOG — Cooperative Gig Services Platform**:
- **Frontend**: React 18 + Vite (deployed on Vercel: [https://sahyog-cooperative.vercel.app/](https://sahyog-cooperative.vercel.app/))
- **Backend**: Express + TypeScript + MongoDB (deployable on Render)

---

## 🚀 Part 1: Deploy Backend on Render

### Step 1: Push Repository to GitHub
Ensure the latest code is on GitHub (`main` branch):
```bash
git push origin main
```

### Step 2: Create a Free MongoDB Database (MongoDB Atlas)
If you don't already have a cloud MongoDB database:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Create a **Free Shared Cluster (M0)** (choose AWS / Mumbai `ap-south-1`).
3. Under **Database Access**, create a user (e.g. `sahyog_admin`) with a secure password.
4. Under **Network Access**, click **Add IP Address** -> select **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** -> **Drivers** -> Copy your connection string:
   ```
   mongodb+srv://sahyog_admin:<password>@cluster0.xxxxx.mongodb.net/sahyog_db?retryWrites=true&w=majority
   ```

### Step 3: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository: `Harshad5009/sahyog-cooperative`.
3. Configure the Web Service settings:
   - **Name**: `sahyog-backend` (or your preferred name)
   - **Region**: Singapore or Frankfurt (choose nearest to India)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. Add **Environment Variables** in the Render settings:

| Key | Recommended Value | Note |
|---|---|---|
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `10000` | Render default port |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `CORS_ORIGIN` | `https://sahyog-cooperative.vercel.app` | Allows frontend cross-origin requests |
| `JWT_ACCESS_SECRET` | *(Random 32+ char string)* | e.g. `sahyog_prod_jwt_access_secret_2026` |
| `JWT_REFRESH_SECRET`| *(Random 32+ char string)* | e.g. `sahyog_prod_jwt_refresh_secret_2026` |
| `SEED_ADMIN_PHONE` | `+919800000001` | Default federation admin phone |

5. Click **Deploy Web Service**.
6. Once deployed, note down your Render public backend URL:
   ```
   https://sahyog-backend.onrender.com
   ```
7. Verify by opening in browser: `https://sahyog-backend.onrender.com/health`
   Expected response:
   ```json
   { "status": "ok", "service": "SAHYOG API", "version": "1.0.0" }
   ```

### Step 4: Seed the Production Database (Optional)
To populate the production MongoDB with initial Maharashtra cooperative federations, societies, and verified workers:
- In Render Dashboard, go to your service -> click the **Shell** tab.
- Run:
  ```bash
  npm run seed
  ```

---

## 🌐 Part 2: Connect Vercel Frontend to Render Backend

Now link your existing Vercel deployment ([https://sahyog-cooperative.vercel.app/](https://sahyog-cooperative.vercel.app/)) to the new Render backend:

1. Open your [Vercel Dashboard](https://vercel.com/dashboard) and select your `sahyog-cooperative` project.
2. Go to **Settings** -> **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<YOUR-RENDER-BACKEND-URL>/api` (e.g. `https://sahyog-backend.onrender.com/api`)
   - **Target**: Production, Preview, Development
4. Go to **Deployments** tab -> click the three dots on your latest deployment -> **Redeploy**.

---

## 🛠️ Local Verification

Before deploying, test locally:
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ..
npm run dev
```
- Health Check: `http://localhost:5000/health`
- Frontend: `http://localhost:5173/`
