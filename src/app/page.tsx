import { getBlogs } from "@/api-services";
import HomePage from "./home-page";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default async function Root() {
  const blogs = await getBlogs();

  return (
    <main className="h-screen overflow-y-auto flex justify-center gap-8 p-8 3xl:p-12">
      {/* <Navigation /> */}
      <HomePage />
      <div className="sticky top-0 p-4 border rounded h-fit max-w-96 grid gap-4">
        <h2>Blogs</h2>
        <div className="space-y-6">
          {blogs.success && blogs.data ? (
            <>
              {blogs.data.slice(0, 5).map((blog) => (
                <article key={blog.id} className="group grid gap-1">
                  <time className="text-xs text-muted-foreground">
                    {new Date(blog.pubDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-xs line-clamp-3">
                    {blog.excerpt}
                  </p>
                </article>
              ))}
              <Link
                href="https://medium.com/@thantheinthwin.dev"
                className="text-sm text-muted-foreground flex gap-1 items-center"
              >
                View all blogs{" "}
                <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
              </Link>
            </>
          ) : (
            <p>No blogs found</p>
          )}
        </div>
      </div>
    </main>
  );
}
