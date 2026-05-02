import { RecipeCard } from "./RecipeCard";
import { getAllRecipes, type Recipe } from "@/lib/recipes";

/**
 * RelatedRecipes – wählt 3 verwandte Rezepte basierend auf:
 *   1. Gleicher Cluster (höchste Priorität)
 *   2. Falls weniger als 3: andere Pillar-Artikel
 * Ohne das aktuelle Rezept selbst.
 */
export function RelatedRecipes({ current }: { current: Recipe }) {
  const all = getAllRecipes().filter((r) => r.slug !== current.slug);

  // Erst gleicher Cluster
  const sameCluster = all.filter((r) => r.cluster === current.cluster);
  // Dann Pillars aus anderen Clustern
  const otherPillars = all.filter(
    (r) => r.cluster !== current.cluster && r.type === "pillar"
  );

  const related = [...sameCluster, ...otherPillars].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="my-16 border-t pt-12">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-2">
        Das könnte dir auch schmecken
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-8">
        Verwandte Rezepte
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </section>
  );
}
