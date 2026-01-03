"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, MessageSquare, Heart, Clock, Code2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Launch } from "@/types/database";

interface LaunchCardProps {
  launch: Launch;
  index?: number;
}

export function LaunchCard({ launch, index = 0 }: LaunchCardProps) {
  const owner = launch.owner as { name?: string; avatar_url?: string; location?: string } | undefined;

  // Format budget display
  const formatBudget = () => {
    if (launch.budget_min && launch.budget_max) {
      const min = (launch.budget_min / 100).toLocaleString();
      const max = (launch.budget_max / 100).toLocaleString();
      return `$${min} - $${max}`;
    }
    if (launch.equity_offered) {
      return `${launch.equity_offered}% equity`;
    }
    return "Open to offers";
  };

  // Determine badge type based on views/proposals
  const getBadge = () => {
    if (launch.proposals_count >= 5) return { type: "hot", label: "HOT" };
    const createdAt = new Date(launch.created_at);
    const daysSince = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince <= 3) return { type: "new", label: "NEW" };
    return null;
  };

  const badge = getBadge();
  const techStackToShow = launch.tech_stack?.slice(0, 4) || [];
  const remainingTech = (launch.tech_stack?.length || 0) - 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/launches/${launch.slug}`} className="block">
        <article className="marketplace-card group">
          {/* Image Section */}
          <div className="marketplace-card-image">
            {launch.screenshot_urls?.[0] && !launch.screenshot_urls[0].includes('placehold') ? (
              <Image
                src={launch.screenshot_urls[0]}
                alt={launch.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex flex-col items-center justify-center p-4">
                <Code2 className="w-10 h-10 text-primary mb-2" />
                <span className="text-xs font-medium text-primary-dark text-center line-clamp-2">
                  {launch.title}
                </span>
              </div>
            )}
            {badge && (
              <span className={badge.type === "hot" ? "hot-badge" : "new-badge"}>
                {badge.label}
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="marketplace-card-content">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                {launch.title}
              </h3>
              <button
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-surface transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Save functionality
                }}
              >
                <Heart className="w-4 h-4 text-text-muted hover:text-primary" />
              </button>
            </div>

            {/* Owner info */}
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-5 h-5">
                <AvatarImage src={owner?.avatar_url} />
                <AvatarFallback className="text-[10px]">
                  {owner?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-text-muted">
                by {owner?.name || "Anonymous"}
                {owner?.location && ` · ${owner.location}`}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
              {launch.short_description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {techStackToShow.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 text-primary-dark"
                >
                  {tech}
                </span>
              ))}
              {remainingTech > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface text-text-muted">
                  +{remainingTech} more
                </span>
              )}
            </div>

            {/* Footer Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
              <span className="font-semibold text-primary">
                {formatBudget()}
              </span>
              <div className="flex items-center gap-1 text-text-muted">
                <Eye className="w-3.5 h-3.5" />
                <span>{launch.views || 0}</span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{launch.proposals_count || 0}</span>
              </div>
              {launch.timeline_days && (
                <div className="flex items-center gap-1 text-text-muted ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{launch.timeline_days}d</span>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
