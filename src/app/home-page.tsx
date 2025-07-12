"use client";

import { Header } from "../components/Header";
import About from "../components/Sections/About";
import Experience from "../components/Sections/Experience";
import Skills from "../components/Sections/Skills";
import { BlogsResponse } from "@/api-services/blogs";

export default function HomePage({ blogs }: { blogs: BlogsResponse }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 fade-in">
      <Header />
      <section className="mt-16 mb-16">
        <About />
      </section>
      <Skills />
      <Experience />
      {/* PROJECTS SECTION (to be split next) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Projects</h2>
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">WealthSync</h3>
              <span className="text-sm text-muted-foreground">
                05/2024 – 11/2024
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Finance Management App
            </p>
            <p className="text-foreground/80 leading-relaxed mb-2">
              A cross-platform finance app built to simplify personal budgeting,
              expense tracking, and financial planning—enhanced with AI-driven
              insights and premium features via Stripe.
            </p>
            <ul className="list-disc ml-6 mb-2">
              <li>
                <span className="font-semibold">Secure Auth:</span> Firebase
                Google Authentication for seamless login.
              </li>
              <li>
                <span className="font-semibold">Expense Tracking:</span>{" "}
                Categorized logging with detailed insights.
              </li>
              <li>
                <span className="font-semibold">Budget Management:</span>{" "}
                Real-time budget control and alerts.
              </li>
              <li>
                <span className="font-semibold">Analytics & Reporting:</span>{" "}
                Visual dashboards for financial health.
              </li>
              <li>
                <span className="font-semibold">AI Financial Advice:</span>{" "}
                Personalized tips powered by OpenAI.
              </li>
              <li>
                <span className="font-semibold">Stripe Integration:</span>{" "}
                Manage subscriptions for premium features.
              </li>
            </ul>
            <div className="mb-2">
              <span className="font-semibold">Tech Stack:</span> React Native,
              Expo, TypeScript, Golang, Firebase, PostgreSQL, OpenAI, Stripe,
              Docker, GitHub, Postman
            </div>
          </div>
        </div>
      </section>
      {/* BLOGS SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Blogs</h2>
        <div className="space-y-6">
          {blogs.success && blogs.data ? (
            blogs.data.slice(0, 5).map((blog) => (
              <article key={blog.id} className="group">
                <time className="text-sm text-muted-foreground">
                  {new Date(blog.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="font-semibold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {blog.excerpt}
                </p>
                {blog.link && (
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </article>
            ))
          ) : (
            <p className="text-muted-foreground">
              Failed to load blogs: {blogs.message}
            </p>
          )}
        </div>
      </section>
      {/* EDUCATION SECTION (to be split next) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Education</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold">
                Bachelor Degree with Honors in Computing
              </h3>
              <span className="text-sm text-muted-foreground">
                12/2023 – 12/2024
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              University of Greenwich &mdash; Greenwich, United Kingdom
            </p>
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold">
                Level 5 Diploma in Computing
              </h3>
              <span className="text-sm text-muted-foreground">
                09/2022 – 09/2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">NCC</p>
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold">
                Diploma in Electronic Communication and Engineering
              </h3>
              <span className="text-sm text-muted-foreground">
                12/2017 – 05/2020
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Myanmar Institute of Information Technology &mdash; Mandalay,
              Myanmar
            </p>
          </div>
        </div>
      </section>
      {/* LANGUAGES SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Languages</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-semibold">English</span>{" "}
            <span className="text-muted-foreground">
              (IELTS band score 7.5)
            </span>
          </div>
          <div>
            <span className="font-semibold">Burmese</span>
          </div>
        </div>
      </section>
      {/* LINKS SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/thantheinthwin"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover:border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Github</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/thanthein"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover-border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">LinkedIn</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>

          <a
            href="mailto:thantheinthwin.dev@gmail.com"
            className="group p-4 rounded-lg bg-card/50 border border-border/20 hover:bg-card/70 hover-border-border/40 transition-all duration-200 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Email</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
