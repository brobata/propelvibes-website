"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DeveloperProfile, DeveloperFilters } from "@/types/database";

export interface DevelopersState {
  developers: DeveloperProfile[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  refresh: () => Promise<void>;
}

export function useDevelopers(filters?: DeveloperFilters): DevelopersState {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const supabase = createClient();

  const fetchDevelopers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from("pv_developer_profiles")
        .select("*, user:pv_profiles(*)", { count: "exact" })
        .order("rating", { ascending: false });

      // Apply filters
      if (filters?.skills && filters.skills.length > 0) {
        query = query.overlaps("skills", filters.skills);
      }

      if (filters?.availability) {
        query = query.eq("availability", filters.availability);
      }

      if (filters?.verified_only) {
        query = query.eq("verified", true);
      }

      if (filters?.min_rating) {
        query = query.gte("rating", filters.min_rating);
      }

      if (filters?.hourly_rate_min) {
        query = query.gte("hourly_rate", filters.hourly_rate_min);
      }

      if (filters?.hourly_rate_max) {
        query = query.lte("hourly_rate", filters.hourly_rate_max);
      }

      const { data, error: queryError, count } = await query;

      if (queryError) throw queryError;

      // Filter by search if provided (search user name and headline)
      let filteredData = data || [];
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (dev) =>
            dev.headline?.toLowerCase().includes(searchLower) ||
            (dev.user as { name?: string })?.name?.toLowerCase().includes(searchLower) ||
            dev.skills?.some((skill: string) => skill.toLowerCase().includes(searchLower))
        );
      }

      setDevelopers(filteredData);
      setTotalCount(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch developers"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase, filters]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return {
    developers,
    isLoading,
    error,
    totalCount,
    refresh: fetchDevelopers,
  };
}

export function useDeveloper(id: string): {
  developer: DeveloperProfile | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [developer, setDeveloper] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: queryError } = await supabase
          .from("pv_developer_profiles")
          .select("*, user:pv_profiles(*)")
          .eq("id", id)
          .single();

        if (queryError) throw queryError;

        setDeveloper(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch developer"));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDeveloper();
    }
  }, [id, supabase]);

  return { developer, isLoading, error };
}

export function useTopDevelopers(limit: number = 4): DevelopersState {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchDevelopers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from("pv_developer_profiles")
        .select("*, user:pv_profiles(*)")
        .eq("verified", true)
        .eq("availability", "available")
        .order("rating", { ascending: false })
        .order("launches_completed", { ascending: false })
        .limit(limit);

      if (queryError) throw queryError;

      setDevelopers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch top developers"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase, limit]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return {
    developers,
    isLoading,
    error,
    totalCount: developers.length,
    refresh: fetchDevelopers,
  };
}
