import { Tool, WebApp } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

type AnimatedProjectsListProps = {
  projects: WebApp[] | Tool[];
  type: "web-apps" | "tools";
};

export function AnimatedProjectsList({
  projects,
  type,
}: AnimatedProjectsListProps) {
  if (type === "web-apps") {
    return (
      <div>
        {(projects as WebApp[]).map((project, idx) => (
          <div
            key={idx}
            className="group grid grid-cols-[2rem_1fr] gap-5 py-5 border-b border-border/40 last:border-b-0"
          >
            <span className="font-mono text-xs font-medium text-primary tabular-nums pt-1 select-none">
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div className="space-y-2.5">
              <div>
                <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
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

              <div className="flex items-center gap-3 text-xs">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
                {project.demo && (
                  <>
                    <span className="text-border">·</span>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live demo
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {(projects as Tool[]).map((project, idx) => (
        <div
          key={idx}
          className="group grid grid-cols-[2rem_1fr] gap-5 py-4 border-b border-border/40 last:border-b-0"
        >
          <span className="font-mono text-xs font-medium text-primary tabular-nums pt-0.5 select-none">
            {String(idx + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techs.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-[10px] font-normal px-1.5 py-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs shrink-0 pt-0.5">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
              <span className="text-border">·</span>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
