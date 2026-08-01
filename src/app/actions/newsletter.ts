"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import {
  saveNewsletterSubscriber,
  unsubscribeNewsletterSubscriber,
} from "@/lib/turso";
import { sendNewsletterWelcomeEmail } from "@/lib/email/send-newsletter-welcome";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

const unsubscribeSchema = z.string().regex(/^[A-Za-z0-9_-]{43}$/);

export async function subscribeToNewsletter(
  _previousState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const result = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!result.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const { unsubscribeToken } = await saveNewsletterSubscriber(
      result.data.email,
    );

    try {
      await sendNewsletterWelcomeEmail({
        email: result.data.email,
        unsubscribeToken,
      });
    } catch (error) {
      console.error("Newsletter confirmation email failed:", error);
      return {
        status: "success",
        message:
          "You're subscribed, but I couldn't send the confirmation email.",
      };
    }

    return {
      status: "success",
      message: "You're subscribed. Check your inbox for confirmation.",
    };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return {
      status: "error",
      message: "Unable to subscribe right now. Please try again later.",
    };
  }
}

export async function confirmNewsletterUnsubscribe(formData: FormData) {
  const token = unsubscribeSchema.safeParse(formData.get("token"));

  if (!token.success) {
    redirect("/newsletter/unsubscribe?status=invalid");
  }

  const unsubscribed = await unsubscribeNewsletterSubscriber(token.data);
  redirect(
    unsubscribed
      ? "/newsletter/unsubscribe?status=success"
      : "/newsletter/unsubscribe?status=invalid",
  );
}
