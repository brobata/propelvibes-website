# Propel Vibes - Claude Context

## Project Overview

Propel Vibes is a marketplace connecting "vibe coders" (non-technical creators who build apps with AI) with professional developers who can take their MVPs to production. Think eBay/Kickstarter for AI-built apps.

**Live URL**: https://propelvibes.com
**Deployment**: Vercel (auto-deploys from main)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion
- **Database**: Supabase (project: sqetldecwqpfakurqpvr)
- **Auth**: Supabase Auth (not yet fully implemented)

## Design System

### Brand Identity: "Where Dreamers Ship"
Friendly, approachable marketplace that welcomes vibe coders and connects them with developers.

### Color Palette (Teal/Cyan - Fresh & Creative)
- Primary: `#0D9488` (teal - fresh, tech-forward)
- Primary Dark: `#0F766E`
- Primary Light: `#14B8A6`
- Accent: `#F97316` (coral - warm, action-oriented)
- Highlight: `#8B5CF6` (purple - for featured items)
- Background: `#FAFAF9` (warm off-white)

### Design Philosophy
- **Warm & inviting** - gradients, subtle shadows, friendly rounded corners
- **Distinctive identity** - teal top bar with value props, branded hero
- **Clear personality** - "Vibe Coders Welcome", "Verified Developers", "Ship Faster"
- **Visual hierarchy** - price tags, tech pills, glowing availability rings

### Card Style
- Horizontal cards with gradient image backgrounds
- Hover: teal border glow + soft shadow
- Price tags with primary-50 background
- Tech pills with hover interaction

## Database Schema

All tables prefixed with `pv_`:

- `pv_profiles` - User profiles (vibe coders & developers)
- `pv_developer_profiles` - Extended developer info (skills, rate, etc.)
- `pv_launches` - App listings seeking developers
- `pv_proposals` - Developer proposals for launches
- `pv_conversations` - Messaging (planned)
- `pv_reviews` - Reviews (planned)

## Key Files

### Pages
- `src/app/page.tsx` - Homepage (launches marketplace)
- `src/app/launches/page.tsx` - Browse launches
- `src/app/developers/page.tsx` - Browse developers
- `src/app/launches/[slug]/page.tsx` - Launch detail

### Components
- `src/components/marketplace/` - LaunchCard, DeveloperCard, FilterSidebar, SortDropdown
- `src/components/layout/` - Navbar, Footer, PageLayout
- `src/components/sections/` - Hero, FeaturedLaunches, TopDevelopers

### Hooks
- `src/hooks/useLaunches.ts` - Fetch launches with filters
- `src/hooks/useDevelopers.ts` - Fetch developers with filters

### Scripts
- `scripts/seed.ts` - Seed database with demo data

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npx tsx scripts/seed.ts  # Run with env vars to seed DB
```

## Recent Changes (Jan 2026)

1. **Brand Identity Redesign** - "Where Dreamers Ship" personality
2. **Teal/Cyan Palette** - Fresh, creative, distinctive (not generic blue)
3. **Value Props Banner** - Teal top bar with "Vibe Coders Welcome" etc.
4. **Hero Section** - Big tagline, dual CTAs, quick stats
5. **Warm Card Styling** - Gradients, shadows, price tags, tech pills
6. **Fixed re-render loop** - useRef for Supabase client stability

## Conventions

- Use `useRef` for Supabase client in hooks (prevents infinite re-renders)
- Memoize filter objects with `JSON.stringify` for stable dependencies
- All database tables prefixed with `pv_`
- Hourly rates stored in cents (divide by 100 for display)
- Budget amounts stored in cents
