"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ExamplePromptProps {
  text: string;
  onClick: (text: string) => void;
}

function ExamplePrompt({ text, onClick }: ExamplePromptProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onClick(text)}
      className="h-auto p-3 text-xs justify-start text-left"
    >
      {text}
    </Button>
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
      className="flex flex-col items-center justify-center h-full text-center px-4 py-8 space-y-6"
    >
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground text-2xl font-semibold">
          A
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Hi! I&apos;m Adarsha&apos;s AI Assistant
        </h2>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          Ask me about my projects, skills, experience, or anything else
          you&apos;d like to know.
        </p>
      </div>

      <div className="w-full max-w-[280px] space-y-2">
        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
        <div className="grid grid-cols-1 gap-2">
          <ExamplePrompt
            text="Tell me about your fullstack experience"
            onClick={onPromptClick}
          />
          <ExamplePrompt
            text="What are your notable projects?"
            onClick={onPromptClick}
          />
          <ExamplePrompt
            text="What technologies do you work with?"
            onClick={onPromptClick}
          />
        </div>
      </div>
    </motion.div>
  );
}
