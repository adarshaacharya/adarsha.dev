import { GitHubIcon } from "@/components/icons";
import { SocialLink } from "@/components/social-link";
import { PROJECTS } from "@/data/projects";
import Image from "next/image";

type Props = {
  project: (typeof PROJECTS)[number];
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div
      className="flex cursor-pointer flex-col rounded-xl transition hover:bg-zinc-50 hover:dark:bg-zinc-800/50"
      key={project.title}
    >
      <Image
        src={project.thumbnail}
        alt={`Logo of ${project.title}`}
        className="h-50 w-full rounded-t-lg object-cover bg-no-repeat"
        width={0}
        height={0}
        unoptimized
      />
      <div className="p-4">
        <a className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {project.title}
        </a>
        <div className=" z-10 mt-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </div>
        <div className="z-10 mb-6 mt-6 flex flex-wrap gap-1 ">
          {project.tags.map((techStackItem) => (
            <p
              className="hover:text-primary dark:hover:text-primary inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              key={techStackItem}
            >
              {techStackItem}
            </p>
          ))}
        </div>
        <div className="flex items-center">
          <SocialLink
            icon={GitHubIcon}
            href={project.repo}
            className="h-6 w-6 flex-none"
          />
        </div>
      </div>
    </div>
  );
};
