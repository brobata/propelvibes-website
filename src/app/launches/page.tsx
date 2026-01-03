"use client";

export const dynamic = "force-dynamic";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  DollarSign,
  Code,
  X,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, formatCurrency } from "@/lib/utils";
import { useLaunches } from "@/hooks/useLaunches";
import type { ServiceCategory, DealType } from "@/types/database";

const serviceOptions: { value: ServiceCategory; label: string }[] = [
  { value: "code_cleanup", label: "Code Cleanup" },
  { value: "feature_development", label: "Features" },
  { value: "bug_fixes", label: "Bug Fixes" },
  { value: "deployment", label: "Deployment" },
  { value: "design", label: "Design" },
  { value: "testing", label: "Testing" },
  { value: "scaling", label: "Scaling" },
];

const dealOptions: { value: DealType; label: string }[] = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly" },
  { value: "equity", label: "Equity" },
  { value: "hybrid", label: "Hybrid" },
];

const serviceLabels: Record<string, string> = {
  code_cleanup: "Code Cleanup",
  feature_development: "Features",
  bug_fixes: "Bug Fixes",
  deployment: "Deployment",
  design: "Design",
  testing: "Testing",
  scaling: "Scaling",
  full_launch: "Full Launch",
};

export default function LaunchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<DealType[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Build filters object
  const filters = useMemo(() => ({
    search: searchQuery || undefined,
    services: selectedServices.length > 0 ? selectedServices : undefined,
    deal_types: selectedDeals.length > 0 ? selectedDeals : undefined,
  }), [searchQuery, selectedServices, selectedDeals]);

  // Fetch launches from Supabase
  const { launches, isLoading, totalCount } = useLaunches(filters);

  const toggleService = (service: ServiceCategory) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const toggleDeal = (deal: DealType) => {
    setSelectedDeals((prev) =>
      prev.includes(deal) ? prev.filter((d) => d !== deal) : [...prev, deal]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedServices([]);
    setSelectedDeals([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedServices.length > 0 || selectedDeals.length > 0;

  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-28 pb-12 bg-surface border-b border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Browse Launches
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Explore vibe-coded apps looking for developers. Find projects that match
              your skills and make an offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-background border-b border-border py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <Input
                type="search"
                placeholder="Search by title, description, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {selectedServices.length + selectedDeals.length}
                </span>
              )}
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="flex flex-wrap gap-6">
                {/* Services */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Services Needed
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.value}
                        onClick={() => toggleService(service.value)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedServices.includes(service.value)
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-text-secondary border-border hover:border-primary"
                        }`}
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deal Types */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Deal Types
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dealOptions.map((deal) => (
                      <button
                        key={deal.value}
                        onClick={() => toggleDeal(deal.value)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedDeals.includes(deal.value)
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-text-secondary border-border hover:border-primary"
                        }`}
                      >
                        {deal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {hasActiveFilters && (
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-text-muted"
                    >
                      <X className="w-4 h-4" />
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-surface rounded-t-xl" />
                  <div className="p-5 bg-background border border-border border-t-0 rounded-b-xl space-y-3">
                    <div className="h-5 w-3/4 bg-surface rounded" />
                    <div className="h-4 w-full bg-surface rounded" />
                    <div className="h-4 w-2/3 bg-surface rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && (
            <p className="text-sm text-text-muted mb-6">
              Showing {launches.length} of {totalCount} launches
            </p>
          )}

          {/* Grid */}
          {!isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launches.map((launch, index) => (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/launches/${launch.slug}`} className="block group">
                  <div className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    {/* Screenshot Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-surface to-surface-hover relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-12 h-12 text-text-muted/30" />
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                          {launch.title}
                        </h3>
                        <Avatar className="w-7 h-7 shrink-0">
                          <AvatarImage src={launch.owner?.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(launch.owner?.name || "User")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                        {launch.short_description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {launch.tech_stack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {launch.services_needed.slice(0, 2).map((service) => (
                          <Badge key={service} variant="primary" className="text-xs">
                            {serviceLabels[service] || service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted pt-4 border-t border-border">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {launch.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {launch.proposals_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-text-secondary">
                          <DollarSign className="w-4 h-4" />
                          {launch.budget_min && launch.budget_max ? (
                            <span>
                              {formatCurrency(launch.budget_min / 100)} - {formatCurrency(launch.budget_max / 100)}
                            </span>
                          ) : launch.equity_offered ? (
                            <span>{launch.equity_offered}% Equity</span>
                          ) : (
                            <span>Open to offers</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          )}

          {/* Empty State */}
          {!isLoading && launches.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No launches found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
