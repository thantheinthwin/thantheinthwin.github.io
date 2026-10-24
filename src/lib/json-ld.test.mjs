import { test } from "node:test";
import assert from "node:assert/strict";
import { serializeJsonLd } from "./json-ld.ts";

test("escapes every < so the JSON can't close its script tag", () => {
  const data = { headline: "I Broke My Cache by Using <a> tag", body: "</script><script>alert(1)</script>" };
  const json = serializeJsonLd(data);
  assert.equal(json.includes("<"), false);
  assert.ok(json.includes(String.raw`\u003ca>`));
});

test("still parses back to the same data", () => {
  const data = { headline: "a < b <a>", nested: { list: ["<", "x"] } };
  assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
});
