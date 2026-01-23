import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Upload,
  MessageSquare,
  Rocket,
  Search,
  FileText,
  Handshake,
  Star,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const forVibeCoders = [
  {
    icon: Upload,
    title: "1. Post Your Launch",
    description:
      "Share your app with details about what it does, what help you need, and your budget.",
  },
  {
    icon: Search,
    title: "2. Review Proposals",
    description:
      "Developers will review your project and submit proposals. Compare rates and portfolios.",
  },
  {
    icon: MessageSquare,
    title: "3. Discuss & Agree",
    description:
      "Chat with developers to discuss scope, timeline, and terms. Find the right match.",
  },
  {
    icon: Rocket,
    title: "4. Ship Together",
    description:
      "Work with your developer to polish, deploy, and launch your app.",
  },
];

const forDevelopers = [
  {
    icon: FileText,
    title: "1. Create Your Profile",
    description:
      "Showcase your skills, portfolio, and rates. Get verified to build trust.",
  },
  {
    icon: Search,
    title: "2. Browse Launches",
    description:
      "Explore apps looking for help. Filter by tech stack, budget, and deal type.",
  },
  {
    icon: Handshake,
    title: "3. Submit Proposals",
    description:
      "Send proposals with your approach, timeline, and pricing.",
  },
  {
    icon: Star,
    title: "4. Build & Get Paid",
    description:
      "Complete the work, help launch the app, and earn reviews.",
  },
];

const dealTypes = [
  {
    icon: DollarSign,
    title: "Fixed Price",
    description:
      "Agree on a set price for the entire project. Best for well-defined scopes.",
    example: "Example: $2,500 to add Stripe integration and deploy",
  },
  {
    icon: DollarSign,
    title: "Hourly Rate",
    description:
      "Pay by the hour for ongoing work or evolving requirements.",
    example: "Example: $85/hour for 20-30 hours of refactoring",
  },
  {
    icon: DollarSign,
    title: "Equity Partnership",
    description:
      "Developers invest their time in exchange for ownership stake.",
    example: "Example: 15% equity for full launch support",
  },
];

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="hero-gradient py-10 border-b border-border">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            How Propel Vibes Works
          </h1>
          <p className="text-lg text-text-secondary max-w-xl">
            A simple process to connect your AI-built app with developers who can ship it.
          </p>
        </div>
      </section>

      {/* For Vibe-Coders */}
      <section className="py-8">
        <div className="container-custom">
          <h2 className="text-lg font-medium text-text-primary mb-1">
            For App Creators
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Get your app production-ready
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {forVibeCoders.map((step, index) => (
              <div key={index} className="border border-border rounded-lg p-5 bg-white shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button size="sm" asChild>
              <Link href="/post-launch">
                Post Your Launch
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Developers */}
      <section className="py-8 bg-surface">
        <div className="container-custom">
          <h2 className="text-lg font-medium text-text-primary mb-1">
            For Developers
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Find projects and get paid
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {forDevelopers.map((step, index) => (
              <div key={index} className="border border-border rounded-lg p-5 bg-white shadow-sm hover:shadow-md hover:border-success-light transition-all">
                <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button size="sm" variant="outline" asChild>
              <Link href="/developers">
                Browse Developers
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Deal Types */}
      <section className="py-8">
        <div className="container-custom">
          <h2 className="text-lg font-medium text-text-primary mb-1">
            Deal Structures
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Flexible options for every project
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {dealTypes.map((deal, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center mb-4">
                  <deal.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {deal.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">{deal.description}</p>
                <p className="text-xs text-text-muted bg-surface px-2 py-1 rounded">{deal.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-10 bg-surface">
        <div className="container-custom">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            How We Help
          </h2>
          <p className="text-text-secondary mb-6">
            We verify developers and help you find the right match. You handle the deal directly.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-highlight-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">
                Verified Developers
              </h3>
              <p className="text-sm text-text-secondary">
                All developers are verified through GitHub, portfolio review, and identity checks.
              </p>
            </div>
            <div className="border border-border rounded-lg p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">
                Direct Deals
              </h3>
              <p className="text-sm text-text-secondary">
                Negotiate and pay developers directly. We connect you; you handle the business.
              </p>
            </div>
            <div className="border border-border rounded-lg p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-success-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">
                Reviews & Ratings
              </h3>
              <p className="text-sm text-text-secondary">
                See what other creators say about developers before you commit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to ship your app?
              </h2>
              <p className="text-primary-100">
                Join the marketplace connecting vibe coders with developers.
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                <Link href="/post-launch">Post Your App</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/launches">Browse Launches</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
