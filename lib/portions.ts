/**
 * Portion- und Modell-Umrechnung für die Ninja Creami / Swirl Familie.
 *
 * Standard-Rezepte auf creamie-rezepte.de sind ausgelegt für den
 * Ninja Creami NC300EU (16-oz / 473 ml Pint).
 *
 * Bei Auswahl eines anderen Modells werden alle Mengen proportional skaliert.
 * Bei Änderung der Portionszahl werden alle Mengen ebenfalls skaliert.
 */

export type ModelKey = "creami-nc300" | "creami-deluxe-nc500" | "swirl";

export type ModelInfo = {
  key: ModelKey;
  name: string;
  short: string;
  capacityMl: number;
  freezeHours: number;
  note: string;
};

export const MODELS: Record<ModelKey, ModelInfo> = {
  "creami-nc300": {
    key: "creami-nc300",
    name: "Ninja Creami NC300EU",
    short: "Original",
    capacityMl: 473, // 16 oz Standard-Pint
    freezeHours: 24,
    note: "Original-Modell. Mengen wie im Rezept. Frostzeit min. 24 h.",
  },
  "creami-deluxe-nc500": {
    key: "creami-deluxe-nc500",
    name: "Ninja Creami Deluxe NC500EU",
    short: "Deluxe",
    capacityMl: 709, // 24 oz XL-Becher
    freezeHours: 24,
    note: "Deluxe mit XL-Becher. Mengen werden auf Faktor 1,5 hochskaliert.",
  },
  "swirl": {
    key: "swirl",
    name: "Ninja Swirl",
    short: "Swirl",
    capacityMl: 709, // 24 oz
    freezeHours: 18,
    note: "Swirl mit Soft-Serve-Funktion. Mengen wie Deluxe; Frostzeit reichen 18 h.",
  },
};

export const DEFAULT_MODEL: ModelKey = "creami-nc300";

export function modelScaleFactor(model: ModelKey): number {
  const base = MODELS[DEFAULT_MODEL].capacityMl;
  return MODELS[model].capacityMl / base;
}

/* -----------------------------------------------------------
 * Ingredient parsing & scaling
 * ----------------------------------------------------------- */

export type ParsedIngredient =
  | {
      kind: "scaled";
      original: string;
      amount: number;
      unit: string;
      rest: string;
      mode: "metric" | "spoon" | "count";
    }
  | { kind: "fixed"; original: string };

const METRIC_UNITS = new Set(["g", "kg", "ml", "l"]);
const SPOON_UNITS = new Set(["el", "tl", "msp", "esslöffel", "teelöffel"]);
const COUNT_NOUNS = [
  "Eigelb",
  "Eiweiß",
  "Eier",
  "Ei",
  "Banane",
  "Bananen",
  "Vanilleschote",
  "Vanilleschoten",
  "Stück",
  "Stk",
  "St",
  "Apfel",
  "Äpfel",
  "Zitrone",
  "Zitronen",
  "Limette",
  "Limetten",
  "Päckchen",
  "Tonkabohne",
];
const NON_SCALABLE = ["prise", "nach geschmack", "optional", "etwas"];

function parseFraction(s: string): number | null {
  // "3/4" → 0.75
  const m = s.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (m) return parseInt(m[1], 10) / parseInt(m[2], 10);
  return null;
}

function parseAmount(token: string): number | null {
  const cleaned = token.trim().replace(",", ".");
  const frac = parseFraction(cleaned);
  if (frac !== null) return frac;
  const n = parseFloat(cleaned);
  if (!Number.isNaN(n) && cleaned !== "") return n;
  return null;
}

export function parseIngredient(line: string): ParsedIngredient {
  const trimmed = line.trim();
  // Schnelle Skip-Liste: "1 Prise Salz", "Optional: …"
  if (NON_SCALABLE.some((s) => trimmed.toLowerCase().startsWith(s))) {
    return { kind: "fixed", original: line };
  }
  if (trimmed.toLowerCase().includes("nach geschmack")) {
    return { kind: "fixed", original: line };
  }

  // Mengen-Pattern: optional Zahl + optional Bruch + Unit + Rest
  // z.B. "500 g Magerquark", "1/2 TL Vanille", "1 EL Honig", "2 Eigelb"
  const re =
    /^(\d+(?:[,.]\d+)?(?:\s*\/\s*\d+)?)\s+([A-Za-zäöüÄÖÜß.]+)?\s*(.*)$/;
  const m = trimmed.match(re);
  if (!m) return { kind: "fixed", original: line };

  const amount = parseAmount(m[1]);
  if (amount === null) return { kind: "fixed", original: line };

  const unitRaw = (m[2] ?? "").replace(/\.$/, "").toLowerCase();
  const rest = (m[3] ?? "").trim();

  if (METRIC_UNITS.has(unitRaw)) {
    return {
      kind: "scaled",
      original: line,
      amount,
      unit: m[2]!,
      rest,
      mode: "metric",
    };
  }

  if (SPOON_UNITS.has(unitRaw)) {
    return {
      kind: "scaled",
      original: line,
      amount,
      unit: m[2]!,
      rest,
      mode: "spoon",
    };
  }

  // Wenn die "Unit" eigentlich ein Substantiv ist (Eigelb, Banane), als count behandeln
  if (m[2]) {
    const unitNoun = m[2];
    const isCount = COUNT_NOUNS.some(
      (n) => unitNoun.toLowerCase().startsWith(n.toLowerCase()) || rest.toLowerCase().startsWith(n.toLowerCase())
    );
    if (isCount) {
      return {
        kind: "scaled",
        original: line,
        amount,
        unit: m[2],
        rest,
        mode: "count",
      };
    }
  } else {
    // Reine Zahl ohne Einheit, z.B. "2 Eigelb" wenn das Wort als rest erkannt wird
    const isCount = COUNT_NOUNS.some((n) =>
      rest.toLowerCase().startsWith(n.toLowerCase())
    );
    if (isCount) {
      return {
        kind: "scaled",
        original: line,
        amount,
        unit: "",
        rest,
        mode: "count",
      };
    }
  }

  // Default: nicht skalieren, lieber Original behalten
  return { kind: "fixed", original: line };
}

/* -----------------------------------------------------------
 * Smart rounding
 * ----------------------------------------------------------- */

function roundMetric(n: number, unit: string): { value: number; unit: string } {
  // ml/g auf sinnvolle Schritte runden
  const u = unit.toLowerCase();
  if (u === "kg" && n < 1) {
    return { value: Math.round(n * 1000), unit: "g" };
  }
  if (u === "l" && n < 1) {
    return { value: Math.round(n * 1000), unit: "ml" };
  }
  let step = 1;
  if (n >= 50) step = 5;
  if (n >= 200) step = 10;
  if (n >= 500) step = 25;
  return { value: Math.round(n / step) * step, unit };
}

function roundSpoon(n: number): number {
  // EL/TL auf 0.5er Schritte
  const rounded = Math.round(n * 2) / 2;
  return rounded === 0 ? 0.5 : rounded;
}

function roundCount(n: number): number {
  return Math.max(1, Math.round(n));
}

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  // Für Brüche: 0.5 → ½, 0.25 → ¼, 0.75 → ¾
  const fractions: Record<string, string> = {
    "0.25": "¼",
    "0.5": "½",
    "0.75": "¾",
  };
  const intPart = Math.floor(n);
  const frac = n - intPart;
  const fracKey = frac.toFixed(2);
  if (fractions[fracKey]) {
    return intPart > 0 ? `${intPart} ${fractions[fracKey]}` : fractions[fracKey];
  }
  return n.toFixed(1).replace(".", ",");
}

export function scaleIngredient(
  parsed: ParsedIngredient,
  factor: number
): string {
  if (parsed.kind === "fixed") return parsed.original;

  const scaled = parsed.amount * factor;

  if (parsed.mode === "metric") {
    const r = roundMetric(scaled, parsed.unit);
    return `${formatNumber(r.value)} ${r.unit} ${parsed.rest}`.trim();
  }
  if (parsed.mode === "spoon") {
    const r = roundSpoon(scaled);
    return `${formatNumber(r)} ${parsed.unit} ${parsed.rest}`.trim();
  }
  if (parsed.mode === "count") {
    const r = roundCount(scaled);
    const unit = parsed.unit ? `${parsed.unit} ` : "";
    return `${r} ${unit}${parsed.rest}`.replace(/\s+/g, " ").trim();
  }
  return parsed.original;
}

/* -----------------------------------------------------------
 * Combined: scale a recipe for a different model + portions
 * ----------------------------------------------------------- */

export function getScaleFactor(
  model: ModelKey,
  portions: number,
  basePortions: number
): number {
  return modelScaleFactor(model) * (portions / basePortions);
}

export function scaleIngredients(
  ingredients: string[],
  factor: number
): string[] {
  return ingredients.map((line) => scaleIngredient(parseIngredient(line), factor));
}
