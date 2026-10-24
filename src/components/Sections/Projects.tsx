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
              className="group relative flex flex-col md:flex-row items-start gap-x-6 gap-y-2"
              key={project.slug}
            >
              <div className={`text-sm min-w-30 text-muted-foreground pt-1`}>
                {project.date}
              </div>
              <div className="grid gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <div className="grid gap-1">
                    <div className="font-semibold">
                      {/* stretched over the whole row: one link and one tab
                          stop per project; the arrow is only a visual cue */}
                      <Link
                        href={href}
                        className="group-hover:underline group-focus-within:underline underline-offset-4 after:absolute after:inset-0"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.subtitle}
                    </div>
                  </div>
                  <span
                    // the whole row is the target, so the chip stays inside it
                    className="flex size-8 shrink-0 items-center justify-center rounded-md group-hover:bg-muted-foreground/10 group-focus-within:bg-muted-foreground/10"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
