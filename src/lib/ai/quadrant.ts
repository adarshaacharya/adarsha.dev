import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { openaiEmbeddings } from "./openai";

const API_KEY = process.env.QDRANT_API_KEY;
const URL = process.env.QDRANT_URL;
const COLLECTION_NAME = process.env.QDRANT_DB_COLLECTION_NAME;

if (!URL || !API_KEY || !COLLECTION_NAME) {
  throw new Error(
    "Qdrant URL, API key, and collection name must be set in environment variables",
  );
}

const qadrantClient = new QdrantClient({
  url: URL,
  apiKey: API_KEY,
});

const collectionName = COLLECTION_NAME;

export async function getVectorStore() {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      openaiEmbeddings,
      {
        apiKey: API_KEY,
        url: URL,
        collectionName,
        collectionConfig: {
          vectors: {
            distance: "Cosine",
            size: 100,
          },
        },
      },
    );
    return vectorStore;
  } catch (error) {
    console.error("Error getting vector store:", error);
    throw new Error("Failed to get vector store");
  }
}

export const getEmbeddingCollections = async () => {
  const collectionExists = await qadrantClient.collectionExists(collectionName);

  if (!collectionExists) {
    return qadrantClient.createCollection(collectionName, {
      vectors: {
        distance: "Cosine",
        size: 1536, // https://js.langchain.com/docs/integrations/vectorstores/upstash/#instantiation
      },
    });
  }

  const deleted = await qadrantClient.deleteCollection(collectionName);
  if (deleted) {
    console.log(`Collection ${collectionName} deleted successfully.`);
  } else {
    console.log(`Failed to delete collection ${collectionName}.`);
  }

  return qadrantClient.createCollection(collectionName, {
    vectors: {
      distance: "Cosine",
      size: 1536,
    },
  });
};
