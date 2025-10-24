import { WebApp } from "@/data/projects";
import { ZoomableImage } from "./zoomable-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  project: WebApp;
  index: number;
};

export const ProjectCard = ({ project, index }: Props) => {
  const isEven = index % 2 === 0;

  return (
    <div className="group">
      <div
        className={cn(
          "flex flex-col lg:flex-row gap-8 lg:gap-12 items-center",
          !isEven && "lg:flex-row-reverse",
        )}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-video relative">
              <ZoomableImage
                src={project.thumbnail}
                alt={`Screenshot of ${project.title}`}
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="space-y-3">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2.5 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
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
            {project.demo && (
              <Button size="sm" asChild className="transition-colors">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
