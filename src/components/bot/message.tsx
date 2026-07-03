"use client";

import React from "react";
import { motion } from "framer-motion";
import type { UIMessage } from "ai";
import { MessageResponse } from "@/components/ai-elements/message";
import { cn } from "@/lib/utils";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message as ConversationMessage,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

interface MessageProps {
  message: UIMessage;
  isLoading?: boolean;
}

export function Message({ message, isLoading = false }: MessageProps) {
  const isUser = message.role === "user";

  const textContent = message.parts
    ?.map((part) => {
      if (part.type === "text" && "text" in part) {
        return part.text;
      }
      return "";
    })
    .filter(Boolean)
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <ConversationMessage align={isUser ? "end" : "start"}>
        <MessageAvatar
          className={cn(
            "h-7 min-w-7 text-xs font-medium",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isUser ? "You" : "A"}
        </MessageAvatar>
        <MessageContent>
          <Bubble
            align={isUser ? "end" : "start"}
            variant={isUser ? "default" : "muted"}
          >
            <BubbleContent
              className={cn(
                "rounded-lg px-3 py-2 shadow-sm",
                isUser && "whitespace-pre-wrap",
                isLoading && "after:ml-0.5 after:animate-pulse after:content-['|']",
              )}
            >
              {isUser ? (
                textContent || (isLoading ? "" : " ")
              ) : (
                <MessageResponse isAnimating={isLoading}>
                  {textContent || (isLoading ? "" : " ")}
                </MessageResponse>
              )}
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </ConversationMessage>
    </motion.div>
  );
}
