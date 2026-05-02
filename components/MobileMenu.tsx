"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/rezepte", label: "Alle Rezepte" },
  { href: "/cluster/proteineis", label: "Proteineis" },
  { href: "/cluster/ninja-creami", label: "Ninja Creami" },
  { href: "/cluster/ninja-swirl", label: "Ninja Swirl" },
  { href: "/cluster/sorbet", label: "Sorbet" },
  { href: "/cluster/frozen-yogurt", label: "Frozen Yogurt" },
  { href: "/cluster/vegan", label: "Veganes Eis" },
  { href: "/cluster/low-carb", label: "Low Carb" },
  { href: "/cluster/kinder", label: "Für Kinder" },
];

const SECONDARY_ITEMS = [
  { href: "/wissen", label: "Wissen" },
  { href: "/test", label: "Geräte-Tests" },
  { href: "/ueber", label: "Über mich" },
  { href: "/newsletter", label: "Newsletter" },
];

export function MobileMenu({
  onSearchClick,
}: {
  onSearchClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  // Body Scroll Lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Esc-Taste
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-cream-100 transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hauptmenü"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-display font-semibold text-lg">
                {siteConfig.brandName}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search-Trigger */}
            {onSearchClick && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSearchClick();
                }}
                className="mx-4 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border bg-cream-50 text-[var(--muted)] hover:bg-cream-100 transition text-sm"
              >
                <Search className="w-4 h-4" />
                Rezepte durchsuchen…
              </button>
            )}

            {/* Primary Nav */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-bold mb-2">
                Rezepte
              </p>
              <ul className="mb-6">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-cream-100 transition font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-bold mb-2">
                Mehr
              </p>
              <ul>
                {SECONDARY_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-cream-100 transition text-sm text-[var(--muted)] hover:text-[var(--fg)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Footer */}
            <div className="p-4 border-t">
              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Gratis-PDF holen
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
