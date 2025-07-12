"use client";

import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import Projects from "../components/Sections/Projects";
import Blogs from "@/components/SideBar/Blogs";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import { BlogsResponse } from "@/api-services";

export default function HomePage({ blogs }: { blogs: BlogsResponse }) {
  const sections = [
    <About key="about" id="about" />,
    <Skills key="skills" id="skills" />,
    <Experience key="experience" id="experience" />,
    <div key="sidebar" className="py-6 grid gap-4 md:hidden">
      <Blogs blogs={blogs} />
      <CoffeeChat />
    </div>,
    <Projects key="projects" id="projects" />,
  ];

  return (
    <div className="max-w-xl grid py-4 divide-y border-b md:border-b-0">
      <Header />

      {/* Render sections */}
      {sections}
    </div>
  );
}
