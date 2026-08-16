import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
}

export interface Post extends PostMeta {
  content: string;
}

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
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? data.description ?? "",
    coverImage: data.coverImage,
    canonicalUrl: data.canonicalUrl,
    draft: data.draft ?? false,
    readingTimeMinutes: parseReadingTime(data.readingTime, content),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const showDrafts = process.env.NODE_ENV === "development";

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => parsePost(entry.name))
    .filter((post): post is Post => post !== null)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const post = parsePost(slug);
  if (!post) return null;
  if (post.draft && process.env.NODE_ENV !== "development") return null;
  return post;
}
