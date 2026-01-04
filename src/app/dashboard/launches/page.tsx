"use client";

export const dynamic = "force-dynamic";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useMyLaunches } from "@/hooks/useLaunches";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Rocket,
  Plus,
  ArrowLeft,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  Loader2,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import type { Launch } from "@/types/database";

export default function DashboardLaunchesPage() {
  const { profile, isLoading: authLoading } = useAuth();
  const { launches, isLoading: launchesLoading, refresh } = useMyLaunches();
  const [resubmittingId, setResubmittingId] = useState<string | null>(null);
  const supabase = createClient();

  const isLoading = authLoading || launchesLoading;

  const handleResubmit = useCallback(
    async (launchId: string) => {
      setResubmittingId(launchId);

      try {
        const { error } = await supabase
          .from("pv_launches")
          .update({
            approval_status: "pending",
            status: "pending_review",
            rejection_reason: null,
            reviewed_by: null,
            reviewed_at: null,
          })
          .eq("id", launchId);

        if (error) throw error;

        toast.success("Launch resubmitted for review!");
        refresh();
      } catch (error) {
        console.error("Error resubmitting launch:", error);
        toast.error("Failed to resubmit launch");
      } finally {
        setResubmittingId(null);
      }
    },
    [supabase, refresh]
  );

  const getStatusInfo = (launch: Launch) => {
    if (launch.approval_status === "pending") {
      return {
        icon: Clock,
        label: "Pending Review",
        color: "bg-amber-100 text-amber-700",
        description: "Your launch is being reviewed by our team.",
      };
    }
    if (launch.approval_status === "approved") {
      return {
        icon: CheckCircle2,
        label: "Approved",
        color: "bg-green-100 text-green-700",
        description: "Your launch is live on the marketplace!",
      };
    }
    if (launch.approval_status === "rejected") {
      return {
        icon: XCircle,
        label: "Rejected",
        color: "bg-red-100 text-red-700",
        description: launch.rejection_reason || "Please review feedback and resubmit.",
      };
    }
    return {
      icon: AlertTriangle,
      label: "Unknown",
      color: "bg-gray-100 text-gray-700",
      description: "",
    };
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="h-32 bg-surface rounded-xl" />
              <div className="h-32 bg-surface rounded-xl" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Please log in
            </h1>
            <p className="text-text-secondary mb-8">
              You need to be logged in to view your launches.
            </p>
            <Button asChild>
              <Link href="/login?redirect=/dashboard/launches">Log In</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Your Launches</h1>
                <p className="text-text-secondary">
                  Track the status of your submitted launches
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={refresh}>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button asChild>
                  <Link href="/post-launch">
                    <Plus className="w-4 h-4" />
                    New Launch
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-700">
                {launches.filter((l) => l.approval_status === "pending").length}
              </div>
              <div className="text-sm text-amber-600">Pending Review</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-700">
                {launches.filter((l) => l.approval_status === "approved").length}
              </div>
              <div className="text-sm text-green-600">Approved & Live</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-700">
                {launches.filter((l) => l.approval_status === "rejected").length}
              </div>
              <div className="text-sm text-red-600">Need Attention</div>
            </div>
          </div>

          {/* Launches List */}
          {launches.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-xl border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">No launches yet</h3>
              <p className="text-sm text-text-secondary mb-6">
                Post your first launch to connect with developers
              </p>
              <Button asChild>
                <Link href="/post-launch">
                  <Plus className="w-4 h-4" />
                  Post a Launch
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {launches.map((launch) => {
                const statusInfo = getStatusInfo(launch);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={launch.id}
                    className="bg-background border border-border rounded-xl overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        {launch.screenshot_urls?.[0] ? (
                          <img
                            src={launch.screenshot_urls[0]}
                            alt={launch.title}
                            className="w-24 h-16 object-cover rounded-lg border border-border flex-shrink-0"
                          />
                        ) : (
                          <div className="w-24 h-16 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-6 h-6 text-text-muted" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-medium text-text-primary truncate">
                              {launch.title}
                            </h3>
                            <Badge className={statusInfo.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary line-clamp-1 mt-1">
                            {launch.short_description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {launch.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {launch.proposals_count} proposals
                            </span>
                            <span>
                              Submitted {new Date(launch.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Description / Actions */}
                      <div className="mt-4 pt-4 border-t border-border">
                        {launch.approval_status === "pending" && (
                          <div className="flex items-center gap-2 text-sm text-amber-600">
                            <Clock className="w-4 h-4" />
                            Your launch is being reviewed. This usually takes less than 24 hours.
                          </div>
                        )}

                        {launch.approval_status === "approved" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              Your launch is live and visible on the marketplace!
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/launches/${launch.slug}`}>
                                <ExternalLink className="w-4 h-4" />
                                View on Marketplace
                              </Link>
                            </Button>
                          </div>
                        )}

                        {launch.approval_status === "rejected" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                              <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-red-700 text-sm">
                                    Why was this rejected?
                                  </div>
                                  <p className="text-sm text-red-600 mt-1">
                                    {launch.rejection_reason || "No reason provided"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-text-secondary">
                                Fix the issues above and resubmit for review.
                              </p>
                              <Button
                                size="sm"
                                onClick={() => handleResubmit(launch.id)}
                                disabled={resubmittingId === launch.id}
                              >
                                {resubmittingId === launch.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Resubmitting...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="w-4 h-4" />
                                    Resubmit for Review
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
