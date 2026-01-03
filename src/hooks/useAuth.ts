"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile, DeveloperProfile } from "@/types/database";

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  developerProfile: DeveloperProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDeveloper: boolean;
  isVibeCoder: boolean;
  signUp: (email: string, password: string, name: string, role: "vibe_coder" | "developer") => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      // Fetch profile by user_id (auth.users.id)
      const { data: profileData, error: profileError } = await supabase
        .from("pv_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch developer profile if exists
      if (profileData?.role === "developer" || profileData?.role === "both") {
        const { data: devData } = await supabase
          .from("pv_developer_profiles")
          .select("*")
          .eq("profile_id", profileData.id)
          .single();

        setDeveloperProfile(devData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [supabase]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
        setDeveloperProfile(null);
      }
    } catch (error) {
      console.error("Error refreshing auth:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, fetchProfile]);

  useEffect(() => {
    refresh();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setDeveloperProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, fetchProfile, refresh]);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: "vibe_coder" | "developer"
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    });

    if (error) throw error;

    if (data.user) {
      // Create profile
      const { data: profileData } = await supabase.from("pv_profiles").insert({
        user_id: data.user.id,
        email,
        name,
        role,
      }).select().single();

      // Create developer profile if developer
      if (role === "developer" && profileData) {
        await supabase.from("pv_developer_profiles").insert({
          profile_id: profileData.id,
          headline: "",
          skills: [],
        });
      }

      router.push("/dashboard");
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    router.push("/dashboard");
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("pv_profiles")
      .update(updates)
      .eq("user_id", user.id);

    if (error) throw error;
    await fetchProfile(user.id);
  };

  return {
    user,
    profile,
    developerProfile,
    isLoading,
    isAuthenticated: !!user,
    isDeveloper: profile?.role === "developer" || profile?.role === "both",
    isVibeCoder: profile?.role === "vibe_coder" || profile?.role === "both",
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    updateProfile,
    refresh,
  };
}
