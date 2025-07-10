"use client";

import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Messages } from "./messages";
import { MessageSquare, X } from "lucide-react";
import { ChatForm } from "./chat-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 w-[85vw] sm:w-[380px] z-50"
          >
            <Card className="h-[500px] flex flex-col shadow-xl">
              <CardHeader className="pb-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-sm">
                        A
                      </span>
                    </div>
                    <CardTitle className="text-base">
                      Chat with Adarsha
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close chat</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
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
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <Button
          onClick={() => setOpen((o) => !o)}
          size="lg"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
          </motion.div>
          <span className="sr-only">Toggle chat</span>
        </Button>
      </motion.div>
    </>
  );
}
