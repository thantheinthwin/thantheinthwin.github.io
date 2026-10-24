// JSON for a <script type="application/ld+json"> body. "<" is escaped as
// \u003c (still valid JSON) so post text like "<a>" or "</script>" can never
// close the script tag. Pure, so node:test can load it (see json-ld.test.mjs).
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
