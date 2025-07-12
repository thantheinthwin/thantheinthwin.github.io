import { SectionBase } from "@/types";
import React from "react";

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
  "Cloud Computing",
  "HTML",
  "CSS",
];

const Skills: React.FC<SectionBase> = ({ id }) => (
  <section id={id}>
    <h2 className="text-2xl font-bold mb-8">Skills</h2>
    <div className="flex flex-wrap gap-2 text-sm">
      {skills.map((skill) => (
        <span key={skill} className="bg-muted px-2 py-1 rounded mb-2">
          {skill}
        </span>
      ))}
    </div>
  </section>
);

export default Skills;
