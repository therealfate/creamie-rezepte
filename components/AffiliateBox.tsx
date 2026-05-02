import { ExternalLink } from "lucide-react";

type Item = {
  name: string;
  url: string;
  price?: string;
  description?: string;
};

export function AffiliateBox({
  title = "Was du für dieses Rezept brauchst",
  items,
}: {
  title?: string;
  items?: Item[];
}) {
  const list = items ?? [];
  if (list.length === 0) return null;
  return (
    <aside className="my-10 p-6 bg-cream-100 border border-cream-200 rounded-2xl">
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs text-[var(--muted)] mb-4">
        Affiliate-Empfehlungen – getestet, ehrlich. Mit * markiert.
      </p>
      <ul className="space-y-3">
        {list.map((item, i) => (
          <li
            key={i}
            className="flex items-start justify-between gap-4 pb-3 border-b last:border-b-0"
          >
            <div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="font-medium text-sm hover:text-berry-600 inline-flex items-center gap-1.5"
              >
                {item.name}*
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {item.description && (
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            {item.price && (
              <span className="text-sm font-semibold text-cream-800 whitespace-nowrap">
                {item.price}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
