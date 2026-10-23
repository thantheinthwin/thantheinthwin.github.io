import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/date";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface BlogsProps {
  posts: PostMeta[];
  title?: string;
}

const Blogs: React.FC<BlogsProps> = ({ posts, title = "Blogs" }) => {
  if (posts.length === 0) return null;

  return (
    <div className="p-4 border rounded h-fit max-w-96 grid gap-4">
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <Link
          href="/blogs"
          className="text-xs text-muted-foreground flex gap-1 items-center"
        >
          View all blogs{" "}
          <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group grid gap-2 border-b last:border-b-0 pb-4 last:pb-0"
          >
            <time dateTime={post.date} className="text-xs text-muted-foreground">
              {formatPostDate(post.date)} · {post.readingTimeMinutes} min read
            </time>
            <h3 className="text-sm group-hover:text-primary transition-colors line-clamp-1">
              <Link href={`/blogs/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            {post.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-foreground/60 bg-muted-foreground/20 rounded px-2 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-foreground/80 leading-relaxed text-xs line-clamp-2">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
