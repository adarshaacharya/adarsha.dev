import Image from "next/image";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { BlogListItem } from "@/components/blog/blog-list-item";
import React from "react";
import Link from "next/link";
import { LINKS } from "@/data/links";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Download } from "lucide-react";

export default function Home() {
  const blogs = allBlogs
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <Image
            src="/_static/me.jpg"
            width={120}
            height={120}
            alt="Adarsha Acharya"
            className="rounded-2xl transition-all duration-300 hover:scale-105"
            priority
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold">Adarsha Acharya</h1>

            <div className="flex items-center gap-4">
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
          </div>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a fullstack software engineer specializing in building web
            applications powered by modern JavaScript technologies and AI-driven
            features.
          </p>
          <p>
            Over the years, I&apos;ve worked on multiple startups to build and
            launch end-to-end products in insurance, iGaming, and video
            streaming domains, and have actively contributed to various open
            source projects.
          </p>
          <p>
            If you have an exciting project or role that aligns with my
            expertise, please reach out at{" "}
            <a
              href="mailto:hi@adarsha.dev"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              hi@adarsha.dev
            </a>{" "}
            or through any of my social channels.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Latest Posts
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              View all posts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl divide-y divide-border/40">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block hover:bg-muted/30 transition-colors duration-200 rounded-lg -mx-4 px-4"
            >
              <BlogListItem blog={blog} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
