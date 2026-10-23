import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NameTrail } from "@/components/NameTrail";
import CoffeeChat from "@/components/SideBar/CoffeeChat";
import {
  getAllProjects,
  getNextProject,
  getProjectBySlug,
  type Project,
} from "@/lib/projects";

const AUTHOR = "Thant Hein Thwin";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// A project with an athlete-facing page shows that page's description, on
// the page and in search and share previews.
function pageDescription(project: Project) {
  return project.page?.description ?? project.description;
}

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
  const description = pageDescription(project);

  return {
    title: project.title,
    description,
    // the site-wide keywords list the tech stack; Forged's page must not
    // name how it's built, so project pages don't inherit them
    keywords: null,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: `${AUTHOR} Portfolio`,
      title: project.title,
      description,
      // defining openGraph/twitter here drops the inherited site-wide images,
      // so name them explicitly
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: ["/twitter-image"],
    },
  };
}

const sectionClass = "grid gap-3 border-t py-4";
const listClass =
  "grid list-disc gap-1.5 pl-5 text-sm leading-relaxed text-foreground/80";
const externalLinkClass =
  "flex w-fit items-center gap-1 hover:underline hover:underline-offset-4";

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className={sectionClass}>
      <h2 className="font-semibold">{title}</h2>
      <ul className={listClass}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { details, page } = project;
  const meta = [details.role, details.teamSize].filter(Boolean).join(" · ");
  const next = getNextProject(project.slug);

  return (
    <main className="flex justify-center p-8 3xl:p-12 fade-in">
      <article className="w-full max-w-xl py-4">
        <NameTrail
          section={{ label: "Projects", href: "/#projects" }}
          className="mb-2"
        />

        <header className="grid gap-1 pb-4">
          <p className="text-sm text-muted-foreground">{project.date}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          {meta && <p className="text-sm">{meta}</p>}

          {details.github && (
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-xs">
              <span className="font-semibold">GitHub:</span>
              {details.github.map((repo, index) => (
                <span key={repo.link} className="flex items-baseline gap-x-1.5">
                  {index > 0 && (
                    <span className="text-muted-foreground" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <a
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLinkClass}
                  >
                    {repo.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </span>
              ))}
            </div>
          )}

          {details.live && (
            <div className="flex flex-wrap items-baseline gap-x-1.5 text-xs">
              <span className="font-semibold">Live:</span>
              <a
                href={details.live}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                Visit project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}

          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            {pageDescription(project)}
          </p>
        </header>

        {page ? (
          // Athlete-facing page: what people get, never how it's built
          <>
            {page.sections.map((section) =>
              section.items ? (
                <BulletSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                />
              ) : (
                <section key={section.title} className={sectionClass}>
                  <h2 className="font-semibold">{section.title}</h2>
                  {section.text && (
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {section.text}
                    </p>
                  )}
                </section>
              )
            )}

            {page.follow && page.follow.length > 0 && (
              <section className={sectionClass}>
                <h2 className="font-semibold">Follow the build</h2>
                <div className="grid gap-2">
                  {page.follow.map((link) => (
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
                      <ArrowRight
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <BulletSection title="Key Features" items={details.features} />
            <BulletSection
              title="Challenges Overcome"
              items={details.challenges}
            />
            <BulletSection title="Outcomes & Impact" items={details.outcomes} />
            <section className={sectionClass}>
              <h2 className="font-semibold">Technologies</h2>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-secondary px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="grid gap-4 border-t pt-4">
          {next && next.slug !== project.slug && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex min-h-11 items-center justify-between gap-3 rounded border p-4"
            >
              <div className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Next project
                </span>
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">
                  {next.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {next.subtitle}
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
