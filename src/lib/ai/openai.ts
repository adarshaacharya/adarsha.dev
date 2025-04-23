import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { OpenAIEmbeddings } from "@langchain/openai";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  throw new Error("OPENAI_API_KEY; is not defined");
}

export const openaiEmbeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: API_KEY,
});
