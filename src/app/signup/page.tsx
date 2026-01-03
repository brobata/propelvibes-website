"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Rocket,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Code2,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UserRole = "vibe-coder" | "developer";

function SignupForm() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || null;

  const [step, setStep] = useState<"role" | "details">(initialRole ? "details" : "role");
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual signup with Supabase
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Logo */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-semibold text-xl text-text-primary mb-8"
      >
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <span>Propel Vibes</span>
      </Link>

      {step === "role" ? (
        <>
          {/* Role Selection */}
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Join Propel Vibes
          </h1>
          <p className="text-text-secondary mb-8">
            How do you want to use the platform?
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("vibe-coder")}
              className="w-full p-6 rounded-xl border-2 border-border hover:border-primary bg-background hover:bg-primary-50/50 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Lightbulb className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    I&apos;m a Vibe-Coder
                  </h3>
                  <p className="text-sm text-text-secondary">
                    I have an AI-built app and need help taking it to production
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("developer")}
              className="w-full p-6 rounded-xl border-2 border-border hover:border-primary bg-background hover:bg-primary-50/50 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Code2 className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    I&apos;m a Developer
                  </h3>
                  <p className="text-sm text-text-secondary">
                    I want to help vibe-coders launch their apps
                  </p>
                </div>
              </div>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Account Details */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setStep("role")}
              className="text-sm text-text-muted hover:text-text-secondary"
            >
              Change role
            </button>
            <span className="text-text-muted">|</span>
            <span className="text-sm font-medium text-primary">
              {role === "vibe-coder" ? "Vibe-Coder" : "Developer"}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Create your account
          </h1>
          <p className="text-text-secondary mb-8">
            {role === "vibe-coder"
              ? "Get your vibe-coded app to the next level"
              : "Start helping founders launch their apps"}
          </p>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" className="w-full">
              <Chrome className="w-4 h-4" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-text-muted">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted">
                Must be at least 8 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="mt-4 text-xs text-text-muted text-center">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </>
      )}

      {/* Login Link */}
      <p className="mt-8 text-center text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </motion.div>
  );
}

function SignupFormLoading() {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-surface" />
        <div className="h-6 w-32 bg-surface rounded" />
      </div>
      <div className="h-8 w-48 bg-surface rounded mb-4" />
      <div className="h-4 w-64 bg-surface rounded mb-8" />
      <div className="space-y-4">
        <div className="h-24 bg-surface rounded-xl" />
        <div className="h-24 bg-surface rounded-xl" />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Suspense fallback={<SignupFormLoading />}>
          <SignupForm />
        </Suspense>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary-dark items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Launch your vision
            </h2>
            <p className="text-white/80 text-lg">
              Connect with developers who can turn your AI-built prototype into a production-ready product.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
