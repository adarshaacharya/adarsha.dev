"use client";
import { LINKS } from "@/data/links";
import { siteMetadata } from "@/data/siteMetadata";
import { SOCIALS } from "@/data/socials";
import { SocialLink } from "./social-link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="mt-16 space-y-6 pb-8">
      <Separator />

      <div className="flex flex-col items-center space-y-4 text-center">
        {!isHomePage && (
          <div className="flex flex-wrap items-center justify-center gap-4">
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
        )}

        <div className="w-full text-sm text-muted-foreground">
          <div className="grid gap-4 text-center md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:text-left">
            <p className="text-balance">
              ©{" "}
              <a
                href={siteMetadata.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Adarsha Acharya
              </a>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
              <a
                href="/sitemap.xml"
                className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
              >
                Sitemap
              </a>
              <a
                href="/feed.xml"
                className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
              >
                RSS feed
              </a>
              <a
                href="/privacy"
                className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href={LINKS.CAL_COM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
              >
                Book a call
              </a>
              <a
                href={siteMetadata.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
              >
                Source code
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
