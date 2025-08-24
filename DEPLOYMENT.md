# 🚀 Dual Deployment Setup

This project supports deployment to both **GitHub Pages** (static export) and **Vercel** (with API routes).

## 📋 Overview

- **GitHub Pages**: Static export with client-side Google Sheets integration
- **Vercel**: Full Next.js with API routes and server-side functionality

## 🛠️ Build Commands

### For Development
```bash
npm run dev
```

### For Vercel Deployment
```bash
npm run build:vercel
```

### For GitHub Pages Deployment
```bash
npm run build:github
```

## 🔧 Configuration Files

### `next.config.js`
- Automatically detects deployment target via `DEPLOYMENT_TARGET` environment variable
- GitHub Pages: Enables static export with base path `/sacitir`
- Vercel: Standard Next.js configuration with API routes

### `scripts/setup-api.js`
- Dynamically creates/removes API routes based on deployment target
- GitHub Pages: Removes API routes (not supported in static export)
- Vercel: Creates working API routes for Google Sheets integration

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── jobs/
│   │       ├── route.ts          # Dynamically created
│   │       └── route.vercel.ts   # Template for Vercel
├── lib/
│   ├── utils.ts                  # Main utility functions
│   └── googleSheetsClient.ts     # Client-side Google Sheets
└── ...
```

## 🌐 Deployment Workflows

### GitHub Pages (`.github/workflows/deploy.yml`)
- Triggers on push to `main` branch
- Uses `DEPLOYMENT_TARGET=github-pages`
- Builds static export
- Deploys to GitHub Pages

### Vercel (`.github/workflows/deploy-vercel.yml`)
- Triggers on push to `main` branch
- Uses standard Next.js build
- Deploys to Vercel with API routes

## 🔑 Environment Variables

### Required for both deployments:
```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_SHEETS_ID_EN=english_sheet_id
NEXT_PUBLIC_GOOGLE_SHEETS_ID_ES=spanish_sheet_id
NEXT_PUBLIC_SACITIR_NEWSLETTER_LIST=newsletter_sheet_id
```

### For Vercel deployment:
```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 🔄 How It Works

### Google Sheets Integration
1. **Vercel**: Uses API routes (`/api/jobs`, `/api/newsletter`) for server-side Google Sheets access
2. **GitHub Pages**: Uses client-side Google Sheets API directly

### Build Process
1. **Setup Script**: `scripts/setup-api.js` runs before build
2. **API Route Management**: Creates or removes API routes based on target
3. **Build**: Next.js builds with appropriate configuration

## 🚀 Deployment URLs

- **GitHub Pages**: `https://madalingeorge.github.io/sacitir`
- **Vercel**: `https://your-project.vercel.app`

## ✅ Features by Deployment

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| Static Pages | ✅ | ✅ |
| API Routes | ❌ | ✅ |
| Google Sheets | ✅ (Client-side) | ✅ (Server-side) |
| CV Upload | ✅ | ✅ |
| EmailJS | ✅ | ✅ |
| Multi-language | ✅ | ✅ |

## 🔧 Troubleshooting

### GitHub Pages Build Fails
- Check if API routes are being included
- Verify `DEPLOYMENT_TARGET=github-pages` is set
- Ensure `scripts/setup-api.js` runs before build

### Vercel Build Fails
- Check if API routes are properly created
- Verify environment variables are set
- Ensure Google Sheets API is enabled

### Google Sheets Not Working
- Verify API key is correct
- Check sheet IDs are valid
- Ensure sheets are publicly accessible
- Check CORS settings for client-side access

## 📝 Notes

- GitHub Pages deployment uses static export (no server-side functionality)
- Vercel deployment supports full Next.js features including API routes
- Both deployments use the same codebase with conditional builds
- Environment variables must be set in both deployment platforms
