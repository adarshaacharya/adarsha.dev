import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "node_modules/langchain/dist/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { DocumentInterface } from "@langchain/core/documents";
import { getEmbeddingCollections, getVectorStore } from "@/lib/ai/quadrant";

(async function main() {
  try {
    await getEmbeddingCollections();

    const loader = new DirectoryLoader("src/", {
      ".tsx": (path) => new TextLoader(path),
      ".mdx": (path) => new TextLoader(path),
      ".ts": (path) => new TextLoader(path),
    });

    const docs = (await loader.load()).filter((doc) => {
      const { metadata } = doc;
      const { source } = metadata;

      // exlude the file `route.ts` , `utils.ts` , all files inside lib
      return (
        !source.includes("route.ts") &&
        !source.includes("utils.ts") &&
        !source.includes("lib/") &&
        !source.includes("content/")
      );
    });

    const formattedDocs = docs.map((doc): DocumentInterface => {
      const { pageContent, metadata } = doc;

      // how to get the url from metadata
      const url = metadata.source
        .replace("src/app", "")
        .replace(".tsx", "")
        .replace(".ts", "")
        .replace(".mdx", "")
        .replace(/\/page$/, "");

      const formattedContent = pageContent
        .replace(/import.*?from.*?;/g, "")
        .replace(/export.*?from.*?;/g, "")
        .replace(/function\s+\w+\s*\(.*?\)\s*{/g, "")
        .replace(/const\s+\w+\s*=\s*function\s*\(.*?\)\s*{/g, "")
        .replace(/className\s*=\s*["'][^"']*["']/g, "")
        .trim();

      return {
        pageContent: formattedContent,
        metadata: { url },
      };
    });

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
      chunkOverlap: 10,
      chunkSize: 100,
    });

    const splitDocs = await splitter.splitDocuments(formattedDocs);

    console.log(`Split site into ${splitDocs.length} sub-documents.`);

    const vectorStore = await getVectorStore();

    await vectorStore.addDocuments(splitDocs);

    console.log("Documents added to vector store.");
  } catch (error) {
    console.error("Error loading documents:", error);
    process.exit(1);
  }
})();
