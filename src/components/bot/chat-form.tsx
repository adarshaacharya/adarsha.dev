"use client";

import type { UIMessage } from "ai";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: { text: string }) => void;
  isExpanded?: boolean;
  isBlogContext?: boolean;
};

export function ChatForm({
  open,
  messages,
  status,
  input,
  setInput,
  sendMessage,
  isExpanded = false,
  isBlogContext = false,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && status !== "streaming" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, open, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className={cn("border-t", isExpanded && "bg-muted/20")}>
      <div className={cn("p-4", isExpanded && "px-6 pb-5 pt-4")}>
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              "relative",
              isExpanded && "mx-auto w-full max-w-3xl",
            )}
          >
            <Textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isBlogContext
                  ? "Ask about this post..."
                  : "Ask me anything..."
              }
              className={cn(
                "max-h-32 min-h-12 resize-none border-2 py-3 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0",
                isExpanded ? "rounded-2xl" : "rounded-full",
              )}
              disabled={status === "streaming"}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();

                  if (status !== "ready") {
                    toast.error(
                      "Please wait for the model to finish its response!",
                    );
                  } else if (input.trim()) {
                    sendMessage({ text: input });
                    setInput("");
                  }
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={status === "streaming" || !input.trim()}
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
