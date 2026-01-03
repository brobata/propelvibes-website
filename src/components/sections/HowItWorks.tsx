"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, MessageSquare, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Post Your Launch",
    description:
      "Share your vibe-coded app, what it does, and what help you need. Screenshots, tech stack, and budget details help developers understand your vision.",
    color: "bg-blue-500",
  },
  {
    icon: MessageSquare,
    title: "Get Proposals",
    description:
      "Verified developers review your project and submit proposals. Choose fixed-price, hourly rates, or equity partnerships that work for you.",
    color: "bg-primary",
  },
  {
    icon: Rocket,
    title: "Ship Together",
    description:
      "Work with your chosen developer to polish, launch, and scale your app. Track progress and communicate directly through the platform.",
    color: "bg-purple-500",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding bg-surface">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            From Vibe to Launch in 3 Steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-secondary"
          >
            We&apos;ve simplified the process of finding the right developer
            for your AI-built app.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] right-0 h-0.5 bg-border" />
              )}

              <div className="relative bg-background rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
