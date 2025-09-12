# SIZED Website

A modern, minimal website for SIZED - a curatorial platform and cultural studio dedicated to staging exhibitions and presenting collectible design.

## Design System

This website follows the sophisticated aesthetic established in the Alexander May portfolio, featuring:

- **Dark Theme**: Pure black backgrounds (#000000) with white typography
- **Typography**: Inter font family with emphasis on ExtraBold (font-black) weights
- **Layout**: Clean, minimal spacing with sophisticated proportions
- **Components**: Reusable, accessible components with consistent branding
- **Animation**: Subtle, elegant transitions and micro-interactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Typography**: Inter font family
- **Language**: TypeScript
- **Deployment Ready**: Optimized for production

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## Project Structure

```
app/
  ├── about/          # About page
  ├── contact/        # Contact page with live time
  ├── projects/       # Projects showcase
  ├── layout.tsx      # Root layout with Header/Footer
  ├── page.tsx        # Homepage
  └── globals.css     # Global styles & Inter font
  
components/
  ├── Container.tsx   # Content width container
  ├── Footer.tsx      # Site footer
  ├── Header.tsx      # Navigation header
  └── SectionHeading.tsx # Page section titles
```

## Key Features

- **Responsive Design**: Mobile-first approach with elegant desktop scaling
- **Live Elements**: Real-time date/time display on contact page
- **Smooth Navigation**: Clean routing with visual feedback
- **Optimized Performance**: Fast loading and smooth interactions
- **SEO Ready**: Proper meta tags and semantic HTML structure

## Code Standards

- TypeScript for all components and utilities
- Tailwind CSS for consistent styling
- Semantic HTML structure with accessibility attributes
- Clean component architecture with reusable patterns
- Consistent naming conventions (PascalCase components, camelCase functions)

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

The build output will be optimized and ready for production deployment.

## Brand Guidelines

- Use Inter ExtraBold (font-black) for headings and emphasis
- Maintain pure black (#000000) backgrounds throughout
- Keep typography hierarchy consistent across pages
- Preserve the minimal, sophisticated spacing patterns
- Use subtle opacity transitions for interactive elements

---

Built with attention to detail and sophisticated design principles.
