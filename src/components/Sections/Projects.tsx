import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SessionBase, { SectionBase } from "./Base";
import { getAllProjects } from "@/lib/projects";

const Projects: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  return (
    <SessionBase id={id} title="Projects">
      <div className="space-y-10">
        {getAllProjects().map((project) => {
          const href = `/projects/${project.slug}`;

          return (
            <div
              className="flex flex-col md:flex-row items-start gap-x-6 gap-y-2"
              key={project.slug}
            >
              <div className={`text-sm min-w-30 text-muted-foreground pt-1`}>
                {project.date}
              </div>
              <div className="grid gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <div className="grid gap-1">
                    <div className="font-semibold">
                      <Link
                        href={href}
                        className="hover:underline hover:underline-offset-4"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.subtitle}
                    </div>
                  </div>
                  {/* 44px tap target; the negative margins keep it from
                      shifting the row layout */}
                  <Link
                    href={href}
                    className="-my-3 -mr-3.5 flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-muted-foreground/10"
                    aria-label={`View project: ${project.title}`}
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="text-foreground/80 text-sm my-2">
                  {project.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {project.tech.join(" • ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SessionBase>
  );
};

export default Projects;
