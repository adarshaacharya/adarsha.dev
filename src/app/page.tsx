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
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="/_static/me.jpg"
            width={80}
            height={80}
            alt="Adarsha Acharya"
            className="rounded-xl transition-all duration-300 hover:scale-105"
            priority
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-xl font-bold">Adarsha Acharya</h1>

            <div className="flex items-center gap-3">
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

        <div className="space-y-3 text-muted-foreground leading-normal text-sm">
          <p>
            Fullstack software engineer specializing in building web applications with modern JavaScript and AI-driven features. Worked on multiple startups across insurance, iGaming, and video streaming domains, with active contributions to open source.
          </p>
          <p>
            Reach out at{" "}
            <a
              href="mailto:hi@adarsha.dev"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              hi@adarsha.dev
            </a>{" "}
            for exciting projects or opportunities.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Resume
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest Posts
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="text-sm">
              View all
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl divide-y divide-border/40">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block hover:bg-muted/30 transition-colors duration-200 rounded-lg -mx-2 px-2"
            >
              <BlogListItem blog={blog} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
