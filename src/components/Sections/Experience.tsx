import React from "react";
import SessionBase, { SectionBase } from "./Base";

interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  tech: string[];
}

const experienceData: Experience[] = [
  {
    date: "2024 – present",
    title: "Full Stack Engineer",
    company: "Empire Pixel",
    location: "Phuket, Thailand (Based in Canada)",
    summary:
      "Led a team to architect and implement an AI-powered content generation system using 3 AI models in an event-driven architecture with queues and webhooks. The system generates 50 pages daily with AI detection bypass capabilities, integrated with React, Next.js, and cloud infrastructure.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "AWS",
      "GCP",
      "Docker",
      "Redis",
      "AI",
      "Webhooks",
      "PM2",
      "Nginx",
      "Apache2",
      "Coolify",
      "Cloudflare",
    ],
  },
  {
    date: "2021 – 2024",
    title: "Mid Level Fullstack Software Engineer",
    company: "BigBee",
    location: "Yangon, Myanmar",
    summary:
      "Focused on performance optimization, modern frontend architecture, and backend automation using Golang, React, and cloud technologies. Improved app speed, maintainability, and developer efficiency.",
    tech: [
      "React",
      "Next.js",
      "React Native",
      "Golang",
      "PostgreSQL",
      "Docker",
      "Redis",
    ],
  },
  {
    date: "2021",
    title: "Quality Assurance Engineer - Intern",
    company: "Armor Piercing Indie Games Production",
    location: "Australia",
    summary:
      "Contributed to game development and UI/UX improvements using C# and Unity, enhancing player experience and maintaining high code quality through version control and code reviews.",
    tech: ["C#", "Unity", "Sourcetree"],
  },
];

const Experience: React.FC<Pick<SectionBase, "id">> = ({ id }) => (
  <SessionBase id={id} title="Professional Experience">
    <div className="space-y-10">
      {experienceData.map((exp) => (
        <div
          className="flex flex-col md:flex-row items-start gap-x-6 gap-y-2"
          key={exp.title + exp.company}
        >
          <div className={`min-w-30 text-muted-foreground`}>{exp.date}</div>
          <div className="grid gap-1">
            <div className="font-semibold">{exp.title}</div>
            <div className="flex flex-col md:flex-row gap-1">
              <span className="text-sm text-muted-foreground">
                {exp.company}
              </span>
              <span className="text-sm text-muted-foreground hidden md:block">
                -
              </span>
              <span className="text-sm text-muted-foreground">
                {exp.location}
              </span>
            </div>
            <div className="text-sm my-2 text-foreground/80">{exp.summary}</div>
            <div className="text-xs text-muted-foreground">
              {exp.tech.join(" • ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  </SessionBase>
);

export default Experience;
