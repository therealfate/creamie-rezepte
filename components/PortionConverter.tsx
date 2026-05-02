"use client";

import { useMemo, useState } from "react";
import {
  MODELS,
  ModelKey,
  DEFAULT_MODEL,
  scaleIngredients,
  getScaleFactor,
} from "@/lib/portions";
import { Info, Minus, Plus } from "lucide-react";

type Props = {
  ingredients: string[];
  basePortions: number;
};

const STORAGE_KEY = "creamie:preferred-model";

export function PortionConverter({ ingredients, basePortions }: Props) {
  // Persistent Modellauswahl (User-Setting)
  const [model, setModel] = useState<ModelKey>(() => {
    if (typeof window === "undefined") return DEFAULT_MODEL;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && stored in MODELS) return stored as ModelKey;
    } catch {}
    return DEFAULT_MODEL;
  });
  const [portions, setPortions] = useState<number>(basePortions);

  function chooseModel(m: ModelKey) {
    setModel(m);
    try {
      window.localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }

  const factor = getScaleFactor(model, portions, basePortions);
  const scaled = useMemo(
    () => scaleIngredients(ingredients, factor),
    [ingredients, factor]
  );

  const info = MODELS[model];
  const isModified = model !== DEFAULT_MODEL || portions !== basePortions;

  return (
    <div className="my-8">
      {/* Model + Portion Selector */}
      <div className="bg-cream-100 border border-cream-200 rounded-2xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Modellauswahl */}
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2 block">
              Dein Ninja-Modell
            </label>
            <div className="grid grid-cols-3 gap-1 bg-white rounded-lg p-1 border border-cream-300">
              {(Object.keys(MODELS) as ModelKey[]).map((key) => {
                const m = MODELS[key];
                const active = model === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => chooseModel(key)}
                    className={
                      "px-3 py-2 rounded-md text-sm font-medium transition " +
                      (active
                        ? "bg-berry-500 text-white shadow-sm"
                        : "text-[var(--fg)] hover:bg-cream-100")
                    }
                  >
                    {m.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portionen-Stepper */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2 block">
              Portionen
            </label>
            <div className="flex items-center gap-1 bg-white rounded-lg border border-cream-300 p-1">
              <button
                type="button"
                onClick={() => setPortions((p) => Math.max(1, p - 1))}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-cream-100 transition"
                aria-label="Portionen verringern"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-display font-semibold tabular-nums">
                {portions}
              </span>
              <button
                type="button"
                onClick={() => setPortions((p) => Math.min(20, p + 1))}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-cream-100 transition"
                aria-label="Portionen erhöhen"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hinweis zum gewählten Modell */}
        <div className="mt-4 flex items-start gap-2 text-xs text-[var(--muted)]">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-[var(--fg)]">{info.name}</strong> –{" "}
            {info.note} Frostzeit: {info.freezeHours} h. Becher-Volumen{" "}
            {info.capacityMl} ml.
            {isModified && (
              <span className="ml-1">
                Skalierungsfaktor: ×{factor.toFixed(2)}.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Skalierte Zutatenliste */}
      <h2 className="font-display text-2xl font-semibold mb-4">
        Zutaten {isModified && <span className="text-sm font-normal text-[var(--muted)]">(angepasst)</span>}
      </h2>
      <ul className="space-y-2">
        {scaled.map((ing, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[1.0625rem] leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-berry-500 mt-2.5 flex-shrink-0" />
            <span>{ing}</span>
          </li>
        ))}
      </ul>

      {isModified && (
        <p className="text-xs text-[var(--muted)] mt-4 italic">
          Mengen automatisch umgerechnet. Bei größeren Bechern bitte die
          Mix-In-Linie nicht überfüllen – ggf. auf zwei Becher aufteilen.
        </p>
      )}
    </div>
  );
}
