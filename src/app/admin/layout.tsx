"use client";

import { useAuth } from "@/hooks/useAuth";
import { PageLayout } from "@/components/layout";
import { Shield, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  // Check if user is admin (you'll need to add is_admin to profile type)
  // For now, we check if the role is 'admin' or profile has is_admin flag
  const isAdmin = profile?.role === "admin" || (profile as { is_admin?: boolean })?.is_admin;

  if (!profile || !isAdmin) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Access Denied
            </h1>
            <p className="text-text-secondary mb-8">
              You don&apos;t have permission to access the admin dashboard.
            </p>
            <Link
              href="/"
              className="text-primary hover:underline"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return <>{children}</>;
}
