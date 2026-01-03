"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const successStories = [
  {
    id: "1",
    title: "Recipe App Goes from MVP to 10K Users",
    description:
      "Sarah's AI recipe app was built in a weekend with Cursor, but needed production polish. Jordan helped refactor the codebase and deploy to app stores. Three months later, 10,000 active users.",
    before: "Buggy MVP with 50 beta testers",
    after: "Polished app with 10K+ users",
    metrics: {
      users: "10,000+",
      timeline: "6 weeks",
      deal: "$3,500 fixed",
    },
    owner: {
      name: "Sarah Chen",
      avatar_url: null,
    },
    developer: {
      name: "Jordan Mitchell",
      avatar_url: null,
    },
    quote:
      "I never thought my weekend project would become a real product. Jordan understood exactly what I needed and delivered beyond expectations.",
  },
  {
    id: "2",
    title: "Invoice Tool Closes First Enterprise Deal",
    description:
      "Marcus had a working prototype but enterprise clients needed better security and Stripe integration. The equity partnership meant both parties were invested in success.",
    before: "Basic invoicing for freelancers",
    after: "Enterprise-ready with Stripe",
    metrics: {
      revenue: "$15K MRR",
      timeline: "3 months",
      deal: "15% equity",
    },
    owner: {
      name: "Marcus Johnson",
      avatar_url: null,
    },
    developer: {
      name: "Aisha Patel",
      avatar_url: null,
    },
    quote:
      "The equity deal aligned our interests perfectly. Aisha treated my app like her own because she had skin in the game.",
  },
];

export function SuccessStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            From Vibe-Coded to Launched
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-secondary"
          >
            Real stories from founders who turned their AI-built prototypes into
            successful products.
          </motion.p>
        </div>

        {/* Stories */}
        <div ref={ref} className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-surface border border-border rounded-2xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Before/After Column */}
                <div className="lg:col-span-2 p-8 bg-gradient-to-br from-primary-50 to-surface">
                  <div className="h-full flex flex-col">
                    {/* Before */}
                    <div className="flex-1 pb-6 border-b border-border/50">
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                        Before
                      </span>
                      <p className="mt-2 text-text-secondary">{story.before}</p>
                    </div>

                    {/* Arrow */}
                    <div className="py-4 flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white rotate-90 lg:rotate-0" />
                      </div>
                    </div>

                    {/* After */}
                    <div className="flex-1 pt-2">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        After
                      </span>
                      <p className="mt-2 text-text-primary font-medium">
                        {story.after}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-3 gap-4">
                      {story.metrics.users && (
                        <div className="text-center">
                          <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-sm font-semibold text-text-primary">
                            {story.metrics.users}
                          </div>
                          <div className="text-xs text-text-muted">Users</div>
                        </div>
                      )}
                      {story.metrics.revenue && (
                        <div className="text-center">
                          <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-sm font-semibold text-text-primary">
                            {story.metrics.revenue}
                          </div>
                          <div className="text-xs text-text-muted">Revenue</div>
                        </div>
                      )}
                      <div className="text-center">
                        <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="text-sm font-semibold text-text-primary">
                          {story.metrics.timeline}
                        </div>
                        <div className="text-xs text-text-muted">Timeline</div>
                      </div>
                      <div className="text-center">
                        <div className="w-5 h-5 mx-auto mb-1 flex items-center justify-center text-primary font-bold text-xs">
                          $
                        </div>
                        <div className="text-sm font-semibold text-text-primary">
                          {story.metrics.deal}
                        </div>
                        <div className="text-xs text-text-muted">Deal</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content Column */}
                <div className="lg:col-span-3 p-8 flex flex-col">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    {story.title}
                  </h3>
                  <p className="text-text-secondary mb-6">{story.description}</p>

                  {/* Quote */}
                  <div className="flex-1 flex items-center">
                    <div className="relative bg-background rounded-xl p-6 border border-border">
                      <Quote className="absolute -top-3 -left-3 w-8 h-8 text-primary bg-surface rounded-full p-1.5" />
                      <p className="text-text-secondary italic mb-4">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={story.owner.avatar_url || undefined}
                          />
                          <AvatarFallback>
                            {getInitials(story.owner.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-text-primary text-sm">
                            {story.owner.name}
                          </div>
                          <div className="text-xs text-text-muted">Founder</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collaboration */}
                  <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
                    <span className="text-sm text-text-muted">Worked with:</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={story.developer.avatar_url || undefined}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(story.developer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-text-primary">
                        {story.developer.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
