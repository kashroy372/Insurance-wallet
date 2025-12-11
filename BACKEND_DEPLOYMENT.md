# Backend Deployment Guide

## Quick Deploy to Render

### Demo User Credentials
- **Email:** demo@insurancewallet.com
- **Password:** demo123

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Go to [render.com](https://render.com)** and sign in

2. **Click "New +" → "Web Service"**

3. **Connect Repository or Deploy from Local**
   - If using Git: Connect your repository
   - If no Git: We'll use Render CLI below

4. **Configure Service:**
   - Name: `insurance-wallet-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

5. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render default)

6. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your service URL (e.g., `https://insurance-wallet-backend.onrender.com`)

### Option 2: Deploy via Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login to Render
render login

# Deploy from backend directory
cd "/Users/akash/Desktop/FarAlpha/Insurance Wallet/backend"
render deploy
```

## After Deployment

### 1. Test Backend

Visit: `https://your-backend-url.onrender.com/health`

You should see:
```json
{
  "status": "OK",
  "message": "Insurance Wallet Backend is running",
  "timestamp": "..."
}
```

### 2. Update Frontend

1. Go to [Vercel Dashboard](https://vercel.com/kash-roys-projects/frontend/settings/environment-variables)
2. Add/Update environment variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`
3. Redeploy frontend:
   ```bash
   cd "/Users/akash/Desktop/FarAlpha/Insurance Wallet/frontend"
   npx vercel --prod
   ```

### 3. Test Full Application

1. Open: https://frontend-ayg5abbvi-kash-roys-projects.vercel.app
2. Click "Sign In"
3. Use demo credentials:
   - Email: demo@insurancewallet.com
   - Password: demo123
4. Verify you can access all pages after login

## Important Notes

> [!WARNING]
> The backend uses **in-memory storage**. Data will reset when Render restarts the service (usually after 15 minutes of inactivity on free tier).

> [!NOTE]
> Render free tier services spin down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds.

## Troubleshooting

### Backend not responding
- Check Render logs in dashboard
- Verify service is running (not spun down)
- Check health endpoint

### CORS errors in frontend
- Verify Vercel frontend URL is in `allowedOrigins` in server.js
- Check browser console for specific error

### Authentication not working
- Verify `VITE_API_URL` is set correctly in Vercel
- Check network tab in browser dev tools
- Verify backend `/api/auth/login` endpoint is accessible
