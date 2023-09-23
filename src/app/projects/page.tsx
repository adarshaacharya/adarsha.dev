import { PROJECTS } from "@/data";
import { generatePageMetadata } from "../seo";
import { ProjectCard } from "../../components/project-card";

export const metadata = generatePageMetadata({ title: "Projects" });

export default function Projects() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
      <ul
        role="list"
        className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 "
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </ul>
    </div>
  );
}
