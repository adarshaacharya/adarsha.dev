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
};

export function ChatForm({
  open,
  messages,
  status,
  input,
  setInput,
  sendMessage,
  isExpanded = false,
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
    <div className="border-t">
      <div className={cn("p-4", isExpanded && "sm:px-6")}>
        <form onSubmit={handleSubmit}>
          <div
            className={cn("relative", isExpanded && "mx-auto w-full max-w-3xl")}
          >
            <Textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
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

      {/* Footer */}
      <div className="border-t bg-muted/30 px-4 pb-3 pt-2">
        <div
          className={cn(
            "flex items-center justify-between text-xs",
            isExpanded && "mx-auto max-w-3xl",
          )}
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Ready to help</span>
          </div>
          <span className="text-muted-foreground">Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
