"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, TrendingUp, Zap, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stats = [
  { value: "500+", label: "Launches Posted" },
  { value: "200+", label: "Verified Developers" },
  { value: "$2M+", label: "Value Transacted" },
];

const categories = [
  { label: "AI Apps", icon: Sparkles, href: "/launches?tech=OpenAI+API" },
  { label: "SaaS", icon: TrendingUp, href: "/launches?services=feature_development" },
  { label: "Mobile", icon: Zap, href: "/launches?tech=React+Native" },
  { label: "Web Apps", icon: Code2, href: "/launches?tech=Next.js" },
];

const trendingSearches = [
  "React Native",
  "AI integration",
  "Supabase",
  "Full launch",
  "Bug fixes",
];

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/launches?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTrendingClick = (term: string) => {
    router.push(`/launches?search=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-[25%] w-48 h-48 bg-primary-light/5 rounded-full blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-dark text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              The #1 Marketplace for Vibe-Coded Apps
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight mb-6"
          >
            Find the Perfect Developer
            <br />
            <span className="text-gradient">For Your App Launch</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            Browse hundreds of AI-built apps looking for developers, or showcase your skills to founders ready to launch.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-text-muted pointer-events-none" />
              <Input
                type="search"
                placeholder="Search launches, skills, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-32 h-14 text-base bg-background-pure border-2 border-border rounded-full shadow-lg focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 rounded-full px-6"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.form>

          {/* Trending Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-sm text-text-muted">Trending:</span>
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleTrendingClick(term)}
                className="px-3 py-1 text-sm bg-surface hover:bg-surface-hover text-text-secondary rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <Link
                key={category.label}
                href={category.href}
                className="group flex items-center gap-2 px-5 py-2.5 bg-background-pure border border-border rounded-full hover:border-primary hover:shadow-md transition-all"
              >
                <category.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                  {category.label}
                </span>
              </Link>
            ))}
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
