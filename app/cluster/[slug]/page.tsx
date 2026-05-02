import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { RecipeCard } from "@/components/RecipeCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllRecipes } from "@/lib/recipes";

const CLUSTER_MAP: Record<string, { name: string; description: string }> = {
  proteineis: {
    name: "Proteineis",
    description:
      "Cremiges Eis mit 20–35 g Eiweiß pro Portion – ideal nach dem Training oder als gesunder Nachtisch.",
  },
  "ninja-creami": {
    name: "Ninja Creami",
    description: "Klassische Eis-Rezepte für die Ninja Creami NC300EU.",
  },
  "ninja-swirl": {
    name: "Ninja Swirl",
    description:
      "Softeis-Rezepte für das neue Ninja Swirl Modell – ab Juni 2026.",
  },
  "frozen-yogurt": {
    name: "Frozen Yogurt",
    description: "Joghurt-Eis mit fruchtiger Frische und gesunden Macros.",
  },
  sorbet: {
    name: "Sorbet & Fruchteis",
    description: "Erfrischende Sorbets mit echten Früchten – meist vegan.",
  },
  "low-carb": {
    name: "Low Carb / Keto",
    description: "Eis mit unter 5 g Carbs pro Portion. Erythrit, Xylit & Co.",
  },
  vegan: {
    name: "Veganes Eis",
    description: "100 % pflanzlich – mit Hafer-, Soja- oder Kokosmilch.",
  },
  kinder: {
    name: "Eis für Kinder",
    description: "Familientaugliche Rezepte – wenig Zucker, viel Geschmack.",
  },
};

export function generateStaticParams() {
  return Object.keys(CLUSTER_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = CLUSTER_MAP[slug];
  if (!cluster) return {};
  return {
    title: `${cluster.name} – Rezepte für die Ninja Creami & Swirl`,
    description: cluster.description,
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cluster = CLUSTER_MAP[slug];
  if (!cluster) notFound();

  const allRecipes = getAllRecipes();
  // Map cluster slug -> recipe.cluster string for filter
  const clusterMatchKey = cluster.name;
  const recipes = allRecipes.filter((r) =>
    r.cluster.toLowerCase().includes(clusterMatchKey.toLowerCase())
  );

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
        Themen-Welt
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
        {cluster.name}
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-2xl mb-12">
        {cluster.description}
      </p>

      {recipes.length === 0 ? (
        <div className="bg-cream-100 border border-cream-200 rounded-2xl p-8 text-center">
          <p className="text-[var(--muted)] mb-4">
            Hier entstehen gerade die ersten Rezepte. Trage dich in den
            Newsletter ein, dann verpasst du nichts.
          </p>
          <NewsletterForm variant="inline" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </Container>
  );
}
