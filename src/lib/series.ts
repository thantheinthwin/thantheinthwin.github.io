// Pure helper for the series card at the end of a post. No runtime imports,
// so node:test can load this file directly (see series.test.mjs).

export interface SeriesFields {
  slug: string;
  title: string;
  series?: unknown;
  seriesPart?: unknown;
  seriesTotal?: unknown;
}

export type SeriesPart =
  | { part: number; status: "current"; title: string }
  | { part: number; status: "published"; title: string; slug: string }
  | { part: number; status: "upcoming" };

export interface Series {
  name: string;
  part: number;
  total: number;
  parts: SeriesPart[];
}

function seriesKey(name: string): string {
  return name.trim().toLowerCase();
}

function isPartNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

// Builds parts 1..total for the current post's series from every published
// post that names the same series. Returns null unless the current post has
// a series name and a part between 1 and its total, so bad frontmatter
// renders no card.
//
// `posts` is expected newest first (as getAllPosts returns them). When two
// posts claim the same part, the current post or else the newer one keeps
// it, and a warning names both so the frontmatter can be fixed.
export function buildSeries(
  current: SeriesFields,
  posts: readonly SeriesFields[],
): Series | null {
  const { series, seriesPart, seriesTotal } = current;
  if (typeof series !== "string" || series.trim() === "") return null;
  if (!isPartNumber(seriesPart) || !isPartNumber(seriesTotal)) return null;
  if (seriesPart > seriesTotal) return null;

  const name = series.trim();
  const key = seriesKey(series);
  const claimed = new Map<number, { title: string; slug: string }>([
    [seriesPart, { title: current.title, slug: current.slug }],
  ]);
  for (const post of posts) {
    if (post.slug === current.slug) continue;
    if (typeof post.series !== "string" || seriesKey(post.series) !== key) continue;
    if (!isPartNumber(post.seriesPart)) continue;
    const holder = claimed.get(post.seriesPart);
    if (holder) {
      console.warn(
        `Series "${name}": part ${post.seriesPart} is claimed by both "${holder.slug}" and "${post.slug}"; showing "${holder.slug}".`,
      );
      continue;
    }
    claimed.set(post.seriesPart, { title: post.title, slug: post.slug });
  }

  const parts: SeriesPart[] = [];
  for (let part = 1; part <= seriesTotal; part++) {
    const other = claimed.get(part);
    if (part === seriesPart) {
      parts.push({ part, status: "current", title: current.title });
    } else if (other) {
      parts.push({ part, status: "published", title: other.title, slug: other.slug });
    } else {
      parts.push({ part, status: "upcoming" });
    }
  }

  return { name, part: seriesPart, total: seriesTotal, parts };
}
