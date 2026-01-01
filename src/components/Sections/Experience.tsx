import React, { useState } from "react";
import SessionBase, { SectionBase } from "./Base";
import { Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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
    date: "2024 – 2025",
    title: "Senior Full Stack Engineer",
    company: "Empire Pixel",
    location: "Phuket, Thailand (Based in Canada)",
    summary:
      "Led a team to architect and implement an AI-powered content generation system using 3 AI models in an event-driven architecture with queues and webhooks. The system generates 50 pages daily with AI detection bypass capabilities, integrated with React, Next.js, and cloud infrastructure.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
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
      "Grafana",
      "Prometheus",
      "Loki",
      "React Native",
      "Shadcn/ui",
      "Stripe",
    ],
    details: {
      responsibilities: [
        "Architected and implemented AI-powered content generation system using 3 different AI models",
        "Designed event-driven architecture with message queues and webhook integrations",
        "Led a development team of 4 engineers across frontend and backend",
        "Implemented AI detection bypass mechanisms for content generation",
        "Managed cloud infrastructure across AWS and GCP platforms",
        "Optimized system performance to handle 50+ pages generated daily",
      ],
      achievements: [
        "Successfully deployed AI content generation system processing 50+ pages daily",
        "Reduced content generation time by 70% through AI automation",
        "Implemented robust error handling and monitoring systems",
        "Achieved 99.9% uptime for critical content generation services",
        "Mentored junior developers and established coding standards",
      ],
      projects: [
        "AI Content Generation Platform",
        "Event-Driven Architecture System",
        "Multi-Cloud Infrastructure Setup",
      ],
      teamSize: "12 engineers",
      methodologies: ["Agile", "Event-Driven Architecture", "Microservices"],
    },
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
      "Hasura",
      "Sentry",
    ],
    details: {
      responsibilities: [
        "Developed and maintained full-stack applications using React, Next.js, and Golang",
        "Optimized application performance and reduced load times by 40%",
        "Implemented modern frontend architecture patterns and best practices",
        "Designed and maintained PostgreSQL databases with efficient query optimization",
        "Collaborated with cross-functional teams to deliver high-quality software",
        "Mentored junior developers and conducted code reviews",
      ],
      achievements: [
        "Improved application performance by 40% through optimization techniques",
        "Reduced deployment time by 60% through CI/CD pipeline improvements",
        "Successfully migrated legacy systems to modern React architecture",
        "Implemented automated testing increasing code coverage to 85%",
        "Received recognition for outstanding code quality and documentation",
      ],
      projects: [
        "E-commerce Platform Optimization",
        "Mobile App Development",
        "Database Migration Project",
      ],
      teamSize: "5 engineers",
      methodologies: ["Agile", "Scrum", "Test-Driven Development"],
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
                {exp.summary}
              </div>
              <div className="text-xs text-muted-foreground">
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
                    {selectedExperience.summary}
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
                          className="text-sm text-muted-foreground flex items-end gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {responsibility}
                        </li>
                      )
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
                          className="text-sm text-muted-foreground flex items-end gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      )
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
                        )
                      )}
                    </div>
                  </div>
                )}

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
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

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
