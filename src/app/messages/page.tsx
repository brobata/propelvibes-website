"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  ArrowLeft,
} from "lucide-react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useMessages";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { getInitials, formatDate } from "@/lib/utils";
import { MessageThread } from "@/components/messages/MessageThread";

export default function MessagesPage() {
  const { profile, isLoading: authLoading } = useAuth();
  const { conversations, isLoading: conversationsLoading } = useConversations();
  const { isEnabled } = useFeatureFlags();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const messagingEnabled = isEnabled("enable_messaging");
  const isLoading = authLoading || conversationsLoading;

  if (!messagingEnabled) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Messaging Coming Soon
            </h1>
            <p className="text-text-secondary mb-8">
              Direct messaging is currently being developed. Check back soon!
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="pt-28 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="h-96 bg-surface rounded-xl" />
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
              <MessageSquare className="w-10 h-10 text-text-muted" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Sign in to view messages
            </h1>
            <p className="text-text-secondary mb-8">
              You need to be signed in to access your messages.
            </p>
            <Button asChild>
              <Link href="/login?redirect=/messages">Sign In</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <PageLayout>
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
          </motion.div>

          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-3 min-h-[600px]">
              {/* Conversation List */}
              <div className="border-r border-border">
                {/* Search */}
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="divide-y divide-border max-h-[528px] overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
                      <p className="text-text-secondary">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => {
                      // Find the other participant
                      const otherParticipantId = conversation.participant_ids.find(
                        (id) => id !== profile.id
                      );

                      return (
                        <button
                          key={conversation.id}
                          onClick={() => setSelectedConversationId(conversation.id)}
                          className={`w-full p-4 text-left hover:bg-surface transition-colors ${
                            selectedConversationId === conversation.id
                              ? "bg-surface"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                {getInitials(otherParticipantId || "User")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-medium text-text-primary truncate">
                                  {conversation.launch?.title || "Direct Message"}
                                </p>
                                {conversation.last_message_at && (
                                  <span className="text-xs text-text-muted shrink-0">
                                    {formatDate(conversation.last_message_at)}
                                  </span>
                                )}
                              </div>
                              {conversation.launch && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {conversation.proposal ? "Proposal" : "Launch"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Message Thread */}
              <div className="md:col-span-2">
                {selectedConversation ? (
                  <MessageThread
                    conversation={selectedConversation}
                    currentUserId={profile.id}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <MessageSquare className="w-16 h-16 text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-text-secondary">
                        Choose a conversation from the list to view messages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
