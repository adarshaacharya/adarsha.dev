"use client";
import { GitHubIcon } from "@/components/icons/social";
import { SocialLink } from "@/components/social-link";
import { PROJECTS } from "@/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { generatePageMetadata } from "../seo";

interface Props {
  project: (typeof PROJECTS)[0];
}

export const metadata = generatePageMetadata({ title: "Projects" });

export const ProjectCard = ({ project }: Props) => {
  return (
    <div
      className="flex cursor-pointer flex-col rounded-xl transition hover:bg-zinc-50 hover:dark:bg-zinc-800/50"
      key={project.title}
    >
      <div className="bg-cover bg-no-repeat">
        <Image
          src={project.imgSrc}
          alt={`Logo of ${project.title}`}
          className="h-50 w-full rounded-t-lg object-cover"
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <div className="p-4">
        <a
          className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
          href={project.link.href}
        >
          {project.title}
        </a>
        <div className=" z-10 mt-2 text-sm">{project.description}</div>
        <p className="z-10 mb-6 mt-6 flex flex-wrap gap-1 ">
          {project.tags.map((techStackItem) => (
            <p
              className="hover:text-primary dark:hover:text-primary inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              key={techStackItem}
            >
              {techStackItem}
            </p>
          ))}
        </p>
        <p className="flex items-center">
          <SocialLink
            icon={GitHubIcon}
            href={project.link.href}
            className="h-6 w-6 flex-none"
          />
        </p>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
      <ul
        role="list"
        className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 "
      >
        {PROJECTS.map((project, idx) => (
          <motion.li
            key={project.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
