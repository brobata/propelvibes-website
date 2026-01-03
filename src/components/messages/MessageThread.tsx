"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMessages } from "@/hooks/useMessages";
import { getInitials, formatDate } from "@/lib/utils";
import type { Conversation } from "@/types/database";
import { toast } from "sonner";

interface MessageThreadProps {
  conversation: Conversation;
  currentUserId: string;
}

export function MessageThread({ conversation, currentUserId }: MessageThreadProps) {
  const { messages, isLoading, sendMessage } = useMessages(conversation.id);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-medium text-text-primary">
            {conversation.launch?.title || "Direct Message"}
          </h3>
          <p className="text-sm text-text-muted">
            {conversation.participant_ids.length} participants
          </p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-surface rounded" />
                  <div className="h-16 bg-surface rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.sender_id === currentUserId;
            const showAvatar =
              index === 0 ||
              messages[index - 1].sender_id !== message.sender_id;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
              >
                {showAvatar ? (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={message.sender?.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">
                      {getInitials(message.sender?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 shrink-0" />
                )}
                <div className={`max-w-[70%] ${isOwn ? "text-right" : ""}`}>
                  {showAvatar && (
                    <div className={`flex items-center gap-2 mb-1 ${isOwn ? "justify-end" : ""}`}>
                      <span className="text-sm font-medium text-text-primary">
                        {isOwn ? "You" : message.sender?.name || "User"}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      isOwn
                        ? "bg-primary text-white"
                        : "bg-surface text-text-primary"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Textarea
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="min-h-[40px] max-h-[120px] resize-none"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-text-muted mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
