import { LINKS } from "@/data/links";
import { siteMetadata } from "@/data/siteMetadata";
import { SOCIALS } from "@/data/socials";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/newsletter-form";
import { SocialLink } from "./social-link";

export function Footer() {
  return (
    <footer className="mt-16 space-y-8 pb-8">
      <Separator />

      <NewsletterForm />

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
              className="text-muted-foreground hover:text-foreground transition-colors"
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="text-balance">
            ©{" "}
            <a
              href={siteMetadata.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {siteMetadata.author}
            </a>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="/sitemap.xml"
              className="transition-colors underline underline-offset-4 hover:text-foreground"
            >
              Sitemap
            </a>
            <a
              href="/feed.xml"
              className="transition-colors underline underline-offset-4 hover:text-foreground"
            >
              RSS feed
            </a>
            <a
              href="/privacy"
              className="transition-colors underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href={LINKS.CAL_COM}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors underline underline-offset-4 hover:text-foreground"
            >
              Book a call
            </a>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
