"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeveloperCard } from "@/components/marketplace";
import { useDevelopers } from "@/hooks/useDevelopers";

export function TopDevelopers() {
  const { developers, isLoading } = useDevelopers({ verified_only: true });
  const topDevelopers = developers.slice(0, 4);

  return (
    <section className="py-8 border-t border-border">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Top Developers
          </h2>
          <Link
            href="/developers"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Developers List */}
        <div className="space-y-3">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="marketplace-card">
                  <div className="marketplace-card-image bg-surface" />
                  <div className="marketplace-card-content space-y-2">
                    <div className="h-4 w-1/3 bg-surface rounded" />
                    <div className="h-3 w-1/2 bg-surface rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : topDevelopers.length > 0 ? (
            topDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))
          ) : (
            <div className="text-center py-8 border border-border rounded bg-surface">
              <Users className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-secondary mb-3">
                No developers yet
              </p>
              <Button size="sm" asChild>
                <Link href="/signup?role=developer">Join as Developer</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
