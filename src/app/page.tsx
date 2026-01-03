"use client";

export const dynamic = "force-dynamic";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Rocket, Users, ArrowRight, Flame, Star } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LaunchCard, DeveloperCard, FilterSidebar, SortDropdown } from "@/components/marketplace";
import { useLaunches } from "@/hooks/useLaunches";
import { useDevelopers } from "@/hooks/useDevelopers";
import type { ServiceCategory, DealType } from "@/types/database";

const serviceOptions = [
  { value: "code_cleanup", label: "Code Cleanup" },
  { value: "feature_development", label: "Feature Development" },
  { value: "bug_fixes", label: "Bug Fixes" },
  { value: "deployment", label: "Deployment" },
  { value: "design", label: "Design" },
  { value: "testing", label: "Testing" },
  { value: "scaling", label: "Scaling" },
  { value: "full_launch", label: "Full Launch" },
];

const dealOptions = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly Rate" },
  { value: "equity", label: "Equity" },
  { value: "hybrid", label: "Hybrid Deal" },
];

const techStackOptions = [
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Supabase", label: "Supabase" },
  { value: "OpenAI API", label: "AI/ML" },
  { value: "React Native", label: "Mobile" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "proposals", label: "Most Proposals" },
  { value: "budget_high", label: "Highest Budget" },
  { value: "budget_low", label: "Lowest Budget" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    services: [],
    deals: [],
    tech: [],
  });

  // Build filters object for the hook
  const filters = useMemo(
    () => ({
      search: searchQuery || undefined,
      services: selectedFilters.services.length > 0
        ? (selectedFilters.services as ServiceCategory[])
        : undefined,
      deal_types: selectedFilters.deals.length > 0
        ? (selectedFilters.deals as DealType[])
        : undefined,
      tech_stack: selectedFilters.tech.length > 0
        ? selectedFilters.tech
        : undefined,
    }),
    [searchQuery, selectedFilters]
  );

  // Fetch launches
  const { launches, isLoading, totalCount } = useLaunches(filters);

  // Fetch top developers for sidebar
  const { developers: topDevelopers, isLoading: developersLoading } = useDevelopers({ verified_only: true });

  // Sort launches client-side
  const sortedLaunches = useMemo(() => {
    const sorted = [...launches];
    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      case "proposals":
        return sorted.sort((a, b) => (b.proposals_count || 0) - (a.proposals_count || 0));
      case "budget_high":
        return sorted.sort((a, b) => (b.budget_max || 0) - (a.budget_max || 0));
      case "budget_low":
        return sorted.sort((a, b) => (a.budget_min || Infinity) - (b.budget_min || Infinity));
      case "newest":
      default:
        return sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [launches, sortBy]);

  const handleFilterChange = (sectionId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [sectionId]: values,
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedFilters({ services: [], deals: [], tech: [] });
  };

  const filterSections = [
    { id: "services", title: "Services Needed", options: serviceOptions, type: "multi" as const },
    { id: "deals", title: "Deal Type", options: dealOptions, type: "multi" as const },
    { id: "tech", title: "Tech Stack", options: techStackOptions, type: "multi" as const },
  ];

  return (
    <PageLayout>
      {/* Compact Header with Search */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-primary-50 to-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title & Search */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Discover Launches
              </h1>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="search"
                  placeholder="Search launches by title, description, or tech stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-background-pure border-border shadow-sm"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/post-launch">
                  <Rocket className="w-5 h-5" />
                  Post a Launch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <FilterSidebar
              sections={filterSections}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              totalResults={totalCount}
              resultsLabel="launches"
            />

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    <Flame className="w-4 h-4" />
                    Hot Right Now
                  </span>
                  <p className="text-sm text-text-muted">
                    <span className="font-semibold text-text-primary">{sortedLaunches.length}</span> launches
                  </p>
                </div>
                <SortDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
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
                </div>
              )}

              {/* Results List */}
              {!isLoading && sortedLaunches.length > 0 && (
                <div className="space-y-4">
                  {sortedLaunches.map((launch, index) => (
                    <LaunchCard key={launch.id} launch={launch} index={index} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && sortedLaunches.length === 0 && (
                <div className="text-center py-16 bg-background-pure rounded-xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No launches found
                  </h3>
                  <p className="text-text-secondary mb-6 max-w-sm mx-auto">
                    Try adjusting your search or filters to find more projects.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Top Developers Section */}
              {!isLoading && sortedLaunches.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-dark text-sm font-medium">
                          <Star className="w-4 h-4 fill-current" />
                          Verified Experts
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-text-primary">
                        Top Developers
                      </h2>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/developers">
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {developersLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="marketplace-card animate-pulse">
                          <div className="marketplace-card-image flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-surface" />
                          </div>
                          <div className="marketplace-card-content space-y-3">
                            <div className="h-6 w-1/2 bg-surface rounded" />
                            <div className="h-4 w-3/4 bg-surface rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : topDevelopers.length > 0 ? (
                    <div className="space-y-4">
                      {topDevelopers.slice(0, 3).map((developer, index) => (
                        <DeveloperCard key={developer.id} developer={developer} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-surface rounded-xl">
                      <Users className="w-10 h-10 text-text-muted mx-auto mb-3" />
                      <p className="text-text-secondary">No developers yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
