import { SOCIALS } from "@/data";
import { SocialLink } from "./social-link";
import { siteMetadata } from "@/data/siteMetadata";

export function Footer() {
  return (
    <footer className="flex  justify-center  pt-12 pb-5 ">
      <p className="text-gray-500  dark:text-gray-400 text-sm">
        © {new Date().getFullYear()}&nbsp;
        <a
          href={siteMetadata.social.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          Aadarsha Acharya.
        </a>
        &nbsp; All rights reserved.
      </p>
    </footer>
  );
}
