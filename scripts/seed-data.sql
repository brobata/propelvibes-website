-- ============================================
-- PROPEL VIBES SEED DATA
-- Run this in Supabase SQL Editor
-- ============================================

-- Clear existing data (optional - comment out if you want to keep existing)
TRUNCATE pv_proposals CASCADE;
TRUNCATE pv_launches CASCADE;
TRUNCATE pv_developer_profiles CASCADE;
TRUNCATE pv_profiles CASCADE;

-- ============================================
-- VIBE CODER PROFILES
-- ============================================
INSERT INTO pv_profiles (id, email, name, avatar_url, role, bio, location, website_url, github_url, twitter_url) VALUES
('11111111-1111-1111-1111-111111111111', 'sarah@example.com', 'Sarah Chen', 'https://randomuser.me/api/portraits/women/44.jpg', 'vibe_coder', 'Product designer turned vibe coder. Built my first app with Claude in a weekend!', 'San Francisco, CA', 'https://sarahchen.design', 'https://github.com/sarahchen', 'https://twitter.com/sarahcodes'),
('22222222-2222-2222-2222-222222222222', 'marcus@example.com', 'Marcus Johnson', 'https://randomuser.me/api/portraits/men/32.jpg', 'vibe_coder', 'Serial entrepreneur. Using AI to prototype ideas faster than ever.', 'Austin, TX', 'https://marcusj.com', 'https://github.com/marcusj', NULL),
('33333333-3333-3333-3333-333333333333', 'elena@example.com', 'Elena Rodriguez', 'https://randomuser.me/api/portraits/women/68.jpg', 'vibe_coder', 'Former teacher building EdTech tools with AI assistance.', 'Miami, FL', NULL, 'https://github.com/elenarodriguez', 'https://twitter.com/elena_builds'),
('44444444-4444-4444-4444-444444444444', 'james@example.com', 'James Wright', 'https://randomuser.me/api/portraits/men/75.jpg', 'vibe_coder', 'Finance professional exploring fintech ideas on weekends.', 'New York, NY', 'https://jameswright.io', 'https://github.com/jwright', NULL),
('55555555-5555-5555-5555-555555555555', 'priya@example.com', 'Priya Patel', 'https://randomuser.me/api/portraits/women/90.jpg', 'vibe_coder', 'Healthcare consultant building patient engagement tools.', 'Boston, MA', NULL, 'https://github.com/priyapatel', 'https://twitter.com/priya_health'),
('66666666-6666-6666-6666-666666666666', 'tyler@example.com', 'Tyler Brooks', 'https://randomuser.me/api/portraits/men/85.jpg', 'vibe_coder', 'Fitness coach who built a workout app with ChatGPT. Now I need help scaling it!', 'Los Angeles, CA', 'https://tylerbrooks.fit', NULL, 'https://twitter.com/tylercoach'),
('77777777-7777-7777-7777-777777777777', 'mei@example.com', 'Mei Lin', 'https://randomuser.me/api/portraits/women/52.jpg', 'vibe_coder', 'Restaurant owner automating operations with AI. Built my own POS system!', 'Seattle, WA', 'https://meilin.restaurant', 'https://github.com/meilin-builds', NULL),
('88888888-8888-8888-8888-888888888888', 'derek@example.com', 'Derek Thompson', 'https://randomuser.me/api/portraits/men/42.jpg', 'vibe_coder', 'Real estate agent who built a property comparison tool. Ready to go big!', 'Phoenix, AZ', 'https://derekthompson.realty', NULL, NULL),
('99999999-9999-9999-9999-999999999999', 'aisha@example.com', 'Aisha Mohammed', 'https://randomuser.me/api/portraits/women/37.jpg', 'vibe_coder', 'Non-profit director building volunteer management tools with Claude.', 'Chicago, IL', NULL, 'https://github.com/aisha-npm', 'https://twitter.com/aishabuilds'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'kevin@example.com', 'Kevin Park', 'https://randomuser.me/api/portraits/men/55.jpg', 'vibe_coder', 'Podcast host who built an AI show notes generator. It actually works!', 'Nashville, TN', 'https://kevinpark.show', NULL, 'https://twitter.com/kevinpodcast'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'rachel@example.com', 'Rachel Kim', 'https://randomuser.me/api/portraits/women/63.jpg', 'vibe_coder', 'Jewelry designer with an AI-powered custom design tool. Need help with 3D rendering.', 'Portland, OR', 'https://rachelkim.jewelry', 'https://github.com/rachelkdesigns', NULL),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'carlos@example.com', 'Carlos Mendez', 'https://randomuser.me/api/portraits/men/28.jpg', 'vibe_coder', 'Musician who built a chord progression generator. Looking for mobile expertise.', 'Denver, CO', 'https://carlosmendez.music', NULL, 'https://twitter.com/carlosbeats')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar_url = EXCLUDED.avatar_url,
  bio = EXCLUDED.bio,
  location = EXCLUDED.location;

-- ============================================
-- DEVELOPER PROFILES
-- ============================================
INSERT INTO pv_profiles (id, email, name, avatar_url, role, bio, location, website_url, github_url, linkedin_url, twitter_url) VALUES
('d0000001-0000-0000-0000-000000000001', 'alex@devstudio.com', 'Alex Kim', 'https://randomuser.me/api/portraits/men/22.jpg', 'developer', 'Full-stack developer specializing in React and Node.js. Love helping vibe coders ship their products.', 'Seattle, WA', 'https://alexkim.dev', 'https://github.com/alexkim', 'https://linkedin.com/in/alexkim', 'https://twitter.com/alexkimdev'),
('d0000002-0000-0000-0000-000000000002', 'jordan@example.com', 'Jordan Taylor', 'https://randomuser.me/api/portraits/men/45.jpg', 'developer', 'DevOps engineer and cloud architect. I make apps scale.', 'Denver, CO', 'https://jordantaylor.io', 'https://github.com/jtaylor', 'https://linkedin.com/in/jordantaylor', NULL),
('d0000003-0000-0000-0000-000000000003', 'nina@example.com', 'Nina Kowalski', 'https://randomuser.me/api/portraits/women/33.jpg', 'developer', 'Frontend specialist with a passion for beautiful UX. Tailwind enthusiast.', 'Portland, OR', 'https://ninakowalski.design', 'https://github.com/ninak', NULL, 'https://twitter.com/nina_codes'),
('d0000004-0000-0000-0000-000000000004', 'omar@example.com', 'Omar Hassan', 'https://randomuser.me/api/portraits/men/52.jpg', 'developer', 'Backend wizard. Python, Go, and everything databases.', 'Chicago, IL', 'https://omarhassan.dev', 'https://github.com/omarh', 'https://linkedin.com/in/omarhassan', NULL),
('d0000005-0000-0000-0000-000000000005', 'lisa@example.com', 'Lisa Chen', 'https://randomuser.me/api/portraits/women/21.jpg', 'developer', 'Mobile and web developer. Shipped 20+ apps to production.', 'Los Angeles, CA', 'https://lisachen.dev', 'https://github.com/lisac', 'https://linkedin.com/in/lisachen', 'https://twitter.com/lisachendev'),
('d0000006-0000-0000-0000-000000000006', 'david@example.com', 'David Park', 'https://randomuser.me/api/portraits/men/67.jpg', 'developer', 'AI/ML engineer helping integrate smarter features into apps.', 'San Jose, CA', 'https://davidpark.ai', 'https://github.com/dpark', 'https://linkedin.com/in/davidpark', NULL),
('d0000007-0000-0000-0000-000000000007', 'emma@example.com', 'Emma Wilson', 'https://randomuser.me/api/portraits/women/48.jpg', 'developer', 'Security-focused developer. I make sure your app is bulletproof before launch.', 'Boston, MA', 'https://emmawilson.security', 'https://github.com/emmaw', 'https://linkedin.com/in/emmawilson', NULL),
('d0000008-0000-0000-0000-000000000008', 'marcus.dev@example.com', 'Marcus Rivera', 'https://randomuser.me/api/portraits/men/36.jpg', 'developer', 'Full-stack fintech specialist. Stripe, Plaid, payment systems are my jam.', 'New York, NY', 'https://marcusrivera.dev', 'https://github.com/mrivera', 'https://linkedin.com/in/marcusrivera', NULL),
('d0000009-0000-0000-0000-000000000009', 'sophia@example.com', 'Sophia Nguyen', 'https://randomuser.me/api/portraits/women/57.jpg', 'developer', 'React Native expert. Your cross-platform mobile app specialist.', 'San Francisco, CA', 'https://sophianguyen.dev', 'https://github.com/sophian', NULL, 'https://twitter.com/sophia_mobile'),
('d000000a-0000-0000-0000-00000000000a', 'ryan@example.com', 'Ryan O''Brien', 'https://randomuser.me/api/portraits/men/71.jpg', 'developer', 'Database and performance optimization expert. PostgreSQL whisperer.', 'Austin, TX', 'https://ryanobrien.dev', 'https://github.com/ryanob', 'https://linkedin.com/in/ryanobrien', NULL),
('d000000b-0000-0000-0000-00000000000b', 'jessica@example.com', 'Jessica Martinez', 'https://randomuser.me/api/portraits/women/29.jpg', 'developer', 'E-commerce specialist. Shopify, Stripe, inventory systems. Let''s sell stuff!', 'Miami, FL', 'https://jessicam.dev', 'https://github.com/jessm', NULL, 'https://twitter.com/jess_ecomm'),
('d000000c-0000-0000-0000-00000000000c', 'chris@example.com', 'Chris Anderson', 'https://randomuser.me/api/portraits/men/58.jpg', 'developer', 'API integration specialist. If it has an API, I can connect it.', 'Atlanta, GA', 'https://chrisanderson.dev', 'https://github.com/chrisa', 'https://linkedin.com/in/chrisanderson', NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar_url = EXCLUDED.avatar_url,
  bio = EXCLUDED.bio,
  location = EXCLUDED.location;

-- ============================================
-- DEVELOPER EXTENDED PROFILES
-- ============================================
INSERT INTO pv_developer_profiles (id, profile_id, headline, skills, hourly_rate, availability, portfolio_urls, years_experience, launches_completed, rating, reviews_count, verified, featured) VALUES
('e0000001-0000-0000-0000-000000000001', 'd0000001-0000-0000-0000-000000000001', 'Full-Stack Developer | React & Node.js Expert', ARRAY['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'], 12500, 'available', ARRAY['https://alexkim.dev/portfolio'], 8, 15, 4.95, 23, true, true),
('e0000002-0000-0000-0000-000000000002', 'd0000002-0000-0000-0000-000000000002', 'DevOps & Cloud Architecture Specialist', ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'PostgreSQL', 'Redis'], 15000, 'available', ARRAY['https://jordantaylor.io/case-studies'], 10, 12, 4.88, 18, true, false),
('e0000003-0000-0000-0000-000000000003', 'd0000003-0000-0000-0000-000000000003', 'Frontend Developer & UI/UX Specialist', ARRAY['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Figma', 'TypeScript'], 10000, 'available', ARRAY['https://ninakowalski.design/work'], 6, 22, 4.92, 31, true, true),
('e0000004-0000-0000-0000-000000000004', 'd0000004-0000-0000-0000-000000000004', 'Backend Engineer | Python & Go', ARRAY['Python', 'Go', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'], 14000, 'busy', ARRAY['https://omarhassan.dev/projects'], 9, 8, 4.78, 12, true, false),
('e0000005-0000-0000-0000-000000000005', 'd0000005-0000-0000-0000-000000000005', 'Full-Stack Mobile & Web Developer', ARRAY['React Native', 'Flutter', 'React', 'Node.js', 'Firebase', 'Supabase'], 11000, 'available', ARRAY['https://lisachen.dev/apps'], 7, 20, 4.90, 28, true, false),
('e0000006-0000-0000-0000-000000000006', 'd0000006-0000-0000-0000-000000000006', 'AI/ML Engineer | Smart App Features', ARRAY['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'FastAPI', 'React'], 16000, 'available', ARRAY['https://davidpark.ai/projects'], 5, 6, 4.85, 9, true, false),
('e0000007-0000-0000-0000-000000000007', 'd0000007-0000-0000-0000-000000000007', 'Security & Compliance Expert', ARRAY['Security Audits', 'HIPAA', 'SOC2', 'Penetration Testing', 'Node.js', 'Python'], 18000, 'available', ARRAY['https://emmawilson.security/portfolio'], 11, 14, 4.97, 19, true, true),
('e0000008-0000-0000-0000-000000000008', 'd0000008-0000-0000-0000-000000000008', 'Fintech & Payment Systems Specialist', ARRAY['Stripe', 'Plaid', 'React', 'Node.js', 'PostgreSQL', 'Compliance'], 17500, 'available', ARRAY['https://marcusrivera.dev/fintech'], 9, 11, 4.91, 16, true, false),
('e0000009-0000-0000-0000-000000000009', 'd0000009-0000-0000-0000-000000000009', 'React Native & Mobile Expert', ARRAY['React Native', 'Expo', 'TypeScript', 'iOS', 'Android', 'Firebase'], 13000, 'available', ARRAY['https://sophianguyen.dev/mobile'], 6, 18, 4.89, 25, true, false),
('e000000a-0000-0000-0000-00000000000a', 'd000000a-0000-0000-0000-00000000000a', 'Database & Performance Optimization', ARRAY['PostgreSQL', 'MySQL', 'Redis', 'Query Optimization', 'Data Modeling', 'Supabase'], 14500, 'busy', ARRAY['https://ryanobrien.dev/databases'], 12, 9, 4.93, 14, true, false),
('e000000b-0000-0000-0000-00000000000b', 'd000000b-0000-0000-0000-00000000000b', 'E-commerce & Payments Expert', ARRAY['Shopify', 'Stripe', 'WooCommerce', 'React', 'Node.js', 'Inventory Systems'], 12000, 'available', ARRAY['https://jessicam.dev/ecommerce'], 7, 16, 4.87, 22, true, false),
('e000000c-0000-0000-0000-00000000000c', 'd000000c-0000-0000-0000-00000000000c', 'API Integration Specialist', ARRAY['REST APIs', 'GraphQL', 'Webhooks', 'OAuth', 'Node.js', 'Python'], 11500, 'available', ARRAY['https://chrisanderson.dev/integrations'], 8, 24, 4.82, 35, true, false)
ON CONFLICT (id) DO UPDATE SET
  headline = EXCLUDED.headline,
  skills = EXCLUDED.skills,
  hourly_rate = EXCLUDED.hourly_rate,
  availability = EXCLUDED.availability,
  years_experience = EXCLUDED.years_experience,
  launches_completed = EXCLUDED.launches_completed,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  verified = EXCLUDED.verified,
  featured = EXCLUDED.featured;

-- ============================================
-- LAUNCHES
-- ============================================
INSERT INTO pv_launches (id, owner_id, title, slug, description, short_description, screenshot_urls, tech_stack, github_url, demo_url, services_needed, deal_types_accepted, budget_min, budget_max, equity_offered, timeline_days, status, approval_status, verification_code, views, proposals_count, featured) VALUES
('a0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'RecipeAI - Smart Meal Planning App', 'recipeai-smart-meal-planning',
'I built RecipeAI over a weekend using Claude. It''s a meal planning app that suggests recipes based on what''s in your fridge and your dietary preferences.

## What I''ve Built
- Basic recipe suggestion algorithm
- User authentication with Supabase
- Simple ingredient input form
- Recipe display with instructions

## What I Need Help With
- The UI needs polish - it works but doesn''t look professional
- Need to add a proper database for saving favorite recipes
- Would love to integrate with grocery delivery APIs
- Performance optimization - it''s slow on mobile

## My Vision
I want this to be the go-to app for busy professionals who want to eat healthy without spending hours planning meals.',
'AI-powered meal planning app that suggests recipes based on your fridge contents and dietary preferences.',
ARRAY['https://placehold.co/800x600/22C55E/white?text=RecipeAI%0AMeal+Planner', 'https://placehold.co/800x600/16A34A/white?text=Recipe+Search'],
ARRAY['Next.js', 'React', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
'https://github.com/sarahchen/recipeai', 'https://recipeai-demo.vercel.app',
ARRAY['code_cleanup', 'feature_development', 'design']::pv_service_category[],
ARRAY['fixed', 'hourly']::pv_deal_type[],
200000, 500000, NULL, 30, 'open', 'approved', 'PV-A1B2', 342, 1, true),

('a0000002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'InvoiceFlow - Freelancer Invoicing Tool', 'invoiceflow-freelancer-invoicing',
'Built this to solve my own pain point - tracking invoices as a freelancer.

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

Looking for a developer who can take this from MVP to a polished product. Open to equity for the right partner!',
'Simple invoicing tool for freelancers with payment tracking and PDF generation.',
ARRAY['https://placehold.co/800x600/3B82F6/white?text=InvoiceFlow%0ADashboard', 'https://placehold.co/800x600/2563EB/white?text=Invoice+Creator'],
ARRAY['React', 'Node.js', 'PostgreSQL', 'Resend', 'Puppeteer'],
'https://github.com/marcusj/invoiceflow', 'https://invoiceflow-demo.vercel.app',
ARRAY['feature_development', 'deployment', 'scaling']::pv_service_category[],
ARRAY['fixed', 'equity', 'hybrid']::pv_deal_type[],
300000, 800000, 15, 45, 'open', 'approved', 'PV-C3D4', 528, 1, true),

('a0000003-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'StudyBuddy - AI Tutoring Platform', 'studybuddy-ai-tutoring',
'As a former teacher, I know how hard it is for students to get personalized help. StudyBuddy uses AI to provide 24/7 tutoring.

## What''s Working
- Chat interface with AI tutor
- Math problem solving with step-by-step explanations
- Basic quiz generation
- Student progress tracking

## What''s Missing
- The AI sometimes gives wrong answers - needs better prompting
- No parent/teacher dashboard
- Can''t handle images (students want to photo their homework)
- Need gamification to keep students engaged

This could really help kids who can''t afford private tutors!',
'AI-powered tutoring platform providing 24/7 personalized learning assistance for students.',
ARRAY['https://placehold.co/800x600/8B5CF6/white?text=StudyBuddy%0AAI+Tutor', 'https://placehold.co/800x600/7C3AED/white?text=Quiz+Mode'],
ARRAY['Next.js', 'Claude API', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
NULL, 'https://studybuddy-beta.vercel.app',
ARRAY['feature_development', 'bug_fixes', 'testing']::pv_service_category[],
ARRAY['fixed', 'hourly']::pv_deal_type[],
400000, 1000000, NULL, 60, 'open', 'approved', 'PV-E5F6', 412, 1, false),

('a0000004-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'PortfolioTracker - Investment Dashboard', 'portfoliotracker-investment-dashboard',
'Track all your investments in one place - stocks, crypto, real estate.

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

Looking for a developer who understands fintech and can help make this rock solid.',
'All-in-one investment tracking dashboard for stocks, crypto, and real estate.',
ARRAY['https://placehold.co/800x600/10B981/white?text=PortfolioTracker%0ADashboard', 'https://placehold.co/800x600/059669/white?text=Performance+Charts'],
ARRAY['React', 'Python', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Chart.js'],
'https://github.com/jwright/portfoliotracker', NULL,
ARRAY['bug_fixes', 'feature_development', 'scaling']::pv_service_category[],
ARRAY['hourly', 'hybrid']::pv_deal_type[],
500000, 1500000, 10, 45, 'open', 'approved', 'PV-G7H8', 289, 1, false),

('a0000005-0000-0000-0000-000000000005', '55555555-5555-5555-5555-555555555555', 'HealthLog - Patient Symptom Tracker', 'healthlog-patient-symptom-tracker',
'Helping patients track symptoms and share with their doctors.

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

This needs to be bulletproof before launching - healthcare data is sensitive!',
'Patient symptom tracking app with medication reminders and doctor-shareable reports.',
ARRAY['https://placehold.co/800x600/EC4899/white?text=HealthLog%0ASymptom+Tracker', 'https://placehold.co/800x600/DB2777/white?text=Medication+Reminders'],
ARRAY['React Native', 'Supabase', 'Node.js', 'Chart.js'],
NULL, 'https://healthlog-demo.vercel.app',
ARRAY['code_cleanup', 'testing', 'deployment', 'full_launch']::pv_service_category[],
ARRAY['fixed']::pv_deal_type[],
800000, 2000000, NULL, 90, 'open', 'approved', 'PV-J9K0', 198, 1, false),

('a0000006-0000-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 'FitTrack Pro - AI Workout Companion', 'fittrack-pro-workout-companion',
'As a fitness coach, I wanted to give my clients AI-powered workout guidance.

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

I have 500 clients waiting for this to be production-ready!',
'AI-powered workout companion that creates personalized fitness plans and tracks progress.',
ARRAY['https://placehold.co/800x600/F97316/white?text=FitTrack+Pro%0AWorkout+Generator', 'https://placehold.co/800x600/EA580C/white?text=Exercise+Library'],
ARRAY['React Native', 'OpenAI API', 'Firebase', 'FFmpeg', 'TensorFlow.js'],
'https://github.com/tylerbrooks/fittrackpro', 'https://fittrackpro-demo.vercel.app',
ARRAY['feature_development', 'scaling', 'design']::pv_service_category[],
ARRAY['fixed', 'hourly', 'equity']::pv_deal_type[],
350000, 900000, 12, 60, 'open', 'approved', 'PV-L1M2', 445, 1, true),

('a0000007-0000-0000-0000-000000000007', '77777777-7777-7777-7777-777777777777', 'QuickServe POS - Restaurant Point of Sale', 'quickserve-pos-restaurant',
'I run a small restaurant and built my own POS because existing ones are too expensive.

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

Other restaurant owners are asking to use this!',
'Affordable point-of-sale system for restaurants with kitchen display and inventory tracking.',
ARRAY['https://placehold.co/800x600/EF4444/white?text=QuickServe+POS%0AOrder+Screen', 'https://placehold.co/800x600/DC2626/white?text=Kitchen+Display'],
ARRAY['Next.js', 'Electron', 'SQLite', 'Supabase', 'Stripe Terminal'],
'https://github.com/meilin/quickserve', NULL,
ARRAY['feature_development', 'scaling', 'deployment']::pv_service_category[],
ARRAY['fixed', 'equity']::pv_deal_type[],
600000, 1200000, 20, 75, 'open', 'approved', 'PV-N3P4', 367, 1, false),

('a0000008-0000-0000-0000-000000000008', '88888888-8888-8888-8888-888888888888', 'HomeMatch - Property Comparison Tool', 'homematch-property-comparison',
'As a real estate agent, I built a tool to help buyers compare properties side-by-side.

## Features Built
- Import listings from MLS
- Side-by-side comparison view
- Neighborhood data (schools, crime, commute)
- Mortgage calculator
- Share comparisons with clients

## What''s Missing
- The MLS import is flaky
- Need better map integration
- Virtual tour embedding
- Document management for offers

My clients love it but it needs professional polish.',
'Property comparison tool for home buyers with neighborhood data and mortgage calculations.',
ARRAY['https://placehold.co/800x600/06B6D4/white?text=HomeMatch%0AProperty+Compare', 'https://placehold.co/800x600/0891B2/white?text=Neighborhood+Data'],
ARRAY['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Zillow API'],
NULL, 'https://homematch-demo.vercel.app',
ARRAY['bug_fixes', 'feature_development', 'design']::pv_service_category[],
ARRAY['fixed', 'hourly']::pv_deal_type[],
250000, 600000, NULL, 45, 'open', 'approved', 'PV-Q5R6', 234, 0, false),

('a0000009-0000-0000-0000-000000000009', '99999999-9999-9999-9999-999999999999', 'VolunteerHub - Non-Profit Management', 'volunteerhub-nonprofit-management',
'Managing volunteers for our food bank was chaos. So I built VolunteerHub.

## What Works
- Volunteer registration and profiles
- Shift scheduling with calendar
- Hour tracking and reports
- Email communications
- Basic event management

## What''s Needed
- Background check integration
- Automated certificate generation
- Mobile app for check-in/out
- Grant reporting exports

Other non-profits want to use this. It could help so many people!',
'Volunteer management platform for non-profits with scheduling, hour tracking, and reporting.',
ARRAY['https://placehold.co/800x600/14B8A6/white?text=VolunteerHub%0AScheduling', 'https://placehold.co/800x600/0D9488/white?text=Hour+Tracking'],
ARRAY['Next.js', 'Supabase', 'Resend', 'Tailwind CSS', 'FullCalendar'],
'https://github.com/aisha-npm/volunteerhub', 'https://volunteerhub-demo.vercel.app',
ARRAY['feature_development', 'deployment', 'scaling']::pv_service_category[],
ARRAY['fixed', 'hourly']::pv_deal_type[],
200000, 450000, NULL, 40, 'open', 'approved', 'PV-S7T8', 189, 0, false),

('a000000a-0000-0000-0000-00000000000a', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PodNotes AI - Podcast Show Notes Generator', 'podnotes-ai-show-notes',
'I host a podcast and spending 2 hours writing show notes is killing me. PodNotes AI fixes that.

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

This could save every podcaster hours per episode!',
'AI-powered tool that automatically generates podcast show notes, timestamps, and social snippets.',
ARRAY['https://placehold.co/800x600/A855F7/white?text=PodNotes+AI%0ATranscription', 'https://placehold.co/800x600/9333EA/white?text=Show+Notes+Generator'],
ARRAY['Next.js', 'OpenAI Whisper', 'Claude API', 'Supabase', 'FFmpeg'],
'https://github.com/kevinpark/podnotes', 'https://podnotes-demo.vercel.app',
ARRAY['feature_development', 'scaling', 'deployment']::pv_service_category[],
ARRAY['fixed', 'equity']::pv_deal_type[],
300000, 700000, 15, 50, 'open', 'approved', 'PV-U9V0', 312, 1, false),

('a000000b-0000-0000-0000-00000000000b', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'JewelDesign AI - Custom Jewelry Creator', 'jeweldesign-ai-custom-jewelry',
'I''m a jewelry designer and built an AI tool for customers to design custom pieces.

## What I''ve Built
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

Customers love playing with designs but I need help making them buyable!',
'AI jewelry design tool that generates custom pieces from text descriptions with price estimates.',
ARRAY['https://placehold.co/800x600/FBBF24/white?text=JewelDesign+AI%0ADesign+Studio', 'https://placehold.co/800x600/F59E0B/white?text=Style+Selection'],
ARRAY['Next.js', 'Stable Diffusion', 'Replicate', 'Supabase', 'Stripe'],
NULL, 'https://jeweldesign-demo.vercel.app',
ARRAY['feature_development', 'design', 'full_launch']::pv_service_category[],
ARRAY['fixed', 'hourly', 'hybrid']::pv_deal_type[],
450000, 1100000, NULL, 70, 'open', 'approved', 'PV-W1X2', 267, 0, false),

('a000000c-0000-0000-0000-00000000000c', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ChordGenius - Music Composition Helper', 'chordgenius-music-composition',
'As a musician, I built ChordGenius to help songwriters create chord progressions.

## Features Working
- AI chord progression generation by genre/mood
- Piano roll visualization
- MIDI export
- Built-in synthesizer for playback
- Save progressions to library

## What''s Needed
- Mobile app (I mostly compose on my phone!)
- Integration with DAWs (Ableton, Logic)
- Melody suggestion over chords
- Collaboration features

Musicians are already sharing this in forums!',
'AI-powered chord progression generator for songwriters with MIDI export and visualization.',
ARRAY['https://placehold.co/800x600/6366F1/white?text=ChordGenius%0APiano+Roll', 'https://placehold.co/800x600/4F46E5/white?text=Progression+Generator'],
ARRAY['React', 'Tone.js', 'Web Audio API', 'Python', 'TensorFlow'],
'https://github.com/carlosbeats/chordgenius', 'https://chordgenius-demo.vercel.app',
ARRAY['feature_development', 'design', 'scaling']::pv_service_category[],
ARRAY['fixed', 'equity']::pv_deal_type[],
280000, 650000, 18, 55, 'open', 'approved', 'PV-Y3Z4', 398, 1, false),

('a000000d-0000-0000-0000-00000000000d', '33333333-3333-3333-3333-333333333333', 'GradeAssist - Teacher Assignment Grader', 'gradeassist-teacher-grading',
'Teachers spend 10+ hours a week grading. GradeAssist cuts that in half.

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

Every teacher I show this to wants it immediately!',
'AI grading assistant for teachers that suggests grades and generates personalized feedback.',
ARRAY['https://placehold.co/800x600/84CC16/white?text=GradeAssist%0AGrading+Queue', 'https://placehold.co/800x600/65A30D/white?text=Feedback+Generator'],
ARRAY['Next.js', 'GPT-4 Vision', 'Supabase', 'Tesseract.js', 'Chart.js'],
NULL, 'https://gradeassist-demo.vercel.app',
ARRAY['feature_development', 'bug_fixes', 'scaling']::pv_service_category[],
ARRAY['fixed', 'hourly']::pv_deal_type[],
400000, 950000, NULL, 60, 'open', 'approved', 'PV-E9F0', 534, 1, true),

('a000000e-0000-0000-0000-00000000000e', '44444444-4444-4444-4444-444444444444', 'TaxSimple - Personal Tax Optimizer', 'taxsimple-personal-tax-optimizer',
'I''m a finance guy frustrated by complex tax software. Built TaxSimple for regular people.

## What Works
- Import transactions from bank accounts
- Automatic expense categorization
- Deduction finder
- Estimated tax calculator
- Basic tax planning suggestions

## What''s Missing
- Actual tax filing (big one!)
- State tax calculations
- Self-employment support
- Year-over-year comparison

Want to be the TurboTax killer for people who hate TurboTax.',
'Personal tax optimization tool that finds deductions and simplifies tax planning.',
ARRAY['https://placehold.co/800x600/0EA5E9/white?text=TaxSimple%0ADeduction+Finder', 'https://placehold.co/800x600/0284C7/white?text=Tax+Calculator'],
ARRAY['React', 'Node.js', 'Plaid API', 'PostgreSQL', 'OpenAI API'],
'https://github.com/jwright/taxsimple', NULL,
ARRAY['feature_development', 'testing', 'full_launch']::pv_service_category[],
ARRAY['equity', 'hybrid']::pv_deal_type[],
700000, 1800000, 25, 90, 'open', 'approved', 'PV-G1H2', 456, 0, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  screenshot_urls = EXCLUDED.screenshot_urls,
  tech_stack = EXCLUDED.tech_stack,
  services_needed = EXCLUDED.services_needed,
  deal_types_accepted = EXCLUDED.deal_types_accepted,
  budget_min = EXCLUDED.budget_min,
  budget_max = EXCLUDED.budget_max,
  equity_offered = EXCLUDED.equity_offered,
  timeline_days = EXCLUDED.timeline_days,
  status = EXCLUDED.status,
  approval_status = EXCLUDED.approval_status,
  views = EXCLUDED.views,
  proposals_count = EXCLUDED.proposals_count,
  featured = EXCLUDED.featured;

-- ============================================
-- PROPOSALS
-- ============================================
INSERT INTO pv_proposals (id, launch_id, developer_id, cover_letter, deal_type, fixed_price, hourly_rate, estimated_hours, equity_ask, timeline_days, milestones, status) VALUES
('f0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'e0000003-0000-0000-0000-000000000003',
'Hi Sarah!

I love what you''ve built with RecipeAI - it''s exactly the kind of app I enjoy working on. As a frontend specialist, I can help transform your UI into something that looks as good as it works.

Here''s my approach:
1. Audit the current UI and create a polished design system
2. Implement responsive layouts that work beautifully on mobile
3. Add micro-interactions with Framer Motion for a premium feel
4. Optimize performance with lazy loading and image optimization

Looking forward to discussing this further.',
'fixed', 350000, NULL, NULL, NULL, 21,
'[{"title": "Design System & Audit", "description": "Create component library and style guide", "amount": 100000, "due_days": 7}, {"title": "Core UI Overhaul", "description": "Redesign main screens", "amount": 150000, "due_days": 14}, {"title": "Polish & Optimization", "description": "Add animations, optimize performance", "amount": 100000, "due_days": 21}]',
'pending'),

('f0000002-0000-0000-0000-000000000002', 'a0000002-0000-0000-0000-000000000002', 'e0000008-0000-0000-0000-000000000008',
'Hey Marcus,

InvoiceFlow looks promising! I''ve built payment systems before and know exactly what it takes to make them production-ready.

I can help with:
- Rock-solid Stripe integration with webhooks
- Recurring billing automation
- Multi-currency support using live exchange rates
- Client portal with secure invoice viewing

My proposal: $5,000 upfront + 8% equity. I''ll commit to ongoing maintenance for 6 months post-launch.

Let''s chat!',
'hybrid', 500000, NULL, NULL, 8, 35,
'[{"title": "Stripe Integration", "description": "Complete payment processing setup", "amount": 200000, "due_days": 10}, {"title": "Recurring & Multi-currency", "description": "Automation and currency support", "amount": 150000, "due_days": 25}, {"title": "Client Portal", "description": "Build client-facing features", "amount": 150000, "due_days": 35}]',
'pending'),

('f0000003-0000-0000-0000-000000000003', 'a0000003-0000-0000-0000-000000000003', 'e0000006-0000-0000-0000-000000000006',
'Elena,

As an AI/ML engineer, I''m excited about StudyBuddy''s potential. The wrong answer problem is common with AI tutors, but very solvable.

Here''s how I''d approach this:
1. Better Prompting: Implement chain-of-thought reasoning
2. Image Support: Add vision capabilities using GPT-4V or Claude
3. Gamification: Points, streaks, achievements
4. Parent Dashboard: Real-time progress tracking

Rate: $160/hr, estimated 50-60 hours total.

This could genuinely help students!',
'hourly', NULL, 16000, 55, NULL, 45, '[]', 'pending'),

('f0000004-0000-0000-0000-000000000004', 'a0000005-0000-0000-0000-000000000005', 'e0000007-0000-0000-0000-000000000007',
'Priya,

Healthcare apps are my specialty. I''ve helped 3 health startups achieve HIPAA compliance.

For HealthLog, I''d focus on:
1. HIPAA Compliance Audit: Full review and remediation plan
2. Security Hardening: Encryption, audit logging, access controls
3. Accessibility: WCAG 2.1 AA compliance
4. Health Integrations: Apple Health and Google Fit APIs

Fixed price: $15,000 for full security overhaul and compliance certification prep.',
'fixed', 1500000, NULL, NULL, NULL, 60,
'[{"title": "Security Audit", "description": "Complete HIPAA gap analysis", "amount": 400000, "due_days": 14}, {"title": "Remediation", "description": "Fix all identified issues", "amount": 600000, "due_days": 35}, {"title": "Health Integrations", "description": "Apple Health and Google Fit", "amount": 300000, "due_days": 50}, {"title": "Compliance Documentation", "description": "Prepare for certification", "amount": 200000, "due_days": 60}]',
'pending'),

('f0000005-0000-0000-0000-000000000005', 'a0000006-0000-0000-0000-000000000006', 'e0000009-0000-0000-0000-000000000009',
'Tyler!

FitTrack Pro sounds amazing - as a React Native developer who''s also a fitness enthusiast, this is a dream project.

Here''s what I can deliver:
1. Mobile-First Overhaul: Native feel on iOS and Android
2. Wearable Integration: Apple Watch, Fitbit, Garmin
3. Social Features: Challenges and leaderboards
4. Video Optimization: Better compression pipeline

Proposal: $6,000 fixed + 8% equity for ongoing development partnership.',
'hybrid', 600000, NULL, NULL, 8, 50,
'[{"title": "Mobile App Foundation", "description": "Core React Native setup", "amount": 150000, "due_days": 14}, {"title": "Wearable Integrations", "description": "Apple Watch and Fitbit APIs", "amount": 200000, "due_days": 28}, {"title": "Social Features", "description": "Challenges, leaderboards", "amount": 150000, "due_days": 40}, {"title": "Polish & Launch", "description": "App store submission", "amount": 100000, "due_days": 50}]',
'pending'),

('f0000006-0000-0000-0000-000000000006', 'a0000007-0000-0000-0000-000000000007', 'e0000001-0000-0000-0000-000000000001',
'Mei,

Restaurant POS systems are complex beasts - I''ve built two of them before! QuickServe looks like it has solid bones.

I can help with:
1. Multi-location Support: Central management with per-location customization
2. Offline Mode: Critical for restaurants - orders must work without internet
3. Staff Scheduling: Integrated scheduling with time clock
4. Online Ordering: Direct integration (skip the delivery app fees!)

Interested in the equity option - I''d love to be a long-term partner on this.',
'equity', NULL, NULL, NULL, 15, 60,
'[{"title": "Multi-location Architecture", "description": "Central management system", "amount": 0, "due_days": 20}, {"title": "Offline Mode", "description": "Reliable offline processing", "amount": 0, "due_days": 35}, {"title": "Staff & Scheduling", "description": "Employee management", "amount": 0, "due_days": 50}, {"title": "Online Ordering", "description": "Customer-facing system", "amount": 0, "due_days": 60}]',
'pending'),

('f0000007-0000-0000-0000-000000000007', 'a000000a-0000-0000-0000-00000000000a', 'e000000c-0000-0000-0000-00000000000c',
'Kevin,

As a podcast listener myself, I''ve wished for exactly this tool. I specialize in API integrations.

My plan:
1. Spotify/Apple Integration: Direct RSS and API connections
2. Batch Processing: Queue system for multiple episodes
3. Custom Templates: Per-show formatting with variables
4. SEO Optimization: Schema markup and keyword extraction

$100/hr, estimated 35-40 hours. Let''s make every podcaster''s life easier!',
'hourly', NULL, 10000, 40, NULL, 35, '[]', 'pending'),

('f0000008-0000-0000-0000-000000000008', 'a000000d-0000-0000-0000-00000000000d', 'e0000006-0000-0000-0000-000000000006',
'Elena,

Another EdTech project from you! GradeAssist is brilliant - teachers desperately need this.

I can add:
1. Plagiarism Detection: Cross-reference submissions and online sources
2. Handwriting Recognition: Better OCR using Google Vision
3. LMS Integration: Canvas and Blackboard API connections
4. Batch Processing: Handle 100+ assignments efficiently

$160/hr, estimated 45-50 hours. Let''s help teachers reclaim their evenings!',
'hourly', NULL, 16000, 48, NULL, 40, '[]', 'pending'),

('f0000009-0000-0000-0000-000000000009', 'a0000004-0000-0000-0000-000000000004', 'e0000008-0000-0000-0000-000000000008',
'James,

Fintech is my bread and butter. I''ve worked extensively with Plaid and know exactly why integrations break.

Here''s my plan for PortfolioTracker:
1. Plaid Reliability: Proper error handling, reconnection flows
2. API Optimization: Caching strategy to reduce API costs by 70%
3. Tax Features: Tax-loss harvesting calculations
4. Mobile App: React Native app with push notifications

Proposal: $8,000 + 7% equity for full fintech expertise.',
'hybrid', 800000, NULL, NULL, 7, 40,
'[{"title": "Plaid Reliability", "description": "Fix integration issues", "amount": 250000, "due_days": 12}, {"title": "API Optimization", "description": "Implement caching", "amount": 200000, "due_days": 22}, {"title": "Tax Features", "description": "Tax-loss harvesting", "amount": 200000, "due_days": 32}, {"title": "Mobile App", "description": "React Native companion", "amount": 150000, "due_days": 40}]',
'pending'),

('f000000a-0000-0000-0000-00000000000a', 'a000000c-0000-0000-0000-00000000000c', 'e0000005-0000-0000-0000-000000000005',
'Carlos!

As a fellow musician (I play guitar), ChordGenius is SO cool. I''ve been waiting for something like this.

I can deliver:
1. Mobile App: React Native app with the same great experience
2. DAW Integration: VST plugin for Ableton and Logic
3. Collaboration: Real-time collaboration like Google Docs
4. Marketplace: Infrastructure for selling progressions

$4,500 + 12% equity - I want to be part of this journey!',
'hybrid', 450000, NULL, NULL, 12, 45,
'[{"title": "Mobile App", "description": "React Native version", "amount": 200000, "due_days": 18}, {"title": "DAW Plugin", "description": "VST plugin for major DAWs", "amount": 150000, "due_days": 32}, {"title": "Collab & Marketplace", "description": "Real-time collab and store", "amount": 100000, "due_days": 45}]',
'pending')
ON CONFLICT (id) DO UPDATE SET
  cover_letter = EXCLUDED.cover_letter,
  deal_type = EXCLUDED.deal_type,
  fixed_price = EXCLUDED.fixed_price,
  hourly_rate = EXCLUDED.hourly_rate,
  estimated_hours = EXCLUDED.estimated_hours,
  equity_ask = EXCLUDED.equity_ask,
  timeline_days = EXCLUDED.timeline_days,
  milestones = EXCLUDED.milestones,
  status = EXCLUDED.status;

-- Done!
SELECT
  (SELECT COUNT(*) FROM pv_profiles WHERE role = 'vibe_coder') as vibe_coders,
  (SELECT COUNT(*) FROM pv_profiles WHERE role = 'developer') as developers,
  (SELECT COUNT(*) FROM pv_developer_profiles) as developer_profiles,
  (SELECT COUNT(*) FROM pv_launches) as launches,
  (SELECT COUNT(*) FROM pv_proposals) as proposals;
