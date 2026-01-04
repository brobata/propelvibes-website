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

- `pv_profiles` - User profiles (vibe coders & developers, includes `is_admin` flag)
- `pv_developer_profiles` - Extended developer info (skills, rate, etc.)
- `pv_launches` - App listings with approval workflow fields
- `pv_proposals` - Developer proposals for launches
- `pv_conversations` - Messaging (planned)
- `pv_reviews` - Reviews (planned)

### Launch Approval Fields (pv_launches)
- `verification_code` - Auto-generated code like "PV-7X3K"
- `verification_photo_url` - Photo of app with handwritten code
- `approval_status` - "pending" | "approved" | "rejected"
- `rejection_reason` - Text explaining why rejected
- `reviewed_by` - Admin who reviewed
- `reviewed_at` - Timestamp of review

## Key Files

### Pages
- `src/app/page.tsx` - Homepage (launches marketplace)
- `src/app/launches/page.tsx` - Browse launches
- `src/app/developers/page.tsx` - Browse developers
- `src/app/launches/[slug]/page.tsx` - Launch detail
- `src/app/post-launch/page.tsx` - 5-step launch submission wizard
- `src/app/admin/page.tsx` - Admin approval queue
- `src/app/dashboard/page.tsx` - User dashboard
- `src/app/dashboard/launches/page.tsx` - User's launches with status

### Components
- `src/components/marketplace/` - LaunchCard, DeveloperCard, FilterSidebar, SortDropdown
- `src/components/layout/` - Navbar, Footer, PageLayout
- `src/components/sections/` - Hero, FeaturedLaunches, TopDevelopers

### Hooks
- `src/hooks/useLaunches.ts` - Fetch launches with filters (approved only on marketplace)
- `src/hooks/useDevelopers.ts` - Fetch developers with filters

### Scripts
- `scripts/seed.ts` - Seed database with demo data

### Migrations
- `supabase/migrations/20260104000001_add_launch_verification.sql` - Approval system

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npx tsx scripts/seed.ts  # Run with env vars to seed DB
```

## Recent Changes (Jan 3, 2026)

### Session 2 - Approval System
1. **Post-Launch Form** - 5-step wizard with verification code + photo upload
2. **Admin Dashboard** - `/admin` with approval queue, approve/reject workflow
3. **Marketplace Filtering** - Only approved launches visible on marketplace
4. **User Dashboard** - Shows launch statuses (pending/approved/rejected)
5. **Resubmit Flow** - Rejected launches can be resubmitted after fixes
6. **Database Migration** - Added verification and approval columns

### Session 1 - Brand Redesign
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
- Verification codes format: "PV-XXXX" (4 alphanumeric chars)
- Badge variant uses className directly (no "secondary" variant exists)

## Approval Workflow

1. User submits launch with 3+ screenshots + verification photo
2. System generates verification code (e.g., "PV-7X3K")
3. User must include handwritten code visible next to running app
4. Launch enters "pending_review" status
5. Admin reviews at `/admin`:
   - Can view screenshots, verification photo, details
   - Approve → status becomes "open", visible on marketplace
   - Reject with reason → user notified, can resubmit
6. User sees status on `/dashboard/launches`

## TODO (Before Production)
- [ ] Apply database migration to Supabase
- [ ] Create "launch-assets" storage bucket
- [ ] Set admin flag on authorized users
- [ ] Test full approval workflow
- [ ] Add email notifications for approval/rejection
