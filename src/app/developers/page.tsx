"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Rocket,
  X,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// Demo data
const allDevelopers = [
  {
    id: "1",
    user: { name: "Jordan Mitchell", avatar_url: null },
    headline: "Full-Stack Developer | React & Node.js Expert",
    bio: "10+ years building web apps. Specializing in helping vibe-coders ship production-ready products.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    hourly_rate: 85,
    availability: "available",
    launches_completed: 23,
    rating: 4.9,
    reviews_count: 47,
    verified: true,
  },
  {
    id: "2",
    user: { name: "Aisha Patel", avatar_url: null },
    headline: "Mobile App Specialist | Flutter & React Native",
    bio: "Former Google engineer. Expert at taking mobile MVPs from prototype to app store.",
    skills: ["Flutter", "React Native", "Firebase", "iOS", "Android"],
    hourly_rate: 95,
    availability: "available",
    launches_completed: 18,
    rating: 5.0,
    reviews_count: 31,
    verified: true,
  },
  {
    id: "3",
    user: { name: "Carlos Rodriguez", avatar_url: null },
    headline: "DevOps & Deployment Expert | AWS & Vercel",
    bio: "I help vibe-coded apps scale. Infrastructure, CI/CD, and monitoring are my specialties.",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes", "Terraform"],
    hourly_rate: 110,
    availability: "busy",
    launches_completed: 34,
    rating: 4.8,
    reviews_count: 62,
    verified: true,
  },
  {
    id: "4",
    user: { name: "Emma Nakamura", avatar_url: null },
    headline: "AI/ML Integration Specialist | Python & OpenAI",
    bio: "Making AI-powered features production-ready. From Claude to custom ML models.",
    skills: ["Python", "OpenAI", "LangChain", "FastAPI", "Vector DBs"],
    hourly_rate: 120,
    availability: "available",
    launches_completed: 15,
    rating: 4.9,
    reviews_count: 28,
    verified: true,
  },
  {
    id: "5",
    user: { name: "Michael Chen", avatar_url: null },
    headline: "Backend Architect | Scalable APIs & Databases",
    bio: "15 years of backend experience. I fix the spaghetti and make it scale.",
    skills: ["Go", "PostgreSQL", "Redis", "gRPC", "Microservices"],
    hourly_rate: 130,
    availability: "available",
    launches_completed: 41,
    rating: 4.7,
    reviews_count: 89,
    verified: true,
  },
  {
    id: "6",
    user: { name: "Sophie Williams", avatar_url: null },
    headline: "Frontend Developer | Design-to-Code Expert",
    bio: "I turn designs into pixel-perfect, accessible interfaces. Tailwind CSS enthusiast.",
    skills: ["React", "Next.js", "Tailwind CSS", "Figma", "Accessibility"],
    hourly_rate: 75,
    availability: "available",
    launches_completed: 29,
    rating: 4.9,
    reviews_count: 54,
    verified: true,
  },
  {
    id: "7",
    user: { name: "Raj Krishnan", avatar_url: null },
    headline: "Full-Stack Developer | Startup Specialist",
    bio: "Ex-YC founder. I know what it takes to ship fast and iterate. Open to equity deals.",
    skills: ["Next.js", "Supabase", "Stripe", "Vercel", "Product Strategy"],
    hourly_rate: 150,
    availability: "busy",
    launches_completed: 12,
    rating: 5.0,
    reviews_count: 19,
    verified: true,
  },
  {
    id: "8",
    user: { name: "Lisa Wang", avatar_url: null },
    headline: "QA & Testing Expert | Making Apps Reliable",
    bio: "Automated testing, manual QA, and bug hunting. I make sure your app works before launch.",
    skills: ["Playwright", "Jest", "Cypress", "Testing Strategy", "Bug Triage"],
    hourly_rate: 65,
    availability: "available",
    launches_completed: 38,
    rating: 4.8,
    reviews_count: 71,
    verified: true,
  },
];

const skillOptions = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flutter",
  "AWS",
  "TypeScript",
  "PostgreSQL",
];

const availabilityOptions = [
  { value: "available", label: "Available Now" },
  { value: "busy", label: "Limited Availability" },
];

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter developers
  const filteredDevelopers = allDevelopers.filter((dev) => {
    const matchesSearch =
      searchQuery === "" ||
      dev.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      dev.skills.some((s) => selectedSkills.includes(s));

    const matchesAvailability =
      selectedAvailability.length === 0 ||
      selectedAvailability.includes(dev.availability);

    const matchesVerified = !verifiedOnly || dev.verified;

    return matchesSearch && matchesSkills && matchesAvailability && matchesVerified;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleAvailability = (avail: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setSelectedAvailability([]);
    setVerifiedOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSkills.length > 0 ||
    selectedAvailability.length > 0 ||
    verifiedOnly;

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
              Find Developers
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Browse verified developers who specialize in taking vibe-coded apps to
              production. Filter by skills, rate, and availability.
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
                placeholder="Search by name, headline, or skills..."
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
                  {selectedSkills.length +
                    selectedAvailability.length +
                    (verifiedOnly ? 1 : 0)}
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
                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedSkills.includes(skill)
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-text-secondary border-border hover:border-primary"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Availability
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map((avail) => (
                      <button
                        key={avail.value}
                        onClick={() => toggleAvailability(avail.value)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedAvailability.includes(avail.value)
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-text-secondary border-border hover:border-primary"
                        }`}
                      >
                        {avail.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Verification
                  </p>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors flex items-center gap-1.5 ${
                      verifiedOnly
                        ? "bg-primary text-white border-primary"
                        : "bg-background text-text-secondary border-border hover:border-primary"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Only
                  </button>
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
            Showing {filteredDevelopers.length} of {allDevelopers.length} developers
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDevelopers.map((dev, index) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/developers/${dev.id}`} className="block group">
                  <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center h-full flex flex-col">
                    {/* Avatar */}
                    <div className="relative inline-block mb-4 mx-auto">
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

                    {/* Availability Badge */}
                    <Badge
                      variant={dev.availability === "available" ? "success" : "warning"}
                      className="mx-auto mb-3"
                    >
                      {dev.availability === "available" ? "Available" : "Busy"}
                    </Badge>

                    {/* Name & Headline */}
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                      {dev.user.name}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                      {dev.headline}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                      {dev.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {dev.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{dev.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-4 text-sm mb-4">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{dev.rating}</span>
                        <span className="text-text-muted">({dev.reviews_count})</span>
                      </span>
                      <span className="flex items-center gap-1 text-text-secondary">
                        <Rocket className="w-4 h-4 text-primary" />
                        <span>{dev.launches_completed}</span>
                      </span>
                    </div>

                    {/* Rate */}
                    <div className="pt-4 border-t border-border mt-auto">
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

          {/* Empty State */}
          {filteredDevelopers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No developers found
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
