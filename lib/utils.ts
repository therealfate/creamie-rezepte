export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(iso: string): string {
  // Simple ISO 8601 duration formatter, e.g. PT5M -> "5 Minuten", PT24H -> "24 Stunden"
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const [, h, m] = match;
  const parts: string[] = [];
  if (h) parts.push(`${h} ${parseInt(h) === 1 ? "Stunde" : "Stunden"}`);
  if (m) parts.push(`${m} ${parseInt(m) === 1 ? "Minute" : "Minuten"}`);
  return parts.join(" ") || iso;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
