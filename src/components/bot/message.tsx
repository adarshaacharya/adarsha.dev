"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Message as ChatMessage } from "@ai-sdk/react";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./markdown-message";

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
      className={cn("flex items-start gap-1.5", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "rounded-lg px-2 py-1 max-w-[85%] break-words text-xs",
          isUser
            ? "bg-accent text-white rounded-tr-none"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none",
        )}
      >
        <div className="m-0 whitespace-pre-wrap">
          <MarkdownMessage content={message.content} />
        </div>
      </div>
    </motion.div>
  );
}
