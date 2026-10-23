// gray-matter turns an unquoted YAML date (date: 2026-10-30) into a Date.
// Keep every post date a "YYYY-MM-DD"-style string, so it renders the same
// in <time dateTime> on the server and the client.
export function toPostDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : new Date().toISOString();
}

// Post dates are "YYYY-MM-DD" strings, which Date parses as UTC midnight.
// Formatting in UTC keeps the same calendar day for every reader and on both
// sides of hydration; local time would show the previous day west of UTC.
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
