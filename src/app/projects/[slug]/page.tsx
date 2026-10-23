import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NameTrail } from "@/components/NameTrail";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectPageContent,
} from "@/lib/projects";

const AUTHOR = "Thant Hein Thwin";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Every project page is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  const { title, description } = getProjectPageContent(project);

  return {
    title,
    description,
    // the site-wide keywords list the tech stack; Forged's page must not
    // name how it's built, so project pages don't inherit them
    keywords: null,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: `${AUTHOR} Portfolio`,
      title,
      description,
      // defining openGraph/twitter here drops the inherited site-wide images,
      // so name them explicitly
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

// The links are 16px tall; the pseudo-element gives each a 44px tap target
// without changing the layout.
const externalLinkClass =
  "relative flex w-fit items-center gap-1 hover:underline hover:underline-offset-4 after:absolute after:inset-x-0 after:-inset-y-3.5 after:content-['']";

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Render only what the content helper returns; the tests check it.
  const content = getProjectPageContent(project);

  return (
    <main className="flex justify-center p-8 3xl:p-12 fade-in">
      <article className="w-full max-w-xl py-4">
        <NameTrail
          section={{ label: "Projects", href: "/#projects" }}
          className="mb-2"
        />

        <header className="grid gap-1 pb-4">
          <p className="text-sm text-muted-foreground">{content.date}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">{content.subtitle}</p>
          {content.meta && <p className="text-sm">{content.meta}</p>}

          {content.links.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-xs"
            >
              <span className="font-semibold">{`${row.label}:`}</span>
              {row.links.map((link, index) => (
                <span key={link.href} className="flex items-baseline gap-x-1.5">
                  {index > 0 && (
                    <span className="text-muted-foreground" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLinkClass}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </span>
              ))}
            </div>
          ))}

          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            {content.description}
          </p>
        </header>

        {content.sections.map((section) => (
          <section key={section.title} className="grid gap-3 border-t py-4">
            <h2 className="font-semibold">{section.title}</h2>
            {"items" in section ? (
              <ul className="grid list-disc gap-1.5 pl-5 text-sm leading-relaxed text-foreground/80">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-foreground/80">
                {section.text}
              </p>
            )}
          </section>
        ))}

        {content.chips && (
          <section className="grid gap-3 border-t py-4">
            <h2 className="font-semibold">{content.chips.title}</h2>
            <div className="flex flex-wrap gap-1">
              {content.chips.items.map((chip) => (
                <span
                  key={chip}
                  className="text-xs bg-secondary px-2 py-1 rounded"
                >
                  {chip}
                </span>
              ))}
            </div>
          </section>
        )}

        {content.follow.length > 0 && (
          <section className="grid gap-3 border-t py-4">
            <h2 className="font-semibold">Follow the build</h2>
            <div className="grid gap-2">
              {content.follow.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-11 items-center justify-between gap-3"
                >
                  <div className="grid gap-0.5">
                    <span className="text-sm group-hover:underline group-hover:underline-offset-4">
                      {link.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {link.note}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-4 border-t pt-4">
          {content.next && (
            <Link
              href={content.next.href}
              className="group flex min-h-11 max-w-96 items-center justify-between gap-3 rounded border p-4"
            >
              <div className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Next project
                </span>
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">
                  {content.next.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {content.next.subtitle}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          )}
          <CoffeeChat />
        </div>
      </article>
    </main>
  );
}
