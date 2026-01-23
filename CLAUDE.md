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

### Brand Identity: Clean Marketplace
eBay/Etsy-inspired with a touch of warmth. Content-focused, minimal chrome.

### Color Palette (Clean Blue)
- Primary: `#3B82F6` (blue - trust, clean)
- Primary Dark: `#2563EB`
- Primary Light: `#60A5FA`
- Accent: `#F59E0B` (orange - warm, action)
- Highlight: `#8B5CF6` (purple - for featured items)
- Background: `#FFFFFF` (pure white)
- Surface: `#F9FAFB` (light gray)

### Design Philosophy
- **Clean & minimal** - white backgrounds, subtle borders, no gradients
- **Content-focused** - let the listings speak for themselves
- **eBay/Etsy style** - simple cards, straightforward typography
- **Subtle radius** - 4px corners, not bubbly

### Card Style
- Simple horizontal cards with flat backgrounds
- Hover: border darkens slightly
- Clean price display (no background)
- Simple tech tags with borders

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

## Recent Changes (Jan 23, 2026)

### Session 3 - Clean Marketplace Redesign
1. **eBay/Etsy-inspired UI** - Removed SaaS/vibe-coder aesthetic
2. **Clean color palette** - Blue primary instead of teal, white backgrounds
3. **Simplified navbar** - Removed value props banner, simpler logo
4. **Minimal homepage** - Content-focused header, no gradient hero
5. **Reduced border-radius** - 4px instead of 12px everywhere
6. **Removed liability** - Replaced "Secure Payments" and "Dispute Resolution" with "Direct Deals" and "Reviews"
7. **Hidden auth** - Login/signup buttons hidden until auth is ready

### Session 2 - Approval System (Jan 3)
1. **Post-Launch Form** - 5-step wizard with verification code + photo upload
2. **Admin Dashboard** - `/admin` with approval queue, approve/reject workflow
3. **Marketplace Filtering** - Only approved launches visible on marketplace
4. **User Dashboard** - Shows launch statuses (pending/approved/rejected)
5. **Resubmit Flow** - Rejected launches can be resubmitted after fixes

### Session 1 - Initial Build (Jan 3)
1. **Core marketplace** - Browse launches and developers
2. **Filter system** - Services, deal types, tech stack
3. **Seed data** - Demo launches and developers

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
