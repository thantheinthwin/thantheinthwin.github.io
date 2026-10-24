// A post's contents list, collected from the real MDX compile: the same
// serialize() call MDXRemote makes, with the page's plugins, plus one rehype
// step at the end that reads the h2s rehype-slug has given ids. No "@/"
// imports, so node:test can load it (see toc.test.mjs).
import { serialize } from "next-mdx-remote/serialize";
import type { Element, Nodes, Root } from "hast";
import type { PostMdxOptions } from "./mdx-options.ts";

export interface TocHeading {
  id: string;
  text: string;
}

// A post shows its contents (rail or bar) only with at least this many h2s.
export const MIN_TOC_HEADINGS = 3;

// Same rule as hast-util-to-string, which rehype-slug slugs.
function toText(node: Nodes): string {
  if ("children" in node) return node.children.map((child) => toText(child as Nodes)).join("");
  return "value" in node && typeof node.value === "string" ? node.value : "";
}

function collectH2s(node: Nodes, out: TocHeading[]) {
  if (node.type === "element" && node.tagName === "h2") {
    const id = (node as Element).properties?.id;
    if (typeof id === "string" && id !== "") out.push({ id, text: toText(node).replace(/[ \t\r\n]+/g, " ").trim() });
    return;
  }
  if ("children" in node) for (const child of node.children) collectH2s(child as Nodes, out);
}

export async function extractHeadings(source: string, mdxOptions: PostMdxOptions): Promise<TocHeading[]> {
  const headings: TocHeading[] = [];
  const collect = () => (tree: Root) => {
    collectH2s(tree, headings);
  };
  await serialize(source, {
    mdxOptions: { ...mdxOptions, rehypePlugins: [...(mdxOptions.rehypePlugins ?? []), collect] },
  });
  return headings;
}
