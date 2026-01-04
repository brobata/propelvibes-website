"use client";

import Link from "next/link";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DeveloperProfile } from "@/types/database";

interface DeveloperCardProps {
  developer: DeveloperProfile;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  const user = developer.user as { name?: string; avatar_url?: string; location?: string } | undefined;
  const isAvailable = developer.availability === "available";

  const formatRate = () => {
    if (!developer.hourly_rate) return "Contact for rate";
    return `$${(developer.hourly_rate / 100).toLocaleString()}/hr`;
  };

  const skillsToShow = developer.skills?.slice(0, 4) || [];
  const remainingSkills = (developer.skills?.length || 0) - 4;

  return (
    <Link href={`/developers/${developer.id}`} className="block">
      <article className="marketplace-card">
        {/* Avatar Section */}
        <div className="marketplace-card-image flex items-center justify-center p-4">
          <div className="relative">
            <div className={isAvailable ? "availability-ring" : "availability-ring-busy"}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback className="text-lg bg-surface">
                  {user?.name?.charAt(0) || "D"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="marketplace-card-content">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-text-primary hover:text-primary line-clamp-1">
              {user?.name || "Developer"}
            </h3>
            {developer.verified && (
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            )}
            <span
              className={`ml-auto flex-shrink-0 px-1.5 py-0.5 text-xs border rounded ${
                isAvailable
                  ? "border-success text-success bg-success-light"
                  : "border-warning text-warning"
              }`}
            >
              {isAvailable ? "Available" : "Busy"}
            </span>
          </div>

          {/* Headline */}
          <p className="text-sm text-text-secondary mb-1 line-clamp-1">
            {developer.headline}
          </p>

          {/* Location & Rating */}
          <div className="flex items-center gap-3 text-sm text-text-muted mb-2">
            {user?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {user.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-warning text-warning" />
              {developer.rating?.toFixed(1) || "New"}
              {developer.reviews_count > 0 && (
                <span className="text-text-muted">({developer.reviews_count})</span>
              )}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skillsToShow.map((skill) => (
              <span key={skill} className="tech-pill">
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="text-xs text-text-muted self-center">
                +{remainingSkills} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
            <span className="price-tag">
              {formatRate()}
            </span>
            <span className="text-text-muted">
              {developer.launches_completed || 0} launches completed
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
