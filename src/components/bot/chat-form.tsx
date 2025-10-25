"use client";

import type { UIMessage } from "ai";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: { text: string }) => void;
};

export function ChatForm({
  open,
  messages,
  status,
  input,
  setInput,
  sendMessage,
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
      <div className="p-4">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="min-h-[48px] max-h-[120px] resize-none rounded-full pr-12 py-3 border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
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
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 pt-2 border-t bg-muted/30">
        <div className="flex items-center justify-between text-xs">
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
