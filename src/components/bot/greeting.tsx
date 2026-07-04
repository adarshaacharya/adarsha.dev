"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Code2,
  FolderOpen,
  Mail,
  type LucideIcon,
} from "lucide-react";

const SUGGESTIONS = [
  {
    label: "Best projects",
    prompt: "What are your best projects?",
    description: "Explore standout work and case studies",
    icon: FolderOpen,
  },
  {
    label: "Tech stack",
    prompt: "What do you work with?",
    description: "Languages, frameworks, and tools",
    icon: Code2,
  },
  {
    label: "AI work",
    prompt: "Tell me about your AI work",
    description: "Agents, RAG, and AI integrations",
    icon: Brain,
  },
  {
    label: "Contact",
    prompt: "Where can I contact you?",
    description: "Email, socials, and availability",
    icon: Mail,
  },
] as const;

interface QuickActionProps {
  label: string;
  onClick: (text: string) => void;
  prompt: string;
}

function QuickAction({ label, onClick, prompt }: QuickActionProps) {
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

interface SuggestionCardProps {
  label: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
  onClick: (text: string) => void;
}

function SuggestionCard({
  label,
  description,
  prompt,
  icon: Icon,
  onClick,
}: SuggestionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick(prompt)}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-background/60 p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/50"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.button>
  );
}

interface GreetingProps {
  onPromptClick?: (prompt: string) => void;
  isExpanded?: boolean;
}

export function Greeting({
  onPromptClick = () => {},
  isExpanded = false,
}: GreetingProps) {
  if (isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex w-full flex-col items-center px-2 py-8 sm:py-12"
      >
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bot className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            How can I help?
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            I&apos;m Adarsha&apos;s AI assistant. Ask about projects, skills,
            experience, or pick a topic below.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((item) => (
            <SuggestionCard
              key={item.label}
              {...item}
              onClick={onPromptClick}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-5 px-5 py-2"
    >
      <div className="space-y-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Hi! I&apos;m Adarsha&apos;s AI Assistant. Ask me about projects,
          skills, experience, or anything else you&apos;d like to know.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Try asking</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((item) => (
            <QuickAction
              key={item.label}
              label={item.label}
              onClick={onPromptClick}
              prompt={item.prompt}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
