import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Blog } from "@/api-services/blogs";

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
      <div
        className={cn(
          "col-span-2 row-span-3 border rounded border-black p-6",
          props.className
        )}
      >
        <h1 className="text-xl font-semibold mb-4">Blogs</h1>
        <p className="text-muted-foreground">
          Failed to load blogs: {blogs.message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "col-span-2 row-span-3 border rounded border-black p-6",
        props.className
      )}
    >
      <h1 className="text-xl font-semibold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {blogs.data.map((blog) => (
          <div
            key={blog.id}
            className="border rounded p-3 hover:bg-muted/50 transition-colors"
          >
            <h2 className="font-medium text-sm mb-1 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
              {blog.description}
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{blog.author}</span>
              <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
            </div>
            {blog.link && (
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Read more →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
