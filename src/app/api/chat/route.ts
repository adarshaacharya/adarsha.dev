import { createAgentUIStreamResponse, UIMessage } from "ai";
import { createPortfolioAgent, type ChatPageContext } from "./utils";

export const maxDuration = 30;

function parsePageContext(value: unknown): ChatPageContext | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const context = value as Partial<ChatPageContext>;

  if (
    context.type !== "blog" ||
    typeof context.slug !== "string" ||
    typeof context.pathname !== "string"
  ) {
    return null;
  }

  if (!/^\/blog\/[^/]+$/.test(context.pathname)) {
    return null;
  }

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(context.slug)) {
    return null;
  }

  return {
    type: "blog",
    slug: context.slug,
    pathname: context.pathname,
  };
}

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = (await req.json()) as {
      messages: UIMessage[];
      pageContext?: unknown;
    };

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    return createAgentUIStreamResponse({
      agent: createPortfolioAgent(parsePageContext(pageContext)),
      uiMessages: messages,
      timeout: { totalMs: 25_000 },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
