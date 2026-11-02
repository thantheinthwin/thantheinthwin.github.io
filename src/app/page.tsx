import { getRecentPosts } from "@/lib/blog";
import HomePage from "./home-page";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import Blogs from "@/components/SideBar/Blogs";

export async function generateMetadata() {
  return {
    title: "Staff Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Staff Software Engineer building production web, mobile and AI platforms with TypeScript, React, Node.js, Python, Golang and AWS",
  };
}

export default function Root() {
  const posts = getRecentPosts(3);

  // The window scrolls, not <main>: the browser only restores window scroll
  // on Back, so returning from a post or project lands where you left off.
  return (
    <main className="flex flex-col md:flex-row justify-center gap-8 p-8 3xl:p-12 fade-in">
      <HomePage posts={posts} />
      <aside className="sticky top-8 3xl:top-12 self-start hidden md:flex flex-col gap-4">
        <Blogs posts={posts} />

        <CoffeeChat />
      </aside>
    </main>
  );
}
