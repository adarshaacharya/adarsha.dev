"use client";
import { siteMetadata } from "@/data/siteMetadata";
import { SOCIALS } from "@/data/socials";
import { SocialLink } from "./social-link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="flex flex-col items-center pt-10 pb-5 space-y-2 text-center">
      {!isHomePage && (
        <div className="flex space-x-4 mb-2">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-4 w-4"
            />
          ))}
        </div>
      )}
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()}&nbsp;
        <a
          href={siteMetadata.social.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          Adarsha Acharya.
        </a>
        &nbsp;All rights reserved.
      </p>

      <a
        href={siteMetadata.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-300"
      >
        View source code
      </a>
    </footer>
  );
}
