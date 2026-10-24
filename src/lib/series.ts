// Pure helper for the series line under a post's date ("Part 1 of 3 ·
// Securing Forged"). No runtime imports, so node:test can load this file
// directly (see series.test.mjs).

export interface SeriesFields {
  series?: unknown;
  seriesPart?: unknown;
  seriesTotal?: unknown;
}

export interface Series {
  name: string;
  part: number;
  total: number;
}

function isPartNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

// The post's place in its series. Returns null unless the post has a series
// name and a part between 1 and its total, so bad frontmatter renders no line.
export function buildSeries({ series, seriesPart, seriesTotal }: SeriesFields): Series | null {
  if (typeof series !== "string" || series.trim() === "") return null;
  if (!isPartNumber(seriesPart) || !isPartNumber(seriesTotal)) return null;
  if (seriesPart > seriesTotal) return null;
  return { name: series.trim(), part: seriesPart, total: seriesTotal };
}
