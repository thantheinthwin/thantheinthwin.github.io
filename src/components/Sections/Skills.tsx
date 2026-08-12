import React from "react";
import SessionBase, { SectionBase } from "./Base";

interface SkillGroup {
  category: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Go", "TypeScript", "JavaScript", "Python", "C", "C#", "Java"],
  },
  {
    category: "Backend & Data",
    skills: [
      "Node.js",
      "Express.js",
      "gRPC",
      "REST",
      "GraphQL",
      "WebSocket",
      "Kafka",
      "PostgreSQL",
      "MySQL",
      "OracleDB",
      "Redis",
      "MongoDB",
      "ElasticSearch",
      "GORM",
      "Mongoose",
      "Prisma",
    ],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "React Native"],
  },
  {
    category: "Infra & Observability",
    skills: [
      "AWS",
      "GCP",
      "Docker",
      "PM2",
      "Nginx",
      "Apache2",
      "Coolify",
      "Cloudflare",
      "Grafana",
      "Prometheus",
      "Loki",
      "Sentry",
    ],
  },
  {
    category: "AI & Integration",
    skills: ["AI-Integration", "Webhooks", "Firebase", "Supabase"],
  },
  {
    category: "Tools & Analytics",
    skills: [
      "Git",
      "Sourcetree",
      "Jest",
      "Unity",
      "Google Analytics",
      "Clarity",
      "Posthog",
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
