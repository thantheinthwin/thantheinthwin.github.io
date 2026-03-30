# Thant Hein Thwin - Portfolio

A modern, responsive portfolio website built with Next.js 15, React 19, and TypeScript. This portfolio showcases my professional experience, projects, skills, and blog content with a clean, minimalist design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Elegant dark theme with smooth transitions
- **Interactive Sections**: Expandable experience and project details
- **Blog Integration**: Dynamic blog content from external API
- **Real-time Status**: Live availability status indicator
- **Performance Optimized**: Fast loading with Turbopack and optimized assets
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components

### Development Tools

- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── profile.png        # Profile image
│   └── resume/            # Resume files
├── src/
│   ├── api-services/      # API integration
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── Header/       # Header components
│   │   ├── Sections/     # Main content sections
│   │   ├── SideBar/      # Sidebar components
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── package.json
└── README.md
```

## 🎨 Customization

### Personal Information

Update your personal information in the following files:

- `src/components/Sections/About.tsx` - About section
- `src/components/Sections/Experience.tsx` - Work experience
- `src/components/Sections/Projects.tsx` - Project showcase
- `src/components/Sections/Skills.tsx` - Skills and technologies

### Styling

- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize component styles in individual component files

### Content

- Replace `public/profile.png` with your profile image
- Update resume files in `public/resume/`
- Modify blog API integration in `src/api-services/blogs.ts`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### API Integration

The portfolio integrates with external APIs for:

- Blog content (`src/api-services/blogs.ts`)
- Availability status (`src/components/Header/AvailabilityStatus.tsx`)

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with Turbopack
- **Image Optimization**: Next.js automatic image optimization

## 🔗 SEO & OpenGraph

The portfolio includes comprehensive SEO and OpenGraph optimization:

### OpenGraph Features

- **Dynamic OG Images**: Automatically generated OpenGraph images using Next.js 15's `opengraph-image.tsx`
- **Twitter Cards**: Optimized Twitter sharing with `twitter-image.tsx`
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Meta Tags**: Complete meta tag optimization including:
  - Title and description
  - Keywords and author information
  - Robots directives
  - Canonical URLs
  - Theme colors

### Files Included

- `src/app/opengraph-image.tsx` - Dynamic OpenGraph image generation
- `src/app/twitter-image.tsx` - Twitter-specific image optimization
- `src/app/structured-data.tsx` - JSON-LD structured data
- `src/app/layout.tsx` - Complete metadata configuration
- `public/manifest.json` - Web app manifest for PWA support
- `public/robots.txt` - Search engine crawling directives
- `src/app/sitemap.ts` - Dynamic sitemap generation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Thant Hein Thwin**

- LinkedIn: [Thant Hein Thwin](https://www.linkedin.com/in/thanthein/)
- GitHub: [@thantheinthwin](https://github.com/thantheinthwin)
- Email: [thantheinthwin.dev@gmail.com](thantheinthwin.dev@gmail.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment platform
