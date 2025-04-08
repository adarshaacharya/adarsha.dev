import { siteMetadata } from "@/data/siteMetadata";
import { SOCIALS } from "@/data/socials";

export function Footer() {
  return (
    <footer className="flex flex-col items-center pt-10 pb-5 space-y-2 text-center">
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
        Made with ❤️ – View on GitHub
      </a>
    </footer>
  );
}
