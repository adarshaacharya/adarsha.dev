import { createAgentUIStreamResponse, UIMessage } from "ai";
import { portfolioAgent } from "./utils";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: UIMessage[];
    };

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    return createAgentUIStreamResponse({
      agent: portfolioAgent,
      uiMessages: messages,
      timeout: { totalMs: 25_000 },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
