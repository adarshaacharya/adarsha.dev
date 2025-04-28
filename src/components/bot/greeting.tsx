"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExamplePromptProps {
  text: string;
  onClick: (text: string) => void;
}

function ExamplePrompt({ text, onClick }: ExamplePromptProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(text)}
      className="text-xs py-1 px-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors text-left"
    >
      {text}
    </motion.button>
  );
}

interface GreetingProps {
  onPromptClick?: (prompt: string) => void;
}

export function Greeting({ onPromptClick = () => {} }: GreetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full text-center px-3 py-4 space-y-3"
    >
      <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center mb-1">
        <span className="text-white dark:text-black text-sm font-semibold">
          A
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Chat with Adarsha</h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-[220px]">
          Ask about my projects, skills, or experience
        </p>
      </div>

      <div className="flex flex-col w-full max-w-[220px]">
        <div className="grid grid-cols-1 gap-1.5">
          <ExamplePrompt
            text="Tell me about your fullstack experience"
            onClick={onPromptClick}
          />
          <ExamplePrompt
            text="What are your notable projects?"
            onClick={onPromptClick}
          />
          <ExamplePrompt
            text="Give me your resume link"
            onClick={onPromptClick}
          />
        </div>
      </div>
    </motion.div>
  );
}
