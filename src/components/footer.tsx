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
    <footer className="mt-16 space-y-6">
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

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
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

          <a
            href={siteMetadata.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:text-foreground transition-colors underline underline-offset-4"
          >
            View source code
          </a>
        </div>
      </div>
    </footer>
  );
}
