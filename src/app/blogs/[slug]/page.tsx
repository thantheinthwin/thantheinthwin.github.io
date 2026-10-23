import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
import { extractHeadings, MIN_TOC_HEADINGS } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx";
import { NameTrail } from "@/components/NameTrail";
import { KeepReading } from "@/components/Post/KeepReading";
import { RailKeepReading } from "@/components/Post/RailKeepReading";
import { AuthorBand } from "@/components/Post/AuthorBand";
import {
  ContentsBar,
  ContentsProvider,
  ContentsRail,
} from "@/components/Post/Contents";

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

  // the same three picks feed the desktop rail and, on phones, the end of the post
  const related = getRelatedPosts(post);
  const series = getPostSeries(post);
  const headings = extractHeadings(post.content);
  const hasContents = headings.length >= MIN_TOC_HEADINGS;

  const grid = (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,36rem)] items-start justify-center lg:grid-cols-[576px_256px] lg:gap-x-12",
        hasContents && "xl:grid-cols-[200px_576px_256px]",
      )}
    >
      {hasContents && (
        <ContentsRail className="sticky top-8 hidden max-h-[calc(100vh-4rem)] self-start overflow-y-auto xl:block" />
      )}

      <div className="min-w-0">
        {/* the bar's sticky range is this wrapper, so it leaves with the post's last line */}
        <div>
          {hasContents && <ContentsBar className="-mx-5 mb-6 lg:mx-0 xl:hidden" />}

          <article>
            <header className="grid gap-3">
              {post.draft && (
                <span className="w-fit rounded border border-dashed px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Draft
                </span>
              )}
              <h1 className="text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="text-sm italic text-muted-foreground">{post.subtitle}</p>
              )}
              <div className="grid gap-1 text-xs text-muted-foreground">
                <p>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {" · "}
                  {post.readingTimeMinutes} min read
                  {post.canonicalUrl && (
                    <>
                      {" · "}Originally on{" "}
                      <a
                        href={post.canonicalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 underline underline-offset-4 decoration-muted-foreground hover:text-primary transition-colors"
                      >
                        Medium
                        <ArrowUpRight aria-hidden="true" className="size-3" />
                      </a>
                    </>
                  )}
                </p>
                {series && (
                  <p>
                    Part {series.part} of {series.total} · {series.name}
                  </p>
                )}
              </div>
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
          </article>
        </div>

        {/* phones and tablets only; at lg and up the right rail has these picks */}
        {related.length > 0 && (
          <div className="mt-6 border-t pt-6 lg:hidden">
            <KeepReading posts={related} />
          </div>
        )}
      </div>

      {/* sticks against the document scroll; the grid ends before the author band */}
      <RailKeepReading
        posts={related}
        className="sticky top-8 hidden self-start lg:grid"
      />
    </div>
  );

  return (
    <main className="fade-in">
      <script
        type="application/ld+json"
        // escape "<" so post text can never close the script tag
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\u003c"),
        }}
      />
      <div className="px-5 pt-6 pb-12 lg:px-8 lg:pt-8 lg:pb-16">
        <NameTrail
          section={{ label: "Blog", href: "/blogs" }}
          className={cn(
            "mx-auto mb-6 w-full max-w-xl lg:max-w-[880px]",
            hasContents && "xl:max-w-[1128px]",
          )}
        />
        {hasContents ? <ContentsProvider headings={headings}>{grid}</ContentsProvider> : grid}
      </div>
      <AuthorBand hasContents={hasContents} />
    </main>
  );
}
