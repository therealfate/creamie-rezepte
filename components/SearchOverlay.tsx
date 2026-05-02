"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";

type Result = {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  type?: "pillar" | "spoke";
  hero: string;
};

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fokus + initial fetch
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    fetchResults("");
  }, [open]);

  // Debounce-Suche
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      fetchResults(query);
    }, 200);
    return () => window.clearTimeout(id);
  }, [query, open]);

  // Esc + Body-Lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function fetchResults(q: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Suche"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search-Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-5 h-5 text-[var(--muted)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rezept, Zutat oder Cluster suchen…"
            className="flex-1 outline-none text-base bg-transparent"
          />
          {loading && (
            <Loader2 className="w-4 h-4 text-[var(--muted)] animate-spin" />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {!loading && results.length === 0 && (
            <div className="px-4 py-12 text-center text-[var(--muted)] text-sm">
              Keine Treffer für „{query}". Versuch ein anderes Wort.
            </div>
          )}

          {!query && results.length > 0 && (
            <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-bold">
              Beliebte Rezepte
            </p>
          )}

          <ul>
            {results.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/rezepte/${r.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cream-100 transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-cream-100 overflow-hidden flex-shrink-0 relative">
                    {r.hero && (
                      <Image
                        src={r.hero}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{r.title}</p>
                    <p className="text-xs text-[var(--muted)] truncate">
                      {r.cluster}
                      {r.type === "pillar" && (
                        <span className="ml-2 text-berry-600 font-semibold">
                          · Pillar
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tipps-Footer */}
        <div className="border-t px-4 py-2 text-[10px] text-[var(--muted)] flex justify-between">
          <span>
            <kbd className="px-1.5 py-0.5 bg-cream-100 rounded text-[9px] font-semibold">
              Esc
            </kbd>{" "}
            Schließen
          </span>
          <span>{results.length} Treffer</span>
        </div>
      </div>
    </div>
  );
}
