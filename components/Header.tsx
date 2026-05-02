import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b bg-[var(--bg)] sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/85">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cream-300 to-berry-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
              C
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">
              {siteConfig.brandName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link href="/rezepte" className="hover:text-berry-600 transition">
              Rezepte
            </Link>
            <Link href="/cluster/proteineis" className="hover:text-berry-600 transition">
              Proteineis
            </Link>
            <Link href="/wissen" className="hover:text-berry-600 transition">
              Wissen
            </Link>
            <Link href="/test" className="hover:text-berry-600 transition">
              Tests
            </Link>
            <Link href="/ueber" className="hover:text-berry-600 transition">
              Über
            </Link>
          </nav>

          <Link
            href="/newsletter"
            className="btn-primary text-sm hidden sm:inline-flex"
          >
            Gratis-Rezepte
          </Link>
        </div>
      </Container>
    </header>
  );
}
