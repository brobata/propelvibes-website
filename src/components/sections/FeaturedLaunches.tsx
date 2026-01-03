"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Eye, MessageSquare, DollarSign, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// Demo data - will be replaced with real data from Supabase
const featuredLaunches = [
  {
    id: "1",
    title: "AI Recipe Generator",
    short_description:
      "A mobile app that generates personalized recipes based on ingredients you have. Built with React Native and Claude API. Needs help with deployment and polishing the UI.",
    screenshot_url: "/placeholder-app-1.png",
    tech_stack: ["React Native", "Claude API", "Supabase"],
    services_needed: ["deployment", "design"],
    deal_types_accepted: ["fixed", "hourly"],
    budget_min: 500,
    budget_max: 2000,
    views: 234,
    proposals_count: 8,
    owner: {
      name: "Sarah Chen",
      avatar_url: null,
    },
  },
  {
    id: "2",
    title: "Freelancer Invoice Tool",
    short_description:
      "Invoice management SaaS for freelancers. Has core functionality working but needs payment integration, PDF export, and bug fixes before launch.",
    screenshot_url: "/placeholder-app-2.png",
    tech_stack: ["Next.js", "Stripe", "PostgreSQL"],
    services_needed: ["feature-development", "bug-fixes"],
    deal_types_accepted: ["equity", "hybrid"],
    equity_offered: 15,
    views: 456,
    proposals_count: 12,
    owner: {
      name: "Marcus Johnson",
      avatar_url: null,
    },
  },
  {
    id: "3",
    title: "Habit Tracker with AI Coach",
    short_description:
      "Daily habit tracking app with an AI coach that provides personalized motivation. Core app works, needs scaling optimization and App Store submission help.",
    screenshot_url: "/placeholder-app-3.png",
    tech_stack: ["Flutter", "Firebase", "OpenAI"],
    services_needed: ["scaling", "deployment"],
    deal_types_accepted: ["fixed"],
    budget_min: 1500,
    budget_max: 4000,
    views: 189,
    proposals_count: 5,
    owner: {
      name: "Emily Rodriguez",
      avatar_url: null,
    },
  },
  {
    id: "4",
    title: "Local Business Directory",
    short_description:
      "Neighborhood-focused business directory with reviews and booking. MVP is live but code needs major refactoring before adding more features.",
    screenshot_url: "/placeholder-app-4.png",
    tech_stack: ["Vue.js", "Node.js", "MongoDB"],
    services_needed: ["code-cleanup", "feature-development"],
    deal_types_accepted: ["hourly", "equity"],
    budget_min: 50,
    budget_max: 75,
    views: 312,
    proposals_count: 9,
    owner: {
      name: "David Kim",
      avatar_url: null,
    },
  },
  {
    id: "5",
    title: "Pet Care Scheduling App",
    short_description:
      "App connecting pet owners with local pet sitters. Has matching algorithm working, needs payment processing and notification system.",
    screenshot_url: "/placeholder-app-5.png",
    tech_stack: ["React", "Express", "Twilio"],
    services_needed: ["feature-development", "testing"],
    deal_types_accepted: ["fixed", "hybrid"],
    budget_min: 2000,
    budget_max: 5000,
    views: 278,
    proposals_count: 7,
    owner: {
      name: "Lisa Patel",
      avatar_url: null,
    },
  },
  {
    id: "6",
    title: "Podcast Transcript Search",
    short_description:
      "Search engine for podcast transcripts using AI. Proof of concept works but needs production-ready architecture and better search performance.",
    screenshot_url: "/placeholder-app-6.png",
    tech_stack: ["Python", "FastAPI", "Pinecone"],
    services_needed: ["scaling", "code-cleanup"],
    deal_types_accepted: ["equity"],
    equity_offered: 25,
    views: 567,
    proposals_count: 15,
    owner: {
      name: "Alex Thompson",
      avatar_url: null,
    },
  },
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

export function FeaturedLaunches() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
            >
              Featured Launches
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Apps Looking for Developers
            </motion.h2>
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

        {/* Launches Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLaunches.map((launch, index) => (
            <motion.div
              key={launch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/launches/${launch.id}`} className="block group">
                <div className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Screenshot Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-surface to-surface-hover relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="w-12 h-12 text-text-muted/30" />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Owner */}
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

                    {/* Description */}
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                      {launch.short_description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {launch.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Services Needed */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {launch.services_needed.slice(0, 2).map((service) => (
                        <Badge key={service} variant="primary" className="text-xs">
                          {serviceLabels[service] || service}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer Stats */}
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
      </div>
    </section>
  );
}
