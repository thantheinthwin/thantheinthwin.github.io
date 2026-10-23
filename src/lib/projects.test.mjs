import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getAllProjects,
  getNextProject,
  getProjectBySlug,
  getProjectPageContent,
} from "./projects.ts";

// Forged is a commercial product: its page must not say how it's built.
// Its own tech list, plus the other build details it has had.
const FORBIDDEN_TERMS = [
  ...new Set([
    ...getProjectBySlug("forged").tech,
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
    "TypeScript",
    "OpenAPI",
    "swaggo",
    "middleware",
    "get_",
  ]),
];

const escape = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole words, any case, with an optional plural "s": "Go" matches "go" and
// "Go-based" but not "going" or "ago"; "LLM" also matches "LLMs". A term
// ending in "_" is a prefix: "get_" matches "get_exercises".
const termPattern = (term) => {
  const body = escape(term).replace(/ /g, "\\s+");
  return term.endsWith("_") ? `\\b${body}\\w*` : `\\b${body}s?\\b`;
};
const forbidden = new RegExp(FORBIDDEN_TERMS.map(termPattern).join("|"), "gi");

const forbiddenIn = (text) => text.match(forbidden) ?? [];

// Every string in a value, however deeply nested.
const stringsIn = (value) =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(stringsIn)
      : [];

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
  assert.equal(getNextProject("no-such-project"), undefined);
});

test("project slugs are unique", () => {
  const slugs = getAllProjects().map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("the forbidden-term matcher matches whole words only", () => {
  assert.deepEqual(
    forbiddenIn(
      "A Go-based API gateway on Fly.io: Node.js middleware, two LLMs, get_exercises and a Better  Auth schema"
    ),
    [
      "Go",
      "API gateway",
      "Fly.io",
      "Node.js",
      "middleware",
      "LLMs",
      "get_exercises",
      "Better  Auth",
      "schema",
    ]
  );
  assert.deepEqual(
    forbiddenIn("going, ago, Google, gopher, dragon, together, target"),
    []
  );
});

test("Forged has an athlete-facing page and no case study", () => {
  const forged = getProjectBySlug("forged");
  assert.ok(forged.page, "Forged needs an athlete-facing page");
  assert.equal("caseStudy" in forged, false);
  for (const field of ["features", "challenges", "outcomes"]) {
    assert.equal(field in forged, false, `Forged has ${field}`);
    assert.equal(field in forged.details, false, `Forged has details.${field}`);
  }
});

test("the Forged page shows no tech chips and no repo or live links", () => {
  const forged = getProjectBySlug("forged");
  const content = getProjectPageContent(forged);
  assert.equal(content.chips, undefined);
  assert.deepEqual(content.links, []);
  assert.equal(content.description, forged.page.description);
});

test("the Forged page names none of its implementation details", () => {
  const content = getProjectPageContent(getProjectBySlug("forged"));
  const strings = stringsIn(content);
  assert.ok(strings.includes("What athletes get"));
  const leaks = strings.flatMap((text) =>
    forbiddenIn(text).map((term) => `${term} in "${text}"`)
  );
  assert.deepEqual(leaks, []);
});

test("a case-study page shows its features, challenges, outcomes and tech", () => {
  const wealthsync = getProjectBySlug("wealthsync");
  const content = getProjectPageContent(wealthsync);
  assert.deepEqual(
    content.sections.map((section) => section.title),
    ["Key Features", "Challenges Overcome", "Outcomes & Impact"]
  );
  assert.deepEqual(content.chips?.items, wealthsync.tech);
  assert.deepEqual(
    content.links.map((row) => row.label),
    ["GitHub"]
  );
  assert.equal(content.next?.href, "/projects/forged");
});
