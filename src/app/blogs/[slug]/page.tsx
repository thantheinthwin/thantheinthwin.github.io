import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import {
  getAllPosts,
  getPostBySlug,
  getPostSeries,
  getRelatedPosts,
  getShareImage,
} from "@/lib/blog";
import { formatPostDate } from "@/lib/date";
import { mdxComponents } from "@/components/mdx";
import { NameTrail } from "@/components/NameTrail";
import Blogs from "@/components/SideBar/Blogs";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import { KeepReading } from "@/components/Post/KeepReading";
import { SeriesCard } from "@/components/Post/SeriesCard";
import { AuthorCard } from "@/components/Post/AuthorCard";

const SITE_URL = "https://thantheinthwin.vercel.app";
const AUTHOR = "Thant Hein Thwin";

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

  const url = `/blogs/${post.slug}`;
  const shareImage = getShareImage(post);
  const image = shareImage && { url: shareImage, alt: post.title };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: post.canonicalUrl ?? url },
    openGraph: {
      type: "article",
      url,
      siteName: `${AUTHOR} Portfolio`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [AUTHOR],
      tags: post.tags,
      // defining openGraph/twitter here drops the inherited site-wide images,
      // so name them explicitly when the post has no share image of its own
      images: [image || "/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image || "/twitter-image"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const shareImage = getShareImage(post);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    url,
    mainEntityOfPage: post.canonicalUrl ?? url,
    image: shareImage ? `${SITE_URL}${shareImage}` : undefined,
    keywords: post.tags.join(", "),
  };

  // the same three picks feed the end of the post and the desktop sidebar
  const related = getRelatedPosts(post);
  const series = getPostSeries(post);

  return (
    <main className="flex justify-center gap-8 p-8 3xl:p-12 fade-in">
      <script
        type="application/ld+json"
        // escape "<" so post text can never close the script tag
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="w-full min-w-0 max-w-xl py-4">
        <NameTrail section={{ label: "Blog", href: "/blogs" }} className="mb-6" />

        <header className="grid gap-3 border-b pb-6">
          <time dateTime={post.date} className="text-xs text-muted-foreground">
            {formatPostDate(post.date)}
            {" · "}
            {post.readingTimeMinutes} min read
          </time>
          {post.draft && (
            <span className="w-fit rounded border border-dashed px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Draft
            </span>
          )}
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
            {post.coverImage.endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className="object-cover"
                priority
              />
            )}
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

        {/* end of post: Medium notice › series › Keep reading › author */}
        <footer className="mt-6 grid gap-8 border-t pt-6">
          {(post.canonicalUrl || series) && (
            <div className="grid gap-4">
              {post.canonicalUrl && (
                <div className="flex gap-3 rounded border bg-secondary/50 p-4 text-sm text-foreground/90">
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
              {series && <SeriesCard series={series} />}
            </div>
          )}
          {/* tighter gap: "View all blogs" already pads itself to 44px */}
          <div className="grid gap-2">
            <KeepReading posts={related} />
            <AuthorCard />
          </div>
        </footer>
      </article>

      {/* desktop only; sticks against the document scroll */}
      <aside
        aria-label="More from the blog"
        className="sticky top-8 mt-4 hidden w-80 shrink-0 flex-col gap-4 self-start lg:flex xl:w-96">
        <Blogs title="Keep reading" posts={related} />
        <CoffeeChat />
      </aside>
    </main>
  );
}
