import {
  streamText,
  generateText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { getVectorStore } from "@/lib/ai/quadrant";
import { chatModel, queryModel, SYSTEM_PROMPT } from "./utils";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: UIMessage[];
    };

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    // Get the current message text
    const currentMessage = messages[messages.length - 1];
    const textPart = currentMessage.parts?.find((part) => part.type === "text");
    const currentMessageText =
      textPart && "text" in textPart ? textPart.text : "";

    // Get chat history (all messages except the current one)
    const chatHistory = messages.slice(0, -1);

    // Initialize vector store for retrieval
    const vectorStore = await getVectorStore();

    // Generate search query from chat history and current message
    let searchQuery = currentMessageText;

    // If there's chat history, generate a better search query
    if (chatHistory.length > 0) {
      const historyText = chatHistory
        .map((msg) => {
          const textPart = msg.parts?.find((part) => part.type === "text");
          const text = textPart && "text" in textPart ? textPart.text : "";
          return `${msg.role === "user" ? "User" : "Assistant"}: ${text}`;
        })
        .join("\n");

      const queryPrompt = `Given the following conversation history and the latest user question, generate a search query to look up relevant information. Only return the search query, nothing else.

Conversation history:
${historyText}

Latest question: ${currentMessageText}

Search query:`;

      const { text: generatedQuery } = await generateText({
        model: queryModel,
        prompt: queryPrompt,
      });

      searchQuery = generatedQuery.trim();
    }

    // Retrieve relevant documents from vector store
    const retrievedDocs = await vectorStore.similaritySearch(searchQuery, 3);

    // Format the context from retrieved documents
    const context = retrievedDocs
      .map((doc) => {
        const url = doc.metadata?.url || "";
        const content = doc.pageContent || "";
        return `Page URL: ${url}\n\nPage content:\n${content}`;
      })
      .join("\n--------\n");

    // Replace {context} placeholder in system prompt
    const systemPromptWithContext = SYSTEM_PROMPT.replace("{context}", context);

    // Stream the response using AI SDK v6
    const result = streamText({
      model: chatModel,
      system: systemPromptWithContext,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
