-- Propel Vibes Database Schema
-- Marketplace for vibe-coded apps connecting creators with developers

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('vibe_coder', 'developer', 'both', 'admin');
CREATE TYPE launch_status AS ENUM ('draft', 'open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE deal_type AS ENUM ('fixed', 'hourly', 'equity', 'hybrid');
CREATE TYPE service_category AS ENUM (
  'code_cleanup',
  'feature_development',
  'bug_fixes',
  'deployment',
  'design',
  'testing',
  'scaling',
  'full_launch'
);
CREATE TYPE availability_status AS ENUM ('available', 'busy', 'unavailable');
CREATE TYPE proposal_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn', 'completed');
CREATE TYPE message_type AS ENUM ('text', 'proposal', 'system');

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'vibe_coder',
  bio TEXT,
  location TEXT,
  website_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- DEVELOPER PROFILES (additional info for developers)
-- ============================================

CREATE TABLE developer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate INTEGER, -- in cents
  availability availability_status NOT NULL DEFAULT 'available',
  portfolio_urls TEXT[] DEFAULT '{}',
  years_experience INTEGER DEFAULT 0,
  launches_completed INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  reviews_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT FALSE,
  stripe_account_id TEXT, -- For payouts
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- LAUNCHES (vibe-coded apps seeking help)
-- ============================================

CREATE TABLE launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  screenshot_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  services_needed service_category[] NOT NULL DEFAULT '{}',
  deal_types_accepted deal_type[] NOT NULL DEFAULT '{fixed}',
  budget_min INTEGER, -- in cents
  budget_max INTEGER, -- in cents
  equity_offered INTEGER, -- percentage (0-100)
  timeline_days INTEGER,
  status launch_status NOT NULL DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  proposals_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PROPOSALS (developer bids on launches)
-- ============================================

CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES developer_profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  deal_type deal_type NOT NULL,
  fixed_price INTEGER, -- in cents
  hourly_rate INTEGER, -- in cents
  estimated_hours INTEGER,
  equity_ask INTEGER, -- percentage (0-100)
  timeline_days INTEGER NOT NULL,
  milestones JSONB DEFAULT '[]',
  status proposal_status NOT NULL DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(launch_id, developer_id)
);

-- ============================================
-- CONVERSATIONS (messaging between users)
-- ============================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID REFERENCES launches(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  participant_ids UUID[] NOT NULL,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type NOT NULL DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REVIEWS (after project completion)
-- ============================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(proposal_id, reviewer_id)
);

-- ============================================
-- SUCCESS STORIES (featured case studies)
-- ============================================

CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES developer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  before_screenshot_url TEXT,
  after_screenshot_url TEXT,
  metrics JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SAVED ITEMS (bookmarks)
-- ============================================

CREATE TABLE saved_launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, launch_id)
);

CREATE TABLE saved_developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES developer_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, developer_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_developer_profiles_user_id ON developer_profiles(user_id);
CREATE INDEX idx_developer_profiles_availability ON developer_profiles(availability);
CREATE INDEX idx_developer_profiles_verified ON developer_profiles(verified);
CREATE INDEX idx_developer_profiles_rating ON developer_profiles(rating DESC);

CREATE INDEX idx_launches_owner_id ON launches(owner_id);
CREATE INDEX idx_launches_status ON launches(status);
CREATE INDEX idx_launches_slug ON launches(slug);
CREATE INDEX idx_launches_created_at ON launches(created_at DESC);
CREATE INDEX idx_launches_services ON launches USING GIN(services_needed);
CREATE INDEX idx_launches_deal_types ON launches USING GIN(deal_types_accepted);
CREATE INDEX idx_launches_tech_stack ON launches USING GIN(tech_stack);

CREATE INDEX idx_proposals_launch_id ON proposals(launch_id);
CREATE INDEX idx_proposals_developer_id ON proposals(developer_id);
CREATE INDEX idx_proposals_status ON proposals(status);

CREATE INDEX idx_conversations_participants ON conversations USING GIN(participant_ids);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

CREATE INDEX idx_reviews_launch_id ON reviews(launch_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER developer_profiles_updated_at BEFORE UPDATE ON developer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER launches_updated_at BEFORE UPDATE ON launches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Update developer stats when review is added
CREATE OR REPLACE FUNCTION update_developer_stats()
RETURNS TRIGGER AS $$
DECLARE
  dev_id UUID;
  avg_rating DECIMAL(3,2);
  total_reviews INTEGER;
BEGIN
  -- Get developer profile id from reviewee
  SELECT dp.id INTO dev_id FROM developer_profiles dp WHERE dp.user_id = NEW.reviewee_id;

  IF dev_id IS NOT NULL THEN
    -- Calculate new average rating and count
    SELECT AVG(r.rating)::DECIMAL(3,2), COUNT(*)
    INTO avg_rating, total_reviews
    FROM reviews r
    JOIN proposals p ON r.proposal_id = p.id
    WHERE p.developer_id = dev_id;

    -- Update developer profile
    UPDATE developer_profiles
    SET rating = COALESCE(avg_rating, 0),
        reviews_count = COALESCE(total_reviews, 0)
    WHERE id = dev_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_developer_stats_on_review
AFTER INSERT ON reviews
FOR EACH ROW EXECUTE FUNCTION update_developer_stats();

-- Update launch proposal count
CREATE OR REPLACE FUNCTION update_launch_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE launches SET proposals_count = proposals_count + 1 WHERE id = NEW.launch_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE launches SET proposals_count = proposals_count - 1 WHERE id = OLD.launch_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_launch_proposal_count_trigger
AFTER INSERT OR DELETE ON proposals
FOR EACH ROW EXECUTE FUNCTION update_launch_proposal_count();

-- Update conversation last_message_at
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations SET last_message_at = NEW.created_at WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_last_message_trigger
AFTER INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner write
CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Developer profiles: Public read, owner write
CREATE POLICY "Developer profiles are publicly readable" ON developer_profiles FOR SELECT USING (true);
CREATE POLICY "Developers can update own profile" ON developer_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Developers can insert own profile" ON developer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Launches: Public read for open/completed, owner write
CREATE POLICY "Open launches are publicly readable" ON launches FOR SELECT USING (status IN ('open', 'in_progress', 'completed') OR auth.uid() = owner_id);
CREATE POLICY "Owners can update own launches" ON launches FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can create launches" ON launches FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can delete own launches" ON launches FOR DELETE USING (auth.uid() = owner_id);

-- Proposals: Launch owner and developer can read
CREATE POLICY "Proposals visible to participants" ON proposals FOR SELECT USING (
  auth.uid() IN (
    SELECT owner_id FROM launches WHERE id = launch_id
    UNION
    SELECT user_id FROM developer_profiles WHERE id = developer_id
  )
);
CREATE POLICY "Developers can create proposals" ON proposals FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM developer_profiles WHERE id = developer_id)
);
CREATE POLICY "Participants can update proposals" ON proposals FOR UPDATE USING (
  auth.uid() IN (
    SELECT owner_id FROM launches WHERE id = launch_id
    UNION
    SELECT user_id FROM developer_profiles WHERE id = developer_id
  )
);

-- Conversations: Only participants
CREATE POLICY "Conversations visible to participants" ON conversations FOR SELECT USING (auth.uid() = ANY(participant_ids));
CREATE POLICY "Participants can create conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = ANY(participant_ids));

-- Messages: Only conversation participants
CREATE POLICY "Messages visible to conversation participants" ON messages FOR SELECT USING (
  auth.uid() IN (SELECT UNNEST(participant_ids) FROM conversations WHERE id = conversation_id)
);
CREATE POLICY "Participants can send messages" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  auth.uid() IN (SELECT UNNEST(participant_ids) FROM conversations WHERE id = conversation_id)
);

-- Reviews: Public read, participants write
CREATE POLICY "Reviews are publicly readable" ON reviews FOR SELECT USING (true);
CREATE POLICY "Participants can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Notifications: Only owner
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Saved items: Only owner
CREATE POLICY "Users can manage saved launches" ON saved_launches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage saved developers" ON saved_developers FOR ALL USING (auth.uid() = user_id);

-- Success stories: Public read for published
CREATE POLICY "Published success stories are public" ON success_stories FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage success stories" ON success_stories FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- ============================================
-- FUNCTIONS FOR COMMON QUERIES
-- ============================================

-- Get launch with owner profile
CREATE OR REPLACE FUNCTION get_launch_with_owner(launch_slug TEXT)
RETURNS TABLE (
  launch launches,
  owner profiles
) AS $$
BEGIN
  RETURN QUERY
  SELECT l.*, p.*
  FROM launches l
  JOIN profiles p ON l.owner_id = p.id
  WHERE l.slug = launch_slug;
END;
$$ LANGUAGE plpgsql;

-- Increment launch views
CREATE OR REPLACE FUNCTION increment_launch_views(launch_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE launches SET views = views + 1 WHERE id = launch_id;
END;
$$ LANGUAGE plpgsql;
