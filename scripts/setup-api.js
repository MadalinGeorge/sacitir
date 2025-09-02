const fs = require('fs');
const path = require('path');

const DEPLOYMENT_TARGET = process.env.DEPLOYMENT_TARGET || 'vercel';

console.log(`🔧 Setting up API routes for: ${DEPLOYMENT_TARGET}`);

// API routes to manage
const apiRoutes = [
  'jobs',
  'newsletter',
  'contact',
  'job-application'
];

if (DEPLOYMENT_TARGET === 'github-pages') {
  // Remove all API route files for static export
  console.log('🗑️  Removing API routes for GitHub Pages (static export)');
  
  apiRoutes.forEach(route => {
    const routePath = path.join(__dirname, '..', 'src', 'app', 'api', route, 'route.ts');
    if (fs.existsSync(routePath)) {
      fs.unlinkSync(routePath);
      console.log(`   ✅ Removed /api/${route}/route.ts`);
    }
  });
  
  console.log('✅ Removed API routes for GitHub Pages (static export)');
} else {
  // Create API route files for Vercel/development
  console.log('🔧 Creating API routes for Vercel/development');
  
  apiRoutes.forEach(route => {
    const routeDir = path.join(__dirname, '..', 'src', 'app', 'api', route);
    const vercelRoutePath = path.join(routeDir, 'route.vercel.ts');
    const routePath = path.join(routeDir, 'route.ts');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    
    if (fs.existsSync(vercelRoutePath)) {
      // Copy the Vercel template to route.ts
      fs.copyFileSync(vercelRoutePath, routePath);
      console.log(`   ✅ Created /api/${route}/route.ts`);
    } else {
      console.log(`   ⚠️  No template found for /api/${route}/route.vercel.ts`);
    }
  });
  
  console.log('✅ Created Vercel API routes (enabled)');
}

console.log('🎯 API setup complete!');
