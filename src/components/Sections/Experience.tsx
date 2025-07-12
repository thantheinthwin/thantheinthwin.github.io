import React from "react";

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
      "Building scalable web apps and cloud solutions with React, Next.js, Node.js, and TypeScript. Led cloud deployments, CI/CD, and AI-powered workflows for high-performance, SEO-optimized platforms.",
    tech: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "GCP", "Docker"],
  },
  {
    date: "2021 – 10/2024",
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

const Experience: React.FC = () => (
  <section className="mb-16">
    <h2 className="text-2xl font-bold mb-8">Professional Experience</h2>
    <div className="space-y-10">
      {experienceData.map((exp) => (
        <div
          className="flex flex-row items-start gap-6"
          key={exp.title + exp.company}
        >
          <div className={`text-sm min-w-30 text-muted-foreground pt-1`}>
            {exp.date}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{exp.title}</span>
              <span className="text-muted-foreground">– {exp.company}</span>
            </div>
            <div className="text-foreground/80 mb-1">{exp.location}</div>
            <div className="mb-2">{exp.summary}</div>
            <div className="text-xs text-muted-foreground">
              {exp.tech.join(" • ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
