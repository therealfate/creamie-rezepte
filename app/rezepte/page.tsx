import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Alle Rezepte für die Ninja Creami & Swirl",
  description:
    "Stöbere durch alle getesteten Rezepte für die Ninja Creami und Ninja Swirl: Proteineis, Sorbet, Frozen Yogurt, vegan, low carb und mehr.",
};

export default function RezeptePage() {
  const recipes = getAllRecipes();

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
          Rezept-Übersicht
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
          Alle Rezepte
        </h1>
        <p className="text-lg text-[var(--muted)]">
          {recipes.length} getestete Rezepte für Ninja Creami und Ninja Swirl –
          mit Konsistenz-Notizen, Bewertungen und persönlichen Tipps.
        </p>
      </div>

      {recipes.length === 0 ? (
        <p className="text-[var(--muted)]">Bald geht es los.</p>
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
