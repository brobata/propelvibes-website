"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Conversation, Message } from "@/types/database";

export interface ConversationsState {
  conversations: Conversation[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useConversations(): ConversationsState {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error: queryError } = await supabase
        .from("pv_conversations")
        .select(`
          *,
          launch:pv_launches(*),
          proposal:pv_proposals(*)
        `)
        .contains("participant_ids", [user.id])
        .order("last_message_at", { ascending: false, nullsFirst: false });

      if (queryError) throw queryError;

      setConversations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch conversations"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("pv_conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pv_conversations",
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchConversations]);

  return {
    conversations,
    isLoading,
    error,
    refresh: fetchConversations,
  };
}

export interface MessagesState {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useMessages(conversationId: string): MessagesState {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from("pv_messages")
        .select(`
          *,
          sender:pv_profiles(*)
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (queryError) throw queryError;

      setMessages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch messages"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase, conversationId]);

  const sendMessage = useCallback(async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: insertError } = await supabase.from("pv_messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
        message_type: "text",
        metadata: {},
        read_by: [user.id],
      });

      if (insertError) throw insertError;

      // Update conversation's last_message_at
      await supabase
        .from("pv_conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);

    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to send message");
    }
  }, [supabase, conversationId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`pv_messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pv_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, conversationId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    refresh: fetchMessages,
  };
}

export async function createConversation(
  participantIds: string[],
  launchId?: string,
  proposalId?: string
): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("pv_conversations")
    .insert({
      participant_ids: participantIds,
      launch_id: launchId || null,
      proposal_id: proposalId || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data.id;
}

export async function findOrCreateConversation(
  participantIds: string[],
  launchId?: string
): Promise<string> {
  const supabase = createClient();

  // Try to find existing conversation
  let query = supabase
    .from("pv_conversations")
    .select("id")
    .contains("participant_ids", participantIds);

  if (launchId) {
    query = query.eq("launch_id", launchId);
  }

  const { data: existing } = await query.single();

  if (existing) {
    return existing.id;
  }

  // Create new conversation
  return createConversation(participantIds, launchId);
}
