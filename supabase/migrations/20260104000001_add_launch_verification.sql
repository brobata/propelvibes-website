-- Add verification and approval fields to pv_launches
-- This enables manual approval workflow for quality control

-- Add new columns for verification
ALTER TABLE pv_launches
ADD COLUMN IF NOT EXISTS verification_code TEXT,
ADD COLUMN IF NOT EXISTS verification_photo_url TEXT,
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES pv_profiles(id),
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- Update existing status enum to include pending_review
-- First drop the constraint if it exists
ALTER TABLE pv_launches DROP CONSTRAINT IF EXISTS pv_launches_status_check;

-- Add new constraint with updated values
ALTER TABLE pv_launches ADD CONSTRAINT pv_launches_status_check
CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'open', 'in_progress', 'completed', 'cancelled'));

-- Set existing launches to approved (grandfathered in)
UPDATE pv_launches SET approval_status = 'approved' WHERE approval_status IS NULL;

-- Create index for admin queue queries
CREATE INDEX IF NOT EXISTS idx_pv_launches_approval_status ON pv_launches(approval_status);
CREATE INDEX IF NOT EXISTS idx_pv_launches_pending ON pv_launches(approval_status) WHERE approval_status = 'pending';

-- Function to generate verification codes
CREATE OR REPLACE FUNCTION generate_verification_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := 'PV-';
  i INTEGER;
BEGIN
  FOR i IN 1..4 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate verification code on insert
CREATE OR REPLACE FUNCTION set_verification_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_code IS NULL THEN
    NEW.verification_code := generate_verification_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_verification_code ON pv_launches;
CREATE TRIGGER trigger_set_verification_code
  BEFORE INSERT ON pv_launches
  FOR EACH ROW
  EXECUTE FUNCTION set_verification_code();

-- Add is_admin flag to profiles
ALTER TABLE pv_profiles
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- RLS policy for admin access
CREATE POLICY "Admins can view all launches" ON pv_launches
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pv_profiles
      WHERE pv_profiles.id = auth.uid()
      AND pv_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update launches" ON pv_launches
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM pv_profiles
      WHERE pv_profiles.id = auth.uid()
      AND pv_profiles.is_admin = true
    )
  );

-- Update marketplace query to only show approved launches (update existing policy)
DROP POLICY IF EXISTS "Anyone can view published launches" ON pv_launches;
CREATE POLICY "Anyone can view approved launches" ON pv_launches
  FOR SELECT
  USING (approval_status = 'approved' OR owner_id = auth.uid());

COMMENT ON COLUMN pv_launches.verification_code IS 'Auto-generated code (e.g., PV-7X3K) that user must show in verification photo';
COMMENT ON COLUMN pv_launches.verification_photo_url IS 'Photo showing app running with handwritten verification code on paper';
COMMENT ON COLUMN pv_launches.approval_status IS 'pending = awaiting review, approved = visible on marketplace, rejected = needs fixes';
