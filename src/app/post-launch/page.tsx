"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Rocket,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Plus,
  DollarSign,
  Clock,
  Percent,
  Check,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Link from "next/link";

const serviceOptions = [
  { value: "code_cleanup", label: "Code Cleanup", description: "Refactor and organize codebase" },
  { value: "feature_development", label: "Feature Development", description: "Build new features" },
  { value: "bug_fixes", label: "Bug Fixes", description: "Fix bugs and issues" },
  { value: "deployment", label: "Deployment", description: "Deploy to production" },
  { value: "design", label: "Design", description: "UI/UX improvements" },
  { value: "testing", label: "Testing", description: "Add tests and QA" },
  { value: "scaling", label: "Scaling", description: "Performance optimization" },
  { value: "full_launch", label: "Full Launch", description: "Complete launch support" },
];

const dealTypeOptions = [
  { value: "fixed", label: "Fixed Price", icon: DollarSign, description: "One-time payment for the project" },
  { value: "hourly", label: "Hourly", icon: Clock, description: "Pay by the hour" },
  { value: "equity", label: "Equity", icon: Percent, description: "Offer equity stake" },
  { value: "hybrid", label: "Hybrid", icon: Plus, description: "Combination of above" },
];

const techStackSuggestions = [
  "React", "Next.js", "Vue.js", "Angular", "Svelte",
  "Node.js", "Express", "FastAPI", "Django", "Rails",
  "Python", "TypeScript", "JavaScript", "Go", "Rust",
  "PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase",
  "AWS", "Vercel", "Netlify", "Firebase", "Docker",
  "React Native", "Flutter", "Swift", "Kotlin",
  "Claude API", "OpenAI", "GPT-4", "LangChain",
];

const launchSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  short_description: z.string().min(20, "Description must be at least 20 characters").max(200),
  description: z.string().min(100, "Full description must be at least 100 characters").max(5000),
  tech_stack: z.array(z.string()).min(1, "Select at least one technology"),
  services_needed: z.array(z.string()).min(1, "Select at least one service"),
  deal_types_accepted: z.array(z.string()).min(1, "Select at least one deal type"),
  budget_min: z.number().optional(),
  budget_max: z.number().optional(),
  equity_offered: z.number().min(0).max(100).optional(),
  timeline_days: z.number().min(1).optional(),
  github_url: z.string().url().optional().or(z.literal("")),
  demo_url: z.string().url().optional().or(z.literal("")),
});

type LaunchFormData = z.infer<typeof launchSchema>;

export default function PostLaunchPage() {
  const router = useRouter();
  const { profile, isLoading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<LaunchFormData>({
    resolver: zodResolver(launchSchema),
    defaultValues: {
      tech_stack: [],
      services_needed: [],
      deal_types_accepted: [],
    },
  });

  const techStack = watch("tech_stack");
  const servicesNeeded = watch("services_needed");
  const dealTypesAccepted = watch("deal_types_accepted");

  const addTech = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      setValue("tech_stack", [...techStack, tech]);
    }
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setValue("tech_stack", techStack.filter((t) => t !== tech));
  };

  const toggleService = (service: string) => {
    if (servicesNeeded.includes(service)) {
      setValue("services_needed", servicesNeeded.filter((s) => s !== service));
    } else {
      setValue("services_needed", [...servicesNeeded, service]);
    }
  };

  const toggleDealType = (dealType: string) => {
    if (dealTypesAccepted.includes(dealType)) {
      setValue("deal_types_accepted", dealTypesAccepted.filter((d) => d !== dealType));
    } else {
      setValue("deal_types_accepted", [...dealTypesAccepted, dealType]);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof LaunchFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["title", "short_description", "description"];
    } else if (step === 2) {
      fieldsToValidate = ["tech_stack", "services_needed"];
    } else if (step === 3) {
      fieldsToValidate = ["deal_types_accepted"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: LaunchFormData) => {
    if (!profile) {
      toast.error("Please log in to post a launch");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        + "-" + Date.now().toString(36);

      const { data: launch, error } = await supabase
        .from("launches")
        .insert({
          owner_id: profile.id,
          title: data.title,
          slug,
          short_description: data.short_description,
          description: data.description,
          tech_stack: data.tech_stack,
          services_needed: data.services_needed,
          deal_types_accepted: data.deal_types_accepted,
          budget_min: data.budget_min ? data.budget_min * 100 : null, // Convert to cents
          budget_max: data.budget_max ? data.budget_max * 100 : null,
          equity_offered: data.equity_offered || null,
          timeline_days: data.timeline_days || null,
          github_url: data.github_url || null,
          demo_url: data.demo_url || null,
          status: "open",
          screenshot_urls: [],
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Launch posted successfully!");
      router.push(`/launches/${launch.slug}`);
    } catch (error) {
      console.error("Error posting launch:", error);
      toast.error("Failed to post launch. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-3xl">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="h-64 bg-surface rounded-xl" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Sign in to post a launch
            </h1>
            <p className="text-text-secondary mb-8">
              Create an account or sign in to share your vibe-coded app with developers.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/signup?role=vibe_coder">Create Account</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login?redirect=/post-launch">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Post Your Launch
            </h1>
            <p className="text-text-secondary">
              Share your vibe-coded app and connect with developers who can help bring it to life.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    s < step
                      ? "bg-primary text-white"
                      : s === step
                      ? "bg-primary text-white"
                      : "bg-surface text-text-muted"
                  }`}
                >
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      s < step ? "bg-primary" : "bg-surface"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-background border border-border rounded-xl p-6 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Tell us about your app
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Help developers understand what you&apos;ve built.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Project Title *
                  </label>
                  <Input
                    {...register("title")}
                    placeholder="e.g., AI Recipe Generator"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Short Description * <span className="text-text-muted font-normal">(max 200 chars)</span>
                  </label>
                  <Textarea
                    {...register("short_description")}
                    placeholder="A brief summary that will appear in search results..."
                    rows={2}
                    className={errors.short_description ? "border-red-500" : ""}
                  />
                  {errors.short_description && (
                    <p className="text-sm text-red-500 mt-1">{errors.short_description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Description *
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="Describe your app in detail. What does it do? What have you built so far? What do you need help with?"
                    rows={8}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Tech & Services */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-background border border-border rounded-xl p-6 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Tech Stack & Services
                  </h2>
                  <p className="text-sm text-text-secondary">
                    What technologies are you using and what help do you need?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Tech Stack *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTech(techInput);
                        }
                      }}
                      placeholder="Type and press Enter..."
                    />
                    <Button type="button" variant="outline" onClick={() => addTech(techInput)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="primary" className="gap-1">
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStackSuggestions
                      .filter((t) => !techStack.includes(t))
                      .slice(0, 12)
                      .map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => addTech(tech)}
                          className="px-2 py-1 text-xs rounded-full bg-surface text-text-secondary hover:bg-surface-hover"
                        >
                          + {tech}
                        </button>
                      ))}
                  </div>
                  {errors.tech_stack && (
                    <p className="text-sm text-red-500 mt-2">{errors.tech_stack.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Services Needed *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => toggleService(service.value)}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          servicesNeeded.includes(service.value)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-text-primary">{service.label}</span>
                          {servicesNeeded.includes(service.value) && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-text-muted">{service.description}</p>
                      </button>
                    ))}
                  </div>
                  {errors.services_needed && (
                    <p className="text-sm text-red-500 mt-2">{errors.services_needed.message}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Deal Terms */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-background border border-border rounded-xl p-6 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Deal Terms
                  </h2>
                  <p className="text-sm text-text-secondary">
                    What type of deal are you open to?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Deal Types Accepted *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {dealTypeOptions.map((deal) => (
                      <button
                        key={deal.value}
                        type="button"
                        onClick={() => toggleDealType(deal.value)}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          dealTypesAccepted.includes(deal.value)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            dealTypesAccepted.includes(deal.value)
                              ? "bg-primary text-white"
                              : "bg-surface text-text-muted"
                          }`}>
                            <deal.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-text-primary">{deal.label}</span>
                          {dealTypesAccepted.includes(deal.value) && (
                            <Check className="w-4 h-4 text-primary ml-auto" />
                          )}
                        </div>
                        <p className="text-sm text-text-muted ml-11">{deal.description}</p>
                      </button>
                    ))}
                  </div>
                  {errors.deal_types_accepted && (
                    <p className="text-sm text-red-500 mt-2">{errors.deal_types_accepted.message}</p>
                  )}
                </div>

                {(dealTypesAccepted.includes("fixed") || dealTypesAccepted.includes("hourly")) && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Budget Min ($)
                      </label>
                      <Input
                        type="number"
                        {...register("budget_min", { valueAsNumber: true })}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Budget Max ($)
                      </label>
                      <Input
                        type="number"
                        {...register("budget_max", { valueAsNumber: true })}
                        placeholder="5000"
                      />
                    </div>
                  </div>
                )}

                {dealTypesAccepted.includes("equity") && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Equity Offered (%)
                    </label>
                    <Input
                      type="number"
                      {...register("equity_offered", { valueAsNumber: true })}
                      placeholder="10"
                      min={0}
                      max={100}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Timeline (days)
                  </label>
                  <Input
                    type="number"
                    {...register("timeline_days", { valueAsNumber: true })}
                    placeholder="30"
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Links & Submit */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-background border border-border rounded-xl p-6 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Links & Resources
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Share any relevant links (optional but recommended).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    GitHub Repository
                  </label>
                  <Input
                    {...register("github_url")}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Demo URL
                  </label>
                  <Input
                    {...register("demo_url")}
                    placeholder="https://myapp.vercel.app"
                  />
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <h3 className="font-medium text-text-primary mb-2">Ready to post?</h3>
                  <p className="text-sm text-text-secondary">
                    Your launch will be visible to developers immediately. You&apos;ll receive notifications when developers submit proposals.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" />
                        Post Launch
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
