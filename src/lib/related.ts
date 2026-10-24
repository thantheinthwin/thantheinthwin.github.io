// Pure ranking for "Keep reading". No runtime imports, so node:test can load
// this file directly (see related.test.mjs).

export interface RelatedCandidate {
  slug: string;
  date: string;
  tags: string[];
}

// String() because YAML reads an unquoted tag like `2025` as a number.
function normalizeTag(tag: unknown): string {
  return String(tag).trim().toLowerCase();
}

function timeOf(date: string): number {
  const time = Date.parse(date);
  return Number.isNaN(time) ? 0 : time;
}

// Ranks the other posts by how many tags they share with `current`, newest
// first on ties. Posts sharing nothing fall in newest order after them, which
// fills the list to `limit` with the newest posts. Each returned post is a
// copy whose shared tags come first, so a short tag slice shows the link.
// `exclude` drops posts the reader already has a link to (see
// linkedPostSlugs), so one post never shows twice on the same screen.
export function rankRelatedPosts<T extends RelatedCandidate>(
  current: RelatedCandidate,
  posts: readonly T[],
  limit = 3,
  exclude: Iterable<string> = [],
): T[] {
  if (limit <= 0) return [];

  const excluded = new Set(exclude);
  const currentTags = new Set(current.tags.map(normalizeTag).filter(Boolean));
  const isShared = (tag: string) => currentTags.has(normalizeTag(tag));

  return posts
    .filter((post) => post.slug !== current.slug && !excluded.has(post.slug))
    .map((post) => {
      const shared = post.tags.filter(isShared);
      return {
        post,
        sharedCount: new Set(shared.map(normalizeTag)).size,
        time: timeOf(post.date),
        tags: [...shared, ...post.tags.filter((tag) => !isShared(tag))],
      };
    })
    .sort((a, b) => b.sharedCount - a.sharedCount || b.time - a.time)
    .slice(0, limit)
    .map(({ post, tags }) => ({ ...post, tags }));
}

// Markdown links and href attributes to /blogs/<slug>, relative or on the
// site's own host.
const POST_LINK =
  /(?:\]\(\s*<?|href=["'{]*)(?:https?:\/\/thantheinthwin\.vercel\.app)?\/blogs\/([a-z0-9-]+)/gi;

// Slugs of the posts an MDX body links to.
export function linkedPostSlugs(content: string): Set<string> {
  return new Set([...content.matchAll(POST_LINK)].map((match) => match[1].toLowerCase()));
}
