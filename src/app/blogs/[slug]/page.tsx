import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllPosts,
  getPostBySlug,
  getPostSeries,
  getRelatedPosts,
  getShareImage,
} from "@/lib/blog";
import { formatPostDate } from "@/lib/date";
import { serializeJsonLd } from "@/lib/json-ld";
import { postMdxOptions } from "@/lib/mdx-options";
import { AUTHOR, SITE_URL } from "@/lib/site";
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
import {
  POST_GRID,
  POST_GRID_WITH_CONTENTS,
  POST_WIDTH,
  POST_WIDTH_WITH_CONTENTS,
} from "@/components/Post/layout";

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
  // collected from the same compile MDXRemote runs, so the ids match the page
  const headings = await extractHeadings(post.content, postMdxOptions);
  const hasContents = headings.length >= MIN_TOC_HEADINGS;

  const grid = (
    <div className={cn(POST_GRID, "items-start", hasContents && POST_GRID_WITH_CONTENTS)}>
      {hasContents && (
        <ContentsRail className="sticky top-8 hidden max-h-[calc(100vh-4rem)] self-start overflow-y-auto xl:block" />
      )}

      <div className="min-w-0">
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
                    {/* the ::after pads the hit area to 44px without moving the line */}
                    <a
                      href={post.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-0.5 underline underline-offset-4 decoration-muted-foreground hover:text-primary transition-colors after:absolute after:-inset-x-1 after:-inset-y-3.5"
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

          {/* the bar starts with the body and its sticky range is this
              wrapper, so it pins once the body is reached and leaves with
              the post's last line */}
          <div>
            {hasContents && <ContentsBar className="-mx-5 mt-6 lg:mx-0 xl:hidden" />}
            <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: postMdxOptions }} />
          </div>
        </article>

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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <div className="px-5 pt-6 pb-12 lg:px-8 lg:pt-8 lg:pb-16">
        <NameTrail
          section={{ label: "Blog", href: "/blogs" }}
          className={cn(POST_WIDTH, "mb-6", hasContents && POST_WIDTH_WITH_CONTENTS)}
        />
        {hasContents ? <ContentsProvider headings={headings}>{grid}</ContentsProvider> : grid}
      </div>
      <AuthorBand hasContents={hasContents} />
    </main>
  );
}
