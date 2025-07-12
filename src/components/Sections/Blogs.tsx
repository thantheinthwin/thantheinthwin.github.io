import React from "react";
import { BlogsResponse } from "@/api-services/blogs";
import { SectionBase } from "@/types";

interface Props extends SectionBase {
  blogs: BlogsResponse;
}

const Blogs: React.FC<Props> = ({ id, blogs }) => (
  <section id={id}>
    <h2 className="text-2xl font-bold mb-8">Blogs</h2>
    <div className="space-y-6">
      {blogs.success && blogs.data ? (
        blogs.data.slice(0, 5).map((blog) => (
          <article key={blog.id} className="group">
            <time className="text-sm text-muted-foreground">
              {new Date(blog.pubDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h3 className="font-semibold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              {blog.excerpt}
            </p>
            {blog.link && (
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Read more
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
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
        ))
      ) : (
        <p className="text-muted-foreground">
          Failed to load blogs: {blogs.message}
        </p>
      )}
    </div>
  </section>
);

export default Blogs;
