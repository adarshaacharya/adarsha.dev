"use client";

import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Messages } from "./messages";
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { ChatForm } from "./chat-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DefaultChatTransport } from "ai";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (error) => {
      toast.error("An error occurred, please try again!");
    },
  });

  const handlePromptClick = (prompt: string) => {
    sendMessage({ text: prompt });
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
            className="fixed bottom-24 right-4 sm:right-8 w-[90vw] sm:w-[400px] z-50"
          >
            <Card
              className={`${
                isExpanded ? "h-[700px]" : "h-[600px]"
              } flex flex-col shadow-xl transition-all duration-300`}
            >
              <CardHeader className="pb-3 px-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Status indicator */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-green-500/30"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CardTitle className="text-sm font-semibold">
                        <motion.span
                          animate={{
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent"
                        >
                          Chat with Adarsha
                        </motion.span>
                      </CardTitle>
                    </motion.div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="h-7 w-7 p-0 hover:bg-muted"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <Minimize2 className="h-3.5 w-3.5" />
                      ) : (
                        <Maximize2 className="h-3.5 w-3.5" />
                      )}
                      <span className="sr-only">
                        {isExpanded ? "Collapse" : "Expand"}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpen(false)}
                      className="h-7 w-7 p-0 hover:bg-muted"
                      title="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
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
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="relative"
        >
          {/* Pulsing ring highlight */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/50"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.5,
            }}
          />

          <motion.button
            onClick={() => setOpen((o) => !o)}
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden bg-primary text-primary-foreground flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>
            <span className="sr-only">Toggle chat</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
