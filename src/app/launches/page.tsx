"use client";

import React, { useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// Demo data
const allLaunches = [
  {
    id: "1",
    title: "AI Recipe Generator",
    short_description:
      "A mobile app that generates personalized recipes based on ingredients you have. Built with React Native and Claude API.",
    tech_stack: ["React Native", "Claude API", "Supabase"],
    services_needed: ["deployment", "design"],
    deal_types: ["fixed", "hourly"],
    budget_min: 500,
    budget_max: 2000,
    views: 234,
    proposals_count: 8,
    owner: { name: "Sarah Chen", avatar_url: null },
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Freelancer Invoice Tool",
    short_description:
      "Invoice management SaaS for freelancers. Has core functionality working but needs payment integration.",
    tech_stack: ["Next.js", "Stripe", "PostgreSQL"],
    services_needed: ["feature-development", "bug-fixes"],
    deal_types: ["equity", "hybrid"],
    equity_offered: 15,
    views: 456,
    proposals_count: 12,
    owner: { name: "Marcus Johnson", avatar_url: null },
    created_at: "2024-01-14",
  },
  {
    id: "3",
    title: "Habit Tracker with AI Coach",
    short_description:
      "Daily habit tracking app with an AI coach that provides personalized motivation.",
    tech_stack: ["Flutter", "Firebase", "OpenAI"],
    services_needed: ["scaling", "deployment"],
    deal_types: ["fixed"],
    budget_min: 1500,
    budget_max: 4000,
    views: 189,
    proposals_count: 5,
    owner: { name: "Emily Rodriguez", avatar_url: null },
    created_at: "2024-01-13",
  },
  {
    id: "4",
    title: "Local Business Directory",
    short_description:
      "Neighborhood-focused business directory with reviews and booking. MVP is live but code needs refactoring.",
    tech_stack: ["Vue.js", "Node.js", "MongoDB"],
    services_needed: ["code-cleanup", "feature-development"],
    deal_types: ["hourly", "equity"],
    budget_min: 50,
    budget_max: 75,
    views: 312,
    proposals_count: 9,
    owner: { name: "David Kim", avatar_url: null },
    created_at: "2024-01-12",
  },
  {
    id: "5",
    title: "Pet Care Scheduling App",
    short_description:
      "App connecting pet owners with local pet sitters. Has matching algorithm working.",
    tech_stack: ["React", "Express", "Twilio"],
    services_needed: ["feature-development", "testing"],
    deal_types: ["fixed", "hybrid"],
    budget_min: 2000,
    budget_max: 5000,
    views: 278,
    proposals_count: 7,
    owner: { name: "Lisa Patel", avatar_url: null },
    created_at: "2024-01-11",
  },
  {
    id: "6",
    title: "Podcast Transcript Search",
    short_description:
      "Search engine for podcast transcripts using AI. Proof of concept works.",
    tech_stack: ["Python", "FastAPI", "Pinecone"],
    services_needed: ["scaling", "code-cleanup"],
    deal_types: ["equity"],
    equity_offered: 25,
    views: 567,
    proposals_count: 15,
    owner: { name: "Alex Thompson", avatar_url: null },
    created_at: "2024-01-10",
  },
  {
    id: "7",
    title: "E-commerce Dashboard",
    short_description:
      "Analytics dashboard for Shopify stores. Built with Cursor, needs performance optimization.",
    tech_stack: ["Next.js", "Shopify API", "Chart.js"],
    services_needed: ["scaling", "bug-fixes"],
    deal_types: ["fixed", "hourly"],
    budget_min: 1000,
    budget_max: 3000,
    views: 423,
    proposals_count: 11,
    owner: { name: "Jordan Lee", avatar_url: null },
    created_at: "2024-01-09",
  },
  {
    id: "8",
    title: "Virtual Study Room",
    short_description:
      "Pomodoro-style study rooms with video chat for students. Core features done, needs polishing.",
    tech_stack: ["React", "WebRTC", "Socket.io"],
    services_needed: ["design", "deployment"],
    deal_types: ["hybrid"],
    budget_min: 800,
    budget_max: 2500,
    views: 198,
    proposals_count: 6,
    owner: { name: "Priya Sharma", avatar_url: null },
    created_at: "2024-01-08",
  },
];

const serviceOptions = [
  { value: "code-cleanup", label: "Code Cleanup" },
  { value: "feature-development", label: "Features" },
  { value: "bug-fixes", label: "Bug Fixes" },
  { value: "deployment", label: "Deployment" },
  { value: "design", label: "Design" },
  { value: "testing", label: "Testing" },
  { value: "scaling", label: "Scaling" },
];

const dealOptions = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly" },
  { value: "equity", label: "Equity" },
  { value: "hybrid", label: "Hybrid" },
];

const serviceLabels: Record<string, string> = {
  "code-cleanup": "Code Cleanup",
  "feature-development": "Features",
  "bug-fixes": "Bug Fixes",
  deployment: "Deployment",
  design: "Design",
  testing: "Testing",
  scaling: "Scaling",
  "full-launch": "Full Launch",
};

export default function LaunchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter launches
  const filteredLaunches = allLaunches.filter((launch) => {
    const matchesSearch =
      searchQuery === "" ||
      launch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      launch.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      launch.tech_stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesServices =
      selectedServices.length === 0 ||
      launch.services_needed.some((s) => selectedServices.includes(s));

    const matchesDeals =
      selectedDeals.length === 0 ||
      launch.deal_types.some((d) => selectedDeals.includes(d));

    return matchesSearch && matchesServices && matchesDeals;
  });

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const toggleDeal = (deal: string) => {
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
          {/* Results Count */}
          <p className="text-sm text-text-muted mb-6">
            Showing {filteredLaunches.length} of {allLaunches.length} launches
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLaunches.map((launch, index) => (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/launches/${launch.id}`} className="block group">
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
                          <AvatarImage src={launch.owner.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(launch.owner.name)}
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
                              ${launch.budget_min.toLocaleString()} - $
                              {launch.budget_max.toLocaleString()}
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

          {/* Empty State */}
          {filteredLaunches.length === 0 && (
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
