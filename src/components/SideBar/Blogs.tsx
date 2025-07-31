"use client";

import { BlogsResponse } from "@/api-services";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface BlogsProps {
  blogs: BlogsResponse;
}

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <div className=" p-4 border rounded h-fit max-w-96 grid gap-4">
      <h2>Blogs</h2>
      <div className="space-y-4">
        {blogs.success && blogs.data ? (
          <>
            {blogs.data.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                className={cn(
                  "group grid gap-2 border-b last:border-b-0",
                  (blogs.data?.length ?? 0) > 1 && "pb-4"
                )}
              >
                <time className="text-xs text-muted-foreground">
                  {new Date(blog.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {blog.title}
                </h3>
                {blog.categories.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {blog.categories.map((category) => (
                      <span
                        key={category}
                        className="text-[10px] text-foreground/60 bg-muted-foreground/20 rounded px-2 py-1"
                      >
                        #{category}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-foreground/80 leading-relaxed text-xs line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground flex gap-1 items-center hover:underline hover:underline-offset-4"
                >
                  Read more{" "}
                  <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
                </Link>
              </article>
            ))}
            {blogs.data.length > 5 && (
              <Link
                href="https://medium.com/@thantheinthwin.dev"
                className="text-sm text-muted-foreground flex gap-1 items-center"
              >
                View all blogs{" "}
                <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
              </Link>
            )}
          </>
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
