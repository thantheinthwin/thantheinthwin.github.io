import { getBlogs } from "@/api-services";
import HomePage from "./home-page";
import Link from "next/link";

export default async function Root() {
  const blogs = await getBlogs();

  return (
    <main className="h-screen overflow-y-auto flex justify-center gap-8 p-16">
      <nav className="sticky top-0">
        <ul>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#skills">Skills</Link>
          </li>
          <li>
            <Link href="#experience">Experience</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <HomePage blogs={blogs} />
      <div className="sticky top-0">Blogs</div>
    </main>
  );
}
