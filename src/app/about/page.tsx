import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Rocket, Target, Users, Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary-50/50 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              About Propel Vibes
            </h1>
            <p className="text-xl text-text-secondary">
              We&apos;re building the bridge between AI-powered creation and production-ready products.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Our Story</h2>
            <div className="prose prose-lg text-text-secondary">
              <p>
                The rise of AI coding tools like Claude, Cursor, and Bolt has democratized software creation. Anyone with an idea can now build a working prototype in hours, not months. We call this <strong>&quot;vibe coding&quot;</strong> - the intuitive, conversational way of bringing software to life through AI.
              </p>
              <p>
                But there&apos;s a gap. These AI-built MVPs often need professional polish before they&apos;re ready for real users. The code might be functional but not scalable. The deployment might work locally but not in production. The UI might be usable but not polished.
              </p>
              <p>
                <strong>Propel Vibes bridges that gap.</strong> We connect vibe-coders (the creators with ideas and AI-built prototypes) with experienced developers who specialize in taking these projects to the finish line.
              </p>
              <p>
                Unlike traditional freelance platforms, we understand the unique dynamics of vibe-coded projects. We support flexible deal structures including equity partnerships because sometimes the best deals are the ones where everyone has skin in the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What We Believe
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Ideas Deserve to Ship
              </h3>
              <p className="text-text-secondary">
                Every vibe-coded app represents someone&apos;s vision. We believe those visions deserve a chance to become real products that reach real users.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Aligned Incentives
              </h3>
              <p className="text-text-secondary">
                The best collaborations happen when everyone wins. Equity deals, transparent pricing, and honest reviews create partnerships, not just transactions.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Quality Over Quantity
              </h3>
              <p className="text-text-secondary">
                We verify every developer and curate every launch. A smaller, trusted community beats a massive marketplace full of noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              The Problem We&apos;re Solving
            </h2>
            <div className="space-y-6">
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">
                  For Vibe-Coders
                </h4>
                <p className="text-text-secondary">
                  You built something with AI tools, but when you talk to traditional developers, they quote $50K+ to &quot;fix the spaghetti code.&quot; You feel stuck between a working prototype and a real product.
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">
                  For Developers
                </h4>
                <p className="text-text-secondary">
                  You see the explosion of AI-built apps and want to help. But traditional platforms don&apos;t understand these projects. You want to find clients who value your expertise in production-grade development.
                </p>
              </div>

              <div className="bg-primary rounded-xl p-6">
                <h4 className="font-semibold text-white mb-2">
                  The Propel Vibes Solution
                </h4>
                <p className="text-white/90">
                  A marketplace built specifically for this new reality. Fair pricing, flexible deals, and a community that understands both the promise and the challenges of AI-built software.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-text-primary">
        <div className="container-custom text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a creator with an idea or a developer ready to help, there&apos;s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-white text-text-primary hover:bg-gray-100"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
