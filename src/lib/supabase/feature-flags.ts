import { createClient } from "./client";
import type { FeatureFlag } from "@/types/database";

// Command Center Supabase instance for feature flags
const COMMAND_CENTER_SUPABASE_URL = process.env.NEXT_PUBLIC_COMMAND_CENTER_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const COMMAND_CENTER_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_COMMAND_CENTER_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cache for feature flags
let flagsCache: Map<string, FeatureFlag> = new Map();
let lastFetch: number = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

/**
 * Fetch all feature flags from Command Center
 */
export async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  const now = Date.now();

  // Return cached if still valid
  if (flagsCache.size > 0 && now - lastFetch < CACHE_TTL) {
    return Array.from(flagsCache.values());
  }

  try {
    // Skip if no Supabase configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return Array.from(flagsCache.values());
    }

    // For now, use the same Supabase instance
    // TODO: Use Command Center Supabase when configured
    const supabase = createClient();

    const { data, error } = await supabase
      .from("feature_flags")
      .select("*")
      .order("key");

    if (error) {
      console.error("Error fetching feature flags:", error);
      return Array.from(flagsCache.values()); // Return cached on error
    }

    // Update cache
    flagsCache.clear();
    (data as FeatureFlag[]).forEach((flag) => {
      flagsCache.set(flag.key, flag);
    });
    lastFetch = now;

    return data as FeatureFlag[];
  } catch (error) {
    console.error("Error fetching feature flags:", error);
    return Array.from(flagsCache.values());
  }
}

/**
 * Check if a feature flag is enabled
 */
export async function isFeatureEnabled(key: string): Promise<boolean> {
  // Check cache first
  if (flagsCache.has(key) && Date.now() - lastFetch < CACHE_TTL) {
    return flagsCache.get(key)?.enabled ?? false;
  }

  // Fetch fresh flags
  await fetchFeatureFlags();
  return flagsCache.get(key)?.enabled ?? false;
}

/**
 * Get a specific feature flag
 */
export async function getFeatureFlag(key: string): Promise<FeatureFlag | null> {
  if (flagsCache.has(key) && Date.now() - lastFetch < CACHE_TTL) {
    return flagsCache.get(key) ?? null;
  }

  await fetchFeatureFlags();
  return flagsCache.get(key) ?? null;
}

/**
 * Get all Propel Vibes specific flags
 */
export async function getPropelVibesFlags(): Promise<Record<string, boolean>> {
  await fetchFeatureFlags();

  const propelVibesFlags: Record<string, boolean> = {};

  flagsCache.forEach((flag, key) => {
    if (key.startsWith("propelvibes_") || flag.scope === "global") {
      // Remove prefix for cleaner access
      const cleanKey = key.replace("propelvibes_", "");
      propelVibesFlags[cleanKey] = flag.enabled;
    }
  });

  return propelVibesFlags;
}

/**
 * Default flags for when database isn't available
 */
export const DEFAULT_FLAGS: Record<string, boolean> = {
  enable_payments: false,
  enable_subscriptions: false,
  enable_proposals: true,
  enable_messaging: true,
  enable_escrow: false,
  enable_equity_deals: true,
  require_verification: false,
  enable_ai_insights: false,
  enable_ai_chat: false,
  maintenance_mode: false,
  enable_dark_mode: true,
};

/**
 * Get flag value with fallback to defaults
 */
export function getFlagWithDefault(key: string, flags?: Record<string, boolean>): boolean {
  if (flags && key in flags) {
    return flags[key];
  }
  return DEFAULT_FLAGS[key] ?? false;
}
