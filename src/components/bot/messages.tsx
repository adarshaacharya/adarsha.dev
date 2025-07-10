"use client";

import React from "react";
import { Greeting } from "./greeting";
import { Message } from "./message";
import { ThinkingMessage } from "./thinking-message";
import { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { cn } from "@/lib/utils";

type Props = {
  messages: UIMessage[];
  status: UseChatHelpers["status"];
  onPromptClick?: (prompt: string) => void;
};

export const Messages = ({
  messages,
  status,
  onPromptClick = () => {},
}: Props) => {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const hasMessages = messages.length > 0;

  return (
    <div
      ref={messagesContainerRef}
      className={cn(
        "flex-1 overflow-y-auto px-4",
        "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
      )}
    >
      <div className="flex flex-col gap-4 py-4">
        {!hasMessages && <Greeting onPromptClick={onPromptClick} />}

        {hasMessages &&
          messages.map((msg, index) => (
            <Message
              key={msg.id || index}
              message={msg}
              isLast={index === messages.length - 1}
              isLoading={
                status === "streaming" &&
                index === messages.length - 1 &&
                msg.role === "assistant"
              }
            />
          ))}

        {status === "submitted" && hasMessages && <ThinkingMessage />}

        <div ref={messagesEndRef} className="h-1 w-full" />
      </div>
    </div>
  );
};
