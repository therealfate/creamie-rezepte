import { getAllRecipes } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const recipes = getAllRecipes().slice(0, 50);
  const baseUrl = siteConfig.url;

  const items = recipes
    .map((recipe) => {
      const url = `${baseUrl}/rezepte/${recipe.slug}`;
      const pubDate = new Date(recipe.publishedAt).toUTCString();
      const description = recipe.description
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const title = recipe.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${recipe.cluster}</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.brandName}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
