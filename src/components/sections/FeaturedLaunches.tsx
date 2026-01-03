"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaunchCard } from "@/components/marketplace";
import { useLaunches } from "@/hooks/useLaunches";

export function FeaturedLaunches() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fetch featured launches from database
  const { launches, isLoading } = useLaunches({});

  // Get top 4 launches
  const featuredLaunches = launches.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Flame className="w-4 h-4" />
                Hot Right Now
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Featured Launches
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-text-secondary mt-2"
            >
              Vibe-coded apps looking for their launch partner
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <Link href="/launches">
                Browse All Launches
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Launches List */}
        <div ref={ref} className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="marketplace-card animate-pulse">
                  <div className="marketplace-card-image" />
                  <div className="marketplace-card-content space-y-3">
                    <div className="h-6 w-3/4 bg-surface rounded" />
                    <div className="h-4 w-1/2 bg-surface rounded" />
                    <div className="h-16 w-full bg-surface rounded" />
                    <div className="h-4 w-1/3 bg-surface rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : featuredLaunches.length > 0 ? (
            featuredLaunches.map((launch, index) => (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <LaunchCard launch={launch} index={index} />
              </motion.div>
            ))
          ) : (
            // Empty state
            <div className="text-center py-12 bg-surface rounded-xl">
              <TrendingUp className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No launches yet
              </h3>
              <p className="text-text-secondary mb-4">
                Be the first to post a launch and connect with developers.
              </p>
              <Button asChild>
                <Link href="/post-launch">Post a Launch</Link>
              </Button>
            </div>
          )}
        </div>

        {/* View More CTA */}
        {featuredLaunches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Button size="lg" asChild>
              <Link href="/launches">
                View All {launches.length}+ Launches
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
