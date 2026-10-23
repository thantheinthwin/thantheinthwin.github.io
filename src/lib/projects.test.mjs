import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getAllProjects,
  getNextProject,
  getProjectBySlug,
} from "./projects.ts";

// Forged is a commercial product: its page must not say how it's built.
const FORBIDDEN_TERMS = [
  "Go",
  "Golang",
  "Gin",
  "Hono",
  "Better Auth",
  "pgvector",
  "RAG",
  "tool-calling",
  "SQL",
  "OpenRouter",
  "Fly.io",
  "Supabase",
  "JWT",
  "schema",
  "LLM",
  "Postgres",
  "PostgreSQL",
  "Redis",
  "Docker",
  "API gateway",
  "Expo",
  "React Native",
  "Node.js",
];

const escape = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole words, any case, with an optional plural "s": "Go" matches "go" and
// "Go-based" but not "going" or "ago"; "LLM" also matches "LLMs".
const forbidden = new RegExp(
  `\\b(?:${FORBIDDEN_TERMS.map((term) =>
    escape(term).replace(/ /g, "\\s+")
  ).join("|")})s?\\b`,
  "gi"
);

const forbiddenIn = (text) => text.match(forbidden) ?? [];

// Every string the /projects/forged page and its metadata render.
function forgedPageStrings() {
  const forged = getProjectBySlug("forged");
  const { page } = forged;
  return [
    forged.title,
    forged.subtitle,
    forged.date,
    forged.details.role,
    forged.details.teamSize,
    page.description,
    ...page.sections.flatMap((section) => [
      section.title,
      ...(section.items ?? []),
      section.text ?? "",
    ]),
    ...(page.follow ?? []).flatMap((link) => [link.title, link.href, link.note]),
  ];
}

test("finds a project by slug", () => {
  const project = getProjectBySlug("wealthsync");
  assert.equal(project?.title, "WealthSync");
});

test("returns undefined for an unknown slug", () => {
  assert.equal(getProjectBySlug("no-such-project"), undefined);
});

test("next project follows list order and wraps to the first", () => {
  const slugs = getAllProjects().map((project) => project.slug);
  assert.ok(slugs.length >= 2);
  for (let i = 0; i < slugs.length; i++) {
    const expected = slugs[(i + 1) % slugs.length];
    assert.equal(getNextProject(slugs[i])?.slug, expected);
  }
  assert.equal(getNextProject(slugs.at(-1))?.slug, slugs[0]);
  assert.equal(getNextProject("no-such-project"), undefined);
});

test("project slugs are unique", () => {
  const slugs = getAllProjects().map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("the forbidden-term matcher matches whole words only", () => {
  // it flags the homepage Forged description, which names the stack
  const homepageRow = getProjectBySlug("forged").description;
  assert.ok(forbiddenIn(homepageRow).length > 0);
  assert.deepEqual(forbiddenIn("A Go-based app on Fly.io with Node.js"), [
    "Go",
    "Fly.io",
    "Node.js",
  ]);
  assert.deepEqual(forbiddenIn("Two LLMs and a Better  Auth"), [
    "LLMs",
    "Better  Auth",
  ]);
  assert.deepEqual(forbiddenIn("going, ago, Google, gopher, dragon"), []);
});

test("Forged has an athlete-facing page", () => {
  const forged = getProjectBySlug("forged");
  assert.ok(forged.page, "Forged needs a page override so tech stays hidden");
});

test("the Forged page names none of its implementation details", () => {
  const leaks = forgedPageStrings().flatMap((text) =>
    forbiddenIn(text).map((term) => `${term} in "${text}"`)
  );
  assert.deepEqual(leaks, []);
});
