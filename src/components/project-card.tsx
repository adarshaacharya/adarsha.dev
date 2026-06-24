import { WebApp } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type Props = {
  project: WebApp;
  index: number;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group border border-border/60 rounded-lg p-6 hover:border-primary/40 hover:bg-muted/20 transition-all duration-300">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          </Button>
          {project.demo && (
            <Button size="sm" asChild>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
