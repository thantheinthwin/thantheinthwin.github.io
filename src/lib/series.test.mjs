import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSeries } from "./series.ts";

const part = (slug, seriesPart, extra = {}) => ({
  slug,
  title: `Title of ${slug}`,
  series: "Securing Forged",
  seriesPart,
  seriesTotal: 3,
  ...extra,
});

test("links a published part by its title", () => {
  const current = part("one", 1);
  const series = buildSeries(current, [current, part("two", 2)]);
  assert.deepEqual(series.parts[1], {
    part: 2,
    status: "published",
    title: "Title of two",
    slug: "two",
  });
});

test("shows an unpublished part as coming soon", () => {
  const current = part("one", 1);
  const series = buildSeries(current, [current]);
  assert.deepEqual(series.parts, [
    { part: 1, status: "current", title: "Title of one" },
    { part: 2, status: "upcoming" },
    { part: 3, status: "upcoming" },
  ]);
});

test("marks the current part and reports its position", () => {
  const current = part("two", 2);
  const series = buildSeries(current, [part("three", 3), current, part("one", 1)]);
  assert.equal(series.name, "Securing Forged");
  assert.equal(series.part, 2);
  assert.equal(series.total, 3);
  assert.deepEqual(
    series.parts.map((p) => p.status),
    ["published", "current", "published"],
  );
  assert.deepEqual(series.parts[1], { part: 2, status: "current", title: "Title of two" });
});

test("only counts posts from the same series", () => {
  const current = part("one", 1);
  const series = buildSeries(current, [
    current,
    part("other-series", 2, { series: "Something Else" }),
    part("same-series-other-case", 3, { series: " securing forged " }),
  ]);
  assert.deepEqual(
    series.parts.map((p) => p.status),
    ["current", "upcoming", "published"],
  );
});

test("renders no card for invalid series frontmatter", () => {
  const invalid = [
    { series: undefined },
    { series: "" },
    { series: "   " },
    { series: 42 },
    { seriesPart: undefined },
    { seriesTotal: undefined },
    { seriesPart: 0 },
    { seriesPart: 4 },
    { seriesPart: 1.5 },
    { seriesPart: "1" },
    { seriesTotal: 0 },
    { seriesTotal: "3" },
  ];
  for (const fields of invalid) {
    const current = part("one", 1, fields);
    assert.equal(buildSeries(current, [current]), null, JSON.stringify(fields));
  }
  const noSeries = { slug: "plain", title: "Plain post" };
  assert.equal(buildSeries(noSeries, [noSeries]), null);
});
