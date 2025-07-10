import { generatePageMetadata } from "../seo";
import { AnimatedProjectsList } from "../../components/animated-projects-list";
import React from "react";
import { WEB_APPS, TOOLS } from "@/data/projects";
import { Separator } from "@/components/ui/separator";

export const metadata = generatePageMetadata({
  title: "Projects",
  description:
    "View some of my notable open source web apps, npm packages, cli tools and more.",
});

export default function Projects() {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of web applications, tools, and open source projects
            I&apos;ve built over the years.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Web Applications
          </h2>
          <AnimatedProjectsList projects={WEB_APPS} type="web-apps" />
        </section>

        <Separator />

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tools & Packages
          </h2>
          <AnimatedProjectsList projects={TOOLS} type="tools" />
        </section>
      </div>
    </div>
  );
}
