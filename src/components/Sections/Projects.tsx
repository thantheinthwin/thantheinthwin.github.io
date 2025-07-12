import React from "react";
import SessionBase, { SectionBase } from "./Base";

interface Project {
  title: string;
  date: string;
  subtitle: string;
  description: string;
  // features: { label: string; value: string }[];
  tech: string[];
}

const projects: Project[] = [
  {
    title: "WealthSync",
    date: "May – Nov 2024",
    subtitle: "Finance Management App",
    description:
      "A cross-platform finance app built to simplify personal budgeting, expense tracking, and financial planning—enhanced with AI-driven insights and premium features via Stripe.",
    // features: [
    //   {
    //     label: "Secure Auth",
    //     value: "Firebase Google Authentication for seamless login.",
    //   },
    //   {
    //     label: "Expense Tracking",
    //     value: "Categorized logging with detailed insights.",
    //   },
    //   {
    //     label: "Budget Management",
    //     value: "Real-time budget control and alerts.",
    //   },
    //   {
    //     label: "Analytics & Reporting",
    //     value: "Visual dashboards for financial health.",
    //   },
    //   {
    //     label: "AI Financial Advice",
    //     value: "Personalized tips powered by OpenAI.",
    //   },
    //   {
    //     label: "Stripe Integration",
    //     value: "Manage subscriptions for premium features.",
    //   },
    // ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Golang",
      "Firebase",
      "PostgreSQL",
      "OpenAI",
      "Stripe",
      "Docker",
      "GitHub",
      "Postman",
    ],
  },
];

const Projects: React.FC<Pick<SectionBase, "id">> = ({ id }) => (
  <SessionBase id={id} title="Projects">
    <div className="space-y-10">
      {projects.map((project) => (
        <div
          className="flex flex-col md:flex-row items-start gap-x-6 gap-y-2"
          key={project.title}
        >
          <div className={`text-sm min-w-30 text-muted-foreground pt-1`}>
            {project.date}
          </div>
          <div className="grid gap-1">
            <div className="font-semibold">{project.title}</div>
            <div className="text-sm text-muted-foreground">
              {project.subtitle}
            </div>
            <div className="text-foreground/80 text-sm my-2">
              {project.description}
            </div>
            {/* <ul className="list-disc ml-6 mb-2 text-sm">
              {project.features.map((f) => (
                <li key={f.label}>
                  <span className="font-semibold">{f.label}:</span> {f.value}
                </li>
              ))}
            </ul> */}
            <div className="text-xs text-muted-foreground">
              {project.tech.join(" • ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  </SessionBase>
);

export default Projects;
