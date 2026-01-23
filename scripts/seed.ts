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

  const vibeCoders = [
    { id: '11111111-1111-1111-1111-111111111111', email: 'sarah@example.com', name: 'Sarah Chen', avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'vibe_coder', bio: 'Product designer turned vibe coder. Built my first app with Claude in a weekend!', location: 'San Francisco, CA', website_url: 'https://sarahchen.design', github_url: 'https://github.com/sarahchen', twitter_url: 'https://twitter.com/sarahcodes' },
    { id: '22222222-2222-2222-2222-222222222222', email: 'marcus@example.com', name: 'Marcus Johnson', avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'vibe_coder', bio: 'Serial entrepreneur. Using AI to prototype ideas faster than ever.', location: 'Austin, TX', website_url: 'https://marcusj.com', github_url: 'https://github.com/marcusj' },
    { id: '33333333-3333-3333-3333-333333333333', email: 'elena@example.com', name: 'Elena Rodriguez', avatar_url: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'vibe_coder', bio: 'Former teacher building EdTech tools with AI assistance.', location: 'Miami, FL', github_url: 'https://github.com/elenarodriguez', twitter_url: 'https://twitter.com/elena_builds' },
    { id: '44444444-4444-4444-4444-444444444444', email: 'james@example.com', name: 'James Wright', avatar_url: 'https://randomuser.me/api/portraits/men/75.jpg', role: 'vibe_coder', bio: 'Finance professional exploring fintech ideas on weekends.', location: 'New York, NY', website_url: 'https://jameswright.io', github_url: 'https://github.com/jwright' },
    { id: '55555555-5555-5555-5555-555555555555', email: 'priya@example.com', name: 'Priya Patel', avatar_url: 'https://randomuser.me/api/portraits/women/90.jpg', role: 'vibe_coder', bio: 'Healthcare consultant building patient engagement tools.', location: 'Boston, MA', github_url: 'https://github.com/priyapatel', twitter_url: 'https://twitter.com/priya_health' },
    { id: '66666666-6666-6666-6666-666666666666', email: 'tyler@example.com', name: 'Tyler Brooks', avatar_url: 'https://randomuser.me/api/portraits/men/85.jpg', role: 'vibe_coder', bio: 'Fitness coach who built a workout app with ChatGPT. Now I need help scaling it!', location: 'Los Angeles, CA', website_url: 'https://tylerbrooks.fit', twitter_url: 'https://twitter.com/tylercoach' },
    { id: '77777777-7777-7777-7777-777777777777', email: 'mei@example.com', name: 'Mei Lin', avatar_url: 'https://randomuser.me/api/portraits/women/52.jpg', role: 'vibe_coder', bio: 'Restaurant owner automating operations with AI. Built my own POS system!', location: 'Seattle, WA', website_url: 'https://meilin.restaurant', github_url: 'https://github.com/meilin-builds' },
    { id: '88888888-8888-8888-8888-888888888888', email: 'derek@example.com', name: 'Derek Thompson', avatar_url: 'https://randomuser.me/api/portraits/men/42.jpg', role: 'vibe_coder', bio: 'Real estate agent who built a property comparison tool. Ready to go big!', location: 'Phoenix, AZ', website_url: 'https://derekthompson.realty' },
    { id: '99999999-9999-9999-9999-999999999999', email: 'aisha@example.com', name: 'Aisha Mohammed', avatar_url: 'https://randomuser.me/api/portraits/women/37.jpg', role: 'vibe_coder', bio: 'Non-profit director building volunteer management tools with Claude.', location: 'Chicago, IL', twitter_url: 'https://twitter.com/aishabuilds', github_url: 'https://github.com/aisha-npm' },
    { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', email: 'kevin@example.com', name: 'Kevin Park', avatar_url: 'https://randomuser.me/api/portraits/men/55.jpg', role: 'vibe_coder', bio: 'Podcast host who built an AI show notes generator. It actually works!', location: 'Nashville, TN', website_url: 'https://kevinpark.show', twitter_url: 'https://twitter.com/kevinpodcast' },
    { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', email: 'rachel@example.com', name: 'Rachel Kim', avatar_url: 'https://randomuser.me/api/portraits/women/63.jpg', role: 'vibe_coder', bio: 'Jewelry designer with an AI-powered custom design tool. Need help with 3D rendering.', location: 'Portland, OR', website_url: 'https://rachelkim.jewelry', github_url: 'https://github.com/rachelkdesigns' },
    { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', email: 'carlos@example.com', name: 'Carlos Mendez', avatar_url: 'https://randomuser.me/api/portraits/men/28.jpg', role: 'vibe_coder', bio: 'Musician who built a chord progression generator. Looking for mobile expertise.', location: 'Denver, CO', website_url: 'https://carlosmendez.music', twitter_url: 'https://twitter.com/carlosbeats' },
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
    { id: 'd1111111-1111-1111-1111-111111111111', email: 'alex@devstudio.com', name: 'Alex Kim', avatar_url: 'https://randomuser.me/api/portraits/men/22.jpg', role: 'developer', bio: 'Full-stack developer specializing in React and Node.js. Love helping vibe coders ship their products.', location: 'Seattle, WA', website_url: 'https://alexkim.dev', github_url: 'https://github.com/alexkim', linkedin_url: 'https://linkedin.com/in/alexkim', twitter_url: 'https://twitter.com/alexkimdev' },
    { id: 'd2222222-2222-2222-2222-222222222222', email: 'jordan@example.com', name: 'Jordan Taylor', avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg', role: 'developer', bio: 'DevOps engineer and cloud architect. I make apps scale.', location: 'Denver, CO', website_url: 'https://jordantaylor.io', github_url: 'https://github.com/jtaylor', linkedin_url: 'https://linkedin.com/in/jordantaylor' },
    { id: 'd3333333-3333-3333-3333-333333333333', email: 'nina@example.com', name: 'Nina Kowalski', avatar_url: 'https://randomuser.me/api/portraits/women/33.jpg', role: 'developer', bio: 'Frontend specialist with a passion for beautiful UX. Tailwind enthusiast.', location: 'Portland, OR', website_url: 'https://ninakowalski.design', github_url: 'https://github.com/ninak', twitter_url: 'https://twitter.com/nina_codes' },
    { id: 'd4444444-4444-4444-4444-444444444444', email: 'omar@example.com', name: 'Omar Hassan', avatar_url: 'https://randomuser.me/api/portraits/men/52.jpg', role: 'developer', bio: 'Backend wizard. Python, Go, and everything databases.', location: 'Chicago, IL', website_url: 'https://omarhassan.dev', github_url: 'https://github.com/omarh', linkedin_url: 'https://linkedin.com/in/omarhassan' },
    { id: 'd5555555-5555-5555-5555-555555555555', email: 'lisa@example.com', name: 'Lisa Chen', avatar_url: 'https://randomuser.me/api/portraits/women/21.jpg', role: 'developer', bio: 'Mobile and web developer. Shipped 20+ apps to production.', location: 'Los Angeles, CA', website_url: 'https://lisachen.dev', github_url: 'https://github.com/lisac', linkedin_url: 'https://linkedin.com/in/lisachen', twitter_url: 'https://twitter.com/lisachendev' },
    { id: 'd6666666-6666-6666-6666-666666666666', email: 'david@example.com', name: 'David Park', avatar_url: 'https://randomuser.me/api/portraits/men/67.jpg', role: 'developer', bio: 'AI/ML engineer helping integrate smarter features into apps.', location: 'San Jose, CA', website_url: 'https://davidpark.ai', github_url: 'https://github.com/dpark', linkedin_url: 'https://linkedin.com/in/davidpark' },
    { id: 'd7777777-7777-7777-7777-777777777777', email: 'emma@example.com', name: 'Emma Wilson', avatar_url: 'https://randomuser.me/api/portraits/women/48.jpg', role: 'developer', bio: 'Security-focused developer. I make sure your app is bulletproof before launch.', location: 'Boston, MA', website_url: 'https://emmawilson.security', github_url: 'https://github.com/emmaw', linkedin_url: 'https://linkedin.com/in/emmawilson' },
    { id: 'd8888888-8888-8888-8888-888888888888', email: 'marcus.dev@example.com', name: 'Marcus Rivera', avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', role: 'developer', bio: 'Full-stack fintech specialist. Stripe, Plaid, payment systems are my jam.', location: 'New York, NY', website_url: 'https://marcusrivera.dev', github_url: 'https://github.com/mrivera', linkedin_url: 'https://linkedin.com/in/marcusrivera' },
    { id: 'd9999999-9999-9999-9999-999999999999', email: 'sophia@example.com', name: 'Sophia Nguyen', avatar_url: 'https://randomuser.me/api/portraits/women/57.jpg', role: 'developer', bio: 'React Native expert. Your cross-platform mobile app specialist.', location: 'San Francisco, CA', website_url: 'https://sophianguyen.dev', github_url: 'https://github.com/sophian', twitter_url: 'https://twitter.com/sophia_mobile' },
    { id: 'daaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', email: 'ryan@example.com', name: 'Ryan O\'Brien', avatar_url: 'https://randomuser.me/api/portraits/men/71.jpg', role: 'developer', bio: 'Database and performance optimization expert. PostgreSQL whisperer.', location: 'Austin, TX', website_url: 'https://ryanobrien.dev', github_url: 'https://github.com/ryanob', linkedin_url: 'https://linkedin.com/in/ryanobrien' },
    { id: 'dbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', email: 'jessica@example.com', name: 'Jessica Martinez', avatar_url: 'https://randomuser.me/api/portraits/women/29.jpg', role: 'developer', bio: 'E-commerce specialist. Shopify, Stripe, inventory systems. Let\'s sell stuff!', location: 'Miami, FL', website_url: 'https://jessicam.dev', github_url: 'https://github.com/jessm', twitter_url: 'https://twitter.com/jess_ecomm' },
    { id: 'dccccccc-cccc-cccc-cccc-cccccccccccc', email: 'chris@example.com', name: 'Chris Anderson', avatar_url: 'https://randomuser.me/api/portraits/men/58.jpg', role: 'developer', bio: 'API integration specialist. If it has an API, I can connect it.', location: 'Atlanta, GA', website_url: 'https://chrisanderson.dev', github_url: 'https://github.com/chrisa', linkedin_url: 'https://linkedin.com/in/chrisanderson' },
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
    { id: 'e1111111-1111-1111-1111-111111111111', profile_id: 'd1111111-1111-1111-1111-111111111111', headline: 'Full-Stack Developer | React & Node.js Expert', skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'], hourly_rate: 12500, availability: 'available', portfolio_urls: ['https://github.com/alexkim/project1', 'https://alexkim.dev/portfolio'], years_experience: 8, launches_completed: 15, rating: 4.95, reviews_count: 23, verified: true, featured: true },
    { id: 'e2222222-2222-2222-2222-222222222222', profile_id: 'd2222222-2222-2222-2222-222222222222', headline: 'DevOps & Cloud Architecture Specialist', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'PostgreSQL', 'Redis'], hourly_rate: 15000, availability: 'available', portfolio_urls: ['https://jordantaylor.io/case-studies'], years_experience: 10, launches_completed: 12, rating: 4.88, reviews_count: 18, verified: true },
    { id: 'e3333333-3333-3333-3333-333333333333', profile_id: 'd3333333-3333-3333-3333-333333333333', headline: 'Frontend Developer & UI/UX Specialist', skills: ['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Figma', 'TypeScript'], hourly_rate: 10000, availability: 'available', portfolio_urls: ['https://ninakowalski.design/work'], years_experience: 6, launches_completed: 22, rating: 4.92, reviews_count: 31, verified: true, featured: true },
    { id: 'e4444444-4444-4444-4444-444444444444', profile_id: 'd4444444-4444-4444-4444-444444444444', headline: 'Backend Engineer | Python & Go', skills: ['Python', 'Go', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'], hourly_rate: 14000, availability: 'busy', portfolio_urls: ['https://omarhassan.dev/projects'], years_experience: 9, launches_completed: 8, rating: 4.78, reviews_count: 12, verified: true },
    { id: 'e5555555-5555-5555-5555-555555555555', profile_id: 'd5555555-5555-5555-5555-555555555555', headline: 'Full-Stack Mobile & Web Developer', skills: ['React Native', 'Flutter', 'React', 'Node.js', 'Firebase', 'Supabase'], hourly_rate: 11000, availability: 'available', portfolio_urls: ['https://lisachen.dev/apps'], years_experience: 7, launches_completed: 20, rating: 4.90, reviews_count: 28, verified: true },
    { id: 'e6666666-6666-6666-6666-666666666666', profile_id: 'd6666666-6666-6666-6666-666666666666', headline: 'AI/ML Engineer | Smart App Features', skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'FastAPI', 'React'], hourly_rate: 16000, availability: 'available', portfolio_urls: ['https://davidpark.ai/projects'], years_experience: 5, launches_completed: 6, rating: 4.85, reviews_count: 9, verified: true },
    { id: 'e7777777-7777-7777-7777-777777777777', profile_id: 'd7777777-7777-7777-7777-777777777777', headline: 'Security & Compliance Expert', skills: ['Security Audits', 'HIPAA', 'SOC2', 'Penetration Testing', 'Node.js', 'Python'], hourly_rate: 18000, availability: 'available', portfolio_urls: ['https://emmawilson.security/portfolio'], years_experience: 11, launches_completed: 14, rating: 4.97, reviews_count: 19, verified: true, featured: true },
    { id: 'e8888888-8888-8888-8888-888888888888', profile_id: 'd8888888-8888-8888-8888-888888888888', headline: 'Fintech & Payment Systems Specialist', skills: ['Stripe', 'Plaid', 'React', 'Node.js', 'PostgreSQL', 'Compliance'], hourly_rate: 17500, availability: 'available', portfolio_urls: ['https://marcusrivera.dev/fintech'], years_experience: 9, launches_completed: 11, rating: 4.91, reviews_count: 16, verified: true },
    { id: 'e9999999-9999-9999-9999-999999999999', profile_id: 'd9999999-9999-9999-9999-999999999999', headline: 'React Native & Mobile Expert', skills: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android', 'Firebase'], hourly_rate: 13000, availability: 'available', portfolio_urls: ['https://sophianguyen.dev/mobile'], years_experience: 6, launches_completed: 18, rating: 4.89, reviews_count: 25, verified: true },
    { id: 'eaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', profile_id: 'daaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', headline: 'Database & Performance Optimization', skills: ['PostgreSQL', 'MySQL', 'Redis', 'Query Optimization', 'Data Modeling', 'Supabase'], hourly_rate: 14500, availability: 'busy', portfolio_urls: ['https://ryanobrien.dev/databases'], years_experience: 12, launches_completed: 9, rating: 4.93, reviews_count: 14, verified: true },
    { id: 'ebbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', profile_id: 'dbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', headline: 'E-commerce & Payments Expert', skills: ['Shopify', 'Stripe', 'WooCommerce', 'React', 'Node.js', 'Inventory Systems'], hourly_rate: 12000, availability: 'available', portfolio_urls: ['https://jessicam.dev/ecommerce'], years_experience: 7, launches_completed: 16, rating: 4.87, reviews_count: 22, verified: true },
    { id: 'eccccccc-cccc-cccc-cccc-cccccccccccc', profile_id: 'dccccccc-cccc-cccc-cccc-cccccccccccc', headline: 'API Integration Specialist', skills: ['REST APIs', 'GraphQL', 'Webhooks', 'OAuth', 'Node.js', 'Python'], hourly_rate: 11500, availability: 'available', portfolio_urls: ['https://chrisanderson.dev/integrations'], years_experience: 8, launches_completed: 24, rating: 4.82, reviews_count: 35, verified: true },
  ];

  const { error: devProfileError } = await supabase.from('pv_developer_profiles').upsert(devProfiles);
  if (devProfileError) {
    console.error('Error creating developer profiles:', devProfileError);
  } else {
    console.log(`✅ Created ${devProfiles.length} developer extended profiles`);
  }

  // ============================================
  // LAUNCHES (All approved for marketplace display)
  // ============================================
  console.log('Creating launches...');

  const launches = [
    {
      id: 'f0010001-0001-0001-0001-000000000001',
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
      screenshot_urls: ['https://placehold.co/800x600/22C55E/white?text=RecipeAI%0AMeal+Planner', 'https://placehold.co/800x600/16A34A/white?text=Recipe+Search', 'https://placehold.co/800x600/15803D/white?text=Shopping+List'],
      tech_stack: ['Next.js', 'React', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
      github_url: 'https://github.com/sarahchen/recipeai',
      demo_url: 'https://recipeai-demo.vercel.app',
      services_needed: ['code_cleanup', 'feature_development', 'design'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 200000,
      budget_max: 500000,
      timeline_days: 30,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-A1B2',
      views: 342,
      proposals_count: 0,
      featured: true,
    },
    {
      id: 'f0020002-0002-0002-0002-000000000002',
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
      screenshot_urls: ['https://placehold.co/800x600/3B82F6/white?text=InvoiceFlow%0ADashboard', 'https://placehold.co/800x600/2563EB/white?text=Invoice+Creator', 'https://placehold.co/800x600/1D4ED8/white?text=Payment+Tracking'],
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
      approval_status: 'approved',
      verification_code: 'PV-C3D4',
      views: 528,
      proposals_count: 0,
      featured: true,
    },
    {
      id: 'f0030003-0003-0003-0003-000000000003',
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
      screenshot_urls: ['https://placehold.co/800x600/8B5CF6/white?text=StudyBuddy%0AAI+Tutor', 'https://placehold.co/800x600/7C3AED/white?text=Quiz+Mode', 'https://placehold.co/800x600/6D28D9/white?text=Progress+Dashboard'],
      tech_stack: ['Next.js', 'Claude API', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
      demo_url: 'https://studybuddy-beta.vercel.app',
      services_needed: ['feature_development', 'bug_fixes', 'testing'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 400000,
      budget_max: 1000000,
      timeline_days: 60,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-E5F6',
      views: 412,
      proposals_count: 0,
    },
    {
      id: 'f0040004-0004-0004-0004-000000000004',
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
      screenshot_urls: ['https://placehold.co/800x600/10B981/white?text=PortfolioTracker%0ADashboard', 'https://placehold.co/800x600/059669/white?text=Performance+Charts', 'https://placehold.co/800x600/047857/white?text=Holdings+View'],
      tech_stack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Chart.js'],
      github_url: 'https://github.com/jwright/portfoliotracker',
      services_needed: ['bug_fixes', 'feature_development', 'scaling'],
      deal_types_accepted: ['hourly', 'hybrid'],
      budget_min: 500000,
      budget_max: 1500000,
      equity_offered: 10,
      timeline_days: 45,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-G7H8',
      views: 289,
      proposals_count: 0,
    },
    {
      id: 'f0050005-0005-0005-0005-000000000005',
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
      screenshot_urls: ['https://placehold.co/800x600/EC4899/white?text=HealthLog%0ASymptom+Tracker', 'https://placehold.co/800x600/DB2777/white?text=Medication+Reminders', 'https://placehold.co/800x600/BE185D/white?text=Health+Reports'],
      tech_stack: ['React Native', 'Supabase', 'Node.js', 'Chart.js'],
      demo_url: 'https://healthlog-demo.vercel.app',
      services_needed: ['code_cleanup', 'testing', 'deployment', 'full_launch'],
      deal_types_accepted: ['fixed'],
      budget_min: 800000,
      budget_max: 2000000,
      timeline_days: 90,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-J9K0',
      views: 198,
      proposals_count: 0,
    },
    {
      id: 'f0060006-0006-0006-0006-000000000006',
      owner_id: '66666666-6666-6666-6666-666666666666',
      title: 'FitTrack Pro - AI Workout Companion',
      slug: 'fittrack-pro-workout-companion',
      description: `As a fitness coach, I wanted to give my clients AI-powered workout guidance.

## What I Built
- AI generates personalized workout plans
- Exercise library with video demos
- Progress tracking with photos
- Basic nutrition logging

## What I Need
- The AI workout generation is too generic
- Need real-time form correction (camera-based)
- Apple Watch / Fitbit integration
- Social features (challenges, leaderboards)
- Better video compression for the demo library

I have 500 clients waiting for this to be production-ready!`,
      short_description: 'AI-powered workout companion that creates personalized fitness plans and tracks progress.',
      screenshot_urls: ['https://placehold.co/800x600/F97316/white?text=FitTrack+Pro%0AWorkout+Generator', 'https://placehold.co/800x600/EA580C/white?text=Exercise+Library', 'https://placehold.co/800x600/C2410C/white?text=Progress+Photos'],
      tech_stack: ['React Native', 'OpenAI API', 'Firebase', 'FFmpeg', 'TensorFlow.js'],
      github_url: 'https://github.com/tylerbrooks/fittrackpro',
      demo_url: 'https://fittrackpro-demo.vercel.app',
      services_needed: ['feature_development', 'scaling', 'design'],
      deal_types_accepted: ['fixed', 'hourly', 'equity'],
      budget_min: 350000,
      budget_max: 900000,
      equity_offered: 12,
      timeline_days: 60,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-L1M2',
      views: 445,
      proposals_count: 0,
      featured: true,
    },
    {
      id: 'f0070007-0007-0007-0007-000000000007',
      owner_id: '77777777-7777-7777-7777-777777777777',
      title: 'QuickServe POS - Restaurant Point of Sale',
      slug: 'quickserve-pos-restaurant',
      description: `I run a small restaurant and built my own POS because existing ones are too expensive.

## Current Features
- Order taking with modifiers
- Kitchen display system
- Basic inventory tracking
- Daily sales reports
- Receipt printing

## Needs Improvement
- Multi-location support
- Staff scheduling integration
- Online ordering integration
- Better offline mode
- Tip splitting and payroll export

Other restaurant owners are asking to use this!`,
      short_description: 'Affordable point-of-sale system for restaurants with kitchen display and inventory tracking.',
      screenshot_urls: ['https://placehold.co/800x600/EF4444/white?text=QuickServe+POS%0AOrder+Screen', 'https://placehold.co/800x600/DC2626/white?text=Kitchen+Display', 'https://placehold.co/800x600/B91C1C/white?text=Sales+Reports'],
      tech_stack: ['Next.js', 'Electron', 'SQLite', 'Supabase', 'Stripe Terminal'],
      github_url: 'https://github.com/meilin/quickserve',
      services_needed: ['feature_development', 'scaling', 'deployment'],
      deal_types_accepted: ['fixed', 'equity'],
      budget_min: 600000,
      budget_max: 1200000,
      equity_offered: 20,
      timeline_days: 75,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-N3P4',
      views: 367,
      proposals_count: 0,
    },
    {
      id: 'f0080008-0008-0008-0008-000000000008',
      owner_id: '88888888-8888-8888-8888-888888888888',
      title: 'HomeMatch - Property Comparison Tool',
      slug: 'homematch-property-comparison',
      description: `As a real estate agent, I built a tool to help buyers compare properties side-by-side.

## Features Built
- Import listings from MLS
- Side-by-side comparison view
- Neighborhood data (schools, crime, commute)
- Mortgage calculator
- Share comparisons with clients

## What's Missing
- The MLS import is flaky
- Need better map integration
- Virtual tour embedding
- Document management for offers
- Mobile app for house tours

My clients love it but it needs professional polish.`,
      short_description: 'Property comparison tool for home buyers with neighborhood data and mortgage calculations.',
      screenshot_urls: ['https://placehold.co/800x600/06B6D4/white?text=HomeMatch%0AProperty+Compare', 'https://placehold.co/800x600/0891B2/white?text=Neighborhood+Data', 'https://placehold.co/800x600/0E7490/white?text=Mortgage+Calculator'],
      tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Zillow API'],
      demo_url: 'https://homematch-demo.vercel.app',
      services_needed: ['bug_fixes', 'feature_development', 'design'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 250000,
      budget_max: 600000,
      timeline_days: 45,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-Q5R6',
      views: 234,
      proposals_count: 0,
    },
    {
      id: 'f0090009-0009-0009-0009-000000000009',
      owner_id: '99999999-9999-9999-9999-999999999999',
      title: 'VolunteerHub - Non-Profit Management',
      slug: 'volunteerhub-nonprofit-management',
      description: `Managing volunteers for our food bank was chaos. So I built VolunteerHub.

## What Works
- Volunteer registration and profiles
- Shift scheduling with calendar
- Hour tracking and reports
- Email communications
- Basic event management

## What's Needed
- Background check integration
- Automated certificate generation
- Mobile app for check-in/out
- Grant reporting exports
- Multi-organization support

Other non-profits want to use this. It could help so many people!`,
      short_description: 'Volunteer management platform for non-profits with scheduling, hour tracking, and reporting.',
      screenshot_urls: ['https://placehold.co/800x600/14B8A6/white?text=VolunteerHub%0AScheduling', 'https://placehold.co/800x600/0D9488/white?text=Hour+Tracking', 'https://placehold.co/800x600/0F766E/white?text=Reports+Dashboard'],
      tech_stack: ['Next.js', 'Supabase', 'Resend', 'Tailwind CSS', 'FullCalendar'],
      github_url: 'https://github.com/aisha-npm/volunteerhub',
      demo_url: 'https://volunteerhub-demo.vercel.app',
      services_needed: ['feature_development', 'deployment', 'scaling'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 200000,
      budget_max: 450000,
      timeline_days: 40,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-S7T8',
      views: 189,
      proposals_count: 0,
    },
    {
      id: 'f0100010-0010-0010-0010-000000000010',
      owner_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      title: 'PodNotes AI - Podcast Show Notes Generator',
      slug: 'podnotes-ai-show-notes',
      description: `I host a podcast and spending 2 hours writing show notes is killing me. PodNotes AI fixes that.

## Current Capabilities
- Upload audio file or paste RSS feed
- AI transcription with speaker identification
- Auto-generated show notes with timestamps
- Key quotes extraction
- Social media snippets generation

## Improvements Needed
- Batch processing for multiple episodes
- Direct integration with Spotify/Apple Podcasts
- Custom templates for different show formats
- SEO optimization for show notes
- Embedded audio player

This could save every podcaster hours per episode!`,
      short_description: 'AI-powered tool that automatically generates podcast show notes, timestamps, and social snippets.',
      screenshot_urls: ['https://placehold.co/800x600/A855F7/white?text=PodNotes+AI%0ATranscription', 'https://placehold.co/800x600/9333EA/white?text=Show+Notes+Generator', 'https://placehold.co/800x600/7E22CE/white?text=Social+Snippets'],
      tech_stack: ['Next.js', 'OpenAI Whisper', 'Claude API', 'Supabase', 'FFmpeg'],
      github_url: 'https://github.com/kevinpark/podnotes',
      demo_url: 'https://podnotes-demo.vercel.app',
      services_needed: ['feature_development', 'scaling', 'deployment'],
      deal_types_accepted: ['fixed', 'equity'],
      budget_min: 300000,
      budget_max: 700000,
      equity_offered: 15,
      timeline_days: 50,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-U9V0',
      views: 312,
      proposals_count: 0,
    },
    {
      id: 'f0110011-0011-0011-0011-000000000011',
      owner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      title: 'JewelDesign AI - Custom Jewelry Creator',
      slug: 'jeweldesign-ai-custom-jewelry',
      description: `I'm a jewelry designer and built an AI tool for customers to design custom pieces.

## What I've Built
- Text-to-jewelry image generation
- Style customization (modern, vintage, bohemian)
- Metal and gemstone selection
- Price estimation based on design
- Save and share designs

## What I Need
- 3D model generation from 2D designs
- Integration with my production system
- More realistic renders
- AR try-on feature
- Shopping cart and checkout

Customers love playing with designs but I need help making them buyable!`,
      short_description: 'AI jewelry design tool that generates custom pieces from text descriptions with price estimates.',
      screenshot_urls: ['https://placehold.co/800x600/FBBF24/white?text=JewelDesign+AI%0ADesign+Studio', 'https://placehold.co/800x600/F59E0B/white?text=Style+Selection', 'https://placehold.co/800x600/D97706/white?text=Price+Calculator'],
      tech_stack: ['Next.js', 'Stable Diffusion', 'Replicate', 'Supabase', 'Stripe'],
      demo_url: 'https://jeweldesign-demo.vercel.app',
      services_needed: ['feature_development', 'design', 'full_launch'],
      deal_types_accepted: ['fixed', 'hourly', 'hybrid'],
      budget_min: 450000,
      budget_max: 1100000,
      timeline_days: 70,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-W1X2',
      views: 267,
      proposals_count: 0,
    },
    {
      id: 'f0120012-0012-0012-0012-000000000012',
      owner_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
      title: 'ChordGenius - Music Composition Helper',
      slug: 'chordgenius-music-composition',
      description: `As a musician, I built ChordGenius to help songwriters create chord progressions.

## Features Working
- AI chord progression generation by genre/mood
- Piano roll visualization
- MIDI export
- Built-in synthesizer for playback
- Save progressions to library

## What's Needed
- Mobile app (I mostly compose on my phone!)
- Integration with DAWs (Ableton, Logic)
- Melody suggestion over chords
- Collaboration features
- Marketplace to sell progressions

Musicians are already sharing this in forums!`,
      short_description: 'AI-powered chord progression generator for songwriters with MIDI export and visualization.',
      screenshot_urls: ['https://placehold.co/800x600/6366F1/white?text=ChordGenius%0APiano+Roll', 'https://placehold.co/800x600/4F46E5/white?text=Progression+Generator', 'https://placehold.co/800x600/4338CA/white?text=Library+View'],
      tech_stack: ['React', 'Tone.js', 'Web Audio API', 'Python', 'TensorFlow'],
      github_url: 'https://github.com/carlosbeats/chordgenius',
      demo_url: 'https://chordgenius-demo.vercel.app',
      services_needed: ['feature_development', 'design', 'scaling'],
      deal_types_accepted: ['fixed', 'equity'],
      budget_min: 280000,
      budget_max: 650000,
      equity_offered: 18,
      timeline_days: 55,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-Y3Z4',
      views: 398,
      proposals_count: 0,
    },
    {
      id: 'f0130013-0013-0013-0013-000000000013',
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
      screenshot_urls: ['https://placehold.co/800x600/F472B6/white?text=EventVibe%0APlanning+Chat', 'https://placehold.co/800x600/EC4899/white?text=Guest+Management', 'https://placehold.co/800x600/DB2777/white?text=Budget+Tracker'],
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
      approval_status: 'approved',
      verification_code: 'PV-A5B6',
      views: 156,
      proposals_count: 0,
    },
    {
      id: 'f0140014-0014-0014-0014-000000000014',
      owner_id: '22222222-2222-2222-2222-222222222222',
      title: 'ContractBot - Freelance Contract Generator',
      slug: 'contractbot-contract-generator',
      description: `Tired of paying lawyers $500 for basic freelance contracts. Built ContractBot instead.

## What It Does
- AI generates contracts from plain English descriptions
- Template library for common scenarios
- Clause suggestions based on project type
- E-signature integration (basic)
- Contract storage and organization

## What It Needs
- Legal review of generated contracts
- More jurisdiction-specific templates
- Better e-signature flow (DocuSign integration)
- Invoice linking from InvoiceFlow (my other app!)
- Team/agency features

Would love a developer who wants to build the Stripe of legal docs!`,
      short_description: 'AI contract generator for freelancers that creates professional agreements from plain English.',
      screenshot_urls: ['https://placehold.co/800x600/64748B/white?text=ContractBot%0AContract+Builder', 'https://placehold.co/800x600/475569/white?text=Template+Library', 'https://placehold.co/800x600/334155/white?text=E-Signature+Flow'],
      tech_stack: ['Next.js', 'Claude API', 'Supabase', 'DocuSign API', 'PDF-lib'],
      github_url: 'https://github.com/marcusj/contractbot',
      services_needed: ['feature_development', 'testing', 'deployment'],
      deal_types_accepted: ['fixed', 'hourly', 'equity'],
      budget_min: 350000,
      budget_max: 850000,
      equity_offered: 12,
      timeline_days: 50,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-C7D8',
      views: 423,
      proposals_count: 0,
    },
    {
      id: 'f0150015-0015-0015-0015-000000000015',
      owner_id: '33333333-3333-3333-3333-333333333333',
      title: 'GradeAssist - Teacher Assignment Grader',
      slug: 'gradeassist-teacher-grading',
      description: `Teachers spend 10+ hours a week grading. GradeAssist cuts that in half.

## Current Features
- Upload rubric and assignments (PDF/images)
- AI suggests grades based on rubric
- Personalized feedback generation
- Grade distribution analytics
- Export to common gradebook formats

## Needs Work
- Plagiarism detection
- Better handwriting recognition
- LMS integrations (Canvas, Blackboard)
- Parent report generation
- Batch processing for large classes

Every teacher I show this to wants it immediately!`,
      short_description: 'AI grading assistant for teachers that suggests grades and generates personalized feedback.',
      screenshot_urls: ['https://placehold.co/800x600/84CC16/white?text=GradeAssist%0AGrading+Queue', 'https://placehold.co/800x600/65A30D/white?text=Feedback+Generator', 'https://placehold.co/800x600/4D7C0F/white?text=Grade+Analytics'],
      tech_stack: ['Next.js', 'GPT-4 Vision', 'Supabase', 'Tesseract.js', 'Chart.js'],
      demo_url: 'https://gradeassist-demo.vercel.app',
      services_needed: ['feature_development', 'bug_fixes', 'scaling'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 400000,
      budget_max: 950000,
      timeline_days: 60,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-E9F0',
      views: 534,
      proposals_count: 0,
      featured: true,
    },
    {
      id: 'f0160016-0016-0016-0016-000000000016',
      owner_id: '44444444-4444-4444-4444-444444444444',
      title: 'TaxSimple - Personal Tax Optimizer',
      slug: 'taxsimple-personal-tax-optimizer',
      description: `I'm a finance guy frustrated by complex tax software. Built TaxSimple for regular people.

## What Works
- Import transactions from bank accounts
- Automatic expense categorization
- Deduction finder
- Estimated tax calculator
- Basic tax planning suggestions

## What's Missing
- Actual tax filing (big one!)
- State tax calculations
- Self-employment support
- Year-over-year comparison
- CPA collaboration features

Want to be the TurboTax killer for people who hate TurboTax.`,
      short_description: 'Personal tax optimization tool that finds deductions and simplifies tax planning.',
      screenshot_urls: ['https://placehold.co/800x600/0EA5E9/white?text=TaxSimple%0ADeduction+Finder', 'https://placehold.co/800x600/0284C7/white?text=Tax+Calculator', 'https://placehold.co/800x600/0369A1/white?text=Planning+Dashboard'],
      tech_stack: ['React', 'Node.js', 'Plaid API', 'PostgreSQL', 'OpenAI API'],
      github_url: 'https://github.com/jwright/taxsimple',
      services_needed: ['feature_development', 'testing', 'full_launch'],
      deal_types_accepted: ['equity', 'hybrid'],
      budget_min: 700000,
      budget_max: 1800000,
      equity_offered: 25,
      timeline_days: 90,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-G1H2',
      views: 456,
      proposals_count: 0,
    },
    {
      id: 'f0170017-0017-0017-0017-000000000017',
      owner_id: '55555555-5555-5555-5555-555555555555',
      title: 'MedRemind - Smart Medication Manager',
      slug: 'medremind-medication-manager',
      description: `Built this for my elderly parents who keep forgetting their medications.

## Features
- Medication schedule with reminders
- Drug interaction warnings
- Refill reminders with pharmacy finder
- Family caregiver dashboard
- Medication photo log

## Needs
- Integration with pharmacy systems
- Voice assistant support (Alexa, Google)
- Better notification reliability
- Medicare Part D plan comparison
- Clinical trial matching

Seniors and their families need this!`,
      short_description: 'Smart medication management app with reminders, interaction warnings, and family monitoring.',
      screenshot_urls: ['https://placehold.co/800x600/F43F5E/white?text=MedRemind%0AMedication+Schedule', 'https://placehold.co/800x600/E11D48/white?text=Interaction+Checker', 'https://placehold.co/800x600/BE123C/white?text=Family+Dashboard'],
      tech_stack: ['React Native', 'Node.js', 'Supabase', 'OpenFDA API', 'Firebase Cloud Messaging'],
      demo_url: 'https://medremind-demo.vercel.app',
      services_needed: ['feature_development', 'testing', 'deployment'],
      deal_types_accepted: ['fixed', 'hourly'],
      budget_min: 350000,
      budget_max: 800000,
      timeline_days: 55,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-J3K4',
      views: 278,
      proposals_count: 0,
    },
    {
      id: 'f0180018-0018-0018-0018-000000000018',
      owner_id: '66666666-6666-6666-6666-666666666666',
      title: 'GymFlow - Gym Management System',
      slug: 'gymflow-gym-management',
      description: `Running a gym is harder than working out. Built GymFlow to manage mine.

## Currently Working
- Member management and check-ins
- Class scheduling and booking
- Basic payment processing
- Trainer scheduling
- Equipment maintenance tracking

## Want to Add
- Member mobile app
- Automated billing and dunning
- Lead management / CRM
- Multi-location support
- Integration with fitness wearables

Other gym owners keep asking for access!`,
      short_description: 'Complete gym management system with member check-ins, class booking, and payment processing.',
      screenshot_urls: ['https://placehold.co/800x600/EAB308/white?text=GymFlow%0AMember+Dashboard', 'https://placehold.co/800x600/CA8A04/white?text=Class+Schedule', 'https://placehold.co/800x600/A16207/white?text=Equipment+Tracking'],
      tech_stack: ['Next.js', 'Supabase', 'Stripe', 'QR Code API', 'Tailwind CSS'],
      github_url: 'https://github.com/tylerbrooks/gymflow',
      services_needed: ['feature_development', 'design', 'scaling'],
      deal_types_accepted: ['fixed', 'equity', 'hybrid'],
      budget_min: 500000,
      budget_max: 1100000,
      equity_offered: 15,
      timeline_days: 65,
      status: 'open',
      approval_status: 'approved',
      verification_code: 'PV-L5M6',
      views: 345,
      proposals_count: 0,
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
      id: 'a0010001-0001-0001-0001-000000000001',
      launch_id: 'f0010001-0001-0001-0001-000000000001', // RecipeAI
      developer_id: 'e3333333-3333-3333-3333-333333333333', // Nina - Frontend specialist
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
      id: 'a0020002-0002-0002-0002-000000000002',
      launch_id: 'f0020002-0002-0002-0002-000000000002', // InvoiceFlow
      developer_id: 'e8888888-8888-8888-8888-888888888888', // Marcus Rivera - Fintech specialist
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
      id: 'a0030003-0003-0003-0003-000000000003',
      launch_id: 'f0030003-0003-0003-0003-000000000003', // StudyBuddy
      developer_id: 'e6666666-6666-6666-6666-666666666666', // David Park - AI/ML engineer
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
    {
      id: 'a0040004-0004-0004-0004-000000000004',
      launch_id: 'f0050005-0005-0005-0005-000000000005', // HealthLog
      developer_id: 'e7777777-7777-7777-7777-777777777777', // Emma Wilson - Security expert
      cover_letter: `Priya,

Healthcare apps are my specialty. I've helped 3 health startups achieve HIPAA compliance and understand what it takes.

For HealthLog, I'd focus on:

1. **HIPAA Compliance Audit**: Full review and remediation plan
2. **Security Hardening**: Encryption at rest/transit, audit logging, access controls
3. **Accessibility**: WCAG 2.1 AA compliance for vision-impaired users
4. **Health Integrations**: Apple Health and Google Fit APIs

This is exactly the kind of sensitive project I excel at. Healthcare data must be bulletproof.

Fixed price: $15,000 for full security overhaul and compliance certification prep.`,
      deal_type: 'fixed',
      fixed_price: 1500000,
      timeline_days: 60,
      milestones: [
        { title: 'Security Audit', description: 'Complete HIPAA gap analysis', amount: 400000, due_days: 14 },
        { title: 'Remediation', description: 'Fix all identified security issues', amount: 600000, due_days: 35 },
        { title: 'Health Integrations', description: 'Apple Health and Google Fit', amount: 300000, due_days: 50 },
        { title: 'Compliance Documentation', description: 'Prepare for HIPAA certification', amount: 200000, due_days: 60 },
      ],
      status: 'pending',
    },
    {
      id: 'a0050005-0005-0005-0005-000000000005',
      launch_id: 'f0060006-0006-0006-0006-000000000006', // FitTrack Pro
      developer_id: 'e9999999-9999-9999-9999-999999999999', // Sophia Nguyen - Mobile expert
      cover_letter: `Tyler!

FitTrack Pro sounds amazing - as a React Native developer who's also a fitness enthusiast, this is a dream project.

Here's what I can deliver:

1. **Mobile-First Overhaul**: Native feel on iOS and Android
2. **Wearable Integration**: Apple Watch, Fitbit, Garmin - I've done them all
3. **Social Features**: Challenges and leaderboards with real-time updates
4. **Video Optimization**: Better compression pipeline using FFmpeg

I've shipped fitness apps before and know what keeps users engaged.

Proposal: $6,000 fixed + 8% equity for ongoing development partnership.`,
      deal_type: 'hybrid',
      fixed_price: 600000,
      equity_ask: 8,
      timeline_days: 50,
      milestones: [
        { title: 'Mobile App Foundation', description: 'Core React Native setup and navigation', amount: 150000, due_days: 14 },
        { title: 'Wearable Integrations', description: 'Apple Watch and Fitbit APIs', amount: 200000, due_days: 28 },
        { title: 'Social Features', description: 'Challenges, leaderboards, friends', amount: 150000, due_days: 40 },
        { title: 'Polish & Launch', description: 'App store submission and final fixes', amount: 100000, due_days: 50 },
      ],
      status: 'pending',
    },
    {
      id: 'a0060006-0006-0006-0006-000000000006',
      launch_id: 'f0070007-0007-0007-0007-000000000007', // QuickServe POS
      developer_id: 'e1111111-1111-1111-1111-111111111111', // Alex Kim - Full-stack
      cover_letter: `Mei,

Restaurant POS systems are complex beasts - I've built two of them before! QuickServe looks like it has solid bones.

I can help with:

1. **Multi-location Support**: Central management with per-location customization
2. **Offline Mode**: Critical for restaurants - orders must work without internet
3. **Staff Scheduling**: Integrated scheduling with time clock
4. **Online Ordering**: Direct integration (skip the delivery app fees!)

I love that you built this yourself. Let's make it ready for other restaurant owners.

Interested in the equity option - I'd love to be a long-term partner on this.`,
      deal_type: 'equity',
      equity_ask: 15,
      timeline_days: 60,
      milestones: [
        { title: 'Multi-location Architecture', description: 'Central management system', amount: 0, due_days: 20 },
        { title: 'Offline Mode', description: 'Reliable offline order processing', amount: 0, due_days: 35 },
        { title: 'Staff & Scheduling', description: 'Employee management features', amount: 0, due_days: 50 },
        { title: 'Online Ordering', description: 'Customer-facing ordering system', amount: 0, due_days: 60 },
      ],
      status: 'pending',
    },
    {
      id: 'a0070007-0007-0007-0007-000000000007',
      launch_id: 'f0100010-0010-0010-0010-000000000010', // PodNotes AI
      developer_id: 'eccccccc-cccc-cccc-cccc-cccccccccccc', // Chris Anderson - API integration
      cover_letter: `Kevin,

As a podcast listener myself, I've wished for exactly this tool. I specialize in API integrations and can make PodNotes connect to everything.

My plan:

1. **Spotify/Apple Integration**: Direct RSS and API connections
2. **Batch Processing**: Queue system for processing multiple episodes
3. **Custom Templates**: Per-show formatting with variables
4. **SEO Optimization**: Schema markup and keyword extraction

I can have Spotify integration working within the first week.

$100/hr, estimated 35-40 hours. Let's make every podcaster's life easier!`,
      deal_type: 'hourly',
      hourly_rate: 10000,
      estimated_hours: 40,
      timeline_days: 35,
      milestones: [],
      status: 'pending',
    },
    {
      id: 'a0080008-0008-0008-0008-000000000008',
      launch_id: 'f0150015-0015-0015-0015-000000000015', // GradeAssist
      developer_id: 'e6666666-6666-6666-6666-666666666666', // David Park - AI/ML
      cover_letter: `Elena,

Another EdTech project from you! GradeAssist is brilliant - teachers desperately need this.

I can add:

1. **Plagiarism Detection**: Cross-reference submissions and online sources
2. **Handwriting Recognition**: Better OCR using Google Vision + custom models
3. **LMS Integration**: Canvas and Blackboard API connections
4. **Batch Processing**: Handle 100+ assignments efficiently

My background in AI/ML is perfect for improving the grading accuracy.

$160/hr, estimated 45-50 hours. Let's help teachers reclaim their evenings!`,
      deal_type: 'hourly',
      hourly_rate: 16000,
      estimated_hours: 48,
      timeline_days: 40,
      milestones: [],
      status: 'pending',
    },
    {
      id: 'a0090009-0009-0009-0009-000000000009',
      launch_id: 'f0040004-0004-0004-0004-000000000004', // PortfolioTracker
      developer_id: 'e8888888-8888-8888-8888-888888888888', // Marcus Rivera - Fintech
      cover_letter: `James,

Fintech is my bread and butter. I've worked extensively with Plaid and know exactly why integrations break.

Here's my plan for PortfolioTracker:

1. **Plaid Reliability**: Proper error handling, reconnection flows, webhook processing
2. **API Optimization**: Caching strategy to reduce expensive API calls by 70%
3. **Tax Features**: Tax-loss harvesting calculations and wash sale detection
4. **Mobile App**: React Native app with push notifications for alerts

I'm interested in the hybrid deal - cash + equity.

Proposal: $8,000 + 7% equity for full fintech expertise and ongoing support.`,
      deal_type: 'hybrid',
      fixed_price: 800000,
      equity_ask: 7,
      timeline_days: 40,
      milestones: [
        { title: 'Plaid Reliability', description: 'Fix integration issues and add proper error handling', amount: 250000, due_days: 12 },
        { title: 'API Optimization', description: 'Implement caching and reduce API costs', amount: 200000, due_days: 22 },
        { title: 'Tax Features', description: 'Tax-loss harvesting and reporting', amount: 200000, due_days: 32 },
        { title: 'Mobile App', description: 'React Native companion app', amount: 150000, due_days: 40 },
      ],
      status: 'pending',
    },
    {
      id: 'a0100010-0010-0010-0010-000000000010',
      launch_id: 'f0120012-0012-0012-0012-000000000012', // ChordGenius
      developer_id: 'e5555555-5555-5555-5555-555555555555', // Lisa Chen - Mobile/Web
      cover_letter: `Carlos!

As a fellow musician (I play guitar), ChordGenius is SO cool. I've been waiting for something like this.

I can deliver:

1. **Mobile App**: React Native app with the same great experience
2. **DAW Integration**: VST plugin for Ableton and Logic
3. **Collaboration**: Real-time collaboration like Google Docs
4. **Marketplace**: Infrastructure for selling progressions

This has huge potential in the music production community.

$4,500 + 12% equity - I want to be part of this journey!`,
      deal_type: 'hybrid',
      fixed_price: 450000,
      equity_ask: 12,
      timeline_days: 45,
      milestones: [
        { title: 'Mobile App', description: 'React Native version of ChordGenius', amount: 200000, due_days: 18 },
        { title: 'DAW Plugin', description: 'VST plugin for major DAWs', amount: 150000, due_days: 32 },
        { title: 'Collab & Marketplace', description: 'Real-time collab and progression store', amount: 100000, due_days: 45 },
      ],
      status: 'pending',
    },
  ];

  const { error: proposalError } = await supabase.from('pv_proposals').upsert(proposals);
  if (proposalError) {
    console.error('Error creating proposals:', proposalError);
  } else {
    console.log(`✅ Created ${proposals.length} proposals`);
  }

  // ============================================
  // UPDATE PROPOSAL COUNTS
  // ============================================
  console.log('Updating proposal counts...');

  // Count proposals per launch and update
  const proposalCounts: Record<string, number> = {};
  proposals.forEach(p => {
    proposalCounts[p.launch_id] = (proposalCounts[p.launch_id] || 0) + 1;
  });

  for (const [launchId, count] of Object.entries(proposalCounts)) {
    await supabase
      .from('pv_launches')
      .update({ proposals_count: count })
      .eq('id', launchId);
  }
  console.log('✅ Updated proposal counts');

  console.log('\n🎉 Seeding complete! Visit https://propelvibes.com to see it in action.');
  console.log('\n📊 Summary:');
  console.log(`   - ${vibeCoders.length} vibe coders`);
  console.log(`   - ${developers.length} developers`);
  console.log(`   - ${devProfiles.length} developer profiles`);
  console.log(`   - ${launches.length} launches (all approved)`);
  console.log(`   - ${proposals.length} proposals`);
}

seed().catch(console.error);
