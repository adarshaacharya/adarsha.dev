import Image from "next/image";
import Link from "next/link";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { WEB_APPS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { LINKS } from "@/data/links";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download, Github } from "lucide-react";

export default function Home() {
  const blogs = allBlogs
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const featuredProjects = WEB_APPS.slice(0, 4);

  return (
    <div className="py-2 space-y-16">

      {/* ===== HERO ===== */}
      <section>
        {/* Name + photo — name is the identity mark */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-foreground"
            style={{ letterSpacing: "-0.035em", textWrap: "balance" } as React.CSSProperties}
          >
            Adarsha Acharya
          </h1>
          <Image
            src="/_static/me.jpg"
            width={52}
            height={52}
            alt="Adarsha Acharya"
            className="rounded-full flex-shrink-0 mt-1.5"
            priority
          />
        </div>

        <p className="text-sm text-muted-foreground mb-5 font-medium tracking-wide">
          Fullstack Engineer · Nepal
        </p>

        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-lg mb-7" style={{ textWrap: "pretty" } as React.CSSProperties}>
          I build full-stack web applications with TypeScript, React, and Node.
          Worked across insurance, iGaming, and streaming startups. Focused on
          AI-powered products lately.{" "}
          <a
            href="mailto:hi@adarsha.dev"
            className="text-foreground underline underline-offset-4 decoration-border hover:decoration-primary transition-all"
          >
            hi@adarsha.dev
          </a>
        </p>

        <div className="flex flex-wrap items-center gap-4">
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
          <Button variant="outline" size="sm" asChild className="h-8 text-xs rounded-md">
            <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
              <Download className="h-3 w-3 mr-1.5" />
              Resume
            </a>
          </Button>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-5">Work</h2>
        <div className="space-y-3">
          {EXPERIENCE.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="flex items-baseline">
              <span className="hidden sm:block text-xs text-muted-foreground/70 w-28 flex-shrink-0 tabular-nums">
                {exp.period}
              </span>
              <div className="flex items-baseline gap-0 flex-wrap min-w-0">
                <span className="text-sm font-medium text-foreground">{exp.company}</span>
                <span className="text-sm text-muted-foreground">&nbsp;·&nbsp;{exp.role}</span>
                <span className="sm:hidden text-xs text-muted-foreground/70 ml-2 tabular-nums">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WRITING + PROJECTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

        {/* Writing */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground">Writing</h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              All posts →
            </Link>
          </div>
          <div>
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col py-3.5 border-b border-border/50 last:border-0 hover:no-underline"
              >
                <time className="text-[11px] text-muted-foreground/70 tabular-nums mb-1">
                  {formatDate(blog.publishedAt)}
                </time>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                  {blog.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground">Projects</h2>
            <Link
              href="/projects"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              All →
            </Link>
          </div>
          <div className="space-y-5">
            {featuredProjects.map((project) => (
              <div key={project.title} className="group">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                    {project.title}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${project.title} source`}
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${project.title} demo`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                  {project.description}
                </p>
                <p className="text-[11px] text-muted-foreground/50 mt-1.5 truncate">
                  {project.tags.slice(0, 3).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== NOW — one committed cobalt moment ===== */}
      <section className="border-t border-border pt-12">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h2 className="text-sm font-semibold text-primary">Now</h2>
        </div>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-lg" style={{ textWrap: "pretty" } as React.CSSProperties}>
          Building AI-powered products and exploring the TanStack ecosystem.
          Lately thinking about AI agents, edge runtimes, and the future of
          React. Writing about what I learn along the way.
        </p>
        <p className="text-[11px] text-muted-foreground/50 mt-3 tabular-nums">
          Updated June 2026
        </p>
      </section>

    </div>
  );
}
