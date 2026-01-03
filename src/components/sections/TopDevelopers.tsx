"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, CheckCircle2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// Demo data - will be replaced with real data from Supabase
const topDevelopers = [
  {
    id: "1",
    user: {
      name: "Jordan Mitchell",
      avatar_url: null,
    },
    headline: "Full-Stack Developer | React & Node.js Expert",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    hourly_rate: 85,
    launches_completed: 23,
    rating: 4.9,
    reviews_count: 47,
    verified: true,
  },
  {
    id: "2",
    user: {
      name: "Aisha Patel",
      avatar_url: null,
    },
    headline: "Mobile App Specialist | Flutter & React Native",
    skills: ["Flutter", "React Native", "Firebase", "iOS"],
    hourly_rate: 95,
    launches_completed: 18,
    rating: 5.0,
    reviews_count: 31,
    verified: true,
  },
  {
    id: "3",
    user: {
      name: "Carlos Rodriguez",
      avatar_url: null,
    },
    headline: "DevOps & Deployment Expert | AWS & Vercel",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    hourly_rate: 110,
    launches_completed: 34,
    rating: 4.8,
    reviews_count: 62,
    verified: true,
  },
  {
    id: "4",
    user: {
      name: "Emma Nakamura",
      avatar_url: null,
    },
    headline: "AI/ML Integration Specialist | Python & OpenAI",
    skills: ["Python", "OpenAI", "LangChain", "FastAPI"],
    hourly_rate: 120,
    launches_completed: 15,
    rating: 4.9,
    reviews_count: 28,
    verified: true,
  },
];

export function TopDevelopers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-surface">
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
              Top Developers
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Verified Experts Ready to Help
            </motion.h2>
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

        {/* Developers Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDevelopers.map((dev, index) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/developers/${dev.id}`} className="block group">
                <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-20 h-20 ring-4 ring-background shadow-lg">
                      <AvatarImage src={dev.user.avatar_url || undefined} />
                      <AvatarFallback className="text-xl">
                        {getInitials(dev.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    {dev.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Name & Headline */}
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                    {dev.user.name}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {dev.headline}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {dev.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{dev.rating}</span>
                      <span className="text-text-muted">({dev.reviews_count})</span>
                    </span>
                    <span className="flex items-center gap-1 text-text-secondary">
                      <Rocket className="w-4 h-4 text-primary" />
                      <span>{dev.launches_completed} launches</span>
                    </span>
                  </div>

                  {/* Rate */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-lg font-semibold text-text-primary">
                      ${dev.hourly_rate}
                    </span>
                    <span className="text-sm text-text-muted">/hour</span>
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
