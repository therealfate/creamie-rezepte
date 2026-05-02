import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { RecipeCard } from "@/components/RecipeCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllRecipes } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  const recipes = getAllRecipes();
  const featured = recipes.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-berry-50">
        <Container>
          <div className="py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-4">
                Das Rezept-Magazin für Ninja Creami & Swirl
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6">
                Cremiges Eis,{" "}
                <span className="text-berry-600">in Echtzeit getestet.</span>
              </h1>
              <p className="text-lg text-[var(--muted)] mb-8 max-w-xl leading-relaxed">
                Über 200 Rezepte für die Ninja Creami und das neue Swirl-Modell.
                Proteineis, Sorbet, Frozen Yogurt – alle persönlich zubereitet,
                fotografiert und mit Konsistenz-Notizen versehen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/rezepte" className="btn-primary">
                  Alle Rezepte ansehen <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/newsletter" className="btn-secondary">
                  5 Gratis-Rezepte (PDF)
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-[var(--muted)]">
                <div>
                  <p className="font-display font-semibold text-2xl text-fg">
                    {recipes.length}+
                  </p>
                  <p>getestete Rezepte</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-2xl text-fg">
                    20
                  </p>
                  <p>Themen-Cluster</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-2xl text-fg">
                    100%
                  </p>
                  <p>persönlich getestet</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-berry-100 via-cream-200 to-cream-300 -rotate-3 shadow-xl" />
              <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&h=900&fit=crop"
                  alt="Cremige Eiscreme in Schälchen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-2">
                Frisch aus der Küche
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">
                Aktuelle Rezepte
              </h2>
            </div>
            <Link
              href="/rezepte"
              className="text-sm font-medium hover:text-berry-600 transition hidden sm:flex items-center gap-1"
            >
              Alle ansehen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="text-[var(--muted)]">
              Bald gibt es hier die ersten Rezepte. Trag dich in den Newsletter
              ein, dann verpasst du nichts.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CLUSTERS */}
      <section className="py-16 sm:py-24 bg-cream-100">
        <Container>
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-2">
              Themen-Welten
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
              Was möchtest du heute löffeln?
            </h2>
            <p className="text-[var(--muted)] text-lg">
              Stöbere nach Diät, nach Geschmack oder nach Anlass – jeder Cluster
              ist eine eigene kleine Welt mit Pillar-Guide und Detail-Rezepten.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Proteineis", slug: "proteineis", emoji: "💪", count: "12 Rezepte" },
              { name: "Ninja Creami", slug: "ninja-creami", emoji: "🍦", count: "15 Rezepte" },
              { name: "Ninja Swirl", slug: "ninja-swirl", emoji: "🌀", count: "10 Rezepte" },
              { name: "Frozen Yogurt", slug: "frozen-yogurt", emoji: "🍓", count: "8 Rezepte" },
              { name: "Sorbet", slug: "sorbet", emoji: "🥭", count: "8 Rezepte" },
              { name: "Low Carb / Keto", slug: "low-carb", emoji: "🥥", count: "8 Rezepte" },
              { name: "Vegan", slug: "vegan", emoji: "🌱", count: "8 Rezepte" },
              { name: "Für Kinder", slug: "kinder", emoji: "👶", count: "6 Rezepte" },
            ].map((cluster) => (
              <Link
                key={cluster.slug}
                href={`/cluster/${cluster.slug}`}
                className="bg-white p-6 rounded-2xl border hover:border-berry-300 hover:shadow-md transition group"
              >
                <p className="text-3xl mb-3">{cluster.emoji}</p>
                <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-berry-600 transition">
                  {cluster.name}
                </h3>
                <p className="text-xs text-[var(--muted)]">{cluster.count}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <NewsletterForm />
        </Container>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <Container size="narrow" className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
            Hi, ich bin {siteConfig.author.name.split(" ")[0]}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Warum es diese Seite gibt
          </h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
            Ich habe in den letzten zwei Jahren über 200 Eis-Rezepte mit der
            Ninja Creami getestet. Dabei ist mir aufgefallen: Die meisten
            Online-Rezepte funktionieren so nicht. Diese Seite ist die Sammlung
            der Versionen, die wirklich cremig werden – mit Konsistenz-Notizen,
            Fehler-Wahrnehmung und Verbesserungsschleifen.
          </p>
          <Link href="/ueber" className="btn-secondary">
            Mehr über mich <ChevronRight className="w-4 h-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
