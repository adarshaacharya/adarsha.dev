"use client";

import { motion } from "framer-motion";
import type { UIMessage } from "ai";
import { MessageResponse } from "@/components/ai-elements/message";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { cn } from "@/lib/utils";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message as ConversationMessage,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

interface MessageProps {
  message: UIMessage;
  isLoading?: boolean;
}

type MessagePart = NonNullable<UIMessage["parts"]>[number];
type SourcePart = Extract<MessagePart, { type: "source-url" | "source-document" }>;

function isSourcePart(part: MessagePart): part is SourcePart {
  return part.type === "source-url" || part.type === "source-document";
}

function getSourceTitle(part: SourcePart) {
  if ("title" in part && part.title) return part.title;
  if (part.type === "source-url") {
    try {
      return new URL(part.url).hostname;
    } catch {
      return part.url;
    }
  }
  return `Document ${part.sourceId}`;
}

function MessageSources({ sources }: { sources: SourcePart[] }) {
  if (sources.length === 0) return null;

  return (
    <Sources>
      <SourcesTrigger count={sources.length} />
      <SourcesContent>
        {sources.map((source) =>
          source.type === "source-url" ? (
            <Source
              href={source.url}
              key={source.sourceId}
              title={getSourceTitle(source)}
            />
          ) : (
            <span
              className="flex items-center gap-2 font-medium"
              key={source.sourceId}
            >
              {getSourceTitle(source)}
            </span>
          ),
        )}
      </SourcesContent>
    </Sources>
  );
}

export function Message({ message, isLoading = false }: MessageProps) {
  const isUser = message.role === "user";
  const parts = message.parts ?? [];
  const sources = parts.filter(isSourcePart);

  const textContent = parts
    ?.map((part) => {
      if (part.type === "text" && "text" in part) {
        return part.text;
      }
      return "";
    })
    .filter(Boolean)
    .join("");
  const hasTextContent = textContent.trim().length > 0;
  const hasAssistantContent = hasTextContent || isLoading || sources.length > 0;

  if (!isUser && !hasAssistantContent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <ConversationMessage align={isUser ? "end" : "start"}>
        <MessageAvatar
          className={cn(
            "h-7 min-w-7 text-xs font-medium",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isUser ? "You" : "A"}
        </MessageAvatar>
        <MessageContent>
          <Bubble
            align={isUser ? "end" : "start"}
            variant={isUser ? "default" : "muted"}
          >
            <BubbleContent
              className={cn(
                "rounded-lg px-3 py-2 shadow-sm",
                !isUser && sources.length > 0 && "w-full",
                isUser && "whitespace-pre-wrap",
                isLoading && "after:ml-0.5 after:animate-pulse after:content-['|']",
              )}
            >
              {isUser ? (
                textContent || (isLoading ? "" : " ")
              ) : hasTextContent || isLoading ? (
                <MessageResponse
                  className="h-auto min-h-0 w-full"
                  isAnimating={isLoading}
                >
                  {textContent}
                </MessageResponse>
              ) : null}
              {!isUser && sources.length > 0 ? (
                <div className="mt-3">
                  <MessageSources sources={sources} />
                </div>
              ) : null}
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </ConversationMessage>
    </motion.div>
  );
}
