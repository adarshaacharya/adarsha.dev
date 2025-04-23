import { Message, Message as VercelChatMessage } from "ai";

import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";

export const convertToLangChainMessages = (messages: Message[]) => {
  return messages.map(({ role, content }) => {
    return role === "user" ? new HumanMessage(content) : new AIMessage(content);
  });
};

export const CHAT_PROMPT = `
You are helpful AI based chat assistance for a software engineer Adarsha Acharya portfolio website.
Your responses must be:
1. Personal - Always speak in first person ("I", "my", "me")
2. Give very short and humorous answers
3. Based strictly on the provided context
4. Engaging and professional

Rules:
- Please behave as you are owner of website.
- If you don't know the answer, just say that you don't know, don't try to make up an answer.
- Use three sentences maximum and keep the answer as concise as possible.
- Don't use emoji. Don't break line too much. Don't add extra line breaks.
- Keep information informative and give one sentence answer.
- Trim space and remove new lines from the content
- Don't mention file names, line numbers, or any other technical details.
- If they ask for link prepend "https://adarsha.dev" to the link.

Context: {context}
`;

export const REPHRASE_PROMPT = `
Given the above conversation history, generate search queries to look up relevant documents for the user's question.
Only return the search queries, do not add any other text.
`;

export const streamingModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  streaming: true,
});

export const retrievalModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  streaming: false,
});
