// Database types matching Supabase schema

export type UserRole = "vibe_coder" | "developer" | "both" | "admin";
export type LaunchStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled";
export type DealType = "fixed" | "hourly" | "equity" | "hybrid";
export type ServiceCategory =
  | "code_cleanup"
  | "feature_development"
  | "bug_fixes"
  | "deployment"
  | "design"
  | "testing"
  | "scaling"
  | "full_launch";
export type AvailabilityStatus = "available" | "busy" | "unavailable";
export type ProposalStatus = "pending" | "accepted" | "rejected" | "withdrawn" | "completed";
export type MessageType = "text" | "proposal" | "system";

// Profile (extends auth.users)
export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  created_at: string;
  updated_at: string;
}

// Developer Profile (additional info for developers)
export interface DeveloperProfile {
  id: string;
  user_id: string;
  headline: string;
  skills: string[];
  hourly_rate: number | null; // in cents
  availability: AvailabilityStatus;
  portfolio_urls: string[];
  years_experience: number;
  launches_completed: number;
  rating: number;
  reviews_count: number;
  verified: boolean;
  verified_at: string | null;
  featured: boolean;
  stripe_account_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  user?: Profile;
}

// Launch (vibe-coded app seeking help)
export interface Launch {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  screenshot_urls: string[];
  video_url: string | null;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  services_needed: ServiceCategory[];
  deal_types_accepted: DealType[];
  budget_min: number | null; // in cents
  budget_max: number | null; // in cents
  equity_offered: number | null; // percentage
  timeline_days: number | null;
  status: LaunchStatus;
  views: number;
  proposals_count: number;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  owner?: Profile;
}

// Proposal (developer bid on launch)
export interface Proposal {
  id: string;
  launch_id: string;
  developer_id: string;
  cover_letter: string;
  deal_type: DealType;
  fixed_price: number | null; // in cents
  hourly_rate: number | null; // in cents
  estimated_hours: number | null;
  equity_ask: number | null; // percentage
  timeline_days: number;
  milestones: Milestone[];
  status: ProposalStatus;
  accepted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  launch?: Launch;
  developer?: DeveloperProfile;
}

export interface Milestone {
  title: string;
  description: string;
  amount: number; // in cents (for fixed/hourly) or percentage (for equity)
  due_days: number;
}

// Conversation
export interface Conversation {
  id: string;
  launch_id: string | null;
  proposal_id: string | null;
  participant_ids: string[];
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  launch?: Launch;
  proposal?: Proposal;
  participants?: Profile[];
  messages?: Message[];
}

// Message
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  metadata: Record<string, unknown>;
  read_by: string[];
  created_at: string;
  // Joined
  sender?: Profile;
}

// Review
export interface Review {
  id: string;
  launch_id: string;
  proposal_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  // Joined
  reviewer?: Profile;
  reviewee?: Profile;
  launch?: Launch;
}

// Success Story
export interface SuccessStory {
  id: string;
  launch_id: string;
  developer_id: string;
  title: string;
  description: string;
  before_screenshot_url: string | null;
  after_screenshot_url: string | null;
  metrics: {
    users_gained?: number;
    revenue_generated?: number;
    time_saved?: string;
    [key: string]: unknown;
  };
  featured: boolean;
  published: boolean;
  created_at: string;
  // Joined
  launch?: Launch;
  developer?: DeveloperProfile;
}

// Notification
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  read_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Saved items
export interface SavedLaunch {
  id: string;
  user_id: string;
  launch_id: string;
  created_at: string;
  launch?: Launch;
}

export interface SavedDeveloper {
  id: string;
  user_id: string;
  developer_id: string;
  created_at: string;
  developer?: DeveloperProfile;
}

// Feature Flags (from Command Center)
export interface FeatureFlag {
  id: string;
  key: string;
  enabled: boolean;
  description: string | null;
  scope: "global" | "app" | "user" | "organization";
  target_app_id: string | null;
  target_organization_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;
      };
      developer_profiles: {
        Row: DeveloperProfile;
        Insert: Omit<DeveloperProfile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DeveloperProfile, "id" | "created_at" | "updated_at">>;
      };
      launches: {
        Row: Launch;
        Insert: Omit<Launch, "id" | "created_at" | "updated_at" | "views" | "proposals_count">;
        Update: Partial<Omit<Launch, "id" | "created_at" | "updated_at">>;
      };
      proposals: {
        Row: Proposal;
        Insert: Omit<Proposal, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Proposal, "id" | "created_at" | "updated_at">>;
      };
      conversations: {
        Row: Conversation;
        Insert: Omit<Conversation, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Conversation, "id" | "created_at" | "updated_at">>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at">;
        Update: Partial<Omit<Message, "id" | "created_at">>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at">;
        Update: never;
      };
      success_stories: {
        Row: SuccessStory;
        Insert: Omit<SuccessStory, "id" | "created_at">;
        Update: Partial<Omit<SuccessStory, "id" | "created_at">>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, "id" | "created_at">;
        Update: Partial<Omit<Notification, "id" | "created_at">>;
      };
      saved_launches: {
        Row: SavedLaunch;
        Insert: Omit<SavedLaunch, "id" | "created_at">;
        Update: never;
      };
      saved_developers: {
        Row: SavedDeveloper;
        Insert: Omit<SavedDeveloper, "id" | "created_at">;
        Update: never;
      };
    };
  };
}

// Filter types for queries
export interface LaunchFilters {
  search?: string;
  services?: ServiceCategory[];
  deal_types?: DealType[];
  budget_min?: number;
  budget_max?: number;
  tech_stack?: string[];
  status?: LaunchStatus;
}

export interface DeveloperFilters {
  search?: string;
  skills?: string[];
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  availability?: AvailabilityStatus;
  min_rating?: number;
  verified_only?: boolean;
}

// Platform stats for homepage
export interface PlatformStats {
  total_launches: number;
  total_developers: number;
  launches_completed: number;
  total_value_transacted: number;
}
