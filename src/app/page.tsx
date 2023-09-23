import Image from "next/image";
import { SOCIALS } from "../data";
import { SocialLink } from "@/components/social-link";
import { BriefcaseIcon } from "@/components/icons/social";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/blog-card";
import { generatePageMetadata } from "./seo";

export const metadata = generatePageMetadata({ title: "Home" });

export default function Home() {
  const blogs = allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <>
      <div className="py-5">
        <Image
          src="/_static/adarsha.jpeg"
          width={80}
          height={80}
          alt="avatar"
          className="rounded-full hover:grayscale-0	dark:grayscale "
          priority
        />

        <h1 className="mt-5 text-3xl font-bold">Aadarsha Acharya</h1>

        <p className="mt-4">
          I used to consider myself a software engineer, but the reality is that
          I simply enjoy creating things. If you&pos;d like to get in touch, send me
          an email.
        </p>

        <p>
          I'm always looking to work on interesting projects with interesting
          people. If you have something in mind, feel free to reach out on any
          of my social handles.
        </p>
      </div>
      <ul className="flex space-x-4">
        {SOCIALS.map((social) => (
          <SocialLink
            key={social.label}
            aria-label={`Follow on ${social.label}`}
            href={social.href}
            icon={social.icon}
          />
        ))}
      </ul>
      <div className="mt-7 flex items-end space-x-3 align-bottom">
        <SocialLink href={"dajkdas"} icon={BriefcaseIcon} />
        <span>View Resume</span>
      </div>
       
      <div className="my-5">
        <h2 className="mb-5 text-2xl font-bold">Recent Posts</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug} className="py-2">
              <BlogCard blog={blog} key={blog.slug} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
