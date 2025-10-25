"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Briefcase, Lightbulb } from "lucide-react";

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: (text: string) => void;
  prompt: string;
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
  prompt,
}: QuickActionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border"
        onClick={() => onClick(prompt)}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-sm mb-0.5">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
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
      className="flex flex-col px-5 py-2 space-y-6"
    >
      {/* Welcome message */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hi! I&apos;m Adarsha&apos;s AI Assistant. Ask me about projects,
          skills, experience, or anything else you&apos;d like to know.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Actions
        </h3>
        <div className="space-y-2.5">
          <QuickAction
            icon={<Code2 className="h-5 w-5 text-primary" />}
            title="Tech Stack"
            description="Technologies and tools I work with"
            onClick={onPromptClick}
            prompt="What technologies do you work with?"
          />
          <QuickAction
            icon={<Briefcase className="h-5 w-5 text-primary" />}
            title="Notable Projects"
            description="Explore my project portfolio"
            onClick={onPromptClick}
            prompt="What are your notable projects?"
          />
          <QuickAction
            icon={<Code2 className="h-5 w-5 text-primary" />}
            title="Experience"
            description="My fullstack development journey"
            onClick={onPromptClick}
            prompt="Tell me about your fullstack experience"
          />
        </div>
      </div>

      {/* Pro Tip */}
      <Card className="bg-muted/30 border-muted p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold mb-1">Pro Tip</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Be specific in your questions! Try &quot;What&apos;s your
              experience with Next.js?&quot; instead of just
              &quot;Next.js&quot;.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
