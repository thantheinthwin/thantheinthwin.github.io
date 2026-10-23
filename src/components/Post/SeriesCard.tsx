import Link from "next/link";
import type { Series } from "@/lib/series";
import { cn } from "@/lib/utils";

interface SeriesCardProps {
  series: Series;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
  return (
    <div className="grid gap-3 rounded border bg-secondary/50 p-4 text-sm">
      <div>
        <p className="text-xs font-semibold text-primary tracking-wide uppercase">
          Series · Part {series.part} of {series.total}
        </p>
        <p className="mt-0.5 font-semibold">{series.name}</p>
      </div>
      <nav aria-label={`${series.name} series`}>
        <ol className="grid gap-2.5">
          {series.parts.map((item) => (
            <li
              key={item.part}
              aria-current={item.status === "current" ? "page" : undefined}
              className={cn(
                "flex gap-2.5",
                // a link row is 44px tall, so its number centers on the link
                item.status === "published" ? "items-center" : "items-start",
                item.status === "upcoming" && "text-muted-foreground",
              )}
            >
              <span className="w-3 shrink-0 text-right text-xs leading-5 text-muted-foreground">
                {item.part}
              </span>
              {item.status === "current" && (
                <div>
                  {item.title}
                  <span className="block text-xs text-muted-foreground">Reading now</span>
                </div>
              )}
              {item.status === "published" && (
                <Link
                  href={`/blogs/${item.slug}`}
                  className="flex min-h-11 items-center underline underline-offset-4 decoration-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              )}
              {item.status === "upcoming" && <div>Coming soon</div>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
