import { getBlogs } from "@/api-services";
import HomePage from "./home-page";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import Blogs from "@/components/SideBar/Blogs";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
  return {
    title: "Lead Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Lead Software Engineer with expertise in React, Next.js, Node.js, Golang, and Python",
  };
}

export default async function Root() {
  const blogs = await getBlogs();

  return (
    <main className="md:h-screen overflow-y-auto flex flex-col md:flex-row justify-center gap-8 p-8 3xl:p-12 fade-in">
      <HomePage blogs={blogs} />
      <aside className="sticky top-0 hidden md:flex flex-col gap-4">
        <Blogs blogs={blogs} />

        <CoffeeChat />
      </aside>
    </main>
  );
}
