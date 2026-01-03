// User types
export type UserRole = "vibe-coder" | "developer" | "both";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Launch types
export type LaunchStatus = "open" | "in_progress" | "completed" | "cancelled";
export type DealType = "fixed" | "hourly" | "equity" | "hybrid";
export type ServiceCategory =
  | "code-cleanup"
  | "feature-development"
  | "bug-fixes"
  | "deployment"
  | "design"
  | "testing"
  | "scaling"
  | "full-launch";

export interface Launch {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  short_description: string;
  screenshot_urls: string[];
  tech_stack: string[];
  services_needed: ServiceCategory[];
  deal_types_accepted: DealType[];
  budget_min?: number;
  budget_max?: number;
  equity_offered?: number;
  status: LaunchStatus;
  views: number;
  proposals_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  owner?: User;
}

// Developer types
export type AvailabilityStatus = "available" | "busy" | "unavailable";

export interface DeveloperProfile {
  id: string;
  user_id: string;
  headline: string;
  bio: string;
  skills: string[];
  hourly_rate?: number;
  availability: AvailabilityStatus;
  portfolio_urls: string[];
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  years_experience: number;
  launches_completed: number;
  rating: number;
  reviews_count: number;
  verified: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  user?: User;
}

// Proposal types
export type ProposalStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export interface Proposal {
  id: string;
  launch_id: string;
  developer_id: string;
  cover_letter: string;
  deal_type: DealType;
  fixed_price?: number;
  hourly_rate?: number;
  estimated_hours?: number;
  equity_ask?: number;
  timeline_days: number;
  status: ProposalStatus;
  created_at: string;
  updated_at: string;
  // Joined data
  launch?: Launch;
  developer?: DeveloperProfile;
}

// Review types
export interface Review {
  id: string;
  launch_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
  // Joined data
  reviewer?: User;
  reviewee?: User;
  launch?: Launch;
}

// Success Story types
export interface SuccessStory {
  id: string;
  launch_id: string;
  developer_id: string;
  title: string;
  description: string;
  before_screenshot_url?: string;
  after_screenshot_url?: string;
  metrics?: {
    users_gained?: number;
    revenue_generated?: number;
    time_saved?: string;
  };
  featured: boolean;
  created_at: string;
  // Joined data
  launch?: Launch;
  developer?: DeveloperProfile;
}

// Filter/Search types
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

// Stats for homepage
export interface PlatformStats {
  total_launches: number;
  total_developers: number;
  launches_completed: number;
  total_value_transacted: number;
}
