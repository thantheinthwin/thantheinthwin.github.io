import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { toPostDate } from "./date";
import { rankRelatedPosts } from "./related";
import { buildSeries, type Series } from "./series";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export interface PostMeta {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  canonicalUrl?: string;
  draft: boolean;
  readingTimeMinutes: number;
  series?: string;
  seriesPart?: number;
  seriesTotal?: number;
}

export interface Post extends PostMeta {
  content: string;
}

// Drafts render locally and on Vercel preview deployments, never in production.
const showDrafts =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Prefer the author-stated reading time (e.g. "5 min read") when present,
// since it reflects the platform's own estimate rather than a word-count guess.
function parseReadingTime(value: unknown, content: string): number {
  const match = typeof value === "string" ? value.match(/\d+/) : null;
  return match ? parseInt(match[0], 10) : estimateReadingTime(content);
}

function parsePost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    subtitle: data.subtitle,
    date: toPostDate(data.date),
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? data.description ?? "",
    coverImage: data.coverImage,
    canonicalUrl: data.canonicalUrl,
    draft: data.draft ?? false,
    readingTimeMinutes: parseReadingTime(data.readingTime, content),
    // checked for type only; buildSeries decides whether they form a valid part
    series: typeof data.series === "string" ? data.series : undefined,
    seriesPart: typeof data.seriesPart === "number" ? data.seriesPart : undefined,
    seriesTotal: typeof data.seriesTotal === "number" ? data.seriesTotal : undefined,
    content,
  };
}

// X, LinkedIn, Facebook and Slack don't render SVG og:images, so an SVG cover
// is shared through the PNG of the same name next to it, when one exists.
// Without one, the post falls back to the site-wide opengraph-image.
export function getShareImage(post: PostMeta): string | undefined {
  const cover = post.coverImage;
  if (!cover || !cover.endsWith(".svg")) return cover;
  const png = cover.replace(/\.svg$/, ".png");
  return fs.existsSync(path.join(process.cwd(), "public", png)) ? png : undefined;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => parsePost(entry.name))
    .filter((post): post is Post => post !== null)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Drops the MDX body, so post lists stay small when passed to client components.
export function toPostMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...meta } = post;
  return meta;
}

export function getRecentPosts(limit: number): PostMeta[] {
  return getAllPosts().slice(0, limit).map(toPostMeta);
}

// Other posts ranked by shared tags, filled to `limit` with the newest.
// Ranks PostMeta copies, so no post `content` is ever returned.
export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  return rankRelatedPosts(post, getAllPosts().map(toPostMeta), limit);
}

// The series line for a post, or null when its series frontmatter is incomplete.
export function getPostSeries(post: PostMeta): Series | null {
  return buildSeries(post, getAllPosts());
}

export function getPostBySlug(slug: string): Post | null {
  const post = parsePost(slug);
  if (!post) return null;
  if (post.draft && !showDrafts) return null;
  return post;
}
