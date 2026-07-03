"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/components/ui/marker";

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
    >
      <Marker role="status" className="px-1">
        <MarkerIcon className="flex items-center gap-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            variants={dotVariants}
            initial="initial"
            animate="animate"
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          />
        </MarkerIcon>
        <MarkerContent>Thinking</MarkerContent>
      </Marker>
    </motion.div>
  );
}
