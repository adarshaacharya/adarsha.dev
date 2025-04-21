import { UseChatOptions, UseChatHelpers, useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  messages: UseChatHelpers["messages"];
  status: UseChatHelpers["status"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  input: UseChatHelpers["input"];
};

export function ChatForm({
  open,
  messages,
  status,
  handleInputChange,
  handleSubmit,
  input,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && status !== "streaming" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, open, status]);

  return (
    <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
      <form onSubmit={handleSubmit} className="flex space-x-1 items-center">
        <textarea
          ref={inputRef}
          rows={2}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="w-full p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
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
              } else {
                handleSubmit(e);
              }
            }
          }}
        />
        <motion.button
          type="submit"
          disabled={status === "streaming" || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={14} />
        </motion.button>
      </form>
    </div>
  );
}
