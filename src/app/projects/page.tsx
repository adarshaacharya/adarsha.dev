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
    <div className="space-y-20 lg:space-y-28">
      {/* Web Applications Section */}
      <section className="space-y-8 lg:space-y-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Web Applications
        </h2>
        <AnimatedProjectsList projects={WEB_APPS} type="web-apps" />
      </section>

      <Separator />

      {/* Tools & Packages Section */}
      <section className="space-y-8 lg:space-y-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Tools & Packages
        </h2>
        <AnimatedProjectsList projects={TOOLS} type="tools" />
      </section>
    </div>
  );
}
