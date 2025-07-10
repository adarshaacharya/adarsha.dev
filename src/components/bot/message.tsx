"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Message as ChatMessage } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
  isLast?: boolean;
}

export function Message({
  message,
  isLoading = false,
  isLast = false,
}: MessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "flex items-start gap-2 group",
        isUser && "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full text-xs font-medium",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {isUser ? "You" : "A"}
      </div>
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[80%] break-words text-sm shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <p className="m-0 whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}
