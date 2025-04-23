"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Messages } from "./messages";
import { Send, MessageSquare, X } from "lucide-react";
import { ChatForm } from "./chat-form";

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
            <div className="flex items-center justify-between p-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-medium text-xs">
                    A
                  </span>
                </div>
                <h2 className="text-xs font-medium">Chat with Adarsha</h2>
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
            </div>

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

      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg z-50 border border-zinc-200 dark:border-zinc-700"
        aria-label="Toggle chat"
      >
        {open ? <X size={16} /> : <MessageSquare size={16} />}
      </motion.button>
    </> 
  );
}
