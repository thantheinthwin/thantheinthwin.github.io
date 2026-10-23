import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/date";
import { cn } from "@/lib/utils";

interface RailKeepReadingProps {
  posts: PostMeta[];
  className?: string;
}

// Desktop right rail: the same picks as the end-of-post list, compact (no
// excerpt, no "View all blogs"; the name trail's "Blog" goes to the list).
export const RailKeepReading: React.FC<RailKeepReadingProps> = ({ posts, className }) => {
  if (posts.length === 0) return null;

  return (
    // own id: the end-of-post list (hidden at lg and up) is still in the DOM
    <aside aria-labelledby="post-rail-keep-reading" className={cn("grid", className)}>
      <h2 id="post-rail-keep-reading" className="mb-2 text-sm font-semibold leading-5">
        Keep reading
      </h2>
      {posts.map((post) => (
        <article key={post.slug} className="group relative grid gap-1 border-t py-3">
          <time dateTime={post.date} className="text-xs text-muted-foreground">
            {formatPostDate(post.date)}
            {" · "}
            {post.readingTimeMinutes} min read
          </time>
          <h3 className="line-clamp-2 text-sm leading-5 group-hover:text-primary transition-colors">
            {/* the link covers the whole row, so the target is the row */}
            <Link
              href={`/blogs/${post.slug}`}
              className="hover:underline after:absolute after:inset-0"
            >
              {post.title}
            </Link>
          </h3>
        </article>
      ))}
    </aside>
  );
};
