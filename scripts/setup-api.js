const fs = require('fs');
const path = require('path');

const deploymentTarget = process.env.DEPLOYMENT_TARGET;
const apiDir = path.join(__dirname, '../src/app/api/jobs');

// Create API directory if it doesn't exist
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

if (deploymentTarget === 'github-pages') {
  // For GitHub Pages, remove the API route entirely
  const routePath = path.join(apiDir, 'route.ts');
  if (fs.existsSync(routePath)) {
    fs.unlinkSync(routePath);
  }
  console.log('✅ Removed API route for GitHub Pages (static export)');
} else {
  // For Vercel, copy the working API route
  const vercelRoutePath = path.join(__dirname, '../src/app/api/jobs/route.vercel.ts');
  const routePath = path.join(apiDir, 'route.ts');
  
  if (fs.existsSync(vercelRoutePath)) {
    fs.copyFileSync(vercelRoutePath, routePath);
    console.log('✅ Created Vercel API route (enabled)');
  } else {
    console.error('❌ Vercel API route file not found');
    process.exit(1);
  }
}
