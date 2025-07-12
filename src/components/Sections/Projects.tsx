import { SectionBase } from "@/types";
import React from "react";

interface Project {
  title: string;
  date: string;
  subtitle: string;
  description: string;
  features: { label: string; value: string }[];
  tech: string[];
}

const projects: Project[] = [
  {
    title: "WealthSync",
    date: "05/2024 – 11/2024",
    subtitle: "Finance Management App",
    description:
      "A cross-platform finance app built to simplify personal budgeting, expense tracking, and financial planning—enhanced with AI-driven insights and premium features via Stripe.",
    features: [
      {
        label: "Secure Auth",
        value: "Firebase Google Authentication for seamless login.",
      },
      {
        label: "Expense Tracking",
        value: "Categorized logging with detailed insights.",
      },
      {
        label: "Budget Management",
        value: "Real-time budget control and alerts.",
      },
      {
        label: "Analytics & Reporting",
        value: "Visual dashboards for financial health.",
      },
      {
        label: "AI Financial Advice",
        value: "Personalized tips powered by OpenAI.",
      },
      {
        label: "Stripe Integration",
        value: "Manage subscriptions for premium features.",
      },
    ],
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

const Projects: React.FC<SectionBase> = ({ id }) => (
  <section id={id}>
    <h2 className="text-2xl font-bold mb-8">Projects</h2>
    <div className="space-y-8">
      {projects.map((project) => (
        <div key={project.title}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <span className="text-sm text-muted-foreground">
              {project.date}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {project.subtitle}
          </p>
          <p className="text-foreground/80 leading-relaxed mb-2">
            {project.description}
          </p>
          <ul className="list-disc ml-6 mb-2">
            {project.features.map((f) => (
              <li key={f.label}>
                <span className="font-semibold">{f.label}:</span> {f.value}
              </li>
            ))}
          </ul>
          <div className="mb-2 text-xs text-muted-foreground">
            <span className="font-semibold">Tech Stack:</span>{" "}
            {project.tech.join(" • ")}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
