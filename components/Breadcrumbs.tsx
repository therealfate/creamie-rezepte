import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  // BreadcrumbList Schema (JSON-LD)
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && { item: `${siteConfig.url}${c.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Brotkrumen"
        className="text-xs text-[var(--muted)] mb-4 flex items-center flex-wrap gap-1"
      >
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-berry-600 transition">
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[var(--fg)] font-medium" : ""}>
                  {c.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3 h-3" />}
            </span>
          );
        })}
      </nav>
    </>
  );
}
