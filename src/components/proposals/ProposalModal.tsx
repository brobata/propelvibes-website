"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  DollarSign,
  Clock,
  Percent,
  Send,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import type { Launch } from "@/types/database";
import { toast } from "sonner";

interface ProposalModalProps {
  launch: Launch;
  onClose: () => void;
}

const dealTypeOptions = [
  { value: "fixed", label: "Fixed Price", icon: DollarSign },
  { value: "hourly", label: "Hourly", icon: Clock },
  { value: "equity", label: "Equity", icon: Percent },
  { value: "hybrid", label: "Hybrid", icon: Plus },
];

const proposalSchema = z.object({
  cover_letter: z.string().min(50, "Cover letter must be at least 50 characters"),
  deal_type: z.enum(["fixed", "hourly", "equity", "hybrid"]),
  fixed_price: z.number().optional(),
  hourly_rate: z.number().optional(),
  estimated_hours: z.number().optional(),
  equity_ask: z.number().min(0).max(100).optional(),
  timeline_days: z.number().min(1, "Timeline must be at least 1 day"),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface Milestone {
  title: string;
  description: string;
  amount: number;
  due_days: number;
}

export function ProposalModal({ launch, onClose }: ProposalModalProps) {
  const { developerProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      deal_type: launch.deal_types_accepted[0] as "fixed" | "hourly" | "equity" | "hybrid",
      timeline_days: launch.timeline_days || 30,
    },
  });

  const selectedDealType = watch("deal_type");

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { title: "", description: "", amount: 0, due_days: 7 },
    ]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
    setMilestones(
      milestones.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      )
    );
  };

  const onSubmit = async (data: ProposalFormData) => {
    if (!developerProfile) {
      toast.error("Developer profile not found");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("proposals").insert({
        launch_id: launch.id,
        developer_id: developerProfile.id,
        cover_letter: data.cover_letter,
        deal_type: data.deal_type,
        fixed_price: data.fixed_price ? data.fixed_price * 100 : null,
        hourly_rate: data.hourly_rate ? data.hourly_rate * 100 : null,
        estimated_hours: data.estimated_hours || null,
        equity_ask: data.equity_ask || null,
        timeline_days: data.timeline_days,
        milestones: milestones.map((m) => ({
          ...m,
          amount: m.amount * 100,
        })),
        status: "pending",
      });

      if (error) throw error;

      toast.success("Proposal submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error("Failed to submit proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-xl mx-4"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Submit Proposal
              </h2>
              <p className="text-sm text-text-secondary">
                for {launch.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Cover Letter *
              </label>
              <Textarea
                {...register("cover_letter")}
                placeholder="Introduce yourself and explain why you're the right developer for this project..."
                rows={6}
                className={errors.cover_letter ? "border-red-500" : ""}
              />
              {errors.cover_letter && (
                <p className="text-sm text-red-500 mt-1">{errors.cover_letter.message}</p>
              )}
            </div>

            {/* Deal Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Deal Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dealTypeOptions
                  .filter((opt) => launch.deal_types_accepted.includes(opt.value as "fixed" | "hourly" | "equity" | "hybrid"))
                  .map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("deal_type", option.value as "fixed" | "hourly" | "equity" | "hybrid")}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedDealType === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <option.icon className={`w-5 h-5 mx-auto mb-1 ${
                        selectedDealType === option.value ? "text-primary" : "text-text-muted"
                      }`} />
                      <span className="text-sm font-medium text-text-primary">
                        {option.label}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Pricing based on deal type */}
            {selectedDealType === "fixed" && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Fixed Price ($)
                </label>
                <Input
                  type="number"
                  {...register("fixed_price", { valueAsNumber: true })}
                  placeholder="e.g., 2500"
                />
              </div>
            )}

            {selectedDealType === "hourly" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Hourly Rate ($)
                  </label>
                  <Input
                    type="number"
                    {...register("hourly_rate", { valueAsNumber: true })}
                    placeholder="e.g., 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Estimated Hours
                  </label>
                  <Input
                    type="number"
                    {...register("estimated_hours", { valueAsNumber: true })}
                    placeholder="e.g., 40"
                  />
                </div>
              </div>
            )}

            {selectedDealType === "equity" && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Equity Ask (%)
                </label>
                <Input
                  type="number"
                  {...register("equity_ask", { valueAsNumber: true })}
                  placeholder="e.g., 10"
                  min={0}
                  max={100}
                />
                {launch.equity_offered && (
                  <p className="text-sm text-text-muted mt-1">
                    Owner is offering up to {launch.equity_offered}% equity
                  </p>
                )}
              </div>
            )}

            {selectedDealType === "hybrid" && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Upfront Payment ($)
                    </label>
                    <Input
                      type="number"
                      {...register("fixed_price", { valueAsNumber: true })}
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Equity Ask (%)
                    </label>
                    <Input
                      type="number"
                      {...register("equity_ask", { valueAsNumber: true })}
                      placeholder="e.g., 5"
                      min={0}
                      max={100}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Timeline (days) *
              </label>
              <Input
                type="number"
                {...register("timeline_days", { valueAsNumber: true })}
                placeholder="e.g., 30"
              />
              {errors.timeline_days && (
                <p className="text-sm text-red-500 mt-1">{errors.timeline_days.message}</p>
              )}
            </div>

            {/* Milestones (optional) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-text-primary">
                  Milestones <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <Button type="button" variant="ghost" size="sm" onClick={addMilestone}>
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </Button>
              </div>

              {milestones.length > 0 && (
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="p-4 bg-surface rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Milestone {index + 1}</Badge>
                        <button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <Input
                        placeholder="Milestone title"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, "title", e.target.value)}
                      />
                      <Textarea
                        placeholder="What will be delivered?"
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, "description", e.target.value)}
                        rows={2}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="number"
                          placeholder="Amount ($)"
                          value={milestone.amount || ""}
                          onChange={(e) => updateMilestone(index, "amount", Number(e.target.value))}
                        />
                        <Input
                          type="number"
                          placeholder="Due in (days)"
                          value={milestone.due_days || ""}
                          onChange={(e) => updateMilestone(index, "due_days", Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
