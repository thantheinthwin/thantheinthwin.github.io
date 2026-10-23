"use client";

import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import Projects from "../components/Sections/Projects";
import Blogs from "@/components/SideBar/Blogs";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import type { PostMeta } from "@/lib/blog";

export default function HomePage({ posts }: { posts: PostMeta[] }) {
  // Work comes first; the long skill list goes last so it doesn't push
  // Experience, Projects and the blog card down on phones.
  const sections = [
    <About key="about" id="about" />,
    <Experience key="experience" id="experience" />,
    <Projects key="projects" id="projects" />,
    <div key="sidebar" className="py-6 grid gap-4 md:hidden">
      <Blogs posts={posts} />
      <CoffeeChat />
    </div>,
    <Skills key="skills" id="skills" />,
  ];

  return (
    <div className="max-w-xl grid py-4 divide-y border-b md:border-b-0">
      <Header />

      {/* Render sections */}
      {sections}
    </div>
  );
}
