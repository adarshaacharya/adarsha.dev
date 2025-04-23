"use client";

import { useEffect } from "react";
import { Greeting } from "./greeting";
import { Message } from "./message";
import { ThinkingMessage } from "./thinking-message";
import { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import { useScrollToBottom } from "./use-scroll-to-bottom";

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
      className="flex-1 overflow-y-auto chat-scrollbar px-2"
    >
      <div className="flex flex-col gap-2 py-2">
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

        <div ref={messagesEndRef} className="h-4 w-full" />
      </div>
    </div>
  );
};
