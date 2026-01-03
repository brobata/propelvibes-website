"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Rocket, BadgeCheck, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DeveloperProfile } from "@/types/database";

interface DeveloperCardProps {
  developer: DeveloperProfile;
  index?: number;
}

export function DeveloperCard({ developer, index = 0 }: DeveloperCardProps) {
  const user = developer.user as { name?: string; avatar_url?: string; location?: string } | undefined;
  const isAvailable = developer.availability === "available";

  // Format hourly rate
  const formatRate = () => {
    if (!developer.hourly_rate) return "Contact for rate";
    return `$${(developer.hourly_rate / 100).toLocaleString()}/hr`;
  };

  const skillsToShow = developer.skills?.slice(0, 4) || [];
  const remainingSkills = (developer.skills?.length || 0) - 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/developers/${developer.id}`} className="block">
        <article className="marketplace-card group">
          {/* Avatar Section */}
          <div className="marketplace-card-image flex items-center justify-center p-6">
            <div className="relative">
              <div className={isAvailable ? "availability-ring" : "availability-ring-busy"}>
                <Avatar className="w-24 h-24 border-4 border-background-pure">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback className="text-2xl bg-surface">
                    {user?.name?.charAt(0) || "D"}
                  </AvatarFallback>
                </Avatar>
              </div>
              {developer.verified && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            {/* Rating below avatar */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-text-primary">
                  {developer.rating?.toFixed(2) || "New"}
                </span>
              </div>
              {developer.reviews_count > 0 && (
                <span className="text-xs text-text-muted">
                  ({developer.reviews_count} reviews)
                </span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="marketplace-card-content">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                {user?.name || "Developer"}
              </h3>
              <span
                className={`flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${
                  isAvailable
                    ? "bg-success-light text-green-700"
                    : "bg-warning-light text-amber-700"
                }`}
              >
                {isAvailable ? "Available" : "Busy"}
              </span>
            </div>

            {/* Headline */}
            <p className="text-sm font-medium text-text-secondary mb-2 line-clamp-1">
              {developer.headline}
            </p>

            {/* Location */}
            {user?.location && (
              <div className="flex items-center gap-1 text-sm text-text-muted mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.location}</span>
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4 flex-grow">
              {skillsToShow.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 text-primary-dark"
                >
                  {skill}
                </span>
              ))}
              {remainingSkills > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface text-text-muted">
                  +{remainingSkills} more
                </span>
              )}
            </div>

            {/* Footer Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
              <span className="font-semibold text-primary">
                {formatRate()}
              </span>
              <div className="flex items-center gap-1 text-text-muted">
                <Rocket className="w-3.5 h-3.5" />
                <span>{developer.launches_completed || 0} launches</span>
              </div>
              {developer.verified && (
                <div className="flex items-center gap-1 text-primary ml-auto">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
