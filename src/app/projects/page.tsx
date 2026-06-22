import { generatePageMetadata } from "../seo";
import { WEB_APPS, TOOLS } from "@/data/projects";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Projects",
  description: "Open source web apps, npm packages, CLI tools, and VS Code extensions.",
});

export default function Projects() {
  return (
    <div className="py-4 space-y-16">

      {/* Web Apps */}
      <section>
        <div className="space-y-1 mb-10">
          <h1 className="text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Open source work — web apps, tools, and packages.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {WEB_APPS.map((project, i) => (
            <div key={project.title} className="group py-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5 min-w-0">
                  <span className="text-xs text-muted-foreground/50 tabular-nums pt-0.5 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 space-y-2">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${project.title} source code`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Packages */}
      <section className="border-t border-border pt-12">
        <div className="space-y-1 mb-8">
          <h2 className="text-lg font-bold tracking-tight">Tools & Packages</h2>
          <p className="text-sm text-muted-foreground">
            npm packages, CLI tools, and VS Code extensions.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {TOOLS.map((tool) => (
            <div key={tool.title} className="group py-5">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 space-y-1.5">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 font-mono">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    {tool.techs.join(" · ")}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
                  <a
                    href={tool.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${tool.title} source code`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {tool.demo && (
                    <a
                      href={tool.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${tool.title} package`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
