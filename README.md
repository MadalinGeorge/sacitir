# SACITIR - Corporate Freight Transport Website

A modern, responsive corporate website for SACITIR freight transport company built with Next.js, TypeScript, and TailwindCSS. Features internationalization (Spanish/English) and dynamic forms via EmailJS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Internationalization**: Available in Spanish and English
- **Contact Forms**: Powered by EmailJS for contact and job applications
- **SEO Optimized**: Meta tags, semantic HTML, and clean URLs
- **Performance**: Optimized images and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Forms**: EmailJS (`@emailjs/browser`)
- **Icons**: Lucide React
- **Component Utilities**: clsx, class-variance-authority, tailwind-merge
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── career/            # Career page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── AnimatedMobileNav.tsx # Mobile navigation
│   └── ClientProviders.tsx    # Context providers
├── context/               # React contexts
│   └── LocaleContext.tsx  # Internationalization
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
├── locales/               # Translation files (TypeScript)
│   ├── en.ts              # English translations
│   └── es.ts              # Spanish translations
└── types/                 # TypeScript definitions
    └── index.ts           # Type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

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
   Create a `.env.local` file in the root directory and add your EmailJS configuration:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOB=your_job_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
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

## 🌍 Internationalization

The website supports Spanish and English:

- Translation files: `src/locales/en.ts` and `src/locales/es.ts`
- Add new translations by adding keys to both files
- Use the `LocaleContext` for translation in components

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

## 📱 Pages

- **Home** (`/`) - Hero section with parallax, services overview
- **About** (`/about`) - Company history, mission, vision
- **Services** (`/services`) - Detailed service descriptions
- **Career** (`/career`) - Job listings
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

### Code Quality

- TypeScript for type safety
- ESLint for code quality

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
