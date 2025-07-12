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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

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

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any API keys or configuration:

```env
# Example environment variables
NEXT_PUBLIC_BLOG_API_URL=your_blog_api_url
NEXT_PUBLIC_AVAILABILITY_API=your_status_api_url
```

### API Integration

The portfolio integrates with external APIs for:

- Blog content (`src/api-services/blogs.ts`)
- Availability status (`src/components/Header/AvailabilityStatus.tsx`)

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with Turbopack
- **Image Optimization**: Next.js automatic image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Thant Hein Thwin**

- LinkedIn: [Your LinkedIn]
- GitHub: [@thantheinthwin](https://github.com/thantheinthwin)
- Email: [your.email@example.com]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ If you found this portfolio helpful, please give it a star!
