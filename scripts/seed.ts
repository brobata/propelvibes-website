import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Seeding Propel Vibes database...\n');

  // ============================================
  // PROFILES (Vibe Coders)
  // ============================================
  console.log('Creating vibe coder profiles...');

  // Using randomuser.me for realistic profile photos
  const vibeCoders = [
    { id: '11111111-1111-1111-1111-111111111111', email: 'sarah@example.com', name: 'Sarah Chen', avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'vibe_coder', bio: 'Product designer turned vibe coder. Built my first app with Claude in a weekend!', location: 'San Francisco, CA', website_url: 'https://sarahchen.design', github_url: 'https://github.com/sarahchen', twitter_url: 'https://twitter.com/sarahcodes' },
    { id: '22222222-2222-2222-2222-222222222222', email: 'marcus@example.com', name: 'Marcus Johnson', avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'vibe_coder', bio: 'Serial entrepreneur. Using AI to prototype ideas faster than ever.', location: 'Austin, TX', website_url: 'https://marcusj.com', github_url: 'https://github.com/marcusj' },
    { id: '33333333-3333-3333-3333-333333333333', email: 'elena@example.com', name: 'Elena Rodriguez', avatar_url: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'vibe_coder', bio: 'Former teacher building EdTech tools with AI assistance.', location: 'Miami, FL', github_url: 'https://github.com/elenarodriguez', twitter_url: 'https://twitter.com/elena_builds' },
    { id: '44444444-4444-4444-4444-444444444444', email: 'james@example.com', name: 'James Wright', avatar_url: 'https://randomuser.me/api/portraits/men/75.jpg', role: 'vibe_coder', bio: 'Finance professional exploring fintech ideas on weekends.', location: 'New York, NY', website_url: 'https://jameswright.io', github_url: 'https://github.com/jwright' },
    { id: '55555555-5555-5555-5555-555555555555', email: 'priya@example.com', name: 'Priya Patel', avatar_url: 'https://randomuser.me/api/portraits/women/90.jpg', role: 'vibe_coder', bio: 'Healthcare consultant building patient engagement tools.', location: 'Boston, MA', github_url: 'https://github.com/priyapatel', twitter_url: 'https://twitter.com/priya_health' },
  ];

  const { error: vibeCoderError } = await supabase.from('pv_profiles').upsert(vibeCoders);
  if (vibeCoderError) {
    console.error('Error creating vibe coders:', vibeCoderError);
  } else {
    console.log(`✅ Created ${vibeCoders.length} vibe coder profiles`);
  }

  // ============================================
  // PROFILES (Developers)
  // ============================================
  console.log('Creating developer profiles...');

  const developers = [
    { id: 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', email: 'alex@devstudio.com', name: 'Alex Kim', avatar_url: 'https://randomuser.me/api/portraits/men/22.jpg', role: 'developer', bio: 'Full-stack developer specializing in React and Node.js. Love helping vibe coders ship their products.', location: 'Seattle, WA', website_url: 'https://alexkim.dev', github_url: 'https://github.com/alexkim', linkedin_url: 'https://linkedin.com/in/alexkim', twitter_url: 'https://twitter.com/alexkimdev' },
    { id: 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', email: 'jordan@example.com', name: 'Jordan Taylor', avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg', role: 'developer', bio: 'DevOps engineer and cloud architect. I make apps scale.', location: 'Denver, CO', website_url: 'https://jordantaylor.io', github_url: 'https://github.com/jtaylor', linkedin_url: 'https://linkedin.com/in/jordantaylor' },
    { id: 'cccc3333-cccc-cccc-cccc-cccccccccccc', email: 'nina@example.com', name: 'Nina Kowalski', avatar_url: 'https://randomuser.me/api/portraits/women/33.jpg', role: 'developer', bio: 'Frontend specialist with a passion for beautiful UX. Tailwind enthusiast.', location: 'Portland, OR', website_url: 'https://ninakowalski.design', github_url: 'https://github.com/ninak', twitter_url: 'https://twitter.com/nina_codes' },
    { id: 'dddd4444-dddd-dddd-dddd-dddddddddddd', email: 'omar@example.com', name: 'Omar Hassan', avatar_url: 'https://randomuser.me/api/portraits/men/52.jpg', role: 'developer', bio: 'Backend wizard. Python, Go, and everything databases.', location: 'Chicago, IL', website_url: 'https://omarhassan.dev', github_url: 'https://github.com/omarh', linkedin_url: 'https://linkedin.com/in/omarhassan' },
    { id: 'eeee5555-eeee-eeee-eeee-eeeeeeeeeeee', email: 'lisa@example.com', name: 'Lisa Chen', avatar_url: 'https://randomuser.me/api/portraits/women/21.jpg', role: 'developer', bio: 'Mobile and web developer. Shipped 20+ apps to production.', location: 'Los Angeles, CA', website_url: 'https://lisachen.dev', github_url: 'https://github.com/lisac', linkedin_url: 'https://linkedin.com/in/lisachen', twitter_url: 'https://twitter.com/lisachendev' },
    { id: 'ffff6666-ffff-ffff-ffff-ffffffffffff', email: 'david@example.com', name: 'David Park', avatar_url: 'https://randomuser.me/api/portraits/men/67.jpg', role: 'developer', bio: 'AI/ML engineer helping integrate smarter features into apps.', location: 'San Jose, CA', website_url: 'https://davidpark.ai', github_url: 'https://github.com/dpark', linkedin_url: 'https://linkedin.com/in/davidpark' },
  ];

  const { error: devError } = await supabase.from('pv_profiles').upsert(developers);
  if (devError) {
    console.error('Error creating developers:', devError);
  } else {
    console.log(`✅ Created ${developers.length} developer profiles`);
  }

  // ============================================
  // DEVELOPER PROFILES (Extended info)
  // ============================================
  console.log('Creating developer extended profiles...');

  const devProfiles = [
    { id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', profile_id: 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', headline: 'Full-Stack Developer | React & Node.js Expert', skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'], hourly_rate: 12500, availability: 'available', portfolio_urls: ['https://github.com/alexkim/project1', 'https://alexkim.dev/portfolio'], years_experience: 8, launches_completed: 15, rating: 4.95, reviews_count: 23, verified: true },
    { id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', profile_id: 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', headline: 'DevOps & Cloud Architecture Specialist', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'PostgreSQL', 'Redis'], hourly_rate: 15000, availability: 'available', portfolio_urls: ['https://jordantaylor.io/case-studies'], years_experience: 10, launches_completed: 12, rating: 4.88, reviews_count: 18, verified: true },
    { id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', profile_id: 'cccc3333-cccc-cccc-cccc-cccccccccccc', headline: 'Frontend Developer & UI/UX Specialist', skills: ['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Figma', 'TypeScript'], hourly_rate: 10000, availability: 'available', portfolio_urls: ['https://ninakowalski.design/work'], years_experience: 6, launches_completed: 22, rating: 4.92, reviews_count: 31, verified: true },
    { id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', profile_id: 'dddd4444-dddd-dddd-dddd-dddddddddddd', headline: 'Backend Engineer | Python & Go', skills: ['Python', 'Go', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'], hourly_rate: 14000, availability: 'busy', portfolio_urls: ['https://omarhassan.dev/projects'], years_experience: 9, launches_completed: 8, rating: 4.78, reviews_count: 12, verified: true },
    { id: 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', profile_id: 'eeee5555-eeee-eeee-eeee-eeeeeeeeeeee', headline: 'Full-Stack Mobile & Web Developer', skills: ['React Native', 'Flutter', 'React', 'Node.js', 'Firebase', 'Supabase'], hourly_rate: 11000, availability: 'available', portfolio_urls: ['https://lisachen.dev/apps'], years_experience: 7, launches_completed: 20, rating: 4.90, reviews_count: 28, verified: true },
    { id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', profile_id: 'ffff6666-ffff-ffff-ffff-ffffffffffff', headline: 'AI/ML Engineer | Smart App Features', skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'FastAPI', 'React'], hourly_rate: 16000, availability: 'available', portfolio_urls: ['https://davidpark.ai/projects'], years_experience: 5, launches_completed: 6, rating: 4.85, reviews_count: 9, verified: true },
  ];

  const { error: devProfileError } = await supabase.from('pv_developer_profiles').upsert(devProfiles);
  if (devProfileError) {
    console.error('Error creating developer profiles:', devProfileError);
  } else {
    console.log(`✅ Created ${devProfiles.length} developer extended profiles`);
  }

  // ============================================
  // LAUNCHES
  // ============================================
  console.log('Creating launches...');

  // Using picsum.photos for app screenshot placeholders - these look like real app UIs
  // Format: https://picsum.photos/seed/{unique}/800/600 for consistent images
  const launches = [
    {
      id: '10101010-1010-1010-1010-101010101010',
      owner_id: '11111111-1111-1111-1111-111111111111',
      title: 'RecipeAI - Smart Meal Planning App',
      slug: 'recipeai-smart-meal-planning',
      description: `I built RecipeAI over a weekend using Claude. It's a meal planning app that suggests recipes based on what's in your fridge and your dietary preferences.

## What I've Built
- Basic recipe suggestion algorithm
- User authentication with Supabase
- Simple ingredient input form
- Recipe display with instructions

## What I Need Help With
- The UI needs polish - it works but doesn't look professional
- Need to add a proper database for saving favorite recipes
- Would love to integrate with grocery delivery APIs
- Performance optimization - it's slow on mobile

## My Vision
I want this to be the go-to app for busy professionals who want to eat healthy without spending hours planning meals.`,
      short_description: 'AI-powered meal planning app that suggests recipes based on your fridge contents and dietary preferences.',
      screenshot_urls: ['https://placehold.co/800x600/22C55E/white?text=RecipeAI%0AMeal+Planner'],
      tech_stack: ['Next.js', 'React', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
      github_url: 'https://github.com/sarahchen/recipeai',
      demo_url: 'https://recipeai-demo.vercel.app',
      services_needed: ['code_cleanup', 'feature_development', 'design'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 200000,
      budget_max: 500000,
      timeline_days: 30,
      status: 'open',
      views: 342,
      proposals_count: 3,
    },
    {
      id: '20202020-2020-2020-2020-202020202020',
      owner_id: '22222222-2222-2222-2222-222222222222',
      title: 'InvoiceFlow - Freelancer Invoicing Tool',
      slug: 'invoiceflow-freelancer-invoicing',
      description: `Built this to solve my own pain point - tracking invoices as a freelancer.

## Current Features
- Create and send invoices via email
- Track payment status
- Basic dashboard with revenue overview
- PDF generation

## Help Needed
- Stripe integration for online payments
- Recurring invoice automation
- Better mobile experience
- Multi-currency support
- Client portal where clients can view their invoices

Looking for a developer who can take this from MVP to a polished product. Open to equity for the right partner!`,
      short_description: 'Simple invoicing tool for freelancers with payment tracking and PDF generation.',
      screenshot_urls: ['https://placehold.co/800x600/3B82F6/white?text=InvoiceFlow%0AInvoicing+Dashboard'],
      tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Resend', 'Puppeteer'],
      github_url: 'https://github.com/marcusj/invoiceflow',
      demo_url: 'https://invoiceflow-demo.vercel.app',
      services_needed: ['feature_development', 'deployment', 'scaling'],
      deal_types_accepted: ['fixed', 'equity', 'hybrid'],
      budget_min: 300000,
      budget_max: 800000,
      equity_offered: 15,
      timeline_days: 45,
      status: 'open',
      views: 528,
      proposals_count: 5,
    },
    {
      id: '30303030-3030-3030-3030-303030303030',
      owner_id: '33333333-3333-3333-3333-333333333333',
      title: 'StudyBuddy - AI Tutoring Platform',
      slug: 'studybuddy-ai-tutoring',
      description: `As a former teacher, I know how hard it is for students to get personalized help. StudyBuddy uses AI to provide 24/7 tutoring.

## What's Working
- Chat interface with AI tutor
- Math problem solving with step-by-step explanations
- Basic quiz generation
- Student progress tracking

## What's Missing
- The AI sometimes gives wrong answers - needs better prompting
- No parent/teacher dashboard
- Can't handle images (students want to photo their homework)
- Need gamification to keep students engaged

This could really help kids who can't afford private tutors!`,
      short_description: 'AI-powered tutoring platform providing 24/7 personalized learning assistance for students.',
      screenshot_urls: ['https://placehold.co/800x600/8B5CF6/white?text=StudyBuddy%0AAI+Tutor+Chat'],
      tech_stack: ['Next.js', 'Claude API', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
      demo_url: 'https://studybuddy-beta.vercel.app',
      services_needed: ['feature_development', 'bug_fixes', 'testing'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 400000,
      budget_max: 1000000,
      timeline_days: 60,
      status: 'open',
      views: 412,
      proposals_count: 4,
    },
    {
      id: '40404040-4040-4040-4040-404040404040',
      owner_id: '44444444-4444-4444-4444-444444444444',
      title: 'PortfolioTracker - Investment Dashboard',
      slug: 'portfoliotracker-investment-dashboard',
      description: `Track all your investments in one place - stocks, crypto, real estate.

## Built So Far
- Connect to brokerage accounts (basic Plaid integration)
- Portfolio overview with charts
- Performance tracking
- Basic alerts for price movements

## Need Help With
- The Plaid integration breaks sometimes
- Want to add tax-loss harvesting suggestions
- Real-time data is expensive - need to optimize API calls
- Mobile app would be amazing

Looking for a developer who understands fintech and can help make this rock solid.`,
      short_description: 'All-in-one investment tracking dashboard for stocks, crypto, and real estate.',
      screenshot_urls: ['https://placehold.co/800x600/10B981/white?text=PortfolioTracker%0AInvestment+Charts'],
      tech_stack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Chart.js'],
      github_url: 'https://github.com/jwright/portfoliotracker',
      services_needed: ['bug_fixes', 'feature_development', 'scaling'],
      deal_types_accepted: ['hourly', 'hybrid'],
      budget_min: 500000,
      budget_max: 1500000,
      equity_offered: 10,
      timeline_days: 45,
      status: 'open',
      views: 289,
      proposals_count: 2,
    },
    {
      id: '50505050-5050-5050-5050-505050505050',
      owner_id: '55555555-5555-5555-5555-555555555555',
      title: 'HealthLog - Patient Symptom Tracker',
      slug: 'healthlog-patient-symptom-tracker',
      description: `Helping patients track symptoms and share with their doctors.

## Features Complete
- Daily symptom logging with severity scales
- Medication reminders
- Export reports as PDF for doctor visits
- Basic trend visualization

## Gaps to Fill
- HIPAA compliance review needed
- Integration with Apple Health / Google Fit
- Appointment scheduling
- Secure messaging with healthcare providers
- Better accessibility (vision impaired users)

This needs to be bulletproof before launching - healthcare data is sensitive!`,
      short_description: 'Patient symptom tracking app with medication reminders and doctor-shareable reports.',
      screenshot_urls: ['https://placehold.co/800x600/EC4899/white?text=HealthLog%0ASymptom+Tracker'],
      tech_stack: ['React Native', 'Supabase', 'Node.js', 'Chart.js'],
      demo_url: 'https://healthlog-demo.vercel.app',
      services_needed: ['code_cleanup', 'testing', 'deployment', 'full_launch'],
      deal_types_accepted: ['fixed'],
      budget_min: 800000,
      budget_max: 2000000,
      timeline_days: 90,
      status: 'open',
      views: 198,
      proposals_count: 1,
    },
    {
      id: '60606060-6060-6060-6060-606060606060',
      owner_id: '11111111-1111-1111-1111-111111111111',
      title: 'EventVibe - AI Event Planning Assistant',
      slug: 'eventvibe-ai-event-planning',
      description: `Planning events is stressful. EventVibe uses AI to help with everything from venue selection to guest management.

## What I've Got
- AI chat for event planning advice
- Guest list management
- Basic budget tracking
- Vendor recommendations

## What's Needed
- Calendar integrations (Google, Outlook)
- Payment splitting for group events
- Automated reminder emails
- Vendor booking system
- Mobile app

Started this for my own wedding planning and realized others might find it useful!`,
      short_description: 'AI-powered event planning assistant for stress-free party and wedding organization.',
      screenshot_urls: ['https://placehold.co/800x600/F59E0B/white?text=EventVibe%0AEvent+Planner'],
      tech_stack: ['Next.js', 'OpenAI API', 'Supabase', 'Resend', 'Tailwind CSS'],
      github_url: 'https://github.com/sarahchen/eventvibe',
      demo_url: 'https://eventvibe.vercel.app',
      services_needed: ['feature_development', 'design', 'deployment'],
      deal_types_accepted: ['fixed', 'equity'],
      budget_min: 250000,
      budget_max: 600000,
      equity_offered: 20,
      timeline_days: 30,
      status: 'open',
      views: 156,
      proposals_count: 2,
    },
  ];

  const { error: launchError } = await supabase.from('pv_launches').upsert(launches);
  if (launchError) {
    console.error('Error creating launches:', launchError);
  } else {
    console.log(`✅ Created ${launches.length} launches`);
  }

  // ============================================
  // PROPOSALS
  // ============================================
  console.log('Creating proposals...');

  const proposals = [
    {
      id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
      launch_id: '10101010-1010-1010-1010-101010101010',
      developer_id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
      cover_letter: `Hi Sarah!

I love what you've built with RecipeAI - it's exactly the kind of app I enjoy working on. As a frontend specialist, I can help transform your UI into something that looks as good as it works.

Here's my approach:
1. Audit the current UI and create a polished design system
2. Implement responsive layouts that work beautifully on mobile
3. Add micro-interactions with Framer Motion for a premium feel
4. Optimize performance with lazy loading and image optimization

I've worked on similar food-tech apps before and understand the importance of appetizing visuals!

Looking forward to discussing this further.`,
      deal_type: 'fixed',
      fixed_price: 350000,
      timeline_days: 21,
      milestones: [
        { title: 'Design System & Audit', description: 'Create component library and style guide', amount: 100000, due_days: 7 },
        { title: 'Core UI Overhaul', description: 'Redesign main screens with new design system', amount: 150000, due_days: 14 },
        { title: 'Polish & Optimization', description: 'Add animations, optimize performance', amount: 100000, due_days: 21 },
      ],
      status: 'pending',
    },
    {
      id: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
      launch_id: '20202020-2020-2020-2020-202020202020',
      developer_id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
      cover_letter: `Hey Marcus,

InvoiceFlow looks promising! I've built payment systems before and know exactly what it takes to make them production-ready.

I can help with:
- Rock-solid Stripe integration with webhooks
- Recurring billing automation
- Multi-currency support using live exchange rates
- Client portal with secure invoice viewing

I'm particularly interested in the equity component - I believe in this product and would love to be a technical partner.

My proposal: $5,000 upfront + 8% equity. I'll commit to ongoing maintenance for 6 months post-launch.

Let's chat!`,
      deal_type: 'hybrid',
      fixed_price: 500000,
      equity_ask: 8,
      timeline_days: 35,
      milestones: [
        { title: 'Stripe Integration', description: 'Complete payment processing setup', amount: 200000, due_days: 10 },
        { title: 'Recurring & Multi-currency', description: 'Automation and currency support', amount: 150000, due_days: 25 },
        { title: 'Client Portal', description: 'Build and launch client-facing features', amount: 150000, due_days: 35 },
      ],
      status: 'pending',
    },
    {
      id: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0',
      launch_id: '30303030-3030-3030-3030-303030303030',
      developer_id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6',
      cover_letter: `Elena,

As an AI/ML engineer, I'm excited about StudyBuddy's potential. The wrong answer problem is common with AI tutors, but very solvable.

Here's how I'd approach this:

1. **Better Prompting**: Implement chain-of-thought reasoning and answer verification
2. **Image Support**: Add vision capabilities using GPT-4V or Claude
3. **Gamification**: Points, streaks, achievements - I've done this before
4. **Parent Dashboard**: Real-time progress tracking

I've worked on EdTech AI before and understand the unique challenges.

Rate: $160/hr, estimated 50-60 hours total.

This could genuinely help students!`,
      deal_type: 'hourly',
      hourly_rate: 16000,
      estimated_hours: 55,
      timeline_days: 45,
      milestones: [],
      status: 'pending',
    },
  ];

  const { error: proposalError } = await supabase.from('pv_proposals').upsert(proposals);
  if (proposalError) {
    console.error('Error creating proposals:', proposalError);
  } else {
    console.log(`✅ Created ${proposals.length} proposals`);
  }

  console.log('\n🎉 Seeding complete! Visit https://propelvibes.com to see it in action.');
}

seed().catch(console.error);
