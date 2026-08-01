import { Resend } from "resend";
import { NewsletterWelcomeEmail } from "@/emails/newsletter-welcome";
import { siteMetadata } from "@/data/siteMetadata";

type SendNewsletterWelcomeEmailParams = {
  email: string;
  unsubscribeToken: string;
};

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL ?? siteMetadata.siteUrl).replace(
    /\/$/,
    "",
  );
}

export async function sendNewsletterWelcomeEmail({
  email,
  unsubscribeToken,
}: SendNewsletterWelcomeEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Resend is not configured.");
  }

  const baseUrl = getBaseUrl();
  const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const oneClickUnsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    replyTo: siteMetadata.social.email,
    subject: "You’re subscribed to adarsha.dev",
    react: (
      <NewsletterWelcomeEmail
        siteUrl={baseUrl}
        unsubscribeUrl={unsubscribeUrl}
      />
    ),
    headers: {
      "List-Unsubscribe": `<${oneClickUnsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    tags: [{ name: "category", value: "newsletter_welcome" }],
  });

  if (error) {
    throw new Error(error.message);
  }
}
