"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

interface QuickActionProps {
  label: string;
  onClick: (text: string) => void;
  prompt: string;
}

function QuickAction({
  label,
  onClick,
  prompt,
}: QuickActionProps) {
  return (
    <motion.button
      className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      onClick={() => onClick(prompt)}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
}

interface GreetingProps {
  onPromptClick?: (prompt: string) => void;
}

export function Greeting({ onPromptClick = () => {} }: GreetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col px-5 py-2 space-y-5"
    >
      <div className="space-y-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hi! I&apos;m Adarsha&apos;s AI Assistant. Ask me about projects,
          skills, experience, or anything else you&apos;d like to know.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Try asking
        </p>
        <div className="flex flex-wrap gap-2">
          <QuickAction
            label="Best projects"
            onClick={onPromptClick}
            prompt="What are your best projects?"
          />
          <QuickAction
            label="Tech stack"
            onClick={onPromptClick}
            prompt="What do you work with?"
          />
          <QuickAction
            label="AI work"
            onClick={onPromptClick}
            prompt="Tell me about your AI work"
          />
          <QuickAction
            label="Contact"
            onClick={onPromptClick}
            prompt="Where can I contact you?"
          />
        </div>
      </div>
    </motion.div>
  );
}
