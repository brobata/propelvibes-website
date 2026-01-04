"use client";

export const dynamic = "force-dynamic";

import React, { useState, useMemo } from "react";
import { Search, ArrowRight, Rocket, Code2, Sparkles } from "lucide-react";
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
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-background pt-8 pb-10">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              Where Dreamers Ship
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              Connect your AI-built app with developers who can take it to production
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/post-launch">
                  <Rocket className="w-5 h-5" />
                  Post Your Launch
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/developers">
                  <Code2 className="w-5 h-5" />
                  Find Developers
                </Link>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <Input
                type="search"
                placeholder="Search launches by title, tech stack, or budget..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-background-pure border-border shadow-sm rounded-xl"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span><strong className="text-text-primary">{totalCount}</strong> active launches</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span><strong className="text-text-primary">{topDevelopers.length}+</strong> verified developers</span>
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
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Latest Launches</h2>
                  <p className="text-sm text-text-secondary mt-0.5">
                    Apps looking for their perfect developer match
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
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="marketplace-card">
                      <div className="marketplace-card-image bg-surface" />
                      <div className="marketplace-card-content space-y-2">
                        <div className="h-4 w-2/3 bg-surface rounded" />
                        <div className="h-3 w-1/3 bg-surface rounded" />
                        <div className="h-10 w-full bg-surface rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Results List */}
              {!isLoading && sortedLaunches.length > 0 && (
                <div className="space-y-3">
                  {sortedLaunches.map((launch) => (
                    <LaunchCard key={launch.id} launch={launch} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && sortedLaunches.length === 0 && (
                <div className="text-center py-12 border border-border rounded bg-surface">
                  <p className="text-text-secondary mb-3">
                    No launches found matching your criteria.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Top Developers Section */}
              {!isLoading && sortedLaunches.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-text-primary">Top Developers</h2>
                      <p className="text-sm text-text-secondary mt-0.5">
                        Verified pros ready to bring your vision to life
                      </p>
                    </div>
                    <Link
                      href="/developers"
                      className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1"
                    >
                      View all developers
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {developersLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="marketplace-card">
                          <div className="marketplace-card-image bg-surface" />
                          <div className="marketplace-card-content space-y-2">
                            <div className="h-4 w-1/3 bg-surface rounded" />
                            <div className="h-3 w-1/2 bg-surface rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : topDevelopers.length > 0 ? (
                    <div className="space-y-3">
                      {topDevelopers.slice(0, 3).map((developer) => (
                        <DeveloperCard key={developer.id} developer={developer} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-border rounded bg-surface">
                      <p className="text-sm text-text-muted">No developers yet</p>
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
