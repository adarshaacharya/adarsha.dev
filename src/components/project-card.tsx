import { GitHubIcon, LinkIcon } from "@/components/icons";
import { SocialLink } from "@/components/social-link";
import { WebApp } from "@/data/projects";
import { ZoomableImage } from "./zoomable-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type Props = {
  project: WebApp;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="overflow-hidden  relative">
        <ZoomableImage
          src={project.thumbnail}
          alt={`Screenshot of ${project.title}`}
          width={0}
          height={0}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed line-clamp-2 mt-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
      
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
          {project.demo && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
