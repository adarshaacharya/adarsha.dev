import { SOCIALS } from "@/data";
import { SocialLink } from "./social-link";

export function Footer() {
  return (
    <>
      {/* <div className="my-4 w-full max-w-3xl border-t border-gray-200 dark:border-gray-800" /> */}
      <footer className="flex flex-col justify-between pt-12 pb-5 md:flex-row">
        <ul className="flex">
          {SOCIALS.map((social) => (
            <li className="mr-6" key={social.label}>
              <SocialLink icon={social.icon} href={social.href} />
            </li>
          ))}
        </ul>
        <p className="text-gray-500  dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Aadarsha Acharya. All rights reserved.
        </p>
      </footer>
    </>
  );
}
