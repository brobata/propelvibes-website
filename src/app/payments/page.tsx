"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

export default function PaymentsPage() {
  const { profile, isLoading: authLoading } = useAuth();
  const { isEnabled } = useFeatureFlags();

  const paymentsEnabled = isEnabled("enable_payments");
  const escrowEnabled = isEnabled("enable_escrow");

  if (authLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="h-64 bg-surface rounded-xl" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!paymentsEnabled) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-text-muted" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-4">
                Payments Coming Soon
              </h1>
              <p className="text-text-secondary mb-8">
                Secure payment processing is currently being set up. You&apos;ll be able
                to handle transactions safely through our platform soon.
              </p>

              <div className="bg-surface rounded-xl p-6 mb-8 text-left">
                <h2 className="font-semibold text-text-primary mb-4">
                  What to expect:
                </h2>
                <ul className="space-y-3">
                  {[
                    "Secure payment processing via Stripe",
                    "Escrow protection for both parties",
                    "Milestone-based payments",
                    "Automatic invoicing",
                    "Payment history & receipts",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </motion.div>
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
              <Lock className="w-10 h-10 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Sign in to manage payments
            </h1>
            <p className="text-text-secondary mb-8">
              You need to be signed in to access payment features.
            </p>
            <Button asChild>
              <Link href="/login?redirect=/payments">Sign In</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
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
              Payments
            </h1>
            <p className="text-text-secondary">
              Manage your payments, invoices, and payout settings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-gradient-to-br from-primary to-primary-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/80">Available Balance</span>
                <Badge className="bg-white/20 text-white border-0">
                  <Shield className="w-3 h-3 mr-1" />
                  Protected
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-4">$0.00</div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                  <DollarSign className="w-4 h-4" />
                  Withdraw
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  View History
                </Button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-sm text-text-muted mb-1">Pending</p>
                <p className="text-2xl font-bold text-text-primary">$0.00</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-sm text-text-muted mb-1">In Escrow</p>
                <p className="text-2xl font-bold text-text-primary">$0.00</p>
                {!escrowEnabled && (
                  <Badge variant="outline" className="mt-2 text-xs">Coming Soon</Badge>
                )}
              </div>
            </motion.div>
          </div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-background border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Payment Methods
              </h2>
              <Button variant="outline" size="sm">
                <CreditCard className="w-4 h-4" />
                Add Method
              </Button>
            </div>

            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary mb-4">
                No payment methods added yet
              </p>
              <Button>
                Connect with Stripe
              </Button>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-text-primary mb-6">
              Recent Transactions
            </h2>

            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">
                No transactions yet
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
