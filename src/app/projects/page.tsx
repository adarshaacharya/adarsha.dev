import { PROJECTS } from "@/data";
import { generatePageMetadata } from "../seo";
import { ProjectCard } from "../../components/project-card";
import React from "react";

export const metadata = generatePageMetadata({ title: "Projects" });

export default function Projects() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold tracking-tighter">Projects.</h1>
      <div
        role="list"
        className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 "
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </div>
    </section>
  );
}
