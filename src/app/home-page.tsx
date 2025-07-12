"use client";

import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import Projects from "../components/Sections/Projects";
import Links from "@/components/Sections/Links";

export default function HomePage() {
  const sections = [
    <About key="about" id="about" />,
    <Skills key="skills" id="skills" />,
    <Experience key="experience" id="experience" />,
    <Projects key="projects" id="projects" />,
    <Links key="links" id="links" />,
  ];

  return (
    <div className="max-w-xl fade-in grid gap-6 py-4">
      <Header />
      <hr />
      {/* Render sections */}
      {sections.map((section, index) => (
        <div key={index} className="grid gap-8">
          <section>{section}</section>
          <hr />
        </div>
      ))}
      {/* LINKS SECTION */}
      {/* <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/thantheinthwin"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover:border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Github</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/thanthein"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover-border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">LinkedIn</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>

          <a
            href="mailto:thantheinthwin.dev@gmail.com"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover-border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Email</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
        </div>
      </section> */}
    </div>
  );
}
