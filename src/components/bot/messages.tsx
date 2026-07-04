"use client";

import React from "react";
import { Greeting } from "./greeting";
import { Message } from "./message";
import { ThinkingMessage } from "./thinking-message";
import { isToolUIPart, type DynamicToolUIPart, type ToolUIPart, type UIMessage } from "ai";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
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

type MessagePart = NonNullable<UIMessage["parts"]>[number];
type ToolPart = ToolUIPart | DynamicToolUIPart;
type SourcePart = Extract<MessagePart, { type: "source-url" | "source-document" }>;

function getVisibleToolParts(parts: MessagePart[]) {
  return parts.filter(isToolUIPart);
}

function isSourcePart(part: MessagePart): part is SourcePart {
  return part.type === "source-url" || part.type === "source-document";
}

function getToolSummary(parts: ToolPart[]) {
  if (parts.length === 0) return null;

  const activePart =
    parts.find(
      (part) =>
        part.state === "approval-requested" ||
        part.state === "input-streaming" ||
        part.state === "input-available",
    ) ?? parts[parts.length - 1];

  const state = activePart.state;
  const count = parts.length;

  if (state === "input-streaming" || state === "input-available") {
    return {
      state,
      text: count > 1 ? `Checking sources (${count} steps)` : "Checking sources",
    };
  }

  if (state === "output-error" || state === "output-denied") {
    return {
      state,
      text: "Lookup interrupted",
    };
  }

  if (state === "approval-requested" || state === "approval-responded") {
    return {
      state,
      text: "Waiting on tool step",
    };
  }

  return null;
}

function ToolStatusMessage({ parts }: { parts: ToolPart[] }) {
  const summary = getToolSummary(parts);

  if (!summary) return null;

  return (
    <div className="pl-9">
      <Marker className="w-fit max-w-full gap-1.5 px-0 py-0 text-[11px] text-muted-foreground">
        <MarkerIcon className="size-3.5">
          {summary.state === "input-streaming" || summary.state === "input-available" ? (
            <LoaderCircleIcon className="size-3.5 animate-spin" />
          ) : summary.state === "output-error" || summary.state === "output-denied" ? (
            <SearchIcon className="size-3.5" />
          ) : null}
        </MarkerIcon>
        <MarkerContent className="truncate">
          {summary.state === "input-streaming" || summary.state === "input-available" ? (
            <Shimmer>{summary.text}</Shimmer>
          ) : (
            summary.text
          )}
        </MarkerContent>
      </Marker>
    </div>
  );
}

export const Messages = ({
  messages,
  status,
  onPromptClick = () => {},
  isExpanded = false,
}: Props) => {
  const hasMessages = messages.length > 0;
  const lastMessage = messages.at(-1);
  const lastAssistantMessage =
    lastMessage?.role === "assistant" ? lastMessage : undefined;
  const lastAssistantParts = lastAssistantMessage?.parts ?? [];
  const lastAssistantToolParts = getVisibleToolParts(lastAssistantParts);
  const lastAssistantHasText = lastAssistantParts.some(
    (part) => part.type === "text" && "text" in part && part.text.trim().length > 0,
  );
  const lastAssistantHasSources = lastAssistantParts.some(isSourcePart);
  const showToolStatus =
    status === "streaming" && lastAssistantToolParts.length > 0;
  const showThinkingMessage =
    hasMessages &&
    (status === "submitted" ||
      (status === "streaming" &&
        !showToolStatus &&
        lastAssistantMessage?.role === "assistant" &&
        !lastAssistantHasText &&
        !lastAssistantHasSources));

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
                      msg.role === "assistant" &&
                      !showToolStatus
                    }
                  />
                </MessageScrollerItem>
              ))}

            {showToolStatus && (
              <MessageScrollerItem>
                <ToolStatusMessage parts={lastAssistantToolParts} />
              </MessageScrollerItem>
            )}

            {showThinkingMessage && (
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
