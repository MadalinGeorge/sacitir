# SACITIR - Corporate Freight Transport Website

A modern, responsive corporate website for SACITIR freight transport company built with Next.js, TypeScript, and TailwindCSS. Features parallax scrolling, internationalization (Spanish/English), dark mode, and dynamic job listings.

## 🚀 Features

- **Modern Design**: Clean, professional layout with parallax scrolling effects
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Internationalization**: Available in Spanish and English
- **Dark Mode**: Toggle between light and dark themes
- **Parallax Effects**: Engaging parallax scrolling on homepage
- **Dynamic Job Listings**: Job postings managed via Google Sheets
- **Contact Forms**: Powered by EmailJS for contact and job applications
- **SEO Optimized**: Meta tags, semantic HTML, and clean URLs
- **Performance**: Optimized images and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Parallax**: react-scroll-parallax
- **Forms**: EmailJS
- **Icons**: Lucide React
- **Data**: Google Sheets API
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── about/            # About page
│   ├── services/         # Services page
│   ├── career/           # Career page
│   └── contact/          # Contact page
├── components/            # Reusable components
│   ├── Navigation.tsx    # Main navigation
│   ├── Footer.tsx        # Site footer
│   └── [other-components]
├── context/              # React contexts
│   ├── LocaleContext.tsx # Internationalization
│   └── ThemeContext.tsx  # Dark mode theme
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── utils.ts         # Helper functions
├── locales/              # Translation files
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
└── types/                # TypeScript definitions
    └── index.ts         # Type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd sacitir-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOB=your_job_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Google Sheets Configuration
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_sheet_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates for:
   - Contact form submissions
   - Job applications
4. Add your credentials to `.env.local`

### Email Template Variables

**Contact Form Template:**
- `{{from_name}}` - Contact name
- `{{from_email}}` - Contact email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

**Job Application Template:**
- `{{from_name}}` - Applicant name
- `{{from_email}}` - Applicant email
- `{{phone}}` - Phone number
- `{{position}}` - Position applied for
- `{{message}}` - Cover letter/additional info

## 📊 Google Sheets Integration

1. Create a Google Sheet with job listings
2. Set up the Google Sheets API
3. Structure your sheet with columns:
   - Column A: Job Title
   - Column B: Description
   - Column C: Requirements (comma-separated)
   - Column D: Location
   - Column E: Type (Full-time/Part-time/Contract)
   - Column F: Posted Date

4. Share the sheet publicly or set up proper API permissions
5. Add your API key and sheet ID to `.env.local`

## 🌍 Internationalization

The website supports Spanish and English:

- Translation files: `src/locales/en.json` and `src/locales/es.json`
- Add new translations by adding keys to both files
- Use the `useLocale` hook: `const { t } = useLocale();`
- Access translations: `t('key.path')`

## 🎨 Customization

### Colors
Update the color scheme in `src/app/globals.css`:
```css
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  /* ... other colors */
}
```

### Content
- Update translations in `src/locales/`
- Modify components in `src/components/`
- Add new pages in `src/app/`

### Styling
- Tailwind classes for quick styling
- Custom CSS in `globals.css`
- Component-specific styles using CSS modules

## 📱 Pages

- **Home** (`/`) - Hero section with parallax, services overview
- **About** (`/about`) - Company history, mission, vision
- **Services** (`/services`) - Detailed service descriptions
- **Career** (`/career`) - Job listings from Google Sheets
- **Contact** (`/contact`) - Contact form and company info

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)
- Husky for pre-commit hooks (optional)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support, please contact [your-email@domain.com]

---

**SACITIR** - Reliable Freight Transport Solutions
