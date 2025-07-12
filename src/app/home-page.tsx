"use client";

import Blogs from "@/components/Sections/Blogs";
import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Contact from "../components/Sections/Contact";
import { BlogsResponse } from "@/api-services/blogs";

export default function HomePage({ blogs }: { blogs: BlogsResponse }) {
  console.log(blogs);

  return (
    <div className="container mx-auto flex flex-col gap-4 h-full">
      <Header />
      <hr />
      <div className="grid grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 gap-4  flex-1">
        <About className="col-span-2 row-span-1" />
        <div className="col-span-1 row-span-2 border rounded border-black p-6">
          Tech Stack
        </div>
        <div className="col-span-1 row-span-2 border rounded border-black p-6">
          Tech Stack
        </div>
        <Blogs blogs={blogs} />
        <div className="col-span-2 row-span-2 border rounded border-black p-6">
          Experience
        </div>
        <div className="col-span-2 row-span-2 border rounded border-black p-6">
          Projects
        </div>
        <div className="col-span-2 row-span-1 border rounded border-black p-6">
          Education
        </div>
        <div className="col-span-1 row-span-1 border rounded border-black p-6">
          Contact
        </div>
        <Contact className="col-span-1 row-span-1" />
      </div>
    </div>
  );
}
