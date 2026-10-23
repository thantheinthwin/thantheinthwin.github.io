import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPostDate } from "./date.ts";

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
