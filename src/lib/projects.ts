// Project data for the homepage rows and the /projects/[slug] pages.
// Kept pure (types, data and helpers, no imports) so client components and
// node:test can both load it.

export interface ProjectPageSection {
  title: string;
  items?: string[];
  text?: string;
}

export interface ProjectFollowLink {
  title: string;
  href: string;
  note: string;
}

// A page written for the people who use the product. When a project has
// one, its project page shows this instead of the technical details: no tech
// chips, no challenges, no outcomes. Forged is a commercial product, so its
// page says what athletes get and never how it's built.
export interface ProjectPage {
  description: string;
  sections: ProjectPageSection[];
  follow?: ProjectFollowLink[];
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  subtitle: string;
  description: string;
  tech: string[];
  details: {
    features: string[];
    challenges: string[];
    outcomes: string[];
    github?: {
      label: string;
      link: string;
    }[];
    live?: string;
    role?: string;
    teamSize?: string;
  };
  page?: ProjectPage;
}

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
      features: [
        "AI-generated 4-week personalized training plans from a 6-step onboarding flow",
        "LLM tool-calling (get_exercises, get_substitutes) against a curated exercise catalogue—zero freehand exercise names",
        "Workout logging with per-set tracking, PR detection, and per-muscle-group volume analysis",
        "Streaming AI coach chat with RAG context: user profile, recent workouts, and pgvector semantic search",
        "SQL-driven exercise substitution engine that avoids AI calls entirely",
        "Better Auth service (Node.js + Hono) issuing JWTs consumed by the Go API middleware chain",
      ],
      challenges: [
        "Enforcing canonical exercise naming by routing all AI exercise selection through database-backed tools",
        "Bridging authentication between a Node.js auth server and a Go API via JWT validation middleware",
        "Designing a Postgres schema resilient to messy AI-generated workout log ingestion",
        "Reducing LLM API cost by moving exercise lookup and substitution from AI calls to SQL queries",
      ],
      outcomes: [
        "Full backend deployed to Fly.io: Go API, auth server, and Supabase Postgres with automated migrations",
        "End-to-end plan generation pipeline working from onboarding profile to structured 4-week plan",
        "Exercise catalogue with seeded muscles, exercises, and muscle mappings powering deterministic substitution",
        "OpenAPI documentation generated from code annotations via swaggo",
      ],
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
    details: {
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
