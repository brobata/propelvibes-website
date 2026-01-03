import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if profile exists, create if not
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existingProfile } = await supabase
          .from("pv_profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (!existingProfile) {
          // Create profile from user metadata
          await supabase.from("pv_profiles").insert({
            user_id: user.id,
            email: user.email!,
            name: user.user_metadata?.full_name || user.user_metadata?.name || "User",
            avatar_url: user.user_metadata?.avatar_url,
            role: user.user_metadata?.role || "vibe_coder",
          });
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
