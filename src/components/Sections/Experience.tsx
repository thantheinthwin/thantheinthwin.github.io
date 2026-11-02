import { Expand } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RichText } from "../ui/rich-text";
import SessionBase, { SectionBase } from "./Base";

interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  tech: string[];
  details: {
    responsibilities: string[];
    achievements: string[];
    projects?: string[];
    teamSize?: string;
    methodologies?: string[];
  };
}

const experienceData: Experience[] = [
  {
    date: "2025 – 2026",
    title: "Lead Algorithm Engineer",
    company: "Six Atomic",
    location: "Bangkok",
    summary:
      "Owned the Garment Generation Agentic Engine, one of three core platform pillars, and led the AI orchestration platform as harness engineer. Built an end-to-end generative design system that cut pattern creation time from <b>2–4 weeks to 5 minutes</b>, and cut AI cost by <b>70%</b> on very large data processing.",
    tech: ["Python", "TypeScript", "OpenRouter", "AWS", "Docker"],
    details: {
      responsibilities: [
        "Led the AI orchestration platform as harness engineer: built the model harness through OpenRouter, set up evaluations and graders to score the orchestrator's behavior and performance, and built validation frameworks, CI/CD pipelines, and deployment strategies to run multiple AI agents in production without drift.",
        "Wrote TDD test suites and used SOLID design patterns to direct coding agents, shipping features autonomously while holding quality up under fast delivery timelines, and mentored senior engineers on AI-assisted development.",
        "Applied DevOps and system architecture knowledge to study how the whole system fit together, then designed solutions that improved AI orchestration performance and cost.",
        "Built mods and improved developer experience through loop engineering and graph engineering, going beyond plain prompting.",
      ],
      achievements: [
        "Used evaluation scores and graders to guide optimization instead of using AI blindly: cut AI cost by 70% on very large data processing and halved response time with RAG-like chunking of user input and better scaling.",
        "Owned the Garment Generation Agentic Engine, one of three core platform pillars. Built an end-to-end generative design system that cut pattern creation time from 2–4 weeks to 5 minutes, ramping up in 3 months after moving from full-stack web into a math-heavy fashion domain.",
      ],
      methodologies: ["AI agent orchestration", "Evaluations & graders", "TDD", "SOLID"],
    },
  },
  {
    date: "2024 – 2025",
    title: "Senior Full Stack Engineer",
    company: "Empire Pixel",
    location: "Remote",
    summary:
      "Built a RAG-powered content automation platform combining multiple LLMs with vector search, increasing AI-driven output by <b>700%</b> and cutting cost from <b>$1,000 to $5 per 100 posts</b>. Led architecture decisions and code reviews, and set the team's clean-code and cross-platform standards.",
    tech: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PayloadCMS",
      "Redis",
      "Docker",
      "AWS/GCP",
      "Grafana",
      "Payment APIs",
    ],
    details: {
      responsibilities: [
        "Led architecture decisions and code reviews, and set the team's clean-code and cross-platform development standards.",
        "Set up monitoring and logging (Grafana, Prometheus, Loki, Docker) across distributed services, making issues easier to catch and debug, and improving Core Web Vitals and SEO.",
      ],
      achievements: [
        "Built a RAG-powered content automation platform, combining multiple LLMs (StormGPT, ChatGPT, Gemini) with vector search. Increased AI-driven output by 700% and cut cost from $1,000 to $5 per 100 posts.",
        "Built a cross-platform mobile app with a web-to-native bridge and unified Android/iOS payments, while scaling the backend to serve 800+ dynamic pages off a single VPS.",
      ],
    },
  },
  {
    date: "2021 – 2024",
    title: "Mid Level Fullstack Software Engineer",
    company: "BigBee",
    location: "Yangon, Myanmar",
    summary:
      "Strengthened backend workflows with Golang middlewares and request pipelines, and improved app speed with SSR, hydration, caching, and rendering strategies in Next.js and React, on a reusable, headless component architecture.",
    tech: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "RxJS",
      "React Query",
      "React Hook Form",
      "TanStack Table",
      "Expo",
      "Golang",
      "PostgreSQL",
      "Redis",
      "Hasura",
      "Docker",
    ],
    details: {
      responsibilities: [
        "Evaluated and adopted new technologies to keep the stack current and improve system architecture.",
        "Built Golang middlewares, request pipelines, and context handling to strengthen backend workflows.",
        "Built reusable, headless components for a scalable frontend architecture, applying design patterns, OOP, and clean-code principles.",
        "Managed complex client-side state with RxJS and built Redis-backed data pipelines and caching.",
      ],
      achievements: [
        "Improved app speed using SSR, hydration, caching, and rendering strategies in Next.js and React.",
      ],
    },
  },
  {
    date: "2021",
    title: "Quality Assurance Engineer - Intern",
    company: "Armor Piercing Indie Games Production",
    location: "Australia",
    summary:
      "Contributed to game development and UI/UX improvements using C# and Unity, enhancing player experience and maintaining high code quality through version control and code reviews.",
    tech: ["C#", "Unity", "Sourcetree"],
    details: {
      responsibilities: [
        "Conducted comprehensive testing of game features and functionality",
        "Identified and reported bugs with detailed reproduction steps",
        "Collaborated with development team to improve UI/UX design",
        "Participated in code reviews and quality assurance processes",
        "Maintained version control using Git and Sourcetree",
        "Created and executed test plans for new game features",
      ],
      achievements: [
        "Reduced critical bug reports by 30% through proactive testing",
        "Improved game performance by optimizing Unity scripts",
        "Enhanced player experience through UI/UX improvements",
        "Successfully contributed to 2 game releases",
        "Received positive feedback for attention to detail and thorough testing",
      ],
      projects: [
        "Game Testing Framework",
        "UI/UX Enhancement Project",
        "Performance Optimization Initiative",
      ],
      teamSize: "4 developers",
      methodologies: ["Waterfall", "Manual Testing", "Code Review"],
    },
  },
];

const Experience: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedExperience(null);
  };

  return (
    <SessionBase id={id} title="Professional Experience">
      <div className="space-y-10">
        {experienceData.map((exp) => (
          <div
            className="flex flex-col md:flex-row items-start gap-x-6 gap-y-2"
            key={exp.title + exp.company}
          >
            <div className={`min-w-30 text-muted-foreground`}>{exp.date}</div>
            <div className="grid gap-1">
              <div className="flex justify-between items-start">
                <div className="grid gap-1">
                  <h3 className="font-semibold">{exp.title}</h3>
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
                </div>
                <button
                  className="p-2 rounded-md hover:bg-muted-foreground/10 cursor-pointer"
                  onClick={() => handleExperienceClick(exp)}
                  aria-label={`View more details about ${exp.title} at ${exp.company}`}
                >
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <div className="text-sm my-2 text-foreground/80">
                <RichText text={exp.summary} className="lg:leading-6" />
              </div>
              <div className="text-xs text-muted-foreground lg:leading-6">
                {exp.tech.join(" • ")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Dialog Instance */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-h-[90vh] md:min-w-3xl md:max-h-[80vh] overflow-y-auto">
          {selectedExperience && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle>{selectedExperience.title}</DialogTitle>
                <DialogDescription className="text-xs">
                  {selectedExperience.company} • {selectedExperience.location} •{" "}
                  {selectedExperience.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    <RichText text={selectedExperience.summary} />
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1">
                    {selectedExperience.details.responsibilities.map(
                      (responsibility, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <RichText text={responsibility} />
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {selectedExperience.details.achievements.map(
                      (achievement, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <RichText text={achievement} />
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {selectedExperience.details.projects && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Notable Projects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.details.projects.map(
                        (project, index) => (
                          <span
                            key={index}
                            className="text-xs bg-muted px-2 py-1 rounded"
                          >
                            {project}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {(selectedExperience.details.teamSize ||
                  selectedExperience.details.methodologies) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedExperience.details.teamSize && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Team Size</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedExperience.details.teamSize}
                      </p>
                    </div>
                  )}

                  {selectedExperience.details.methodologies && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Methodologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedExperience.details.methodologies.map(
                          (methodology, index) => (
                            <span
                              key={index}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {methodology}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
                )}

                <div>
                  <h4 className="font-semibold text-sm mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExperience.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SessionBase>
  );
};

export default Experience;
