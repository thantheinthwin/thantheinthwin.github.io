import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Blog } from "@/api-services/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface BlogsProps extends HTMLAttributes<HTMLDivElement> {
  blogs: {
    success: boolean;
    data: Blog[] | null;
    message: string;
  };
}

export default function Blogs(props: BlogsProps) {
  const { blogs } = props;

  if (!blogs.success || !blogs.data) {
    return (
      <Card
        className={cn(
          "col-span-2 row-span-3 bg-card/50 border-border/20",
          props.className
        )}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Failed to load blogs: {blogs.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "col-span-2 row-span-3 bg-card/50 border-border/20",
        props.className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
          {blogs.data.map((blog) => (
            <article
              key={blog.id}
              className="group p-4 rounded-lg bg-background/30 border border-border/10 hover:bg-background/50 hover:border-border/30 transition-all duration-200 hover-lift cursor-pointer"
            >
              <time className="text-xs text-muted-foreground font-medium">
                {new Date(blog.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <h2 className="font-semibold text-sm mt-2 mb-2 line-clamp-2 group-hover:text-foreground transition-colors">
                {blog.title}
              </h2>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
                {blog.excerpt}
              </p>

              {blog.link && (
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Read more
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
