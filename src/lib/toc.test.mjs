import { test } from "node:test";
import assert from "node:assert/strict";
import rehypeSlug from "rehype-slug";
import { extractHeadings, headingText } from "./toc.ts";

const ids = (source) => extractHeadings(source).map((h) => h.id);

// Runs the real rehype-slug over a hast tree, so the ids are checked against
// the plugin the post page uses rather than against expectations typed here.
function rehypeIds(headings) {
  const tree = {
    type: "root",
    children: headings.map(([tagName, children]) => ({
      type: "element",
      tagName,
      properties: {},
      children,
    })),
  };
  rehypeSlug()(tree);
  return tree.children.map((node) => node.properties.id);
}
const text = (value) => ({ type: "text", value });
const code = (value) => ({ type: "element", tagName: "code", properties: {}, children: [text(value)] });

test("returns only the h2s, in order, with their text", () => {
  const source = ["# Title", "## First", "### Detail", "## Second", "#### Deep", "## Third"].join("\n");
  assert.deepEqual(extractHeadings(source), [
    { id: "first", text: "First" },
    { id: "second", text: "Second" },
    { id: "third", text: "Third" },
  ]);
});

test("slugs apostrophes, em-dashes and punctuation as rehype-slug does", () => {
  const source = [
    "## From Writing Every Line to Knowing What's Right",
    "## Humans Are the Bottleneck — and That's the Point",
    "## Who Cares After It Ships?",
    "## The Shared Database: A Deliberate Trade-off",
    "## 1) REST (Representational State Transfer)",
    "## Composition + Interfaces = Go's Polymorphism",
  ].join("\n");
  const expected = [
    "from-writing-every-line-to-knowing-whats-right",
    "humans-are-the-bottleneck--and-thats-the-point",
    "who-cares-after-it-ships",
    "the-shared-database-a-deliberate-trade-off",
    "1-rest-representational-state-transfer",
    "composition--interfaces--gos-polymorphism",
  ];
  assert.deepEqual(ids(source), expected);
  const fromPlugin = rehypeIds(extractHeadings(source).map((h) => ["h2", [text(h.text)]]));
  assert.deepEqual(fromPlugin, expected);
});

test("keeps inline code text and strips markdown from the rest", () => {
  assert.equal(headingText("Using the `<a>` tag in `next/link`"), "Using the <a> tag in next/link");
  assert.equal(headingText("Keep `snake_case` and **bold** _words_"), "Keep snake_case and bold words");
  assert.equal(headingText("See [the docs](https://example.com) and ![img](/x.png)"), "See the docs and");
  assert.equal(headingText("Escaped \\*stars\\* stay"), "Escaped *stars* stay");
  assert.equal(headingText("Closing hashes ##"), "Closing hashes");

  const source = "## Why `useEffect` Runs Twice";
  assert.deepEqual(extractHeadings(source), [{ id: "why-useeffect-runs-twice", text: "Why useEffect Runs Twice" }]);
  assert.deepEqual(rehypeIds([["h2", [text("Why "), code("useEffect"), text(" Runs Twice")]]]), [
    "why-useeffect-runs-twice",
  ]);
});

test("counts every heading level when de-duplicating ids", () => {
  const source = ["### Pros", "## Pros", "### Use Cases", "## Use Cases", "## Pros"].join("\n");
  const expected = rehypeIds([
    ["h3", [text("Pros")]],
    ["h2", [text("Pros")]],
    ["h3", [text("Use Cases")]],
    ["h2", [text("Use Cases")]],
    ["h2", [text("Pros")]],
  ]).filter((_, i) => i !== 0 && i !== 2);
  assert.deepEqual(ids(source), ["pros-1", "use-cases-1", "pros-2"]);
  assert.deepEqual(ids(source), expected);
});

test("ignores headings inside fenced and indented code", () => {
  const source = [
    "## Before",
    "```bash",
    "## not a heading",
    "```",
    "~~~",
    "## also not",
    "~~~",
    "    ## indented code",
    "## After",
  ].join("\n");
  assert.deepEqual(ids(source), ["before", "after"]);
});

test("handles Windows line endings and lines that only look like headings", () => {
  const source = "## One\r\n##Two\r\n#hashtag\r\n## Three\r\n";
  assert.deepEqual(ids(source), ["one", "three"]);
});
