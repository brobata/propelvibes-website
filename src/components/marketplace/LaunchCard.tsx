"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, MessageSquare, Clock, Code2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Launch } from "@/types/database";

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
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
    <Link href={`/launches/${launch.slug}`} className="block">
      <article className="marketplace-card">
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
            <div className="w-full h-full bg-surface flex flex-col items-center justify-center p-4">
              <Code2 className="w-8 h-8 text-text-muted mb-1" />
              <span className="text-xs text-text-muted text-center line-clamp-2">
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
          <h3 className="text-base font-semibold text-text-primary hover:text-primary mb-1 line-clamp-1">
            {launch.title}
          </h3>

          {/* Owner info */}
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <Avatar className="w-4 h-4">
              <AvatarImage src={owner?.avatar_url} />
              <AvatarFallback className="text-[9px]">
                {owner?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span>
              {owner?.name || "Anonymous"}
              {owner?.location && ` · ${owner.location}`}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary line-clamp-2 mb-2 flex-grow">
            {launch.short_description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {techStackToShow.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
            {remainingTech > 0 && (
              <span className="text-xs text-text-muted self-center">
                +{remainingTech} more
              </span>
            )}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
            <span className="price-tag">
              {formatBudget()}
            </span>
            <div className="flex items-center gap-3 text-text-muted">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {launch.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {launch.proposals_count || 0} bids
              </span>
            </div>
            {launch.timeline_days && (
              <span className="text-text-muted flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                {launch.timeline_days} days
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
