import { test } from "node:test";
import assert from "node:assert/strict";
import { linkedPostSlugs, rankRelatedPosts } from "./related.ts";

const post = (slug, date, tags) => ({ slug, date, tags, title: slug });
const slugs = (posts) => posts.map((p) => p.slug);

test("ranks other posts by the number of shared tags", () => {
  const current = post("current", "2026-01-01", ["Go", "API", "Security"]);
  const posts = [
    post("one-shared", "2026-03-01", ["Go"]),
    post("three-shared", "2025-01-01", ["Go", "API", "Security"]),
    post("two-shared", "2025-06-01", ["API", "Security"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "three-shared",
    "two-shared",
    "one-shared",
  ]);
});

test("breaks ties on shared tags with the newer post", () => {
  const current = post("current", "2026-01-01", ["Go"]);
  // deliberately out of date order, so input order can't decide the result
  const posts = [
    post("older", "2025-01-01", ["Go"]),
    post("newest", "2025-09-01", ["Go"]),
    post("middle", "2025-05-01", ["Go"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "newest",
    "middle",
    "older",
  ]);
});

test("fills the list with the newest posts that share no tags", () => {
  const current = post("current", "2026-01-01", ["Go"]);
  const posts = [
    post("old-unrelated", "2024-01-01", ["CSS"]),
    post("shared", "2023-01-01", ["Go"]),
    post("new-unrelated", "2025-12-01", ["React"]),
    post("mid-unrelated", "2025-06-01", ["Cache"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "shared",
    "new-unrelated",
    "mid-unrelated",
  ]);
});

test("excludes the current post", () => {
  const current = post("current", "2026-01-01", ["Go"]);
  const posts = [
    post("current", "2026-01-01", ["Go"]),
    post("a", "2025-01-01", ["Go"]),
    post("b", "2024-01-01", []),
  ];
  const result = rankRelatedPosts(current, posts);
  assert.ok(!slugs(result).includes("current"));
  assert.deepEqual(slugs(result), ["a", "b"]);
});

test("compares tags case-insensitively", () => {
  const current = post("current", "2026-01-01", ["Software Architecture", "API"]);
  const posts = [
    post("newer-unrelated", "2025-12-01", ["React"]),
    // the case-folded tag is the only one shared
    post("match", "2024-01-01", ["software architecture", "Go"]),
    // "API" must not match "Api Design": tags compare whole, not by substring
    post("substring", "2025-06-01", ["Api Design"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "match",
    "newer-unrelated",
    "substring",
  ]);
});

test("ignores spaces around tags on either side", () => {
  const current = post("current", "2026-01-01", [" Go "]);
  const posts = [
    post("newer-unrelated", "2025-12-01", ["React"]),
    // the trimmed tag is the only one shared
    post("plain", "2024-06-01", ["Go", "CSS"]),
    post("padded", "2024-01-01", ["go  ", "CSS"]),
  ];
  const result = rankRelatedPosts(current, posts);
  assert.deepEqual(slugs(result), ["plain", "padded", "newer-unrelated"]);
  // tags keep their original text
  assert.deepEqual(result[1].tags, ["go  ", "CSS"]);
});

test("counts a tag repeated in another case as one shared tag", () => {
  const current = post("current", "2026-01-01", ["Go", "API"]);
  const posts = [
    post("repeated", "2025-12-01", ["Go", "go"]),
    post("two-distinct", "2024-01-01", ["Go", "API"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "two-distinct",
    "repeated",
  ]);
});

test("handles numeric tags from unquoted YAML", () => {
  const current = post("current", "2026-01-01", ["Go", 2025]);
  const posts = [
    post("newer-unrelated", "2025-12-01", ["React"]),
    post("number", "2024-06-01", [2025]),
    post("string", "2024-01-01", ["2025"]),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), [
    "number",
    "string",
    "newer-unrelated",
  ]);
});

test("moves shared tags first and keeps the rest in their order", () => {
  const current = post("current", "2026-01-01", ["Microservices", "Software Architecture"]);
  const original = ["Rest Api", "Https", "Software Architecture", "Api Design"];
  const posts = [post("rest", "2025-12-17", original)];
  const [result] = rankRelatedPosts(current, posts);
  assert.deepEqual(result.tags, [
    "Software Architecture",
    "Rest Api",
    "Https",
    "Api Design",
  ]);
  // the input post is left as it was
  assert.deepEqual(posts[0].tags, original);
});

test("returns every other post when there are fewer than the limit", () => {
  const current = post("current", "2026-01-01", ["Go"]);
  const posts = [current, post("only", "2025-01-01", ["CSS"])];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts)), ["only"]);
  assert.deepEqual(rankRelatedPosts(current, [current]), []);
  assert.deepEqual(rankRelatedPosts(current, []), []);
});

test("returns at most the limit, three by default", () => {
  const current = post("current", "2026-01-01", []);
  const posts = ["a", "b", "c", "d", "e"].map((slug, i) =>
    post(slug, `2025-0${i + 1}-01`, []),
  );
  assert.equal(rankRelatedPosts(current, posts).length, 3);
  assert.deepEqual(slugs(rankRelatedPosts(current, posts, 2)), ["e", "d"]);
});

test("leaves out excluded posts and fills from the rest", () => {
  const current = post("current", "2026-01-01", ["Go"]);
  const posts = [
    post("linked", "2026-02-01", ["Go"]),
    post("shared", "2025-01-01", ["Go"]),
    post("newest", "2026-03-01", []),
    post("newer", "2025-12-01", []),
  ];
  assert.deepEqual(slugs(rankRelatedPosts(current, posts, 3, ["linked"])), ["shared", "newest", "newer"]);
});

test("finds the posts an MDX body links to", () => {
  const body = [
    "See [my last post](/blogs/ai-is-an-assistant-not-a-genie) for why.",
    "Also [this](https://thantheinthwin.vercel.app/blogs/Stop-Mixing-Auth-With-Business-Logic#why).",
    '<Link href="/blogs/ttl-and-the-mystery-of-outdated-content">TTL</Link>',
    "Not a post: [list](/blogs) or [elsewhere](https://example.com/blogs/other-site).",
  ].join("\n");
  assert.deepEqual(
    [...linkedPostSlugs(body)].sort(),
    ["ai-is-an-assistant-not-a-genie", "stop-mixing-auth-with-business-logic", "ttl-and-the-mystery-of-outdated-content"],
  );
});
