"use client";

import { useState, useEffect } from "react";
import { getPropelVibesFlags, DEFAULT_FLAGS, getFlagWithDefault } from "@/lib/supabase/feature-flags";

export interface FeatureFlagsState {
  flags: Record<string, boolean>;
  isLoading: boolean;
  error: Error | null;
  isEnabled: (key: string) => boolean;
  refresh: () => Promise<void>;
}

export function useFeatureFlags(): FeatureFlagsState {
  const [flags, setFlags] = useState<Record<string, boolean>>(DEFAULT_FLAGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFlags = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedFlags = await getPropelVibesFlags();
      setFlags({ ...DEFAULT_FLAGS, ...fetchedFlags });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch feature flags"));
      // Keep using default flags on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();

    // Refresh flags every minute
    const interval = setInterval(fetchFlags, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const isEnabled = (key: string): boolean => {
    return getFlagWithDefault(key, flags);
  };

  const refresh = async () => {
    await fetchFlags();
  };

  return {
    flags,
    isLoading,
    error,
    isEnabled,
    refresh,
  };
}

/**
 * Hook for checking a single feature flag
 */
export function useFeatureFlag(key: string): { enabled: boolean; isLoading: boolean } {
  const { flags, isLoading } = useFeatureFlags();
  return {
    enabled: getFlagWithDefault(key, flags),
    isLoading,
  };
}
