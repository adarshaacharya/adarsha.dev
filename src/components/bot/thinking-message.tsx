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
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function ThinkingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2"
    >
      <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium">
        A
      </div>
      <div className="rounded-lg px-3 py-2 bg-muted flex items-center space-x-1">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
