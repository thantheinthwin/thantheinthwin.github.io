import { getRecentPosts } from "@/lib/blog";
import HomePage from "./home-page";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import Blogs from "@/components/SideBar/Blogs";

export async function generateMetadata() {
  return {
    title: "Lead Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Lead Software Engineer with expertise in React, Next.js, Node.js, Golang, and Python",
  };
}

export default function Root() {
  const posts = getRecentPosts(3);

  return (
    <main className="md:h-screen overflow-y-auto flex flex-col md:flex-row justify-center gap-8 p-8 3xl:p-12 fade-in">
      <HomePage posts={posts} />
      <aside className="sticky top-0 hidden md:flex flex-col gap-4">
        <Blogs posts={posts} />

        <CoffeeChat />
      </aside>
    </main>
  );
}
