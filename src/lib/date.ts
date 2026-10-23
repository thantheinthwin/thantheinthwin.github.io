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
