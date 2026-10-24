// The post page's MDX pipeline, shared with the contents helper (toc.ts) so
// the ids it collects come from the same compile that renders the post.
// No "@/" imports, so node:test can load it.
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { serialize } from "next-mdx-remote/serialize";

export type PostMdxOptions = NonNullable<NonNullable<Parameters<typeof serialize>[1]>["mdxOptions"]>;

export const postMdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, { theme: "github-dark-default", keepBackground: false }],
  ],
} satisfies PostMdxOptions;
