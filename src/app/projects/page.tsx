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
    <div className="space-y-12">
      {/* Web Applications Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Things I've built and shipped — web apps, packages, and tools.</p>
        </div>
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground pt-2">
          Web Applications
        </h2>
        <AnimatedProjectsList projects={WEB_APPS} type="web-apps" />
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          Tools & Packages
        </h2>
        <AnimatedProjectsList projects={TOOLS} type="tools" />
      </section>
    </div>
  );
}
