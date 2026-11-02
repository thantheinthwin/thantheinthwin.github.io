import React from "react";
import SessionBase, { SectionBase } from "./Base";

interface SkillGroup {
  category: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "AI Engineering",
    skills: [
      "Claude Code",
      "OpenAI Codex",
      "AI agent orchestration",
      "LLM integration",
      "RAG",
      "Vector search",
    ],
  },
  {
    category: "Languages & Frameworks",
    skills: [
      "TypeScript",
      "React.js",
      "Node.js",
      "Python",
      "Golang",
      "Next.js",
      "React Native",
      "JavaScript",
      "HTML",
      "CSS",
      "Express.js",
      "Java",
      "C#",
      "C",
    ],
  },
  {
    category: "Tools & Practices",
    skills: [
      "TDD",
      "CI/CD",
      "Git",
      "SOLID",
      "Code review",
    ],
  },
  {
    category: "Data & Infrastructure",
    skills: [
      "PostgreSQL",
      "AWS",
      "Docker",
      "MySQL",
      "OracleDB",
      "MongoDB",
      "Redis",
      "Kafka",
      "ElasticSearch",
      "GORM",
      "Mongoose",
      "Prisma",
    ],
  },
  {
    category: "Observability & Testing",
    skills: [
      "Grafana",
      "Prometheus",
      "Loki",
      "Sentry",
      "Jest",
      "Coolify",
    ],
  },
  {
    category: "APIs & Real-Time",
    skills: [
      "REST",
      "GraphQL",
      "gRPC",
      "WebSocket",
      "Firebase",
      "Supabase",
    ],
  },
  {
    category: "Product Analytics",
    skills: [
      "Google Analytics",
      "Microsoft Clarity",
      "PostHog",
    ],
  },
];

const Skills: React.FC<Pick<SectionBase, "id">> = ({ id }) => (
  <SessionBase id={id} title="Skills">
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
      {skillGroups.map(({ category, skills }) => (
        <div key={category} className="flex flex-col gap-4 items-start">
          <h3 className="text-xs font-semibold text-primary tracking-wide uppercase">
            {category}
          </h3>
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
        </div>
      ))}
    </div>
  </SessionBase>
);

export default Skills;
