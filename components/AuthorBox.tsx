import { siteConfig } from "@/lib/site";

export function AuthorBox() {
  return (
    <div className="my-10 p-6 bg-white border rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cream-300 to-berry-500 flex-shrink-0 flex items-center justify-center text-white font-display font-semibold text-2xl">
        {siteConfig.author.name.charAt(0)}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-cream-700 font-semibold mb-1">
          Geschrieben von
        </p>
        <h4 className="font-display text-lg font-semibold mb-1">
          {siteConfig.author.name}
        </h4>
        <p className="text-sm text-[var(--muted)]">{siteConfig.author.bio}</p>
      </div>
    </div>
  );
}
