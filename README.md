# creami-rezepte.de

Das deutsche Rezept-Magazin für die Ninja Creami und Ninja Swirl. Über 200 getestete Eis-, Sorbet- und Frozen-Yogurt-Rezepte – authentisch, erprobt, mit Liebe gemacht.

## Tech-Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-First, keine config-Datei)
- **Content**: MDX (in `content/recipes/`)
- **Schema**: JSON-LD Recipe-Schema für Rich Results
- **Hosting**: Vercel
- **Newsletter**: Brevo (Sendinblue)
- **Analytics**: Plausible (geplant)

## Lokal entwickeln

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deployment auf Vercel

### Erstes Deploy (5 Minuten)

1. **GitHub-Repo**: Lege ein neues, leeres Repo auf [github.com/new](https://github.com/new) an, z.B. `creami-rezepte`. Privat oder public, beides ok.
2. **Lokal pushen**: Im Repo-Ordner einmal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Next.js + MDX + erste 2 Pillar-Artikel"
   git branch -M main
   git remote add origin https://github.com/<dein-user>/creami-rezepte.git
   git push -u origin main
   ```
3. **Vercel verbinden**: Auf [vercel.com/new](https://vercel.com/new) das Repo importieren. Vercel erkennt Next.js automatisch.
4. **Environment Variables setzen** (im Vercel Dashboard → Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://creami-rezepte.de` (oder dein vercel-Subdomain)
   - `BREVO_API_KEY` = (sobald du Brevo hast, sonst leer lassen)
   - `BREVO_LIST_ID` = (Brevo Liste-ID)
5. **Deploy** drücken. Erstes Build dauert ~2 Minuten.

### Custom Domain anbinden

Sobald `creami-rezepte.de` registriert ist:

1. Im Vercel Dashboard → Domains → `creami-rezepte.de` hinzufügen.
2. Beim Registrar (INWX, IONOS etc.) den Cloudflare-Nameservern wechseln (oder direkt die Vercel-Werte als CNAME-A-Record eintragen):
   - Vercel zeigt dir die exakten DNS-Records.
3. SSL läuft automatisch (Let's Encrypt).
4. Im Code in `lib/site.ts` `siteConfig.url` auf die echte Domain anpassen.

## Neue Rezepte hinzufügen

Lege eine MDX-Datei unter `content/recipes/<slug>.mdx` an. Frontmatter-Schema siehe `lib/recipes.ts`. Beispiel:

```mdx
---
title: "Vanilleeis mit der Ninja Creami"
slug: "ninja-creami-vanilleeis"
description: "..."
cluster: "Ninja Creami"
type: "spoke"
hero:
  src: "https://images.unsplash.com/photo-XXX?w=1600&h=1000&fit=crop"
  alt: "..."
  credit: "Unsplash"
publishedAt: "2026-05-15"
prepTime: "PT5M"
cookTime: "PT24H"
totalTime: "PT24H5M"
yields: "4"
category: "Dessert"
cuisine: "International"
ingredients:
  - "500 ml Vollmilch"
  - "..."
instructions:
  - "..."
nutrition:
  calories: "245 kcal"
  protein: "5 g"
rating:
  value: "4.8"
  count: "12"
affiliate:
  - name: "Ninja Creami NC300EU"
    url: "https://www.amazon.de/dp/B09QMPB33P/"
    price: "ca. 199 €"
---

## Markdown-Inhalt hier...
```

Nach `git push` deployt Vercel automatisch.

## Projekt-Struktur

```
.
├── app/                    # Next.js App Router
│   ├── api/newsletter/     # Brevo Subscribe Endpoint
│   ├── cluster/[slug]/     # Themen-Welten (Proteineis, Sorbet, etc.)
│   ├── rezepte/            # Rezept-Hub + Detail-Seiten
│   ├── newsletter/         # Lead-Magnet Landing
│   ├── ueber/              # About
│   ├── impressum/          # Pflicht
│   ├── datenschutz/        # Pflicht
│   ├── layout.tsx
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
├── components/             # React Components (Header, Footer, RecipeCard, etc.)
├── content/recipes/        # Alle Rezepte als MDX
├── lib/                    # Helpers (recipes.ts, site.ts, utils.ts)
└── public/                 # Static Assets
```

## Roadmap & Strategie

Siehe Begleit-Dokumente:

- `STRATEGIE.docx` – Komplette SEO-Strategie (40+ Seiten)
- `KEYWORD_PLAN.xlsx` – 158 Keywords, 9 Sheets
- `ROADMAP_8_MONATE.md` – Wochenplan für die nächsten 8 Monate

## Lizenz

Privat. Inhalte sind urheberrechtlich geschützt.
