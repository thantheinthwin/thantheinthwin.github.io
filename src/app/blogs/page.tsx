import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Articles by Thant Hein Thwin on backend development, API design, Go, and modern web technologies.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="flex justify-center p-8 3xl:p-12 fade-in">
      <div className="w-full max-w-xl py-4">
        <Link
          href="/"
          className="mb-8 flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" strokeWidth={1} />
          Home
        </Link>

        <h1 className="mb-8 text-2xl font-semibold tracking-tight">Blog</h1>

        <div className="grid gap-6">
          {posts.length === 0 && (
            <p className="text-muted-foreground">No posts yet.</p>
          )}
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group grid gap-2 border-b pb-6 last:border-b-0"
            >
              <time className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {post.readingTimeMinutes} min read
              </time>
              <h2 className="group-hover:text-primary transition-colors">
                <Link href={`/blogs/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.subtitle && (
                <p className="text-xs italic text-muted-foreground">{post.subtitle}</p>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-foreground/60 bg-muted-foreground/20 rounded px-2 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs leading-relaxed text-foreground/80 line-clamp-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
