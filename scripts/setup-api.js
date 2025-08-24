const fs = require('fs');
const path = require('path');

const deploymentTarget = process.env.DEPLOYMENT_TARGET;

// Setup jobs API route
const jobsApiDir = path.join(__dirname, '../src/app/api/jobs');
if (!fs.existsSync(jobsApiDir)) {
  fs.mkdirSync(jobsApiDir, { recursive: true });
}

// Setup newsletter API route
const newsletterApiDir = path.join(__dirname, '../src/app/api/newsletter');
if (!fs.existsSync(newsletterApiDir)) {
  fs.mkdirSync(newsletterApiDir, { recursive: true });
}

if (deploymentTarget === 'github-pages') {
  // For GitHub Pages, remove the API routes entirely
  const jobsRoutePath = path.join(jobsApiDir, 'route.ts');
  const newsletterRoutePath = path.join(newsletterApiDir, 'route.ts');
  
  if (fs.existsSync(jobsRoutePath)) {
    fs.unlinkSync(jobsRoutePath);
  }
  if (fs.existsSync(newsletterRoutePath)) {
    fs.unlinkSync(newsletterRoutePath);
  }
  
  console.log('✅ Removed API routes for GitHub Pages (static export)');
} else {
  // For Vercel, copy the working API routes
  const jobsVercelRoutePath = path.join(__dirname, '../src/app/api/jobs/route.vercel.ts');
  const jobsRoutePath = path.join(jobsApiDir, 'route.ts');
  
  const newsletterVercelRoutePath = path.join(__dirname, '../src/app/api/newsletter/route.vercel.ts');
  const newsletterRoutePath = path.join(newsletterApiDir, 'route.ts');
  
  if (fs.existsSync(jobsVercelRoutePath)) {
    fs.copyFileSync(jobsVercelRoutePath, jobsRoutePath);
    console.log('✅ Created Vercel jobs API route (enabled)');
  } else {
    console.error('❌ Vercel jobs API route file not found');
    process.exit(1);
  }
  
  if (fs.existsSync(newsletterVercelRoutePath)) {
    fs.copyFileSync(newsletterVercelRoutePath, newsletterRoutePath);
    console.log('✅ Created Vercel newsletter API route (enabled)');
  } else {
    console.error('❌ Vercel newsletter API route file not found');
    process.exit(1);
  }
}
