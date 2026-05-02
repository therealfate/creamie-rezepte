"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd/Ctrl + K für Suche
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="border-b bg-[var(--bg)] sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/85">
        <Container>
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cream-300 to-berry-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
                C
              </div>
              <span className="font-display font-semibold text-lg tracking-tight hidden sm:inline">
                {siteConfig.brandName}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              <Link href="/rezepte" className="hover:text-berry-600 transition">
                Rezepte
              </Link>
              <Link
                href="/cluster/proteineis"
                className="hover:text-berry-600 transition"
              >
                Proteineis
              </Link>
              <Link
                href="/cluster/ninja-creami"
                className="hover:text-berry-600 transition"
              >
                Ninja Creami
              </Link>
              <Link
                href="/cluster/ninja-swirl"
                className="hover:text-berry-600 transition"
              >
                Ninja Swirl
              </Link>
              <Link href="/ueber" className="hover:text-berry-600 transition">
                Über
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Suche öffnen"
                className="w-10 h-10 sm:w-auto sm:px-3 sm:h-10 flex items-center gap-2 rounded-lg hover:bg-cream-100 transition border border-transparent sm:border-cream-200"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-xs text-[var(--muted)] font-medium">
                  Suchen
                </span>
                <kbd className="hidden md:inline-block ml-1 text-[10px] bg-cream-100 px-1.5 py-0.5 rounded font-mono text-[var(--muted)]">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/newsletter"
                className="hidden sm:inline-flex btn-primary text-sm"
              >
                Gratis-Rezepte
              </Link>

              <MobileMenu onSearchClick={() => setSearchOpen(true)} />
            </div>
          </div>
        </Container>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
