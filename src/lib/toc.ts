// Pure helper for a post's contents list. Its only import is github-slugger,
// so node:test can load this file directly (see toc.test.mjs).
import GithubSlugger from "github-slugger";

export interface TocHeading {
  id: string;
  text: string;
}

// A post shows its contents (rail or bar) only with at least this many h2s.
export const MIN_TOC_HEADINGS = 3;

const FENCE = /^(`{3,}|~{3,})/;
const ATX = /^(#{1,6})[ \t]+(.*)$/;

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
};

// Markdown inline syntax in non-code text, reduced to the text a reader sees.
function stripInline(value: string): string {
  // hold escaped characters aside so the emphasis rules below leave them alone
  const escaped: string[] = [];
  let text = value.replace(/\\([\\`*_{}[\]()#+\-.!~|<>])/g, (_, ch: string) => {
    escaped.push(ch);
    return `\u0000${escaped.length - 1}\u0000`;
  });
  text = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images have no text in the heading
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // inline links
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1") // reference links
    .replace(/<\/?[A-Za-z][^>]*>/g, "") // inline HTML / JSX tags
    .replace(/\*\*|~~|\*/g, "")
    .replace(/(^|[^\p{L}\p{N}])_+|_+(?=[^\p{L}\p{N}]|$)/gu, "$1") // _emphasis_, not snake_case
    .replace(/&[a-z]+;|&#\d+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity);
  return text.replace(/\u0000(\d+)\u0000/g, (_, i: string) => escaped[Number(i)]);
}

// The plain text of an ATX heading's content: code spans kept verbatim,
// everything else stripped of markdown.
export function headingText(raw: string): string {
  const content = raw.replace(/[ \t]+#+[ \t]*$/, "").replace(/^#+[ \t]*$/, "");
  let out = "";
  let last = 0;
  for (const match of content.matchAll(/(`+)([\s\S]*?[^`])\1(?!`)/g)) {
    out += stripInline(content.slice(last, match.index));
    out += match[2].replace(/^ (.*) $/, "$1");
    last = match.index + match[0].length;
  }
  out += stripInline(content.slice(last));
  return out.replace(/\s+/g, " ").trim();
}

// The h2s of an MDX source, with the ids rehype-slug gives them. rehype-slug
// runs one slugger over every heading in document order, so headings of all
// levels are slugged (for the -1, -2 suffixes) and only the h2s are returned.
// Lines inside fenced code blocks are not headings.
export function extractHeadings(source: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  let fence: string | null = null;

  for (const rawLine of source.split(/\r?\n/)) {
    // up to 3 spaces of indent are allowed before a heading or a fence
    const indent = rawLine.match(/^ {0,3}/)![0].length;
    const line = rawLine.slice(indent).trimEnd();
    if (rawLine.startsWith("    ") && !fence) continue; // indented code

    const fenceMatch = line.match(FENCE);
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length && line.slice(fenceMatch[1].length).trim() === "") {
        fence = null;
      }
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }

    const heading = line.match(ATX);
    if (!heading) continue;
    const text = headingText(heading[2]);
    if (text === "") continue;
    const id = slugger.slug(text);
    if (heading[1].length === 2) headings.push({ id, text });
  }

  return headings;
}
