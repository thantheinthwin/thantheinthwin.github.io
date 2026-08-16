import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="flex justify-center p-8 3xl:p-12 fade-in">
      <article className="w-full max-w-xl py-4">
        <Link
          href="/blogs"
          className="mb-8 flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" strokeWidth={1} />
          All blogs
        </Link>

        <header className="grid gap-3 border-b pb-6">
          <time className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" · "}
            {post.readingTimeMinutes} min read
          </time>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-sm italic text-muted-foreground">{post.subtitle}</p>
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
        </header>

        {post.coverImage && (
          <div className="relative mt-6 aspect-[1200/630] w-full overflow-hidden rounded border bg-secondary/30">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.canonicalUrl && (
          <div className="mt-6 flex gap-3 rounded border bg-secondary/50 p-4 text-sm text-foreground/90">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <p className="m-0">
              Originally published on{" "}
              <Link
                href={post.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-muted-foreground hover:text-primary transition-colors"
              >
                Medium
              </Link>
              .
            </p>
          </div>
        )}

        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  { theme: "github-dark-default", keepBackground: false },
                ],
              ],
            },
          }}
        />
      </article>
    </main>
  );
}
