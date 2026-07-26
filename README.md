# Tharun Blogs

A personal blog built with Next.js, featuring a Three.js animated waterfall background. Single-page landing with blog cards, about, and contact sections.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Three.js** via `@react-three/fiber` (animated waterfall background)
- **Tailwind CSS v4**
- **TypeScript**

## Project Structure

```
app/
  layout.tsx          # Root layout
  page.tsx            # Single-page landing
  WaterfallBackground.tsx  # Three.js scene
  EnableWheelScroll.tsx    # Wheel-to-scroll bridge
  HeroSection.tsx     # Hero area
  MountainDivider.tsx  # SVG ridge divider
  BlogsSection.tsx    # Blog card grid
  ContactSection.tsx  # Contact form
  AboutSection.tsx    # About area
  Navbar.tsx          # Fixed nav
  globals.css         # Tailwind v4 config + global styles
generate_static/      # Python scripts for texture generation
public/textures/      # Generated noise/flow textures
```
