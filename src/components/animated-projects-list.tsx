"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Tool, WebApp } from "@/data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

type AnimatedProjectsListProps = {
  projects: WebApp[] | Tool[];
  type: "web-apps" | "tools";
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function AnimatedProjectsList({
  projects,
  type,
}: AnimatedProjectsListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2"
    >
      {projects.map((project, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          {type === "web-apps" ? (
            <ProjectCard project={project as WebApp} />
          ) : (
            <Card className="group transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-background"
                  >
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-background"
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
