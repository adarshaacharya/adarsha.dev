import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";

export const maxDuration = 30;

const groq = createGroq({
  // custom settings
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq("gemma2-9b-it"),
      system: `You are a helpful assistant. Answer the user's questions as accurately as possible.
        Please provide short answer using the information provided in the context.
        Don't use emoji.
        If you don't know answer say "sorry, I don't know. Please email to my boss hi@adarsha.dev".
      
      `,
      messages,
    });

    return result.toDataStreamResponse({
      getErrorMessage(error) {
        if (error == null) {
          return "unknown error";
        }

        if (typeof error === "string") {
          return error;
        }

        if (error instanceof Error) {
          return error.message;
        }

        return JSON.stringify(error);
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
