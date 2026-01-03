-- Propel Vibes Database Schema
-- Marketplace for vibe-coded apps connecting creators with developers
--
-- MIGRATION STRATEGY:
-- - Uses 'pv_' prefix for all Propel Vibes tables
-- - Self-contained profiles table for dev (will link to shared user_profiles later)
-- - Designed for easy migration to unified auth system
--
-- TO MIGRATE TO UNIFIED SUPABASE LATER:
-- 1. Link pv_profiles.user_id to shared user_profiles.id
-- 2. Use ops_suite_organizations for company/team features
-- 3. Feature flags already work with shared feature_flags table

-- ============================================
-- ENUMS (prefixed to avoid conflicts)
-- ============================================

CREATE TYPE pv_user_role AS ENUM ('vibe_coder', 'developer', 'both', 'admin');
CREATE TYPE pv_launch_status AS ENUM ('draft', 'open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE pv_deal_type AS ENUM ('fixed', 'hourly', 'equity', 'hybrid');
CREATE TYPE pv_service_category AS ENUM (
  'code_cleanup',
  'feature_development',
  'bug_fixes',
  'deployment',
  'design',
  'testing',
  'scaling',
  'full_launch'
);
CREATE TYPE pv_availability_status AS ENUM ('available', 'busy', 'unavailable');
CREATE TYPE pv_proposal_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn', 'completed');
CREATE TYPE pv_message_type AS ENUM ('text', 'proposal', 'system');

-- ============================================
-- PROFILES (self-contained for dev, will link to shared auth later)
-- ============================================

CREATE TABLE pv_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE, -- Will link to auth.users or shared user_profiles later
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role pv_user_role NOT NULL DEFAULT 'vibe_coder',
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

CREATE TABLE pv_developer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES pv_profiles(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate INTEGER, -- in cents
  availability pv_availability_status NOT NULL DEFAULT 'available',
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

CREATE TABLE pv_launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  screenshot_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  services_needed pv_service_category[] NOT NULL DEFAULT '{}',
  deal_types_accepted pv_deal_type[] NOT NULL DEFAULT '{fixed}',
  budget_min INTEGER, -- in cents
  budget_max INTEGER, -- in cents
  equity_offered INTEGER, -- percentage (0-100)
  timeline_days INTEGER,
  status pv_launch_status NOT NULL DEFAULT 'draft',
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

CREATE TABLE pv_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES pv_launches(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES pv_developer_profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  deal_type pv_deal_type NOT NULL,
  fixed_price INTEGER, -- in cents
  hourly_rate INTEGER, -- in cents
  estimated_hours INTEGER,
  equity_ask INTEGER, -- percentage (0-100)
  timeline_days INTEGER NOT NULL,
  milestones JSONB DEFAULT '[]',
  status pv_proposal_status NOT NULL DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(launch_id, developer_id)
);

-- ============================================
-- CONVERSATIONS (messaging between users)
-- ============================================

CREATE TABLE pv_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID REFERENCES pv_launches(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES pv_proposals(id) ON DELETE SET NULL,
  participant_ids UUID[] NOT NULL,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pv_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES pv_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type pv_message_type NOT NULL DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REVIEWS (after project completion)
-- ============================================

CREATE TABLE pv_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES pv_launches(id) ON DELETE CASCADE,
  proposal_id UUID NOT NULL REFERENCES pv_proposals(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(proposal_id, reviewer_id)
);

-- ============================================
-- SUCCESS STORIES (featured case studies)
-- ============================================

CREATE TABLE pv_success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_id UUID NOT NULL REFERENCES pv_launches(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES pv_developer_profiles(id) ON DELETE CASCADE,
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

CREATE TABLE pv_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
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

CREATE TABLE pv_saved_launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  launch_id UUID NOT NULL REFERENCES pv_launches(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, launch_id)
);

CREATE TABLE pv_saved_developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES pv_profiles(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES pv_developer_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, developer_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_pv_profiles_role ON pv_profiles(role);
CREATE INDEX idx_pv_profiles_email ON pv_profiles(email);
CREATE INDEX idx_pv_profiles_user_id ON pv_profiles(user_id);

CREATE INDEX idx_pv_developer_profiles_profile_id ON pv_developer_profiles(profile_id);
CREATE INDEX idx_pv_developer_profiles_availability ON pv_developer_profiles(availability);
CREATE INDEX idx_pv_developer_profiles_verified ON pv_developer_profiles(verified);
CREATE INDEX idx_pv_developer_profiles_rating ON pv_developer_profiles(rating DESC);

CREATE INDEX idx_pv_launches_owner_id ON pv_launches(owner_id);
CREATE INDEX idx_pv_launches_status ON pv_launches(status);
CREATE INDEX idx_pv_launches_slug ON pv_launches(slug);
CREATE INDEX idx_pv_launches_created_at ON pv_launches(created_at DESC);
CREATE INDEX idx_pv_launches_services ON pv_launches USING GIN(services_needed);
CREATE INDEX idx_pv_launches_deal_types ON pv_launches USING GIN(deal_types_accepted);
CREATE INDEX idx_pv_launches_tech_stack ON pv_launches USING GIN(tech_stack);

CREATE INDEX idx_pv_proposals_launch_id ON pv_proposals(launch_id);
CREATE INDEX idx_pv_proposals_developer_id ON pv_proposals(developer_id);
CREATE INDEX idx_pv_proposals_status ON pv_proposals(status);

CREATE INDEX idx_pv_conversations_participants ON pv_conversations USING GIN(participant_ids);
CREATE INDEX idx_pv_messages_conversation_id ON pv_messages(conversation_id);
CREATE INDEX idx_pv_messages_created_at ON pv_messages(created_at DESC);

CREATE INDEX idx_pv_reviews_launch_id ON pv_reviews(launch_id);
CREATE INDEX idx_pv_reviews_reviewee_id ON pv_reviews(reviewee_id);

CREATE INDEX idx_pv_notifications_user_id ON pv_notifications(user_id);
CREATE INDEX idx_pv_notifications_read ON pv_notifications(read);
CREATE INDEX idx_pv_notifications_created_at ON pv_notifications(created_at DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at trigger function (may already exist in shared DB)
CREATE OR REPLACE FUNCTION pv_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER pv_profiles_updated_at BEFORE UPDATE ON pv_profiles FOR EACH ROW EXECUTE FUNCTION pv_update_updated_at();
CREATE TRIGGER pv_developer_profiles_updated_at BEFORE UPDATE ON pv_developer_profiles FOR EACH ROW EXECUTE FUNCTION pv_update_updated_at();
CREATE TRIGGER pv_launches_updated_at BEFORE UPDATE ON pv_launches FOR EACH ROW EXECUTE FUNCTION pv_update_updated_at();
CREATE TRIGGER pv_proposals_updated_at BEFORE UPDATE ON pv_proposals FOR EACH ROW EXECUTE FUNCTION pv_update_updated_at();
CREATE TRIGGER pv_conversations_updated_at BEFORE UPDATE ON pv_conversations FOR EACH ROW EXECUTE FUNCTION pv_update_updated_at();

-- Update developer stats when review is added
CREATE OR REPLACE FUNCTION pv_update_developer_stats()
RETURNS TRIGGER AS $$
DECLARE
  dev_profile_id UUID;
  avg_rating DECIMAL(3,2);
  total_reviews INTEGER;
BEGIN
  -- Get developer profile id from reviewee
  SELECT dp.id INTO dev_profile_id
  FROM pv_developer_profiles dp
  JOIN pv_profiles p ON dp.profile_id = p.id
  WHERE p.id = NEW.reviewee_id;

  IF dev_profile_id IS NOT NULL THEN
    -- Calculate new average rating and count
    SELECT AVG(r.rating)::DECIMAL(3,2), COUNT(*)
    INTO avg_rating, total_reviews
    FROM pv_reviews r
    JOIN pv_proposals p ON r.proposal_id = p.id
    WHERE p.developer_id = dev_profile_id;

    -- Update developer profile
    UPDATE pv_developer_profiles
    SET rating = COALESCE(avg_rating, 0),
        reviews_count = COALESCE(total_reviews, 0)
    WHERE id = dev_profile_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pv_update_developer_stats_on_review
AFTER INSERT ON pv_reviews
FOR EACH ROW EXECUTE FUNCTION pv_update_developer_stats();

-- Update launch proposal count
CREATE OR REPLACE FUNCTION pv_update_launch_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE pv_launches SET proposals_count = proposals_count + 1 WHERE id = NEW.launch_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE pv_launches SET proposals_count = proposals_count - 1 WHERE id = OLD.launch_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pv_update_launch_proposal_count_trigger
AFTER INSERT OR DELETE ON pv_proposals
FOR EACH ROW EXECUTE FUNCTION pv_update_launch_proposal_count();

-- Update conversation last_message_at
CREATE OR REPLACE FUNCTION pv_update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pv_conversations SET last_message_at = NEW.created_at WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pv_update_conversation_last_message_trigger
AFTER INSERT ON pv_messages
FOR EACH ROW EXECUTE FUNCTION pv_update_conversation_last_message();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE pv_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_saved_launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_saved_developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pv_success_stories ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner write
CREATE POLICY "pv_profiles_select" ON pv_profiles FOR SELECT USING (true);
CREATE POLICY "pv_profiles_update" ON pv_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "pv_profiles_insert" ON pv_profiles FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Developer profiles: Public read, owner write
CREATE POLICY "pv_developer_profiles_select" ON pv_developer_profiles FOR SELECT USING (true);
CREATE POLICY "pv_developer_profiles_update" ON pv_developer_profiles FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = profile_id)
);
CREATE POLICY "pv_developer_profiles_insert" ON pv_developer_profiles FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = profile_id)
);

-- Launches: Public read for open/completed, owner write
CREATE POLICY "pv_launches_select" ON pv_launches FOR SELECT USING (
  status IN ('open', 'in_progress', 'completed') OR
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = owner_id)
);
CREATE POLICY "pv_launches_update" ON pv_launches FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = owner_id)
);
CREATE POLICY "pv_launches_insert" ON pv_launches FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = owner_id)
);
CREATE POLICY "pv_launches_delete" ON pv_launches FOR DELETE USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = owner_id)
);

-- Proposals: Launch owner and developer can read
CREATE POLICY "pv_proposals_select" ON pv_proposals FOR SELECT USING (
  auth.uid() IN (
    SELECT p.user_id FROM pv_profiles p JOIN pv_launches l ON l.owner_id = p.id WHERE l.id = launch_id
    UNION
    SELECT p.user_id FROM pv_profiles p JOIN pv_developer_profiles dp ON dp.profile_id = p.id WHERE dp.id = developer_id
  )
);
CREATE POLICY "pv_proposals_insert" ON pv_proposals FOR INSERT WITH CHECK (
  auth.uid() IN (
    SELECT p.user_id FROM pv_profiles p JOIN pv_developer_profiles dp ON dp.profile_id = p.id WHERE dp.id = developer_id
  )
);
CREATE POLICY "pv_proposals_update" ON pv_proposals FOR UPDATE USING (
  auth.uid() IN (
    SELECT p.user_id FROM pv_profiles p JOIN pv_launches l ON l.owner_id = p.id WHERE l.id = launch_id
    UNION
    SELECT p.user_id FROM pv_profiles p JOIN pv_developer_profiles dp ON dp.profile_id = p.id WHERE dp.id = developer_id
  )
);

-- Conversations: Only participants
CREATE POLICY "pv_conversations_select" ON pv_conversations FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = ANY(participant_ids))
);
CREATE POLICY "pv_conversations_insert" ON pv_conversations FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = ANY(participant_ids))
);

-- Messages: Only conversation participants
CREATE POLICY "pv_messages_select" ON pv_messages FOR SELECT USING (
  auth.uid() IN (
    SELECT p.user_id FROM pv_profiles p
    JOIN pv_conversations c ON p.id = ANY(c.participant_ids)
    WHERE c.id = conversation_id
  )
);
CREATE POLICY "pv_messages_insert" ON pv_messages FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = sender_id) AND
  auth.uid() IN (
    SELECT p.user_id FROM pv_profiles p
    JOIN pv_conversations c ON p.id = ANY(c.participant_ids)
    WHERE c.id = conversation_id
  )
);

-- Reviews: Public read, participants write
CREATE POLICY "pv_reviews_select" ON pv_reviews FOR SELECT USING (true);
CREATE POLICY "pv_reviews_insert" ON pv_reviews FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = reviewer_id)
);

-- Notifications: Only owner
CREATE POLICY "pv_notifications_select" ON pv_notifications FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = user_id)
);
CREATE POLICY "pv_notifications_insert" ON pv_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "pv_notifications_update" ON pv_notifications FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = user_id)
);

-- Saved items: Only owner
CREATE POLICY "pv_saved_launches_all" ON pv_saved_launches FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = user_id)
);
CREATE POLICY "pv_saved_developers_all" ON pv_saved_developers FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE id = user_id)
);

-- Success stories: Public read for published
CREATE POLICY "pv_success_stories_select" ON pv_success_stories FOR SELECT USING (published = true);
CREATE POLICY "pv_success_stories_admin" ON pv_success_stories FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM pv_profiles WHERE role = 'admin')
);

-- ============================================
-- FUNCTIONS FOR COMMON QUERIES
-- ============================================

-- Increment launch views
CREATE OR REPLACE FUNCTION pv_increment_launch_views(p_launch_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE pv_launches SET views = views + 1 WHERE id = p_launch_id;
END;
$$ LANGUAGE plpgsql;

-- Get or create profile from auth user
CREATE OR REPLACE FUNCTION pv_get_or_create_profile(
  p_user_id UUID,
  p_email TEXT,
  p_name TEXT DEFAULT 'User',
  p_avatar_url TEXT DEFAULT NULL,
  p_role pv_user_role DEFAULT 'vibe_coder'
)
RETURNS pv_profiles AS $$
DECLARE
  v_profile pv_profiles;
BEGIN
  -- Try to find existing profile
  SELECT * INTO v_profile FROM pv_profiles WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    -- Create new profile
    INSERT INTO pv_profiles (user_id, email, name, avatar_url, role)
    VALUES (p_user_id, p_email, p_name, p_avatar_url, p_role)
    RETURNING * INTO v_profile;
  END IF;

  RETURN v_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- MIGRATION HELPER VIEW (for future unified auth)
-- ============================================

-- This view will help migrate to shared auth
-- When moving to unified Supabase, update this view to join with shared tables
CREATE OR REPLACE VIEW pv_profiles_with_auth AS
SELECT
  p.*,
  p.user_id as auth_user_id  -- Will map to auth.users.id or shared user_profiles.id
FROM pv_profiles p;

COMMENT ON VIEW pv_profiles_with_auth IS
'View for profile data. Update this to join with shared user_profiles when migrating to unified auth.';
