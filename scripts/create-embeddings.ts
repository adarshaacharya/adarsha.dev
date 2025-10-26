import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { DocumentInterface } from "@langchain/core/documents";
import { getEmbeddingCollections, getVectorStore } from "@/lib/ai/quadrant";
import fs from "fs/promises";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";

// its inside the public folder, so we need to go one level up
// and then into public/_static/resume.pdf
const resumePdf = "public/_static/resume.pdf";

async function loadResume() {
  try {
    const resumePdfBuffer = await fs.readFile(resumePdf);

    if (!resumePdfBuffer) {
      throw new Error("Resume PDF file not found or is empty.");
    }

    const resumePdfBlob = new Blob([new Uint8Array(resumePdfBuffer)], {
      type: "application/pdf",
    });

    const pdfLoader = new WebPDFLoader(resumePdfBlob, {
      parsedItemSeparator: "",
    });

    const resumeDocs = await pdfLoader.load();

    if (resumeDocs.length === 0) {
      throw new Error("No documents found in the resume PDF.");
    }

    // Combine all pages into a single document
    const combinedContent = resumeDocs.map((doc) => doc.pageContent).join("");

    return {
      pageContent: combinedContent,
      metadata: { ...resumeDocs[0].metadata, totalPages: resumeDocs.length },
    };
  } catch (error) {
    console.error("Error loading resume PDF:", error);
    throw error;
  }
}

(async function main() {
  try {
    await getEmbeddingCollections();

    const loader = new DirectoryLoader("src/", {
      ".tsx": (path) => new TextLoader(path),
      ".mdx": (path) => new TextLoader(path),
      ".ts": (path) => new TextLoader(path),
    });

    // Load both website docs and resume in parallel
    const [websiteDocs, resumeDoc] = await Promise.all([
      loader.load(),
      loadResume(),
    ]);

    const docs = websiteDocs.filter((doc) => {
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

    // Format website docs
    const formattedWebsiteDocs = docs.map((doc): DocumentInterface => {
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
        metadata: { url, source: "website" },
      };
    });

    // Format resume doc with proper metadata
    const formattedResumeDoc: DocumentInterface = {
      pageContent: resumeDoc.pageContent.trim(),
      metadata: { url: "/resume", source: "resume" },
    };

    // Combine all formatted docs
    const formattedDocs = [...formattedWebsiteDocs, formattedResumeDoc];

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
      chunkOverlap: 10,
      chunkSize: 300,
    });

    const splitDocs = await splitter.splitDocuments(formattedDocs);

    console.log(`Split site into ${splitDocs.length} sub-documents.`);

    console.log(
      "Adding documents to vector store. This may take a few moments...",
    );
    const vectorStore = await getVectorStore();

    await vectorStore.addDocuments(splitDocs);

    console.log("Documents added to vector store.");
  } catch (error) {
    console.error("Error loading documents:", error);
    process.exit(1);
  }
})();
