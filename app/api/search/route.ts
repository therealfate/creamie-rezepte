import { NextResponse } from "next/server";
import { getAllRecipes } from "@/lib/recipes";

/**
 * GET /api/search?q=...
 *
 * Einfacher Server-Side Search Endpoint.
 * Liefert Rezepte zurück, deren Titel, Description, Cluster oder
 * Zutaten den Query-String enthalten (case-insensitive, fuzzy-light).
 */

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();

  const recipes = getAllRecipes();

  if (!q) {
    // Bei leerer Suche: Pillars zuerst, danach Spokes (für initialen "leer Modus")
    const sorted = [
      ...recipes.filter((r) => r.type === "pillar"),
      ...recipes.filter((r) => r.type !== "pillar"),
    ].slice(0, 12);
    return NextResponse.json({
      query: q,
      results: sorted.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.description,
        cluster: r.cluster,
        type: r.type,
        hero: r.hero.src,
      })),
    });
  }

  const tokens = q.split(/\s+/).filter(Boolean);

  const matches = recipes
    .map((r) => {
      const haystack = [
        r.title,
        r.description,
        r.cluster,
        ...(r.ingredients ?? []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const t of tokens) {
        if (r.title.toLowerCase().includes(t)) score += 5;
        if (r.cluster.toLowerCase().includes(t)) score += 3;
        if (r.description.toLowerCase().includes(t)) score += 2;
        if (haystack.includes(t)) score += 1;
      }
      // Pillar-Boost
      if (r.type === "pillar") score += 1;
      return { recipe: r, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((m) => ({
      slug: m.recipe.slug,
      title: m.recipe.title,
      description: m.recipe.description,
      cluster: m.recipe.cluster,
      type: m.recipe.type,
      hero: m.recipe.hero.src,
    }));

  return NextResponse.json({ query: q, results: matches });
}
