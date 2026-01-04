"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaunchCard } from "@/components/marketplace";
import { useLaunches } from "@/hooks/useLaunches";

export function FeaturedLaunches() {
  const { launches, isLoading } = useLaunches({});
  const featuredLaunches = launches.slice(0, 4);

  return (
    <section className="py-6">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Featured Launches
          </h2>
          <Link
            href="/launches"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Launches List */}
        <div className="space-y-3">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="marketplace-card">
                  <div className="marketplace-card-image bg-surface" />
                  <div className="marketplace-card-content space-y-2">
                    <div className="h-4 w-2/3 bg-surface rounded" />
                    <div className="h-3 w-1/3 bg-surface rounded" />
                    <div className="h-10 w-full bg-surface rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : featuredLaunches.length > 0 ? (
            featuredLaunches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))
          ) : (
            <div className="text-center py-8 border border-border rounded bg-surface">
              <TrendingUp className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-secondary mb-3">
                No launches yet
              </p>
              <Button size="sm" asChild>
                <Link href="/post-launch">Post a Launch</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
