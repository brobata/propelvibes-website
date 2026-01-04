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

### Color Palette (Classic Marketplace)
- Primary: `#2563EB` (trustworthy blue)
- Primary Dark: `#1D4ED8`
- Primary Light: `#3B82F6`
- Accent: `#EA580C` (practical orange - for actions)
- Background: `#F9FAFB` (clean white/gray)

### Design Philosophy
- **Classic marketplace aesthetic** (early eBay/Etsy practical)
- Simple borders, minimal shadows, small border-radius
- No fancy animations - quick, functional hover states
- Checkbox-based filters (not pill buttons)
- Text-focused navigation, no gradient icons

### Card Style
- Horizontal list cards: image LEFT, content RIGHT
- Simple border hover (no transforms or shadows)
- Compact, information-dense layout

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

1. **Classic Marketplace Redesign** - Removed modern AI-app aesthetics
2. **Blue/Gray Palette** - Trustworthy, functional colors (not flashy green)
3. **Removed Framer Motion** - No animations, instant interactions
4. **Simplified Components** - Plain CSS hover states, checkbox filters
5. **Compact Layout** - Smaller spacing, denser information display
6. **Fixed re-render loop** - useRef for Supabase client stability

## Conventions

- Use `useRef` for Supabase client in hooks (prevents infinite re-renders)
- Memoize filter objects with `JSON.stringify` for stable dependencies
- All database tables prefixed with `pv_`
- Hourly rates stored in cents (divide by 100 for display)
- Budget amounts stored in cents
