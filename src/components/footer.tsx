"use client";
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
          <div className="flex space-x-4">
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

        <div className="w-full overflow-x-auto text-sm text-muted-foreground">
          <div className="flex min-w-max items-center justify-between gap-6 text-left">
            <p>
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

            <div className="flex items-center gap-4 justify-end">
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
