import Image from "next/image";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/blog-card";
import React from "react";

export default function Home() {
  const blogs = allBlogs.slice(0, 2).sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <React.Fragment>
      <section className="mb-5">
        <Image
          src="/_static/adarsha.jpeg"
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full hover:grayscale-0	dark:grayscale mb-5"
          priority
        />
        <h1 className="text-2xl font-bold ">Aadarsha Acharya</h1>

        <p className="mt-4">
          I’m a software engineer specializing in building scalable, accessible
          web applications having rich user interface using javascript.
        </p>
        <p className="mt-4 mb-4">
          Over the years, I&apos;ve worked on multiple projects in insurance,
          game-tech, and video streaming domains, and have actively contributed
          to various open source projects. Currently, I&apos;m building iGaming
          solutions at &nbsp;
          <a
            href="https://mindworks.xyz/"
            target="_blank"
            className="border-b inline-block"
          >
            mindworks.xyz
          </a>
          .
        </p>

        <p className="mb-4">
          If you&apos;d like to collaborate, please&nbsp;
          <a
            href="mailto:adarshaofficial@gmail.com"
            className="border-b inline-block"
          >
            send me an email
          </a>
          &nbsp;or reach out on any of my social handles.
        </p>

        <div className="flex space-x-4 mb-2 mt-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
            />
          ))}
        </div>
        <p className="mt-4 border-b inline-block cursor-pointer">
          <a
            href="https://drive.google.com/file/d/1iw6y7FUeCABgEY1nCuyxd1Bz0LAX-ICq/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </p>
      </section>

      <div className="my-8 w-full border-t border-gray-200 dark:border-gray-800" />

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
    </React.Fragment>
  );
}
