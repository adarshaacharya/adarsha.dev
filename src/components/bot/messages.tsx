"use client";

import React from "react";
import { Greeting } from "./greeting";
import { Message } from "./message";
import { ThinkingMessage } from "./thinking-message";
import type { UIMessage } from "ai";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { cn } from "@/lib/utils";

type Props = {
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  onPromptClick?: (prompt: string) => void;
  isExpanded?: boolean;
};

export const Messages = ({
  messages,
  status,
  onPromptClick = () => {},
  isExpanded = false,
}: Props) => {
  const hasMessages = messages.length > 0;

  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="flex-1">
        <MessageScrollerViewport
          className={cn(
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted",
            isExpanded ? "px-4 sm:px-6" : "px-4",
          )}
        >
          <MessageScrollerContent
            className={cn(
              "gap-4 py-4",
              isExpanded && "mx-auto w-full max-w-3xl gap-5 py-6",
            )}
          >
            {!hasMessages && (
              <MessageScrollerItem>
                <Greeting onPromptClick={onPromptClick} />
              </MessageScrollerItem>
            )}

            {hasMessages &&
              messages.map((msg, index) => (
                <MessageScrollerItem
                  key={msg.id || index}
                  messageId={msg.id}
                  scrollAnchor={msg.role === "user"}
                >
                  <Message
                    message={msg}
                    isLoading={
                      status === "streaming" &&
                      index === messages.length - 1 &&
                      msg.role === "assistant"
                    }
                  />
                </MessageScrollerItem>
              ))}

            {status === "submitted" && hasMessages && (
              <MessageScrollerItem>
                <ThinkingMessage />
              </MessageScrollerItem>
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton className="bottom-3" />
      </MessageScroller>
    </MessageScrollerProvider>
  );
};
