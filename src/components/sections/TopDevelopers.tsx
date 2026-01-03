"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeveloperCard } from "@/components/marketplace";
import { useDevelopers } from "@/hooks/useDevelopers";

export function TopDevelopers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fetch top developers from database
  const { developers, isLoading } = useDevelopers({ verified_only: true });

  // Get top 4 developers
  const topDevelopers = developers.slice(0, 4);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-primary-50/30">
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-dark text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Verified Experts
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Top Developers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-text-secondary mt-2"
            >
              Ready to turn your vibe-coded app into reality
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <Link href="/developers">
                Browse All Developers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Developers List */}
        <div ref={ref} className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="marketplace-card animate-pulse">
                  <div className="marketplace-card-image flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-surface" />
                  </div>
                  <div className="marketplace-card-content space-y-3">
                    <div className="h-6 w-1/2 bg-surface rounded" />
                    <div className="h-4 w-3/4 bg-surface rounded" />
                    <div className="h-4 w-1/4 bg-surface rounded" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-surface rounded-full" />
                      <div className="h-6 w-16 bg-surface rounded-full" />
                      <div className="h-6 w-16 bg-surface rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : topDevelopers.length > 0 ? (
            topDevelopers.map((developer, index) => (
              <motion.div
                key={developer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <DeveloperCard developer={developer} index={index} />
              </motion.div>
            ))
          ) : (
            // Empty state
            <div className="text-center py-12 bg-background-pure rounded-xl border border-border">
              <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No developers yet
              </h3>
              <p className="text-text-secondary mb-4">
                Be the first developer to join and help launch vibe-coded apps.
              </p>
              <Button asChild>
                <Link href="/signup?role=developer">Join as Developer</Link>
              </Button>
            </div>
          )}
        </div>

        {/* View More CTA */}
        {topDevelopers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Button size="lg" asChild>
              <Link href="/developers">
                View All {developers.length}+ Developers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
