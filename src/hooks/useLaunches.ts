"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Launch, LaunchFilters } from "@/types/database";

export interface LaunchesState {
  launches: Launch[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  refresh: () => Promise<void>;
}

export function useLaunches(filters?: LaunchFilters): LaunchesState {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const supabaseRef = useRef(createClient());

  // Memoize filters to prevent unnecessary re-fetches
  const filtersKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  const fetchLaunches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = supabaseRef.current;
      let query = supabase
        .from("pv_launches")
        .select("*, owner:pv_profiles(*)", { count: "exact" })
        .eq("approval_status", "approved")
        .in("status", ["open", "in_progress"])
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`
        );
      }

      if (filters?.services && filters.services.length > 0) {
        query = query.overlaps("services_needed", filters.services);
      }

      if (filters?.deal_types && filters.deal_types.length > 0) {
        query = query.overlaps("deal_types_accepted", filters.deal_types);
      }

      if (filters?.tech_stack && filters.tech_stack.length > 0) {
        query = query.overlaps("tech_stack", filters.tech_stack);
      }

      if (filters?.budget_min) {
        query = query.gte("budget_min", filters.budget_min);
      }

      if (filters?.budget_max) {
        query = query.lte("budget_max", filters.budget_max);
      }

      const { data, error: queryError, count } = await query;

      if (queryError) throw queryError;

      setLaunches(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch launches"));
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return {
    launches,
    isLoading,
    error,
    totalCount,
    refresh: fetchLaunches,
  };
}

export function useLaunch(slugOrId: string): {
  launch: Launch | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = supabaseRef.current;

        // Try by slug first, then by id
        let query = supabase
          .from("pv_launches")
          .select("*, owner:pv_profiles(*)")
          .eq("slug", slugOrId)
          .single();

        let { data, error: queryError } = await query;

        // If not found by slug, try by id
        if (queryError && queryError.code === "PGRST116") {
          const { data: idData, error: idError } = await supabase
            .from("pv_launches")
            .select("*, owner:pv_profiles(*)")
            .eq("id", slugOrId)
            .single();

          data = idData;
          queryError = idError;
        }

        if (queryError) throw queryError;

        setLaunch(data);

        // Increment view count
        if (data) {
          await supabase.rpc("pv_increment_launch_views", { p_launch_id: data.id });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch launch"));
      } finally {
        setIsLoading(false);
      }
    };

    if (slugOrId) {
      fetchLaunch();
    }
  }, [slugOrId]);

  return { launch, isLoading, error };
}

export function useFeaturedLaunches(limit: number = 6): LaunchesState {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabaseRef = useRef(createClient());

  const fetchLaunches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = supabaseRef.current;
      const { data, error: queryError } = await supabase
        .from("pv_launches")
        .select("*, owner:pv_profiles(*)")
        .eq("approval_status", "approved")
        .eq("status", "open")
        .order("views", { ascending: false })
        .limit(limit);

      if (queryError) throw queryError;

      setLaunches(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch featured launches"));
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return {
    launches,
    isLoading,
    error,
    totalCount: launches.length,
    refresh: fetchLaunches,
  };
}

export function useMyLaunches(): LaunchesState {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabaseRef = useRef(createClient());

  const fetchLaunches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = supabaseRef.current;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // First get the profile ID for this user
      const { data: profile } = await supabase
        .from("pv_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { data, error: queryError } = await supabase
        .from("pv_launches")
        .select("*")
        .eq("owner_id", profile.id)
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;

      setLaunches(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch your launches"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return {
    launches,
    isLoading,
    error,
    totalCount: launches.length,
    refresh: fetchLaunches,
  };
}
