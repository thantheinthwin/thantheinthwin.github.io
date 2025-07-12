import React, { useState } from "react";
import SessionBase, { SectionBase } from "./Base";
import { Expand, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Project {
  title: string;
  date: string;
  subtitle: string;
  description: string;
  tech: string[];
  details: {
    features: string[];
    challenges: string[];
    outcomes: string[];
    github?: {
      label: string;
      link: string;
    }[];
    live?: string;
    role?: string;
    teamSize?: string;
  };
}

const projects: Project[] = [
  {
    title: "WealthSync",
    date: "May – Nov 2024",
    subtitle: "Finance Management App",
    description:
      "A cross-platform finance app built to simplify personal budgeting, expense tracking, and financial planning—enhanced with AI-driven insights and premium features via Stripe.",
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
    details: {
      features: [
        "Secure Firebase Google Authentication for seamless login",
        "Categorized expense tracking with detailed insights",
        "Real-time budget control and alerts",
        "Visual dashboards for financial health analytics",
        "AI-powered personalized financial advice using OpenAI",
        "Stripe integration for premium feature subscriptions",
        "Cross-platform compatibility with React Native and Expo",
        "Real-time data synchronization across devices",
      ],
      challenges: [
        "Implementing secure financial data handling and encryption",
        "Optimizing app performance for real-time budget calculations",
        "Integrating multiple third-party APIs (Firebase, OpenAI, Stripe)",
        "Ensuring cross-platform consistency across iOS and Android",
        "Managing complex state for real-time financial data updates",
      ],
      outcomes: [
        "Successfully launched cross-platform finance app with 1000+ downloads",
        "Achieved 99.9% uptime for critical financial data services",
        "Reduced user onboarding time by 60% through streamlined authentication",
        "Implemented AI features that improved user engagement by 40%",
        "Established secure payment processing with zero security incidents",
      ],
      github: [
        {
          label: "Frontend",
          link: "https://github.com/thantheinthwin/wealthsync.app",
        },
        {
          label: "Backend",
          link: "https://github.com/thantheinthwin/wealthsync.api",
        },
      ],
      role: "Full Stack Developer",
      teamSize: "Solo Project",
    },
  },
];

const Projects: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return (
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
            <div className="grid gap-1 flex-1">
              <div className="flex justify-between items-start">
                <div className="grid gap-1">
                  <div className="font-semibold">{project.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.subtitle}
                  </div>
                </div>
                <button
                  className="p-2 rounded-md hover:bg-muted-foreground/10 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                  aria-label={`View more details about ${project.title}`}
                  title={`View more details about ${project.title}`}
                >
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <div className="text-foreground/80 text-sm my-2">
                {project.description}
              </div>
              <div className="text-xs text-muted-foreground">
                {project.tech.join(" • ")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Dialog Instance */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-h-[90vh] md:min-w-3xl md:max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-xs">
                  {selectedProject.subtitle} • {selectedProject.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {selectedProject.details.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Challenges Overcome
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.details.challenges.map(
                      (challenge, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {challenge}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Outcomes & Impact
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.details.outcomes.map((outcome, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.details.role && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Role</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.details.role}
                      </p>
                    </div>
                  )}

                  {selectedProject.details.teamSize && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Team Size</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.details.teamSize}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {selectedProject.details.github && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">GitHub</h4>
                      <a
                        href={selectedProject.details.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Repository
                      </a>
                    </div>
                  )} */}

                  <div>
                    <h4 className="font-semibold text-sm mb-2">GitHub</h4>
                    <div className="flex divide-x">
                      {selectedProject.details.github?.map((github) => (
                        <a
                          key={github.label}
                          href={github.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1 first:pr-2 first:pl-0 last:pr-0 last:pl-2"
                        >
                          {github.label}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {selectedProject.details.live && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Live Demo</h4>
                      <a
                        href={selectedProject.details.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Project
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.tech.map((tech, index) => (
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

export default Projects;
