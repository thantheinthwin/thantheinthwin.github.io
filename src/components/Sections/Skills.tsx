import React from "react";
import SessionBase, { SectionBase } from "./Base";

const skills: string[] = [
  "ReactJS",
  "NextJS",
  "React Native",
  "Golang",
  "TypeScript",
  "JavaScript",
  "Redis",
  "PostgreSQL",
  "MySQL",
  "OracleDB",
  "MongoDB",
  "NodeJS",
  "ExpressJS",
  "C",
  "C#",
  "Java",
  "Python",
  "Docker",
  "AWS",
  "GCP",
  "Cloud Computing",
  "HTML",
  "CSS",
  "AI-Integration",
  "Webhooks",
  "PM2",
  "Nginx",
  "Apache2",
  "Coolify",
  "Cloudflare",
  "Unity",
  "Sourcetree",
];

const Skills: React.FC<Pick<SectionBase, "id">> = ({ id }) => (
  <SessionBase id={id} title="Skills">
    <div className="flex flex-wrap gap-2 text-sm">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-muted-foreground/30 px-2 py-1 rounded text-xs"
        >
          {skill}
        </span>
      ))}
    </div>
  </SessionBase>
);

export default Skills;
