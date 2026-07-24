"use server";

import { z } from "zod";
import { saveNewsletterSubscriber } from "@/lib/turso";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

export async function subscribeToNewsletter(
  _previousState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const result = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!result.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await saveNewsletterSubscriber(result.data.email);
    return { status: "success", message: "You’re subscribed — thank you!" };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return {
      status: "error",
      message: "Unable to subscribe right now. Please try again later.",
    };
  }
}
