import { LangChainAdapter, Message as VercelChatMessage } from "ai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { getVectorStore } from "@/lib/ai/quadrant";
import {
  CHAT_PROMPT,
  convertToLangChainMessages,
  REPHRASE_PROMPT,
  retrievalModel,
  streamingModel,
} from "./utils";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: VercelChatMessage[];
    };

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const chatHistory = convertToLangChainMessages(messages.slice(0, -1));

    const currentMessageContent = messages[messages.length - 1].content;

    const retriever = (await getVectorStore()).asRetriever({
      k: 3,
    });

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      ["user", REPHRASE_PROMPT],
    ]);

    // chain responsible to get the chat history and put it on prompt
    const historyRetrievalChain = await createHistoryAwareRetriever({
      llm: retrievalModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", CHAT_PROMPT],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsRAGChain = await createStuffDocumentsChain({
      llm: streamingModel,
      prompt,
      // add url from metadata  and page_content
      // as the content of the document, check quadrant.ts for defination
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}",
      ),
      documentSeparator: "\n--------\n",
    });

    // similarity search in vector store to find relevant documents as per user query
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: combineDocsRAGChain,
      retriever: historyRetrievalChain,
    });

    const llmInput = await retrievalChain.invoke({
      input: currentMessageContent, // the input / question as defined in the prompt
      chat_history: chatHistory,
    });

    const stream = await combineDocsRAGChain.stream({
      input: llmInput,
      chat_history: chatHistory,
    });

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
