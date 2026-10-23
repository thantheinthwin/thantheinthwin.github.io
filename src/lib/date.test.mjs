import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPostDate, toPostDate } from "./date.ts";

test("keeps a quoted frontmatter date as written", () => {
  assert.equal(toPostDate("2026-10-17"), "2026-10-17");
});

test("turns an unquoted frontmatter date into a YYYY-MM-DD string", () => {
  assert.equal(toPostDate(new Date("2026-10-30T00:00:00Z")), "2026-10-30");
});

test("formats a post date as a long US date", () => {
  assert.equal(formatPostDate("2026-10-17"), "October 17, 2026");
});

test("keeps the calendar day in time zones west of UTC", () => {
  const original = process.env.TZ;
  process.env.TZ = "America/Los_Angeles";
  try {
    assert.equal(formatPostDate("2026-10-17"), "October 17, 2026");
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});
