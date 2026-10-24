import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSeries } from "./series.ts";

const part = (seriesPart, extra = {}) => ({
  series: "Securing Forged",
  seriesPart,
  seriesTotal: 3,
  ...extra,
});

test("reports the series name, part and total", () => {
  assert.deepEqual(buildSeries(part(2)), { name: "Securing Forged", part: 2, total: 3 });
});

test("trims the series name", () => {
  assert.equal(buildSeries(part(1, { series: "  Securing Forged " })).name, "Securing Forged");
});

test("renders no line for invalid series frontmatter", () => {
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
    assert.equal(buildSeries(part(1, fields)), null, JSON.stringify(fields));
  }
  assert.equal(buildSeries({}), null);
});
