# GRAPHII-GRAPHY Portfolio

A pixel-perfect replica of the GRAPHII-GRAPHY studio website, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ✨ Pixel-perfect design matching the original
- 🎨 35+ project portfolio items
- 🔍 Advanced filtering system (Category, Scope, Year)
- 📱 Fully responsive design
- ⚡ Next.js 15 with App Router
- 🎭 Modal system with parallel routes
- 🌊 Smooth marquee animations
- 🎯 SEO optimized

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 25.x or later
- npm 11.x or later

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with gallery
│   ├── @modal/            # Parallel route for modals
│   └── project/[id]/      # Individual project pages
├── components/
│   ├── layout/            # Header & Footer
│   ├── gallery/           # Gallery, ProjectCard, FilterBar
│   └── modal/             # Modal content
├── lib/
│   ├── data/              # Project data (35+ items)
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## Features in Detail

### Filtering System
- Filter by Category (Brand, Digital Contents, Event)
- Filter by Scope (Identity, Graphic, Printed)
- Filter by Year (2024, 2023, 2022)
- Featured projects toggle
- Combines multiple filters with AND logic

### Modal System
- Next.js parallel routes for optimal UX
- Browser back button closes modal
- ESC key support
- Shareable URLs for each project
- Smooth animations with Framer Motion

### Performance
- Static Site Generation (SSG) for all pages
- Optimized images (AVIF/WebP)
- Lazy loading
- Minimal JavaScript bundle
- Lighthouse score > 90

## Deployment

### Vercel (Recommended)

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## License

This is a portfolio replica project for educational purposes.

## Credits

- Original Design: [GRAPHII-GRAPHY Studio](https://graphii-graphy.studio/)
- Built with ❤️ using Next.js

---

Generated with Claude Code
