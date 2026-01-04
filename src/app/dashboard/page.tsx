"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Code2,
  MessageSquare,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  FileText,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useMyLaunches } from "@/hooks/useLaunches";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { getInitials } from "@/lib/utils";

export default function DashboardPage() {
  const { profile, developerProfile, isLoading: authLoading, isDeveloper, isVibeCoder } = useAuth();
  const { launches, isLoading: launchesLoading } = useMyLaunches();
  const { isEnabled } = useFeatureFlags();

  const isLoading = authLoading || launchesLoading;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="grid md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-surface rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback>{getInitials(profile?.name || "User")}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Welcome back, {profile?.name?.split(" ")[0] || "there"}!
                </h1>
                <p className="text-text-secondary">
                  {isDeveloper ? "Developer Dashboard" : "Vibe-Coder Dashboard"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {isVibeCoder && (
              <>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">{launches.length}</span>
                  </div>
                  <p className="text-sm text-text-muted">Your Launches</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {launches.reduce((sum, l) => sum + l.views, 0)}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Total Views</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {launches.reduce((sum, l) => sum + l.proposals_count, 0)}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Proposals Received</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {launches.filter((l) => l.status === "completed").length}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Completed</p>
                </div>
              </>
            )}

            {isDeveloper && (
              <>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">0</span>
                  </div>
                  <p className="text-sm text-text-muted">Active Proposals</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {developerProfile?.launches_completed || 0}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Launches Completed</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {developerProfile?.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Rating</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-text-primary">
                      {developerProfile?.reviews_count || 0}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">Reviews</p>
                </div>
              </>
            )}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {isVibeCoder && (
                    <Link
                      href="/post-launch"
                      className="flex items-center gap-4 p-4 bg-surface rounded-lg hover:bg-surface-hover transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                          Post a Launch
                        </h3>
                        <p className="text-sm text-text-muted">Get help with your vibe-coded app</p>
                      </div>
                    </Link>
                  )}
                  {isDeveloper && (
                    <Link
                      href="/launches"
                      className="flex items-center gap-4 p-4 bg-surface rounded-lg hover:bg-surface-hover transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                          Browse Launches
                        </h3>
                        <p className="text-sm text-text-muted">Find projects to work on</p>
                      </div>
                    </Link>
                  )}
                  <Link
                    href={isDeveloper ? "/developers" : "/developers"}
                    className="flex items-center gap-4 p-4 bg-surface rounded-lg hover:bg-surface-hover transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                        {isDeveloper ? "View Competition" : "Find Developers"}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {isDeveloper ? "See other developers" : "Browse available developers"}
                      </p>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* Your Launches (for vibe-coders) */}
              {isVibeCoder && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-background border border-border rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Your Launches</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard/launches">
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {launches.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="font-medium text-text-primary mb-2">No launches yet</h3>
                      <p className="text-sm text-text-secondary mb-4">
                        Post your first launch to get help with your vibe-coded app
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
                      {launches.slice(0, 3).map((launch) => (
                        <Link
                          key={launch.id}
                          href={launch.approval_status === "approved" ? `/launches/${launch.slug}` : "#"}
                          className={`block p-4 bg-surface rounded-lg transition-colors ${
                            launch.approval_status === "approved" ? "hover:bg-surface-hover" : "cursor-default"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-text-primary truncate">
                                {launch.title}
                              </h3>
                              <p className="text-sm text-text-secondary line-clamp-1 mt-1">
                                {launch.short_description}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {launch.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  {launch.proposals_count}
                                </span>
                              </div>
                              {/* Rejection reason if rejected */}
                              {launch.approval_status === "rejected" && launch.rejection_reason && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-xs text-red-600">
                                  <strong>Reason:</strong> {launch.rejection_reason}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {/* Approval Status Badge */}
                              {launch.approval_status === "pending" && (
                                <Badge className="bg-amber-100 text-amber-700">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending Review
                                </Badge>
                              )}
                              {launch.approval_status === "approved" && (
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Approved
                                </Badge>
                              )}
                              {launch.approval_status === "rejected" && (
                                <Badge className="bg-red-100 text-red-700">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Rejected
                                </Badge>
                              )}
                              {/* Launch Status Badge (only if approved) */}
                              {launch.approval_status === "approved" && (
                                <Badge
                                  variant={
                                    launch.status === "open"
                                      ? "success"
                                      : launch.status === "in_progress"
                                      ? "warning"
                                      : "default"
                                  }
                                  className="text-xs"
                                >
                                  {launch.status.replace("_", " ")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-4">Profile</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="text-xl">
                      {getInitials(profile?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-text-primary">{profile?.name}</h3>
                    <p className="text-sm text-text-secondary">{profile?.email}</p>
                    <Badge variant="primary" className="mt-1">
                      {profile?.role?.replace("_", "-")}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/settings/profile">Edit Profile</Link>
                </Button>
              </motion.div>

              {/* Feature Flags Info (for testing) */}
              {process.env.NODE_ENV === "development" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-surface border border-border rounded-xl p-6"
                >
                  <h2 className="text-sm font-semibold text-text-muted mb-3">Feature Flags (Dev)</h2>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Payments</span>
                      <Badge variant={isEnabled("enable_payments") ? "success" : "default"}>
                        {isEnabled("enable_payments") ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Messaging</span>
                      <Badge variant={isEnabled("enable_messaging") ? "success" : "default"}>
                        {isEnabled("enable_messaging") ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Proposals</span>
                      <Badge variant={isEnabled("enable_proposals") ? "success" : "default"}>
                        {isEnabled("enable_proposals") ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Escrow</span>
                      <Badge variant={isEnabled("enable_escrow") ? "success" : "default"}>
                        {isEnabled("enable_escrow") ? "ON" : "OFF"}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
