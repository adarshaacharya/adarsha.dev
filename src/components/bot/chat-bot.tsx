"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Messages } from "./messages";
import { X, Minimize2, Maximize2, Plus } from "lucide-react";
import { ChatForm } from "./chat-form";
import { ChatMascot } from "./chat-mascot";
import { ASK_BOT_EVENT, type AskBotEventDetail } from "./chat-events";
import { getBotPageContext } from "./page-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DefaultChatTransport } from "ai";
import { cn } from "@/lib/utils";

const TEASER_DISMISSED_KEY = "chatbot-teaser-dismissed";
const TEASER_DELAY_MS = 2500;

function getTeaserMessage(pageContext: ReturnType<typeof getBotPageContext>) {
  return pageContext
    ? "Questions about this post? I can help."
    : "Hi! Ask me about Adarsha's work.";
}

export function ChatBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const pageContext = useMemo(() => getBotPageContext(pathname), [pathname]);
  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (error) => {
      toast.error("An error occurred, please try again!");
    },
  });

  const sendContextualMessage = useCallback(
    (message: { text: string }) =>
      sendMessage(message, {
        body: {
          pageContext,
        },
      }),
    [pageContext, sendMessage],
  );

  const handlePromptClick = (prompt: string) => {
    sendContextualMessage({ text: prompt });
  };

  const dismissTeaser = () => {
    setShowTeaser(false);
    sessionStorage.setItem(TEASER_DISMISSED_KEY, "1");
  };

  const hideTeaser = () => {
    setShowTeaser(false);
  };

  const openChat = () => {
    hideTeaser();
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      return;
    }

    if (sessionStorage.getItem(TEASER_DISMISSED_KEY) === "1") {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowTeaser(true);
    }, TEASER_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const handleAskBot = (event: Event) => {
      const { prompt } = (event as CustomEvent<AskBotEventDetail>).detail ?? {};

      if (!prompt) return;

      hideTeaser();
      setOpen(true);

      if (status === "submitted" || status === "streaming") {
        toast.error("Please wait for the current response to finish.");
        return;
      }

      sendContextualMessage({ text: prompt });
    };

    window.addEventListener(ASK_BOT_EVENT, handleAskBot);
    return () => window.removeEventListener(ASK_BOT_EVENT, handleAskBot);
  }, [sendContextualMessage, status]);

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <>
      <AnimatePresence mode="wait">
        {open && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-[2px]"
            onClick={() => setIsExpanded(false)}
            aria-hidden
          />
        )}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed z-50 transition-[inset,width,max-width] duration-300",
              isExpanded
                ? "inset-x-4 bottom-24 top-[max(1rem,env(safe-area-inset-top))] mx-auto w-auto max-w-2xl sm:inset-x-auto sm:bottom-28 sm:left-1/2 sm:top-[max(1.5rem,env(safe-area-inset-top))] sm:w-[min(680px,calc(100vw-2rem))] sm:-translate-x-1/2"
                : "bottom-24 right-4 w-[calc(100vw-2rem)] sm:right-8 sm:w-[420px]",
            )}
          >
            <Card
              className={cn(
                "flex flex-col overflow-hidden rounded-xl border bg-background/95 shadow-xl backdrop-blur transition-[height,box-shadow] duration-300",
                isExpanded
                  ? "h-full shadow-2xl"
                  : "h-[min(620px,calc(100vh-8rem))]",
              )}
            >
              <CardHeader className="border-b px-4 py-3 sm:px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
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

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CardTitle className="text-sm font-semibold">
                        {pageContext
                          ? "Ask about this post"
                          : "Chat with Adarsha"}
                      </CardTitle>
                      {isExpanded ? (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {pageContext
                            ? "Article-aware assistant for explanations and follow-ups"
                            : "Portfolio assistant for projects, writing, and contact details"}
                        </p>
                      ) : null}
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={handleNewChat}
                      disabled={messages.length === 0 || isBusy}
                      title="New chat"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span className="sr-only">New chat</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsExpanded(!isExpanded)}
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
                      size="icon-sm"
                      onClick={() => {
                        setOpen(false);
                        setIsExpanded(false);
                      }}
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
                  isExpanded={isExpanded}
                  pageContext={pageContext}
                />
                <ChatForm
                  open={open}
                  messages={messages}
                  status={status}
                  input={input}
                  setInput={setInput}
                  sendMessage={sendContextualMessage}
                  isExpanded={isExpanded}
                  isBlogContext={pageContext?.type === "blog"}
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
          animate={
            open
              ? { y: 0, scale: 1 }
              : {
                  y: [0, -5, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            open
              ? { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
              : {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: [0.34, 1.25, 0.64, 1],
                  repeatDelay: 2,
                }
          }
          className="relative"
        >
          <AnimatePresence>
            {showTeaser && !open ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-full right-0 z-10 mb-3 w-[min(260px,calc(100vw-5rem))]"
              >
                <div className="relative rounded-xl border border-border bg-popover px-3.5 py-2.5 pr-8 text-sm leading-snug text-popover-foreground shadow-lg">
                  <button
                    type="button"
                    onClick={openChat}
                    className="text-left transition-opacity hover:opacity-80"
                  >
                    {getTeaserMessage(pageContext)}
                  </button>
                  <button
                    type="button"
                    onClick={dismissTeaser}
                    className="absolute top-2 right-2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Dismiss message"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div
                    aria-hidden
                    className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-r border-b border-border bg-popover"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            onClick={() => (open ? setOpen(false) : openChat())}
            className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl focus-visible:outline-offset-2"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96, y: 0 }}
            aria-label={open ? "Close chat" : "Chat with Adarsha"}
            aria-expanded={open}
          >
            <ChatMascot open={open} />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
