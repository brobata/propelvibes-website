"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback } from "react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Github,
  Globe,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import type { Launch, ApprovalStatus, Profile } from "@/types/database";

interface PendingLaunch extends Omit<Launch, "owner"> {
  owner?: Pick<Profile, "id" | "name" | "email" | "avatar_url">;
}

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [launches, setLaunches] = useState<PendingLaunch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApprovalStatus | "all">("pending");
  const supabase = createClient();

  const fetchLaunches = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("pv_launches")
        .select(`
          *,
          owner:pv_profiles!owner_id (
            id,
            name,
            email,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("approval_status", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLaunches(data || []);
    } catch (error) {
      console.error("Error fetching launches:", error);
      toast.error("Failed to load launches");
    } finally {
      setIsLoading(false);
    }
  }, [supabase, filter]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  const handleApprove = async (launchId: string) => {
    if (!profile) return;
    setProcessingId(launchId);

    try {
      const { error } = await supabase
        .from("pv_launches")
        .update({
          approval_status: "approved",
          status: "open",
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: null,
        })
        .eq("id", launchId);

      if (error) throw error;

      toast.success("Launch approved!");
      setLaunches((prev) =>
        prev.map((l) =>
          l.id === launchId
            ? { ...l, approval_status: "approved", status: "open" }
            : l
        )
      );
      setExpandedId(null);
    } catch (error) {
      console.error("Error approving launch:", error);
      toast.error("Failed to approve launch");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (launchId: string) => {
    if (!profile || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setProcessingId(launchId);

    try {
      const { error } = await supabase
        .from("pv_launches")
        .update({
          approval_status: "rejected",
          status: "rejected",
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: rejectionReason.trim(),
        })
        .eq("id", launchId);

      if (error) throw error;

      toast.success("Launch rejected");
      setLaunches((prev) =>
        prev.map((l) =>
          l.id === launchId
            ? { ...l, approval_status: "rejected", status: "rejected" }
            : l
        )
      );
      setExpandedId(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting launch:", error);
      toast.error("Failed to reject launch");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const pendingCount = launches.filter((l) => l.approval_status === "pending").length;

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-text-secondary">
                  Review and approve launch submissions
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={fetchLaunches} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
              <div className="text-sm text-amber-600">Pending Review</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-700">
                {launches.filter((l) => l.approval_status === "approved").length}
              </div>
              <div className="text-sm text-green-600">Approved</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-700">
                {launches.filter((l) => l.approval_status === "rejected").length}
              </div>
              <div className="text-sm text-red-600">Rejected</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {(["pending", "approved", "rejected", "all"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-primary text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === "pending" && pendingCount > 0 && (
                  <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Launch List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : launches.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <Clock className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="font-medium text-text-primary mb-2">
                No {filter !== "all" ? filter : ""} launches
              </h3>
              <p className="text-sm text-text-secondary">
                {filter === "pending"
                  ? "All caught up! Check back later for new submissions."
                  : "No launches match this filter."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {launches.map((launch) => (
                <div
                  key={launch.id}
                  className="bg-background border border-border rounded-xl overflow-hidden"
                >
                  {/* Launch Header */}
                  <button
                    onClick={() => setExpandedId(expandedId === launch.id ? null : launch.id)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-surface/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    {launch.screenshot_urls?.[0] ? (
                      <img
                        src={launch.screenshot_urls[0]}
                        alt={launch.title}
                        className="w-16 h-12 object-cover rounded-lg border border-border"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-surface rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-text-muted" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-text-primary">{launch.title}</h3>
                      <p className="text-sm text-text-secondary">
                        by {launch.owner?.name || "Unknown"} &middot;{" "}
                        {new Date(launch.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status */}
                    {getStatusBadge(launch.approval_status)}

                    {/* Expand Icon */}
                    {expandedId === launch.id ? (
                      <ChevronUp className="w-5 h-5 text-text-muted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-muted" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {expandedId === launch.id && (
                    <div className="border-t border-border p-4 space-y-4">
                      {/* Description */}
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-1">
                          Description
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {launch.short_description}
                        </p>
                      </div>

                      {/* Full Description */}
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-1">
                          Full Description
                        </h4>
                        <p className="text-sm text-text-secondary whitespace-pre-wrap">
                          {launch.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {launch.tech_stack.map((tech) => (
                            <Badge key={tech}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        {launch.github_url && (
                          <a
                            href={launch.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {launch.demo_url && (
                          <a
                            href={launch.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Globe className="w-4 h-4" />
                            Demo
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {/* Verification Code */}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-text-primary mb-1">
                          Verification Code
                        </h4>
                        <div className="text-xl font-mono font-bold text-primary">
                          {launch.verification_code || "N/A"}
                        </div>
                      </div>

                      {/* Verification Photo */}
                      {launch.verification_photo_url && (
                        <div>
                          <h4 className="text-sm font-medium text-text-primary mb-2">
                            Verification Photo
                          </h4>
                          <a
                            href={launch.verification_photo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={launch.verification_photo_url}
                              alt="Verification"
                              className="max-h-64 rounded-lg border border-border hover:opacity-90 transition-opacity"
                            />
                          </a>
                        </div>
                      )}

                      {/* Screenshots */}
                      {launch.screenshot_urls && launch.screenshot_urls.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-text-primary mb-2">
                            Screenshots ({launch.screenshot_urls.length})
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {launch.screenshot_urls.map((url, index) => (
                              <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={url}
                                  alt={`Screenshot ${index + 1}`}
                                  className="aspect-video object-cover rounded-lg border border-border hover:opacity-90 transition-opacity"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Owner Info */}
                      <div className="bg-surface rounded-lg p-3">
                        <h4 className="text-sm font-medium text-text-primary mb-2">
                          Submitted By
                        </h4>
                        <div className="flex items-center gap-3">
                          {launch.owner?.avatar_url ? (
                            <img
                              src={launch.owner.avatar_url}
                              alt={launch.owner.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {launch.owner?.name?.charAt(0) || "?"}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-text-primary">
                              {launch.owner?.name || "Unknown"}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {launch.owner?.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Previous Rejection Reason */}
                      {launch.rejection_reason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-red-700 mb-1">
                            Previous Rejection Reason
                          </h4>
                          <p className="text-sm text-red-600">
                            {launch.rejection_reason}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      {launch.approval_status === "pending" && (
                        <div className="pt-4 border-t border-border space-y-4">
                          {/* Rejection Reason Input */}
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Rejection Reason (required for rejection)
                            </label>
                            <Textarea
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Explain why this launch is being rejected and what the user can do to fix it..."
                              rows={3}
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleApprove(launch.id)}
                              disabled={processingId === launch.id}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {processingId === launch.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(launch.id)}
                              disabled={processingId === launch.id || !rejectionReason.trim()}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              {processingId === launch.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* View on marketplace (if approved) */}
                      {launch.approval_status === "approved" && (
                        <div className="pt-4 border-t border-border">
                          <Link href={`/launches/${launch.slug}`}>
                            <Button variant="outline">
                              <ExternalLink className="w-4 h-4" />
                              View on Marketplace
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
