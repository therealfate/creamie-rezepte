import { formatDuration } from "@/lib/utils";
import { Clock, Users, ChefHat, Star } from "lucide-react";

export function RecipeMeta({
  prepTime,
  totalTime,
  yields,
  category,
  rating,
}: {
  prepTime: string;
  totalTime: string;
  yields: string;
  category: string;
  rating?: { value: string; count: string };
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-6 bg-cream-100 rounded-2xl border border-cream-200">
      <div>
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
          <Clock className="w-3.5 h-3.5" /> Aktive Zeit
        </div>
        <p className="font-display font-semibold">{formatDuration(prepTime)}</p>
      </div>
      <div>
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
          <Clock className="w-3.5 h-3.5" /> Gesamt
        </div>
        <p className="font-display font-semibold">{formatDuration(totalTime)}</p>
      </div>
      <div>
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
          <Users className="w-3.5 h-3.5" /> Portionen
        </div>
        <p className="font-display font-semibold">{yields}</p>
      </div>
      <div>
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
          {rating ? <Star className="w-3.5 h-3.5" /> : <ChefHat className="w-3.5 h-3.5" />}
          {rating ? "Bewertung" : "Kategorie"}
        </div>
        <p className="font-display font-semibold">
          {rating ? `${rating.value} (${rating.count})` : category}
        </p>
      </div>
    </div>
  );
}
