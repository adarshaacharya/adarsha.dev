import type { Metadata } from "next";
import Link from "next/link";
import { confirmNewsletterUnsubscribe } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

type UnsubscribePageProps = {
  searchParams: Promise<{
    status?: string;
    token?: string;
  }>;
};

export default async function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const { status, token } = await searchParams;
  const hasValidToken = Boolean(token && /^[A-Za-z0-9_-]{43}$/.test(token));

  if (status === "success") {
    return (
      <UnsubscribeShell
        title="You’ve been unsubscribed."
        description="You won’t receive any more newsletter emails. Thanks for reading."
      />
    );
  }

  if (status === "invalid" || !hasValidToken) {
    return (
      <UnsubscribeShell
        title="This link isn’t valid."
        description="The unsubscribe link may be incomplete or out of date."
      />
    );
  }

  return (
    <UnsubscribeShell
      title="Unsubscribe from the newsletter?"
      description="You’ll stop receiving new articles and occasional notes from adarsha.dev."
    >
      <form action={confirmNewsletterUnsubscribe}>
        <input type="hidden" name="token" value={token} />
        <Button type="submit" className="h-10 rounded-sm px-5">
          Unsubscribe
        </Button>
      </form>
    </UnsubscribeShell>
  );
}

function UnsubscribeShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex min-h-[70svh] items-center py-16 sm:py-24">
      <div className="max-w-xl">
        <p className="mb-5 text-sm text-muted-foreground">Newsletter</p>
        <h1 className="text-balance font-serif text-4xl leading-[1.08] tracking-[-0.03em] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
        <p className="mt-8 text-sm">
          <Link
            href="/"
            className="text-primary transition-colors hover:text-foreground"
          >
            ← Back to adarsha.dev
          </Link>
        </p>
      </div>
    </article>
  );
}
