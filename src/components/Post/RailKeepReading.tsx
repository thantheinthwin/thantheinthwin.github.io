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
      {/* same label style as the Contents rail, so both rails share one header;
          the rail stays quieter than the article's own body text (14px, 80%) */}
      <h2
        id="post-rail-keep-reading"
        className="mb-2 flex h-5 items-center text-xs font-semibold uppercase tracking-wide"
      >
        Keep reading
      </h2>
      {posts.map((post) => (
        <article key={post.slug} className="group relative grid gap-1 border-t py-3">
          <time dateTime={post.date} className="text-[11px] leading-4 text-muted-foreground">
            {formatPostDate(post.date)}
            {" · "}
            {post.readingTimeMinutes} min read
          </time>
          <h3 className="line-clamp-2 text-[13px] leading-[18px] text-foreground/80 group-hover:text-foreground transition-colors">
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
