# 🚀 Ultra-Fast SEO-Optimized Personal Portfolio

A futuristic, robotic-themed personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Designed for instant deployment, high SEO scores, and stunning visual appeal.

## ✨ Features

- **🎨 Futuristic Robotic Design** - Neon cyan & purple accents with glassmorphism effects
- **⚡ Ultra-Fast Performance** - Lighthouse 90+ scores for Performance, SEO, and Accessibility
- **🔍 SEO Optimized** - Complete meta tags, Open Graph, Twitter cards, structured data, sitemap
- **📧 Contact Form** - Working email integration via Brevo (free), SendGrid, or SMTP
- **📊 Analytics Dashboard** - File-based analytics (no database required)
- **🤖 AI Content Generation** - Optional OpenAI integration for auto-generated content
- **📱 Fully Responsive** - Beautiful on all devices
- **🌙 Dark Mode** - Futuristic dark theme by default
- **🎭 Smooth Animations** - Framer Motion powered transitions

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) with SSR
- **Styling:** Tailwind CSS with custom cyber theme
- **Animations:** Framer Motion
- **Email:** Brevo (free), SendGrid API, or SMTP (via Nodemailer)
- **Analytics:** File-based JSON logging
- **Charts:** Chart.js for analytics dashboard
- **AI:** OpenAI API (optional)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Brevo account (free) OR SendGrid API key OR SMTP credentials
- (Optional) OpenAI API key for AI content generation

### Installation

1. **Clone or download this repository**

```bash
cd personal-portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration - Choose ONE option:

# Option 1: Brevo (FREE - Recommended)
BREVO_SMTP_USER=your-email@example.com
BREVO_SMTP_KEY=your_brevo_smtp_key
MY_EMAIL=your-email@example.com

# Option 2: SendGrid (Paid)
# SENDGRID_API_KEY=SG.your_sendgrid_api_key
# MY_EMAIL=your-email@example.com

# Option 3: Generic SMTP (Gmail, etc.)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# MY_EMAIL=your-email@example.com

# Admin Dashboard Protection
ADMIN_TOKEN=your-super-secret-admin-token

# AI Content Generation (Optional)
AI_CONTENT_ENABLED=false
OPENAI_API_KEY=sk-your-openai-key
```

4. **Customize your data**

Edit the JSON files in the `data/` directory:
- `data/profile.json` - Your personal information
- `data/projects.json` - Your projects
- `data/skills.json` - Your skills
- `data/experience.json` - Your work experience

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Update Profile Information

Edit `data/profile.json`:

```json
{
  "name": "Your Name",
  "role": "Your Role",
  "title": "Your Title",
  "location": "Your Location",
  "summary": "Your summary",
  "email": "your@email.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "resume": "/resume.pdf"
}
```

### Add Projects

Edit `data/projects.json` and add your projects:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "Short description",
      "technologies": ["Next.js", "TypeScript"],
      "github": "https://github.com/...",
      "live": "https://project-demo.com",
      "featured": true
    }
  ]
}
```

### Update Skills

Edit `data/skills.json` to add or modify your skills and proficiency levels.

### Add Resume PDF

Place your resume PDF in the `public/` directory as `resume.pdf`.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Build your Next.js app
- Generate sitemap and robots.txt
- Optimize images and assets
- Enable edge caching

### Deploy to GitHub Pages

1. Update `next.config.js`:

```js
const nextConfig = {
  output: 'export',
  // ... rest of config
}
```

2. Build and export:

```bash
npm run build
```

3. Deploy the `out/` directory to GitHub Pages

## 📊 Analytics Dashboard

Access your analytics dashboard at:

```
https://yourdomain.com/dashboard?token=YOUR_ADMIN_TOKEN
```

The dashboard shows:
- Total visits
- Visits in last 7/30 days
- Daily visit trends
- Top pages
- Top referrers

## 🤖 AI Content Generation

Enable AI content generation by:

1. Set `AI_CONTENT_ENABLED=true` in `.env.local`
2. Add your `OPENAI_API_KEY`
3. The system will automatically generate:
   - Meta descriptions
   - Hero taglines
   - About text
   - Project descriptions

Content is cached in `data/generated.json` for 7 days.

## 🎨 Design Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  'cyber-cyan': '#00E5FF',
  'cyber-purple': '#7C4DFF',
  'dark-bg': '#0b0f1a',
}
```

### Fonts

Fonts are loaded from Google Fonts. Customize in `app/layout.tsx`:
- Inter (body text)
- Rajdhani (headings)
- JetBrains Mono (code/monospace)

## 📈 SEO Features

- ✅ Server-side rendered meta tags
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Person schema)
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Optimized images with Next.js Image
- ✅ Semantic HTML
- ✅ Fast LCP and low CLS

## 🔒 Security

- Rate limiting on contact form (5 requests/hour per IP)
- Admin token protection for analytics dashboard
- Input validation on all forms
- Secure email sending via SendGrid

## 📦 Project Structure

```
personal-portfolio/
├── app/
│   ├── api/
│   │   ├── contact/      # Contact form endpoint
│   │   ├── track/        # Analytics tracking
│   │   ├── analytics/     # Analytics API
│   │   └── ai-content/   # AI-generated content
│   ├── dashboard/        # Analytics dashboard
│   ├── layout.tsx        # Root layout with SEO
│   ├── page.tsx          # Main portfolio page
│   ├── globals.css       # Global styles
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Robots.txt
├── components/
│   ├── sections/         # Portfolio sections
│   ├── ScrollProgress.tsx
│   └── BackToTop.tsx
├── data/
│   ├── profile.json      # Your profile data
│   ├── projects.json     # Your projects
│   ├── skills.json       # Your skills
│   ├── experience.json   # Your experience
│   └── analytics.json    # Analytics data (auto-generated)
├── lib/
│   ├── analytics.ts      # Client-side tracking
│   └── ai-content.ts     # AI content generation
└── public/               # Static assets
```

## 🐛 Troubleshooting

### Contact form not working

- **Using Brevo?** Check [BREVO_SETUP.md](./BREVO_SETUP.md) for detailed setup guide
- Verify your SMTP credentials are correct (Brevo, SendGrid, or SMTP)
- Check email is sent to spam folder
- Check Vercel function logs for errors
- Ensure `MY_EMAIL` environment variable is set

### Analytics not tracking

- Ensure `/api/track` endpoint is accessible
- Check `data/analytics.json` file permissions
- Verify no CORS issues

### AI content not generating

- Ensure `AI_CONTENT_ENABLED=true`
- Check OpenAI API key is valid
- Verify you have API credits

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)
- [SendGrid](https://sendgrid.com/)

## 📞 Support

For issues or questions, please open an issue on GitHub or contact via the portfolio contact form.

---

**Made with ❤️ and lots of ☕**

