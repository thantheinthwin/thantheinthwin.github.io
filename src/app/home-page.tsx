"use client";

import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import Projects from "../components/Sections/Projects";

export default function HomePage() {
  const sections = [
    <About key="about" id="about" />,
    <Skills key="skills" id="skills" />,
    <Experience key="experience" id="experience" />,
    <Projects key="projects" id="projects" />,
  ];

  return (
    <div className="max-w-xl fade-in grid py-4 divide-y">
      <Header />

      {/* Render sections */}
      {sections}
    </div>
  );
}
