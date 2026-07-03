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

type Props = {
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  onPromptClick?: (prompt: string) => void;
};

export const Messages = ({
  messages,
  status,
  onPromptClick = () => {},
}: Props) => {
  const hasMessages = messages.length > 0;

  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="flex-1">
        <MessageScrollerViewport className="px-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <MessageScrollerContent className="gap-4 py-4">
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
