# 🚀 Deployment Guide - English Friends

Hướng dẫn deploy ứng dụng English Friends trên các platform khác nhau.

---

## 📦 Cấu trúc dự án

```
english-friends-app/
├── backend/           # Express.js API server
│   └── server.js
├── dist/             # Frontend build output (generated)
├── public/           # Static assets
├── index.html        # Main HTML file
├── script.js         # Frontend JavaScript
├── package.json      # Dependencies và scripts
├── vite.config.js    # Vite configuration
├── Dockerfile        # Docker configuration
├── vercel.json       # Vercel deployment config
├── railway.json      # Railway deployment config
└── .env              # Environment variables (local)
```

---

## 🔧 Scripts Available

```bash
# Development
npm run dev              # Chạy cả frontend và backend
npm run dev:frontend     # Chỉ chạy frontend (Vite)
npm run dev:backend      # Chỉ chạy backend (Express)

# Production
npm run build           # Build frontend
npm start              # Start production server
npm run serve          # Build và start production
npm run preview        # Preview production build

# Utility
npm run clean          # Xóa dist folder
```

---

## 🌐 Local Development

### 1. Clone và setup
```bash
git clone <repository-url>
cd english-friends-app
npm install
```

### 2. Cấu hình environment
```bash
cp env-example.txt .env
# Chỉnh sửa .env với thông tin thực tế
```

### 3. Chạy development
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### 4. Test production build
```bash
npm run serve
```
- Full app: http://localhost:3001

---

## ☁️ Cloud Deployment

### 🔷 Vercel (Recommended)

**Ưu điểm**: Dễ setup, CI/CD tự động, domain miễn phí
**Phù hợp**: Frontend + Serverless backend

#### Setup:
1. **Chuẩn bị repository**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy trên Vercel**
   - Truy cập [vercel.com](https://vercel.com)
   - Import Git Repository
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   AGENT_ID=your_agent_id_here
   NODE_ENV=production
   ```

4. **Custom Domain** (Optional)
   - Settings → Domains → Add Domain

#### Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### 🚂 Railway

**Ưu điểm**: Full-stack hosting, PostgreSQL support, simple pricing
**Phù hợp**: Full-stack applications

#### Setup:
1. **Chuẩn bị**
   ```bash
   # railway.json đã có sẵn trong project
   git push origin main
   ```

2. **Deploy trên Railway**
   - Truy cập [railway.app](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Select repository

3. **Environment Variables**
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   AGENT_ID=your_agent_id_here
   NODE_ENV=production
   PORT=3001
   ```

4. **Custom Domain**
   - Settings → Networking → Custom Domain

#### Railway CLI:
```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

---

### 🐳 Docker Deployment

**Ưu điểm**: Consistency, portable, works anywhere
**Phù hợp**: Any cloud provider, VPS, on-premise

#### Local Docker:
```bash
# Build image
docker build -t english-friends-app .

# Run container
docker run -d \
  -p 3001:3001 \
  -e ELEVENLABS_API_KEY=your_api_key \
  -e AGENT_ID=your_agent_id \
  -e NODE_ENV=production \
  --name english-friends \
  english-friends-app

# Check logs
docker logs english-friends

# Stop
docker stop english-friends
```

#### Docker Compose:
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY}
      - AGENT_ID=${AGENT_ID}
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

### 🎨 Render

**Ưu điểm**: Free tier generous, easy setup
**Phù hợp**: Small to medium applications

#### Setup:
1. **Connect Repository**
   - Truy cập [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repository

2. **Configuration**
   ```
   Name: english-friends-app
   Environment: Node
   Build Command: npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   AGENT_ID=your_agent_id_here
   NODE_ENV=production
   ```

---

### 🟦 Heroku

**Lưu ý**: Heroku đã ngừng free tier từ 2022

#### Setup:
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create english-friends-app

# Set environment variables
heroku config:set ELEVENLABS_API_KEY=your_api_key_here
heroku config:set AGENT_ID=your_agent_id_here
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

## 🔒 Environment Variables

### Required:
- `ELEVENLABS_API_KEY`: API key từ ElevenLabs
- `AGENT_ID`: ID của Agent đã tạo

### Optional:
- `NODE_ENV`: production (tự động set khi deploy)
- `PORT`: Port number (platform tự động set)

### Security:
- ❌ **KHÔNG** commit .env file lên Git
- ✅ Set environment variables trên deployment platform
- ✅ Sử dụng secrets/secure storage cho production

---

## 📊 Health Checks

### Endpoints:
- `GET /api/health` - Server health status
- `GET /api/config` - App configuration (không sensitive info)

### Monitoring:
```bash
# Check health
curl https://your-domain.com/api/health

# Response:
{
  "message": "English Friends Backend Server is running!",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

---

## 🐛 Troubleshooting

### Common Issues:

#### 1. Build fails
```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install
npm run build
```

#### 2. API không hoạt động
- Kiểm tra environment variables
- Verify ElevenLabs API key
- Check CORS settings

#### 3. Static files không load
- Kiểm tra build output trong `dist/`
- Verify server static file serving
- Check network tab trong browser

#### 4. Port conflicts
```bash
# Change port
PORT=3002 npm start
```

### Logs:
```bash
# Local
npm run dev

# Docker
docker logs english-friends

# Vercel
vercel logs

# Railway
railway logs
```

---

## 🔄 CI/CD Setup

### GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - run: npm test # if you have tests
    # Add deployment steps based on your platform
```

---

## 📈 Performance Optimization

### Frontend:
- ✅ Vite build optimization enabled
- ✅ Code splitting với manual chunks
- ✅ Asset optimization
- ✅ Lazy loading cho components

### Backend:
- ✅ Express.js với compression
- ✅ Static file serving tối ưu
- ✅ Error handling middleware
- ✅ Health checks

### Monitoring:
- Set up monitoring alerts
- Configure logging
- Monitor API usage
- Track user engagement

---

## 🎯 Recommended Setup

**Cho development**: Local development với `npm run dev`
**Cho production**: Vercel hoặc Railway
**Cho enterprise**: Docker với Kubernetes hoặc AWS/GCP

---

## 📞 Support

Nếu gặp vấn đề deployment:
1. Check logs của platform
2. Verify environment variables
3. Test local production build: `npm run serve`
4. Kiểm tra network connectivity

**🌟 Happy deploying! Chúc bạn deploy thành công! 🌟** 