import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t mt-24 bg-cream-100">
      <Container>
        <div className="py-12 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cream-300 to-berry-500 flex items-center justify-center text-white font-display font-bold">
                C
              </div>
              <span className="font-display font-semibold">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-md">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 font-sans">Themen</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/cluster/proteineis" className="hover:text-fg">Proteineis</Link></li>
              <li><Link href="/cluster/ninja-creami" className="hover:text-fg">Ninja Creami</Link></li>
              <li><Link href="/cluster/ninja-swirl" className="hover:text-fg">Ninja Swirl</Link></li>
              <li><Link href="/cluster/sorbet" className="hover:text-fg">Sorbet</Link></li>
              <li><Link href="/cluster/vegan" className="hover:text-fg">Veganes Eis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 font-sans">Über</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/ueber" className="hover:text-fg">Über mich</Link></li>
              <li><Link href="/test" className="hover:text-fg">Geräte-Tests</Link></li>
              <li><Link href="/newsletter" className="hover:text-fg">Newsletter</Link></li>
              <li><Link href="/impressum" className="hover:text-fg">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-fg">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t py-6 text-xs text-[var(--muted)] space-y-3">
          <p>
            <strong>Markenrechtlicher Hinweis:</strong> Ninja®, Ninja Creami®
            und Ninja Swirl® sind eingetragene Marken der SharkNinja Operating
            LLC. creamie-rezepte.de ist nicht mit SharkNinja verbunden,
            autorisiert oder gesponsert. Markennennungen erfolgen rein
            deskriptiv (§ 23 MarkenG).
          </p>
          <p>{siteConfig.legal.affiliateDisclaimer}</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.author.name}. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </Container>
    </footer>
  );
}
