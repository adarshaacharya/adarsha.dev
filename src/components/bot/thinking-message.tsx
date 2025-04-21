"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const dotVariants: Variants = {
  initial: { opacity: 0.4, scale: 0.8 },
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.8, 1, 0.8],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export function ThinkingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start"
    >
      <div className="rounded-lg rounded-tl-none px-2 py-1.5 bg-zinc-100 dark:bg-zinc-800 flex items-center space-x-1">
        <motion.span
          className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
        <motion.span
          className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.span
          className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
