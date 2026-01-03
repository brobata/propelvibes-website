"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  MessageSquare,
  Clock,
  DollarSign,
  Percent,
  Github,
  ExternalLink,
  Share2,
  Heart,
  Send,
  Code,
  CheckCircle2,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLaunch } from "@/hooks/useLaunches";
import { useAuth } from "@/hooks/useAuth";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { getInitials, formatCurrency, formatDate } from "@/lib/utils";
import { ProposalModal } from "@/components/proposals/ProposalModal";
import { toast } from "sonner";

const serviceLabels: Record<string, string> = {
  code_cleanup: "Code Cleanup",
  feature_development: "Feature Development",
  bug_fixes: "Bug Fixes",
  deployment: "Deployment",
  design: "Design",
  testing: "Testing",
  scaling: "Scaling",
  full_launch: "Full Launch",
};

const dealTypeLabels: Record<string, string> = {
  fixed: "Fixed Price",
  hourly: "Hourly",
  equity: "Equity",
  hybrid: "Hybrid",
};

export default function LaunchDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { launch, isLoading, error } = useLaunch(slug);
  const { profile, isDeveloper } = useAuth();
  const { isEnabled } = useFeatureFlags();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const proposalsEnabled = isEnabled("enable_proposals");

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleSave = () => {
    if (!profile) {
      toast.error("Please sign in to save launches");
      return;
    }
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved" : "Saved for later");
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-5xl">
            <div className="animate-pulse space-y-8">
              <div className="h-6 w-32 bg-surface rounded" />
              <div className="h-10 w-2/3 bg-surface rounded" />
              <div className="h-64 bg-surface rounded-xl" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !launch) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mx-auto mb-6">
              <Code className="w-10 h-10 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Launch not found
            </h1>
            <p className="text-text-secondary mb-8">
              This launch may have been removed or the link is incorrect.
            </p>
            <Button asChild>
              <Link href="/launches">Browse Launches</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const isOwner = profile?.id === launch.owner_id;

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-5xl">
          {/* Back Link */}
          <Link
            href="/launches"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Launches
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                      {launch.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {launch.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {launch.proposals_count} proposals
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(launch.created_at)}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      launch.status === "open"
                        ? "success"
                        : launch.status === "in_progress"
                        ? "warning"
                        : "default"
                    }
                  >
                    {launch.status.replace("_", " ")}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className={isSaved ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                </div>
              </motion.div>

              {/* Screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="aspect-video bg-gradient-to-br from-surface to-surface-hover rounded-xl overflow-hidden relative"
              >
                {launch.screenshot_urls && launch.screenshot_urls.length > 0 ? (
                  <img
                    src={launch.screenshot_urls[0]}
                    alt={launch.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-16 h-16 text-text-muted/30" />
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  About This Project
                </h2>
                <div className="prose prose-sm max-w-none text-text-secondary">
                  <p className="whitespace-pre-wrap">{launch.description}</p>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {launch.tech_stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Services Needed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Services Needed
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {launch.services_needed.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 p-3 bg-surface rounded-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-text-primary">
                        {serviceLabels[service] || service}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-sm font-medium text-text-muted mb-4">Posted by</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={launch.owner?.avatar_url || undefined} />
                    <AvatarFallback>
                      {getInitials(launch.owner?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-text-primary">
                      {launch.owner?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-text-muted">Vibe Coder</p>
                  </div>
                </div>
              </motion.div>

              {/* Deal Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <h3 className="text-sm font-medium text-text-muted mb-4">Deal Terms</h3>

                <div className="space-y-4">
                  {/* Deal Types */}
                  <div>
                    <p className="text-xs text-text-muted mb-2">Open to</p>
                    <div className="flex flex-wrap gap-2">
                      {launch.deal_types_accepted.map((type) => (
                        <Badge key={type} variant="primary">
                          {dealTypeLabels[type] || type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  {(launch.budget_min || launch.budget_max) && (
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-text-muted">Budget</p>
                        <p className="font-medium text-text-primary">
                          {launch.budget_min && launch.budget_max
                            ? `${formatCurrency(launch.budget_min)} - ${formatCurrency(launch.budget_max)}`
                            : launch.budget_min
                            ? `From ${formatCurrency(launch.budget_min)}`
                            : `Up to ${formatCurrency(launch.budget_max!)}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Equity */}
                  {launch.equity_offered && (
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                      <Percent className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-text-muted">Equity Offered</p>
                        <p className="font-medium text-text-primary">
                          {launch.equity_offered}%
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {launch.timeline_days && (
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-text-muted">Timeline</p>
                        <p className="font-medium text-text-primary">
                          {launch.timeline_days} days
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Links */}
              {(launch.github_url || launch.demo_url) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-background border border-border rounded-xl p-6"
                >
                  <h3 className="text-sm font-medium text-text-muted mb-4">Links</h3>
                  <div className="space-y-2">
                    {launch.github_url && (
                      <a
                        href={launch.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span className="text-text-primary">GitHub Repository</span>
                        <ExternalLink className="w-4 h-4 text-text-muted ml-auto" />
                      </a>
                    )}
                    {launch.demo_url && (
                      <a
                        href={launch.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="text-text-primary">Live Demo</span>
                        <ExternalLink className="w-4 h-4 text-text-muted ml-auto" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Submit Proposal Button */}
              {!isOwner && launch.status === "open" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {proposalsEnabled ? (
                    isDeveloper ? (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setShowProposalModal(true)}
                      >
                        <Send className="w-4 h-4" />
                        Submit Proposal
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-text-muted mb-4">
                          Only developers can submit proposals
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/signup?role=developer">
                            Sign up as Developer
                          </Link>
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="bg-surface rounded-lg p-4 text-center">
                      <p className="text-sm text-text-muted">
                        Proposals are temporarily disabled
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {isOwner && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/launches/${launch.id}`}>
                      Manage Launch
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <ProposalModal
          launch={launch}
          onClose={() => setShowProposalModal(false)}
        />
      )}
    </PageLayout>
  );
}
