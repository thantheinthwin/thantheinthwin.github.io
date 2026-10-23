import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/date";

interface KeepReadingProps {
  posts: PostMeta[];
}

export const KeepReading: React.FC<KeepReadingProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="keep-reading" className="grid gap-4">
      <h2 id="keep-reading" className="font-semibold">
        Keep reading
      </h2>
      <div className="grid gap-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative grid gap-1 border-b pb-3 last:border-b-0 last:pb-0"
          >
            <time dateTime={post.date} className="text-xs text-muted-foreground">
              {formatPostDate(post.date)}
              {" · "}
              {post.readingTimeMinutes} min read
            </time>
            <h3 className="text-sm group-hover:text-primary transition-colors">
              {/* the link covers the whole row, so the touch target is the row */}
              <Link
                href={`/blogs/${post.slug}`}
                className="hover:underline after:absolute after:inset-0"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-xs leading-relaxed text-foreground/80 line-clamp-2">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
      <Link
        href="/blogs"
        className="flex min-h-11 w-fit items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        View all blogs
        <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
      </Link>
    </section>
  );
};
