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
    .slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="space-y-5 pt-2">
        {/* Avatar */}
        <Image
          src="/_static/me.jpg"
          width={52}
          height={52}
          alt="Adarsha Acharya"
          className="rounded-full ring-2 ring-border"
          priority
        />

        {/* Name */}
        <div className="space-y-2">
          <h1 className="font-serif text-5xl sm:text-6xl tracking-tight leading-[1.05]">
            Adarsha<br />Acharya
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Fullstack Engineer · AI & Web · Nepal
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2.5 text-muted-foreground leading-relaxed text-sm max-w-lg">
          <p>
            I build full-stack TypeScript applications with a focus on AI integrations and great DX. Shipped products across multiple startups and domains. Currently building in the open.
          </p>
          <p>
            Drop me a line at{" "}
            <a
              href="mailto:hi@adarsha.dev"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              hi@adarsha.dev
            </a>{" "}
            — always happy to talk about interesting problems.
          </p>
        </div>

        {/* Social links + CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
              className="text-muted-foreground hover:text-foreground transition-colors"
            />
          ))}
          <div className="w-px h-4 bg-border" />
          <Button variant="outline" size="sm" asChild>
            <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Resume
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link href="/projects">
              Projects
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Recent Writing
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground">
              All posts
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>

        <div>
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block border-l-2 border-transparent hover:border-primary pl-4 -ml-4 transition-all duration-200"
            >
              <BlogListItem blog={blog} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
