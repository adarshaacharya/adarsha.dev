"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Messages } from "./messages";
import { Send, MessageSquare, X } from "lucide-react";
import { ChatForm } from "./chat-form";

const avatarVariants = {
  initial: { scale: 0.5, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0.5,
    rotate: 180,
    transition: {
      duration: 0.2,
    },
  },
};

const headerVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

const buttonWaveVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.15, 0.3, 0.15],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const secondWaveVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5,
    },
  },
};

const thirdWaveVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [1, 1.4, 1],
    opacity: [0.05, 0.15, 0.05],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
    onError: (error) => {
      toast.error("An error occurred, please try again!");
    },
  });

  const handlePromptClick = (prompt: string) => {
    handleInputChange({
      target: { value: prompt },
    } as React.ChangeEvent<HTMLInputElement>);

    setTimeout(() => {
      handleSubmit({
        preventDefault: () => {},
        stopPropagation: () => {},
      } as React.FormEvent);
    }, 100);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-16 right-4 sm:right-6 w-[85vw] sm:w-[320px] h-[400px] bg-white dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col overflow-hidden z-50 border border-zinc-200 dark:border-zinc-800"
          >
            <motion.div
              className="flex items-center justify-between p-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  variants={avatarVariants}
                  className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center"
                >
                  <motion.span
                    className="text-white dark:text-black font-medium text-xs"
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: {
                        repeat: Infinity,
                        repeatDelay: 8,
                        duration: 1,
                      },
                    }}
                  >
                    A
                  </motion.span>
                </motion.div>
                <motion.h2
                  variants={headerVariants}
                  className="text-xs font-medium"
                >
                  Chat with Adarsha
                </motion.h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close chat"
              >
                <X size={14} />
              </motion.button>
            </motion.div>

            <Messages
              messages={messages}
              status={status}
              onPromptClick={handlePromptClick}
            />
            <ChatForm
              open={open}
              messages={messages}
              status={status}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              input={input}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50">
        {/* Third wave (outermost) */}
        <motion.div
          className="absolute -inset-3 rounded-full bg-blue-400/10 blur-md"
          variants={thirdWaveVariants}
          initial="initial"
          animate="animate"
        />
        {/* Second wave */}
        <motion.div
          className="absolute -inset-2.5 rounded-full bg-blue-400/15 blur-md"
          variants={secondWaveVariants}
          initial="initial"
          animate="animate"
        />
        {/* First wave (innermost) */}
        <motion.div
          className="absolute -inset-2 rounded-full bg-blue-500/20 blur-md"
          variants={buttonWaveVariants}
          initial="initial"
          animate="animate"
        />
        <motion.button
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg border border-white/20 dark:border-black/20"
          aria-label="Toggle chat"
        >
          <motion.div
            animate={{
              rotate: open ? 180 : 0,
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: {
                type: "spring",
                stiffness: 200,
                damping: 15,
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              },
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="text-white"
          >
            {open ? <X size={16} /> : <MessageSquare size={16} />}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
