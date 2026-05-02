import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/lib/recipes";
import { formatDuration } from "@/lib/utils";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/rezepte/${recipe.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <Image
          src={recipe.hero.src}
          alt={recipe.hero.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {recipe.type === "pillar" && (
          <span className="absolute top-3 left-3 bg-berry-500 text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            Komplett-Guide
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-cream-700 font-semibold mb-2">
          {recipe.cluster}
        </p>
        <h3 className="font-display text-xl font-semibold leading-snug mb-2 group-hover:text-berry-600 transition">
          {recipe.title}
        </h3>
        <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4">
          {recipe.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
          <span>⏱ {formatDuration(recipe.totalTime)}</span>
          <span>🍦 {recipe.yields} Portionen</span>
          {recipe.rating && <span>★ {recipe.rating.value}</span>}
        </div>
      </div>
    </Link>
  );
}
