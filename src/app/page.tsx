import Image from "next/image";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/blog-card";
import React from "react";
import { LINKS } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const blogs = allBlogs
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <React.Fragment>
      <section className="mb-5">
        <Image
          src="/_static/me.jpg"
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full cursor-pointer hover:grayscale mb-5"
          priority
        />
        <h1 className="text-2xl font-bold">Adarsha Acharya</h1>

        <div className="text-gray-700 dark:text-gray-300">
          <p className="mt-4">
            I’m a fullstack software engineer specializing in building web
            applications powered by modern JavaScript technologies and AI-driven
            features.
          </p>
          <p className="mt-4 mb-4">
            Over the years, I&apos;ve worked on multiple startups to build and
            launch end-to-end products in insurance, iGaming, and video
            streaming domains, and have actively contributed to various open
            source projects.
          </p>

          <p className="mb-4">
            I&apos;m currently open to new opportunities! If you have an
            exciting project or role that aligns with my expertise, please reach
            out at&nbsp;
            <a href="mailto:hi@adarsha.dev" className="border-b inline-block">
              hi@adarsha.dev
            </a>
            &nbsp;or through any of my social channels below.
          </p>
        </div>

        <div className="flex space-x-4 mb-2 mt-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 "
            />
          ))}
        </div>
        <p className="mt-4 border-b inline-block cursor-pointer">
          <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </p>
      </section>

      <div className="my-8 w-full border-t border-gray-200 dark:border-gray-800" />

      <div>
        <h2 className="mb-6 text-2xl font-bold">Latest posts</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug} className="py-1">
              <Link href={`/blog/${blog.slug}`}>
                <BlogCard blog={blog} key={blog.slug} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
