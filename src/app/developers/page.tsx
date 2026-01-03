"use client";

export const dynamic = "force-dynamic";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeveloperCard, FilterSidebar, SortDropdown } from "@/components/marketplace";
import { useDevelopers } from "@/hooks/useDevelopers";

const skillOptions = [
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Go", label: "Go" },
  { value: "AWS", label: "AWS" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Supabase", label: "Supabase" },
  { value: "React Native", label: "React Native" },
  { value: "Flutter", label: "Flutter" },
  { value: "OpenAI API", label: "AI/ML" },
];

const availabilityOptions = [
  { value: "available", label: "Available Now" },
  { value: "busy", label: "Limited Availability" },
];

const rateOptions = [
  { value: "under_100", label: "Under $100/hr" },
  { value: "100_150", label: "$100 - $150/hr" },
  { value: "over_150", label: "Over $150/hr" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "launches", label: "Most Launches" },
  { value: "rate_low", label: "Lowest Rate" },
  { value: "rate_high", label: "Highest Rate" },
  { value: "newest", label: "Newest" },
];

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    skills: [],
    availability: [],
    rate: [],
  });

  // Build filters for the hook
  const filters = useMemo(
    () => ({
      search: searchQuery || undefined,
      skills: selectedFilters.skills.length > 0 ? selectedFilters.skills : undefined,
      availability: selectedFilters.availability.length > 0
        ? (selectedFilters.availability[0] as "available" | "busy")
        : undefined,
      verified_only: false,
    }),
    [searchQuery, selectedFilters]
  );

  // Fetch developers from database
  const { developers, isLoading, totalCount } = useDevelopers(filters);

  // Sort and filter developers client-side
  const sortedDevelopers = useMemo(() => {
    let filtered = [...developers];

    // Apply rate filter client-side
    if (selectedFilters.rate.length > 0) {
      filtered = filtered.filter((dev) => {
        const rate = dev.hourly_rate ? dev.hourly_rate / 100 : 0;
        return selectedFilters.rate.some((r) => {
          switch (r) {
            case "under_100":
              return rate < 100;
            case "100_150":
              return rate >= 100 && rate <= 150;
            case "over_150":
              return rate > 150;
            default:
              return true;
          }
        });
      });
    }

    // Sort
    switch (sortBy) {
      case "launches":
        return filtered.sort((a, b) => (b.launches_completed || 0) - (a.launches_completed || 0));
      case "rate_low":
        return filtered.sort((a, b) => (a.hourly_rate || Infinity) - (b.hourly_rate || Infinity));
      case "rate_high":
        return filtered.sort((a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0));
      case "newest":
        return filtered.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "rating":
      default:
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [developers, sortBy, selectedFilters.rate]);

  const handleFilterChange = (sectionId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [sectionId]: values,
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedFilters({ skills: [], availability: [], rate: [] });
  };

  const filterSections = [
    { id: "skills", title: "Skills", options: skillOptions, type: "multi" as const },
    { id: "availability", title: "Availability", options: availabilityOptions, type: "single" as const },
    { id: "rate", title: "Hourly Rate", options: rateOptions, type: "multi" as const },
  ];

  return (
    <PageLayout>
      {/* Hero Header */}
      <section className="pt-28 pb-8 bg-gradient-to-b from-primary-50 to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              Find Developers
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              Browse verified developers ready to help launch your vibe-coded app.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <Input
                type="search"
                placeholder="Search by name, skills, or headline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-background-pure border-border shadow-sm"
              />
            </div>
          </motion.div>
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
              resultsLabel="developers"
            />

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-muted">
                  Showing <span className="font-semibold text-text-primary">{sortedDevelopers.length}</span> developers
                </p>
                <SortDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="space-y-4">
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
                </div>
              )}

              {/* Results List */}
              {!isLoading && sortedDevelopers.length > 0 && (
                <div className="space-y-4">
                  {sortedDevelopers.map((developer, index) => (
                    <DeveloperCard key={developer.id} developer={developer} index={index} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && sortedDevelopers.length === 0 && (
                <div className="text-center py-16 bg-background-pure rounded-xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No developers found
                  </h3>
                  <p className="text-text-secondary mb-6 max-w-sm mx-auto">
                    Try adjusting your search or filters to find developers.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
