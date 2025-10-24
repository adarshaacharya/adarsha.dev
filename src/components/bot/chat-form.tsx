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
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <Textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="min-h-[40px] max-h-[120px] resize-none"
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
          size="sm"
          disabled={status === "streaming" || !input.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
