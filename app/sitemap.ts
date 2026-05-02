import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const recipes = getAllRecipes();
  const url = siteConfig.url;
  const now = new Date();

  return [
    { url: `${url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${url}/rezepte`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${url}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/ueber`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...recipes.map((r) => ({
      url: `${url}/rezepte/${r.slug}`,
      lastModified: new Date(r.updatedAt ?? r.publishedAt),
      changeFrequency: "monthly" as const,
      priority: r.type === "pillar" ? 0.9 : 0.7,
    })),
  ];
}
