-- Propel Vibes Seed Data
-- Sample data for demonstration purposes

-- ============================================
-- PROFILES (Vibe Coders and Developers)
-- ============================================

-- Vibe Coders (people who built apps with AI and need help)
INSERT INTO pv_profiles (id, email, name, avatar_url, role, bio, location, website_url, github_url, twitter_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'sarah@example.com', 'Sarah Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 'vibe_coder', 'Product designer turned vibe coder. Built my first app with Claude in a weekend!', 'San Francisco, CA', 'https://sarahchen.design', 'https://github.com/sarahchen', 'https://twitter.com/sarahcodes'),
  ('22222222-2222-2222-2222-222222222222', 'marcus@example.com', 'Marcus Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', 'vibe_coder', 'Serial entrepreneur. Using AI to prototype ideas faster than ever.', 'Austin, TX', 'https://marcusj.com', 'https://github.com/marcusj', NULL),
  ('33333333-3333-3333-3333-333333333333', 'elena@example.com', 'Elena Rodriguez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', 'vibe_coder', 'Former teacher building EdTech tools with AI assistance.', 'Miami, FL', NULL, 'https://github.com/elenarodriguez', 'https://twitter.com/elena_builds'),
  ('44444444-4444-4444-4444-444444444444', 'james@example.com', 'James Wright', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', 'vibe_coder', 'Finance professional exploring fintech ideas on weekends.', 'New York, NY', 'https://jameswright.io', 'https://github.com/jwright', NULL),
  ('55555555-5555-5555-5555-555555555555', 'priya@example.com', 'Priya Patel', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', 'vibe_coder', 'Healthcare consultant building patient engagement tools.', 'Boston, MA', NULL, 'https://github.com/priyapatel', 'https://twitter.com/priya_health');

-- Developers (professionals who help launch vibe-coded apps)
INSERT INTO pv_profiles (id, email, name, avatar_url, role, bio, location, website_url, github_url, linkedin_url, twitter_url) VALUES
  ('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'alex@devstudio.com', 'Alex Kim', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', 'developer', 'Full-stack developer specializing in React and Node.js. Love helping vibe coders ship their products.', 'Seattle, WA', 'https://alexkim.dev', 'https://github.com/alexkim', 'https://linkedin.com/in/alexkim', 'https://twitter.com/alexkimdev'),
  ('bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'jordan@example.com', 'Jordan Taylor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', 'developer', 'DevOps engineer and cloud architect. I make apps scale.', 'Denver, CO', 'https://jordantaylor.io', 'https://github.com/jtaylor', 'https://linkedin.com/in/jordantaylor', NULL),
  ('cccc3333-cccc-cccc-cccc-cccccccccccc', 'nina@example.com', 'Nina Kowalski', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina', 'developer', 'Frontend specialist with a passion for beautiful UX. Tailwind enthusiast.', 'Portland, OR', 'https://ninakowalski.design', 'https://github.com/ninak', NULL, 'https://twitter.com/nina_codes'),
  ('dddd4444-dddd-dddd-dddd-dddddddddddd', 'omar@example.com', 'Omar Hassan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', 'developer', 'Backend wizard. Python, Go, and everything databases.', 'Chicago, IL', 'https://omarhassan.dev', 'https://github.com/omarh', 'https://linkedin.com/in/omarhassan', NULL),
  ('eeee5555-eeee-eeee-eeee-eeeeeeeeeeee', 'lisa@example.com', 'Lisa Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', 'developer', 'Mobile and web developer. Shipped 20+ apps to production.', 'Los Angeles, CA', 'https://lisachen.dev', 'https://github.com/lisac', 'https://linkedin.com/in/lisachen', 'https://twitter.com/lisachendev'),
  ('ffff6666-ffff-ffff-ffff-ffffffffffff', 'david@example.com', 'David Park', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', 'developer', 'AI/ML engineer helping integrate smarter features into apps.', 'San Jose, CA', 'https://davidpark.ai', 'https://github.com/dpark', 'https://linkedin.com/in/davidpark', NULL);

-- ============================================
-- DEVELOPER PROFILES (extended info)
-- ============================================

INSERT INTO pv_developer_profiles (id, profile_id, headline, skills, hourly_rate, availability, portfolio_urls, years_experience, launches_completed, rating, reviews_count, verified) VALUES
  ('dev-1111-1111-1111-111111111111', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Full-Stack Developer | React & Node.js Expert', ARRAY['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'], 12500, 'available', ARRAY['https://github.com/alexkim/project1', 'https://alexkim.dev/portfolio'], 8, 15, 4.95, 23, true),
  ('dev-2222-2222-2222-222222222222', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'DevOps & Cloud Architecture Specialist', ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'PostgreSQL', 'Redis'], 15000, 'available', ARRAY['https://jordantaylor.io/case-studies'], 10, 12, 4.88, 18, true),
  ('dev-3333-3333-3333-333333333333', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'Frontend Developer & UI/UX Specialist', ARRAY['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Figma', 'TypeScript'], 10000, 'available', ARRAY['https://ninakowalski.design/work'], 6, 22, 4.92, 31, true),
  ('dev-4444-4444-4444-444444444444', 'dddd4444-dddd-dddd-dddd-dddddddddddd', 'Backend Engineer | Python & Go', ARRAY['Python', 'Go', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'], 14000, 'busy', ARRAY['https://omarhassan.dev/projects'], 9, 8, 4.78, 12, true),
  ('dev-5555-5555-5555-555555555555', 'eeee5555-eeee-eeee-eeee-eeeeeeeeeeee', 'Full-Stack Mobile & Web Developer', ARRAY['React Native', 'Flutter', 'React', 'Node.js', 'Firebase', 'Supabase'], 11000, 'available', ARRAY['https://lisachen.dev/apps'], 7, 20, 4.90, 28, true),
  ('dev-6666-6666-6666-666666666666', 'ffff6666-ffff-ffff-ffff-ffffffffffff', 'AI/ML Engineer | Smart App Features', ARRAY['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'FastAPI', 'React'], 16000, 'available', ARRAY['https://davidpark.ai/projects'], 5, 6, 4.85, 9, true);

-- ============================================
-- LAUNCHES (Vibe-coded apps seeking help)
-- ============================================

INSERT INTO pv_launches (id, owner_id, title, slug, description, short_description, screenshot_urls, tech_stack, github_url, demo_url, services_needed, deal_types_accepted, budget_min, budget_max, equity_offered, timeline_days, status, views, proposals_count, published_at, created_at) VALUES
  (
    'launch-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'RecipeAI - Smart Meal Planning App',
    'recipeai-smart-meal-planning',
    E'I built RecipeAI over a weekend using Claude. It''s a meal planning app that suggests recipes based on what''s in your fridge and your dietary preferences.\n\n## What I''ve Built\n- Basic recipe suggestion algorithm\n- User authentication with Supabase\n- Simple ingredient input form\n- Recipe display with instructions\n\n## What I Need Help With\n- The UI needs polish - it works but doesn''t look professional\n- Need to add a proper database for saving favorite recipes\n- Would love to integrate with grocery delivery APIs\n- Performance optimization - it''s slow on mobile\n\n## My Vision\nI want this to be the go-to app for busy professionals who want to eat healthy without spending hours planning meals.',
    'AI-powered meal planning app that suggests recipes based on your fridge contents and dietary preferences.',
    ARRAY['https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800'],
    ARRAY['Next.js', 'React', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
    'https://github.com/sarahchen/recipeai',
    'https://recipeai-demo.vercel.app',
    ARRAY['code_cleanup', 'feature_development', 'design']::pv_service_category[],
    ARRAY['fixed', 'hourly']::pv_deal_type[],
    200000,
    500000,
    NULL,
    30,
    'open',
    342,
    3,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days'
  ),
  (
    'launch-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'InvoiceFlow - Freelancer Invoicing Tool',
    'invoiceflow-freelancer-invoicing',
    E'Built this to solve my own pain point - tracking invoices as a freelancer.\n\n## Current Features\n- Create and send invoices via email\n- Track payment status\n- Basic dashboard with revenue overview\n- PDF generation\n\n## Help Needed\n- Stripe integration for online payments\n- Recurring invoice automation\n- Better mobile experience\n- Multi-currency support\n- Client portal where clients can view their invoices\n\nLooking for a developer who can take this from MVP to a polished product. Open to equity for the right partner!',
    'Simple invoicing tool for freelancers with payment tracking and PDF generation.',
    ARRAY['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'],
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Resend', 'Puppeteer'],
    'https://github.com/marcusj/invoiceflow',
    'https://invoiceflow-demo.vercel.app',
    ARRAY['feature_development', 'deployment', 'scaling']::pv_service_category[],
    ARRAY['fixed', 'equity', 'hybrid']::pv_deal_type[],
    300000,
    800000,
    15,
    45,
    'open',
    528,
    5,
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
  ),
  (
    'launch-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'StudyBuddy - AI Tutoring Platform',
    'studybuddy-ai-tutoring',
    E'As a former teacher, I know how hard it is for students to get personalized help. StudyBuddy uses AI to provide 24/7 tutoring.\n\n## What''s Working\n- Chat interface with AI tutor\n- Math problem solving with step-by-step explanations\n- Basic quiz generation\n- Student progress tracking\n\n## What''s Missing\n- The AI sometimes gives wrong answers - needs better prompting\n- No parent/teacher dashboard\n- Can''t handle images (students want to photo their homework)\n- Need gamification to keep students engaged\n\nThis could really help kids who can''t afford private tutors!',
    'AI-powered tutoring platform providing 24/7 personalized learning assistance for students.',
    ARRAY['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'],
    ARRAY['Next.js', 'Claude API', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    NULL,
    'https://studybuddy-beta.vercel.app',
    ARRAY['feature_development', 'bug_fixes', 'testing']::pv_service_category[],
    ARRAY['fixed', 'hourly']::pv_deal_type[],
    400000,
    1000000,
    NULL,
    60,
    'open',
    412,
    4,
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '7 days'
  ),
  (
    'launch-4444-4444-4444-444444444444',
    '44444444-4444-4444-4444-444444444444',
    'PortfolioTracker - Investment Dashboard',
    'portfoliotracker-investment-dashboard',
    E'Track all your investments in one place - stocks, crypto, real estate.\n\n## Built So Far\n- Connect to brokerage accounts (basic Plaid integration)\n- Portfolio overview with charts\n- Performance tracking\n- Basic alerts for price movements\n\n## Need Help With\n- The Plaid integration breaks sometimes\n- Want to add tax-loss harvesting suggestions\n- Real-time data is expensive - need to optimize API calls\n- Mobile app would be amazing\n\nLooking for a developer who understands fintech and can help make this rock solid.',
    'All-in-one investment tracking dashboard for stocks, crypto, and real estate.',
    ARRAY['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800'],
    ARRAY['React', 'Python', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Chart.js'],
    'https://github.com/jwright/portfoliotracker',
    NULL,
    ARRAY['bug_fixes', 'feature_development', 'scaling']::pv_service_category[],
    ARRAY['hourly', 'hybrid']::pv_deal_type[],
    500000,
    1500000,
    10,
    45,
    'open',
    289,
    2,
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
  ),
  (
    'launch-5555-5555-5555-555555555555',
    '55555555-5555-5555-5555-555555555555',
    'HealthLog - Patient Symptom Tracker',
    'healthlog-patient-symptom-tracker',
    E'Helping patients track symptoms and share with their doctors.\n\n## Features Complete\n- Daily symptom logging with severity scales\n- Medication reminders\n- Export reports as PDF for doctor visits\n- Basic trend visualization\n\n## Gaps to Fill\n- HIPAA compliance review needed\n- Integration with Apple Health / Google Fit\n- Appointment scheduling\n- Secure messaging with healthcare providers\n- Better accessibility (vision impaired users)\n\nThis needs to be bulletproof before launching - healthcare data is sensitive!',
    'Patient symptom tracking app with medication reminders and doctor-shareable reports.',
    ARRAY['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'],
    ARRAY['React Native', 'Supabase', 'Node.js', 'Chart.js'],
    NULL,
    'https://healthlog-demo.vercel.app',
    ARRAY['code_cleanup', 'testing', 'deployment', 'full_launch']::pv_service_category[],
    ARRAY['fixed']::pv_deal_type[],
    800000,
    2000000,
    NULL,
    90,
    'open',
    198,
    1,
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  ),
  (
    'launch-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    'EventVibe - AI Event Planning Assistant',
    'eventvibe-ai-event-planning',
    E'Planning events is stressful. EventVibe uses AI to help with everything from venue selection to guest management.\n\n## What I''ve Got\n- AI chat for event planning advice\n- Guest list management\n- Basic budget tracking\n- Vendor recommendations\n\n## What''s Needed\n- Calendar integrations (Google, Outlook)\n- Payment splitting for group events\n- Automated reminder emails\n- Vendor booking system\n- Mobile app\n\nStarted this for my own wedding planning and realized others might find it useful!',
    'AI-powered event planning assistant for stress-free party and wedding organization.',
    ARRAY['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'],
    ARRAY['Next.js', 'OpenAI API', 'Supabase', 'Resend', 'Tailwind CSS'],
    'https://github.com/sarahchen/eventvibe',
    'https://eventvibe.vercel.app',
    ARRAY['feature_development', 'design', 'deployment']::pv_service_category[],
    ARRAY['fixed', 'equity']::pv_deal_type[],
    250000,
    600000,
    20,
    30,
    'open',
    156,
    2,
    NOW() - INTERVAL '4 days',
    NOW() - INTERVAL '4 days'
  );

-- ============================================
-- PROPOSALS (Sample developer proposals)
-- ============================================

INSERT INTO pv_proposals (id, launch_id, developer_id, cover_letter, deal_type, fixed_price, hourly_rate, estimated_hours, timeline_days, milestones, status, created_at) VALUES
  (
    'prop-1111-1111-1111-111111111111',
    'launch-1111-1111-1111-111111111111',
    'dev-3333-3333-3333-333333333333',
    E'Hi Sarah!\n\nI love what you''ve built with RecipeAI - it''s exactly the kind of app I enjoy working on. As a frontend specialist, I can help transform your UI into something that looks as good as it works.\n\nHere''s my approach:\n1. Audit the current UI and create a polished design system\n2. Implement responsive layouts that work beautifully on mobile\n3. Add micro-interactions with Framer Motion for a premium feel\n4. Optimize performance with lazy loading and image optimization\n\nI''ve worked on similar food-tech apps before and understand the importance of appetizing visuals!\n\nLooking forward to discussing this further.',
    'fixed',
    350000,
    NULL,
    NULL,
    21,
    '[{"title": "Design System & Audit", "description": "Create component library and style guide", "amount": 100000, "due_days": 7}, {"title": "Core UI Overhaul", "description": "Redesign main screens with new design system", "amount": 150000, "due_days": 14}, {"title": "Polish & Optimization", "description": "Add animations, optimize performance", "amount": 100000, "due_days": 21}]',
    'pending',
    NOW() - INTERVAL '4 days'
  ),
  (
    'prop-2222-2222-2222-222222222222',
    'launch-2222-2222-2222-222222222222',
    'dev-1111-1111-1111-111111111111',
    E'Hey Marcus,\n\nInvoiceFlow looks promising! I''ve built payment systems before and know exactly what it takes to make them production-ready.\n\nI can help with:\n- Rock-solid Stripe integration with webhooks\n- Recurring billing automation\n- Multi-currency support using live exchange rates\n- Client portal with secure invoice viewing\n\nI''m particularly interested in the equity component - I believe in this product and would love to be a technical partner.\n\nMy proposal: $5,000 upfront + 8% equity. I''ll commit to ongoing maintenance for 6 months post-launch.\n\nLet''s chat!',
    'hybrid',
    500000,
    NULL,
    NULL,
    35,
    '[{"title": "Stripe Integration", "description": "Complete payment processing setup", "amount": 200000, "due_days": 10}, {"title": "Recurring & Multi-currency", "description": "Automation and currency support", "amount": 150000, "due_days": 25}, {"title": "Client Portal", "description": "Build and launch client-facing features", "amount": 150000, "due_days": 35}]',
    'pending',
    NOW() - INTERVAL '2 days'
  ),
  (
    'prop-3333-3333-3333-333333333333',
    'launch-3333-3333-3333-333333333333',
    'dev-6666-6666-6666-666666666666',
    E'Elena,\n\nAs an AI/ML engineer, I''m excited about StudyBuddy''s potential. The wrong answer problem is common with AI tutors, but very solvable.\n\nHere''s how I''d approach this:\n\n1. **Better Prompting**: Implement chain-of-thought reasoning and answer verification\n2. **Image Support**: Add vision capabilities using GPT-4V or Claude\n3. **Gamification**: Points, streaks, achievements - I''ve done this before\n4. **Parent Dashboard**: Real-time progress tracking\n\nI''ve worked on EdTech AI before and understand the unique challenges.\n\nRate: $160/hr, estimated 50-60 hours total.\n\nThis could genuinely help students!',
    'hourly',
    NULL,
    16000,
    55,
    45,
    '[]',
    'pending',
    NOW() - INTERVAL '5 days'
  );

-- ============================================
-- SUCCESS STORIES (Completed projects)
-- ============================================

INSERT INTO pv_success_stories (id, launch_id, developer_id, title, description, metrics, featured, published, created_at) VALUES
  (
    'story-1111-1111-1111-111111111111',
    'launch-1111-1111-1111-111111111111',
    'dev-3333-3333-3333-333333333333',
    'From Weekend Project to 10K Users',
    'Sarah''s RecipeAI went from a rough prototype to a polished app that now serves over 10,000 monthly active users. The redesign increased user engagement by 340% and reduced bounce rate by 60%.',
    '{"users": 10000, "engagement_increase": "340%", "bounce_reduction": "60%", "timeline": "3 weeks"}',
    true,
    true,
    NOW() - INTERVAL '30 days'
  );

-- ============================================
-- REVIEWS (Sample reviews)
-- ============================================

-- Note: These would normally be created after project completion
-- Adding a few to show the review system

INSERT INTO pv_reviews (id, launch_id, proposal_id, reviewer_id, reviewee_id, rating, comment, created_at) VALUES
  (
    'review-1111-1111-1111-111111111111',
    'launch-1111-1111-1111-111111111111',
    'prop-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'cccc3333-cccc-cccc-cccc-cccccccccccc',
    5,
    'Nina was absolutely amazing! She transformed my rough prototype into a beautiful, professional app. Communication was great throughout the project. Highly recommend!',
    NOW() - INTERVAL '25 days'
  );

-- Update the developer stats based on the review
UPDATE pv_developer_profiles
SET rating = 5.00, reviews_count = reviews_count + 1
WHERE id = 'dev-3333-3333-3333-333333333333';

-- ============================================
-- NOTIFICATIONS (Sample notifications)
-- ============================================

INSERT INTO pv_notifications (user_id, type, title, body, link, read, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'new_proposal', 'New proposal received!', 'Nina Kowalski submitted a proposal for RecipeAI', '/dashboard/launches/launch-1111-1111-1111-111111111111', false, NOW() - INTERVAL '4 days'),
  ('22222222-2222-2222-2222-222222222222', 'new_proposal', 'New proposal received!', 'Alex Kim submitted a proposal for InvoiceFlow', '/dashboard/launches/launch-2222-2222-2222-222222222222', false, NOW() - INTERVAL '2 days'),
  ('33333333-3333-3333-3333-333333333333', 'new_proposal', 'New proposal received!', 'David Park submitted a proposal for StudyBuddy', '/dashboard/launches/launch-3333-3333-3333-333333333333', true, NOW() - INTERVAL '5 days');

-- ============================================
-- SAVED ITEMS (Bookmarks)
-- ============================================

INSERT INTO pv_saved_launches (user_id, launch_id) VALUES
  ('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'launch-2222-2222-2222-222222222222'),
  ('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'launch-4444-4444-4444-444444444444'),
  ('bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'launch-5555-5555-5555-555555555555');

INSERT INTO pv_saved_developers (user_id, developer_id) VALUES
  ('11111111-1111-1111-1111-111111111111', 'dev-1111-1111-1111-111111111111'),
  ('22222222-2222-2222-2222-222222222222', 'dev-3333-3333-3333-333333333333'),
  ('33333333-3333-3333-3333-333333333333', 'dev-6666-6666-6666-666666666666');

-- Done! Your Propel Vibes marketplace is now populated with sample data.
