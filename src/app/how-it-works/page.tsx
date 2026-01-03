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
  Shield,
  Star,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const forVibeCoders = [
  {
    icon: Upload,
    title: "1. Post Your Launch",
    description:
      "Share your vibe-coded app with details about what it does, what help you need, and your preferred deal structure (fixed price, hourly, or equity).",
  },
  {
    icon: Search,
    title: "2. Review Proposals",
    description:
      "Verified developers will review your project and submit proposals. Compare rates, portfolios, and reviews to find the right fit.",
  },
  {
    icon: MessageSquare,
    title: "3. Discuss & Agree",
    description:
      "Chat with developers to discuss scope, timeline, and terms. Once you find the right match, agree on the deal structure.",
  },
  {
    icon: Rocket,
    title: "4. Ship Together",
    description:
      "Work with your developer to polish, deploy, and launch your app. Track progress and communicate through the platform.",
  },
];

const forDevelopers = [
  {
    icon: FileText,
    title: "1. Create Your Profile",
    description:
      "Showcase your skills, portfolio, and rates. Get verified to stand out and build trust with potential clients.",
  },
  {
    icon: Search,
    title: "2. Browse Launches",
    description:
      "Explore vibe-coded apps looking for help. Filter by tech stack, budget, and deal type to find projects that match your expertise.",
  },
  {
    icon: Handshake,
    title: "3. Submit Proposals",
    description:
      "Send proposals with your approach, timeline, and pricing. Offer fixed price, hourly rates, or even equity partnerships.",
  },
  {
    icon: Star,
    title: "4. Build & Get Paid",
    description:
      "Complete the work, help launch the app, and get paid. Earn reviews and build your reputation on the platform.",
  },
];

const dealTypes = [
  {
    icon: DollarSign,
    title: "Fixed Price",
    description:
      "Agree on a set price for the entire project. Best for well-defined scopes with clear deliverables.",
    example: "Example: $2,500 to add Stripe integration and deploy to production",
  },
  {
    icon: DollarSign,
    title: "Hourly Rate",
    description:
      "Pay by the hour for ongoing work or projects with evolving requirements. Track time transparently.",
    example: "Example: $85/hour for 20-30 hours of code refactoring",
  },
  {
    icon: DollarSign,
    title: "Equity Partnership",
    description:
      "Developers can invest their time in exchange for ownership stake. Aligned incentives for long-term success.",
    example: "Example: 15% equity for full launch support and 6 months of maintenance",
  },
];

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary-50/50 to-background">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            How Propel Vibes Works
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            The simple process of connecting vibe-coders with developers who can take
            their AI-built apps to production.
          </p>
        </div>
      </section>

      {/* For Vibe-Coders */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              For Vibe-Coders
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Get Your App to Production
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              You built something amazing with AI. Now let&apos;s make it production-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forVibeCoders.map((step, index) => (
              <div key={index} className="relative">
                {index < forVibeCoders.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] right-0 h-0.5 bg-border" />
                )}
                <div className="bg-background rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/signup?role=vibe-coder">
                Post Your Launch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Developers */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              For Developers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Find Projects & Get Paid
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Help vibe-coders ship their apps. Fixed price, hourly, or equity deals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forDevelopers.map((step, index) => (
              <div key={index} className="relative">
                {index < forDevelopers.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] right-0 h-0.5 bg-border" />
                )}
                <div className="bg-background rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/signup?role=developer">
                Join as Developer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Deal Types */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Flexible Deals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Choose Your Deal Structure
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Not every project is the same. Find the deal structure that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dealTypes.map((deal, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <deal.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {deal.title}
                </h3>
                <p className="text-text-secondary mb-4">{deal.description}</p>
                <p className="text-sm text-text-muted italic">{deal.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Built on Trust
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              We verify developers, facilitate secure payments, and provide dispute
              resolution. Your projects and payments are protected.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">
                  Verified Developers
                </h4>
                <p className="text-sm text-text-secondary">
                  All developers are verified through GitHub, portfolio review, and identity checks.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">
                  Secure Payments
                </h4>
                <p className="text-sm text-text-secondary">
                  Funds are held in escrow until milestones are completed and approved.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">
                  Dispute Resolution
                </h4>
                <p className="text-sm text-text-secondary">
                  Our team mediates any disagreements to ensure fair outcomes for all parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-text-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the marketplace connecting vibe-coders with developers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-white text-text-primary hover:bg-gray-100"
              asChild
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/launches">Browse Launches</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
