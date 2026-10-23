// Project data for the homepage rows and the /projects/[slug] pages.
// Kept pure (types, data and helpers, no imports) so client components and
// node:test can both load it.

// A section is either a bulleted list or a paragraph, never empty.
export type ProjectPageSection =
  | { title: string; items: string[] }
  | { title: string; text: string };

export interface ProjectFollowLink {
  title: string;
  href: string;
  note: string;
}

// A page written for the people who use the product, in place of a case
// study. Forged is a commercial product, so its page says what athletes get
// and never how it's built: no tech chips, no challenges, no outcomes.
export interface ProjectPage {
  description: string;
  sections: ProjectPageSection[];
  follow?: ProjectFollowLink[];
}

// The engineering write-up shown on the project page.
export interface ProjectCaseStudy {
  features: string[];
  challenges: string[];
  outcomes: string[];
}

interface ProjectBase {
  slug: string;
  title: string;
  date: string;
  subtitle: string;
  // the homepage row's description and tech list
  description: string;
  tech: string[];
  details: {
    github?: {
      label: string;
      link: string;
    }[];
    live?: string;
    role?: string;
    teamSize?: string;
  };
}

// A project has either an athlete-facing page or a case study, never both,
// so a product's build details can't sit unused in the data (this module
// ships to the browser with the homepage).
export type Project = ProjectBase &
  (
    | { page: ProjectPage; caseStudy?: never }
    | { caseStudy: ProjectCaseStudy; page?: never }
  );

const projects: Project[] = [
  {
    slug: "forged",
    title: "Forged",
    date: "Apr 2026 – Present",
    subtitle: "AI-Powered Fitness Coaching App (Commercial Product)",
    description:
      "A mobile-first AI workout coach I'm building as a commercial product—it generates personalized training plans, logs gym sessions with PR detection, and answers training questions through a context-aware AI chat. Built as a Go API gateway with a dedicated auth service and an Expo mobile app, heading toward app store launch.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Golang",
      "Gin",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Better Auth",
      "Hono",
      "OpenRouter",
      "Docker",
      "Fly.io",
    ],
    details: {
      role: "Founder & Full Stack Developer",
      teamSize: "Solo Founder",
    },
    page: {
      description:
        "A mobile-first AI workout coach I'm building as a commercial product. It builds you a personalized training plan, logs your gym sessions and spots new PRs, and answers your training questions in a chat that knows your history.",
      sections: [
        {
          title: "What athletes get",
          items: [
            "A personalized 4-week training plan from a 6-step onboarding",
            "Set-by-set workout logging with automatic PR detection",
            "Training volume per muscle group, so you can see what you've worked",
            "Exercise swaps that train the same muscles when a machine is taken",
            "An AI coach that answers training questions using your recent workouts",
          ],
        },
        {
          title: "Status",
          text: "Heading toward app store launch.",
        },
      ],
      follow: [
        {
          title: "Stop Mixing Auth with Business Logic",
          href: "/blogs/stop-mixing-auth-with-business-logic",
          note: "Part 1 of the Securing Forged series",
        },
      ],
    },
  },
  {
    slug: "wealthsync",
    title: "WealthSync",
    date: "May – Nov 2024",
    subtitle: "Finance Management App",
    description:
      "A cross-platform finance app built to simplify personal budgeting, expense tracking, and financial planning—enhanced with AI-driven insights and premium features via Stripe.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Golang",
      "Firebase",
      "PostgreSQL",
      "OpenAI",
      "Stripe",
      "Docker",
      "GitHub",
      "Postman",
    ],
    caseStudy: {
      features: [
        "Secure Firebase Google Authentication for seamless login",
        "Categorized expense tracking with detailed insights",
        "Real-time budget control and alerts",
        "Visual dashboards for financial health analytics",
        "AI-powered personalized financial advice using OpenAI",
        "Stripe integration for premium feature subscriptions",
        "Cross-platform compatibility with React Native and Expo",
        "Real-time data synchronization across devices",
      ],
      challenges: [
        "Implementing secure financial data handling and encryption",
        "Optimizing app performance for real-time budget calculations",
        "Integrating multiple third-party APIs (Firebase, OpenAI, Stripe)",
        "Ensuring cross-platform consistency across iOS and Android",
        "Managing complex state for real-time financial data updates",
      ],
      outcomes: [
        "Successfully launched cross-platform finance app with 1000+ downloads",
        "Achieved 99.9% uptime for critical financial data services",
        "Reduced user onboarding time by 60% through streamlined authentication",
        "Implemented AI features that improved user engagement by 40%",
        "Established secure payment processing with zero security incidents",
      ],
    },
    details: {
      github: [
        {
          label: "Frontend",
          link: "https://github.com/thantheinthwin/wealthsync.app",
        },
        {
          label: "Backend",
          link: "https://github.com/thantheinthwin/wealthsync.api",
        },
      ],
      role: "Full Stack Developer",
      teamSize: "Solo Project",
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

// The project after this one in list order, wrapping from the last back to
// the first, for the "Next project" card at the end of a project page.
export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}

export interface ProjectPageLinkRow {
  label: string;
  links: { label: string; href: string }[];
}

export interface ProjectPageContent {
  title: string;
  date: string;
  subtitle: string;
  meta?: string;
  description: string;
  links: ProjectPageLinkRow[];
  sections: ProjectPageSection[];
  chips?: { title: string; items: string[] };
  follow: ProjectFollowLink[];
  next?: { href: string; title: string; subtitle: string };
}

// Everything a project page shows, its metadata included. The page renders
// only this, so the tests check exactly what reaches /projects/{slug}.
export function getProjectPageContent(project: Project): ProjectPageContent {
  const { details } = project;

  const links: ProjectPageLinkRow[] = [];
  if (details.github?.length) {
    links.push({
      label: "GitHub",
      links: details.github.map(({ label, link }) => ({ label, href: link })),
    });
  }
  if (details.live) {
    links.push({
      label: "Live",
      links: [{ label: "Visit project", href: details.live }],
    });
  }

  const nextProject = getNextProject(project.slug);
  const common = {
    title: project.title,
    date: project.date,
    subtitle: project.subtitle,
    meta:
      [details.role, details.teamSize].filter(Boolean).join(" · ") ||
      undefined,
    links,
    next:
      nextProject && nextProject.slug !== project.slug
        ? {
            href: `/projects/${nextProject.slug}`,
            title: nextProject.title,
            subtitle: nextProject.subtitle,
          }
        : undefined,
  };

  if (project.page) {
    return {
      ...common,
      description: project.page.description,
      sections: project.page.sections,
      follow: project.page.follow ?? [],
    };
  }

  const { features, challenges, outcomes } = project.caseStudy;
  return {
    ...common,
    description: project.description,
    sections: [
      { title: "Key Features", items: features },
      { title: "Challenges Overcome", items: challenges },
      { title: "Outcomes & Impact", items: outcomes },
    ],
    chips: { title: "Technologies", items: project.tech },
    follow: [],
  };
}
