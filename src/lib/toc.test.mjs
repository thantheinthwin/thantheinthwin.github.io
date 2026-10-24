import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { postMdxOptions } from "./mdx-options.ts";
import { extractHeadings } from "./toc.ts";

// The h2 ids in the HTML the post page actually renders: MDXRemote's own
// compile with the page's options, rendered by React. Independent of the
// collector in toc.ts, so a mismatch between the two fails here.
async function renderedH2Ids(source) {
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: postMdxOptions },
    components: { Callout: ({ children }) => createElement(Fragment, null, children) },
  });
  const html = renderToStaticMarkup(content);
  return {
    h2: [...html.matchAll(/<h2[^>]*\sid="([^"]+)"/g)].map((m) => m[1]),
    all: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  };
}

async function check(source, expectedIds) {
  const headings = await extractHeadings(source, postMdxOptions);
  const ids = headings.map((h) => h.id);
  assert.deepEqual(ids, (await renderedH2Ids(source)).h2, "matches the rendered page");
  if (expectedIds) assert.deepEqual(ids, expectedIds);
  return headings;
}

test("returns only the h2s, in order, with their text", async () => {
  const headings = await check("# Title\n\n## First\n\n### Detail\n\n## Second\n\n#### Deep\n\n## Third\n", [
    "first",
    "second",
    "third",
  ]);
  assert.deepEqual(headings.map((h) => h.text), ["First", "Second", "Third"]);
});

test("apostrophes, em-dashes and punctuation", async () => {
  await check(
    [
      "## From Writing Every Line to Knowing What's Right",
      "## Humans Are the Bottleneck — and That's the Point",
      "## The Shared Database: A Deliberate Trade-off",
      "## Composition + Interfaces = Go's Polymorphism",
    ].join("\n\n"),
    [
      "from-writing-every-line-to-knowing-whats-right",
      "humans-are-the-bottleneck--and-thats-the-point",
      "the-shared-database-a-deliberate-trade-off",
      "composition--interfaces--gos-polymorphism",
    ],
  );
});

test("inline code, emphasis and links reduce to their text", async () => {
  const headings = await check(
    "## Why `useEffect` Runs **Twice**\n\n## See [the [nested] docs](https://example.com) and ![img](/x.png)\n",
    ["why-useeffect-runs-twice", "see-the-nested-docs-and-"],
  );
  assert.equal(headings[0].text, "Why useEffect Runs Twice");
});

test("character references and JS expressions", async () => {
  await check("## Fast&nbsp;and &copy; Safe\n\n## Total {1 + 1} Count\n", undefined);
  const [entity, expression] = await extractHeadings(
    "## Fast&nbsp;and &copy; Safe\n\n## Total {1 + 1} Count\n",
    postMdxOptions,
  );
  assert.equal(entity.text, "Fast\u00a0and © Safe");
  // MDXRemote strips JS expressions (blockJS), so the heading loses it
  assert.equal(expression.text, "Total Count");
});

test("indented headings count (MDX has no indented code)", async () => {
  await check("    ## Indented\n\n## After\n", ["indented", "after"]);
});

test("headings in blockquotes and other levels shift the -1 suffixes", async () => {
  await check("> ## Pros\n\n### Pros\n\n## Pros\n\n## Pros\n", ["pros", "pros-2", "pros-3"]);
});

test("headings inside fenced code are not headings", async () => {
  await check("## Before\n\n```bash\n## not a heading\n```\n\n## After\n", ["before", "after"]);
});

test("every post's contents ids exist in its rendered page", async () => {
  const dir = join(process.cwd(), "content", "blogs");
  const slugs = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  assert.ok(slugs.length > 0);
  for (const slug of slugs) {
    const { content } = matter(readFileSync(join(dir, slug, "index.mdx"), "utf8"));
    const ids = (await extractHeadings(content, postMdxOptions)).map((h) => h.id);
    const rendered = await renderedH2Ids(content);
    for (const id of ids) assert.ok(rendered.all.has(id), `${slug}: #${id} is not in the page`);
    assert.deepEqual(ids, rendered.h2, slug);
  }
});
