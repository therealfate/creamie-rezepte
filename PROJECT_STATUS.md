# creamie-rezepte.de — Projekt-Status & Handoff

> Stand: 02.05.2026 · Übergabe an Claude Code zur Weiterentwicklung

Dieses Dokument ist die einzige Wahrheit über den aktuellen Stand des Projekts. Wer hier reinkommt (Claude Code, neuer Mensch, du selbst in 6 Monaten), versteht in 10 Minuten, was steht, was fehlt, was Priorität hat.

---

## 1. Architektur-Übersicht

### Tech-Stack (live)

- **Framework:** Next.js 15 (App Router) auf Node 22
- **Sprache:** TypeScript strict
- **Styling:** Tailwind CSS v4 (CSS-first via `@theme` in `globals.css`, keine `tailwind.config.js`)
- **Content:** MDX-Files in `content/recipes/`, geparst über `gray-matter`
- **Schema:** JSON-LD (Recipe, BreadcrumbList) im `<head>` jeder Recipe-Page
- **Hosting:** Vercel (Region default; siehe TODO „Vercel Region Frankfurt")
- **DNS:** Cloudflare (proxied)
- **Newsletter:** Brevo (DOI-Endpoint vorbereitet, ENV-Vars müssen gesetzt werden)
- **Analytics:** Plausible (vorbereitet, noch nicht eingebaut)

### Projekt-Struktur

```
.
├── app/
│   ├── api/
│   │   ├── newsletter/route.ts     # Brevo Double-Opt-In
│   │   └── search/route.ts         # Server-Side Suche
│   ├── cluster/[slug]/page.tsx     # 8 Themen-Cluster
│   ├── rezepte/
│   │   ├── page.tsx                # Übersicht aller Rezepte
│   │   └── [slug]/page.tsx         # Single-Recipe (mit Breadcrumbs, IceMode, Related)
│   ├── newsletter/
│   │   ├── page.tsx                # Lead-Magnet Landing
│   │   └── danke/page.tsx          # Post-DOI Confirmation
│   ├── ueber/page.tsx              # Author-Page
│   ├── impressum/page.tsx          # Pflicht (echte Daten)
│   ├── datenschutz/page.tsx        # Pflicht (DSGVO-konform)
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css                 # Tailwind v4 + Brand-Tokens
│   ├── layout.tsx
│   └── page.tsx                    # Homepage
├── components/
│   ├── Header.tsx                  # Mit Suche + MobileMenu (Client)
│   ├── Footer.tsx                  # Mit Trademark-Disclaimer
│   ├── Container.tsx
│   ├── MobileMenu.tsx              # Drawer für mobile
│   ├── SearchOverlay.tsx           # Cmd-K-Style Suche
│   ├── Breadcrumbs.tsx             # mit JSON-LD
│   ├── RecipeCard.tsx
│   ├── RecipeMeta.tsx
│   ├── RecipeSchema.tsx            # JSON-LD Recipe Schema
│   ├── PortionConverter.tsx        # Modell + Portionen
│   ├── IceMode.tsx                 # Vollbild Schritt-Modus + Timer
│   ├── RelatedRecipes.tsx
│   ├── AffiliateBox.tsx
│   ├── AuthorBox.tsx
│   ├── NewsletterForm.tsx          # Mit DSGVO-Consent + DOI
│   └── CookieBanner.tsx            # Vorbereitet, deaktiviert
├── content/
│   └── recipes/                    # 16 MDX-Files (Pillars + Spokes)
├── lib/
│   ├── site.ts                     # SiteConfig (Domain, Author, Legal)
│   ├── recipes.ts                  # MDX-Loader
│   ├── portions.ts                 # Modell-Skalierung
│   └── utils.ts
└── public/
    └── (Favicon-Assets fehlen — siehe TODO)
```

### Datenfluss

1. **Build:** Next.js liest alle `.mdx`-Files aus `content/recipes/`
2. **`generateStaticParams()`** generiert eine statische Seite pro Slug
3. **`generateMetadata()`** baut OG-Tags + Canonicals
4. **`RecipeSchema`** baut JSON-LD aus dem Frontmatter
5. **`PortionConverter`** und **`IceMode`** sind Client-Components, die Frontmatter-Daten zur Laufzeit umrechnen
6. **`/api/search`** läuft serverside (force-static + revalidate 3600), liest Recipes aus dem Filesystem

### Brand-Tokens (Tailwind v4 in `globals.css`)

```css
--color-cream-50  bis --color-cream-900   /* warm-beige Skala */
--color-berry-50  bis --color-berry-700   /* berry-rot Akzent */
--font-sans     = Inter
--font-display  = Fraunces (für Headings)
```

Nutzung im Code: `bg-cream-100`, `text-berry-500`, `font-display`. CSS-Variablen sind verfügbar für Custom-Werte.

---

## 2. Was steht (Stand 02.05.2026)

### Fertige Features

- [x] **Homepage** mit Hero, Featured-Rezepte, Cluster-Grid, Newsletter-CTA, Über-Teaser
- [x] **Recipe-Detail-Page** mit Hero-Bild, Meta-Box, Schema-Validierung
- [x] **Cluster-Pages** für 8 Themen (Proteineis, Ninja Creami, Swirl, Frozen Yogurt, Sorbet, Low Carb, Vegan, Kinder)
- [x] **Übersichts-Page** `/rezepte` mit allen Recipes
- [x] **Mobile-Menu** mit Hamburger + Drawer (sliding in von rechts)
- [x] **Suche** (Cmd+K oder `/`-Taste), Server-Side Endpoint, Result-Modal
- [x] **Breadcrumbs** mit BreadcrumbList JSON-LD Schema
- [x] **Related Recipes** (3 verwandte Artikel am Recipe-Footer)
- [x] **PortionConverter** (Original/Deluxe/Swirl + Portionen)
- [x] **IceMode** (Vollbild-Cooking-Modus, Wake Lock, Timer, Vibration)
- [x] **Newsletter-Form** mit DSGVO-Consent-Checkbox + DOI-Hinweis
- [x] **Newsletter API** (`/api/newsletter`) mit Brevo Double-Opt-In Endpoint
- [x] **/newsletter/danke** Confirmation-Seite
- [x] **Recipe-Schema (JSON-LD)** auf jeder Recipe-Page (Recipe.org)
- [x] **Sitemap.xml** automatisch generiert
- [x] **Robots.txt** mit Sitemap-Hinweis
- [x] **OG-Tags** + Twitter Cards in Metadata
- [x] **Impressum** (echte Daten Sönke Berger / Pastorenstraße 11 / Uelzen)
- [x] **Datenschutzerklärung** (DSGVO-konform, alle eingesetzten Tools dokumentiert)
- [x] **Markenrechtlicher Hinweis** im Footer + Impressum (Ninja Creami® Disclaimer)
- [x] **Affiliate-Disclaimer** im Footer und in Impressum
- [x] **CookieBanner** (vorbereitet, kann aktiviert werden wenn Affiliate-Cookies kommen)
- [x] **404-Page** mit eleganten Links
- [x] **GitHub Repo + Vercel Deploy** läuft

### Content-Inventar

- 6 Pillar-Artikel:
  - `proteineis-komplett-guide` (Hub Proteineis)
  - `ninja-creami-rezepte-25-eissorten` (Hub Ninja Creami)
  - `ninja-creami-tipps` (Hub Tipps)
  - `ninja-creami-zu-hart` (Hub Probleme)
  - `wie-funktioniert-ninja-creami` (Hub Wissen)
  - `ninja-swirl-rezepte` (Hub Swirl)
  - `frozen-yogurt-selber-machen` (Hub Frozen Yogurt)
  - `sorbet-selber-machen` (Hub Sorbet)
- 7 Spoke-Artikel:
  - `proteineis-magerquark`
  - `proteineis-schokolade`
  - `ninja-creami-vanilleeis`
  - `ninja-creami-schokoladeneis`
  - `ninja-creami-salted-caramel-eis`
  - `ninja-creami-erdbeereis`
  - `mango-sorbet-rezept`

**Gesamt: 15 Rezepte**, davon 8 Pillars (Hubs).

---

## 3. Was fehlt — priorisiert

Reihenfolge: **🔴 Showstopper** → **🟡 Wichtig** → **🟢 Nice-to-have**.

### 🔴 Bevor irgendwer aktiv vermarktet (sofort)

#### F1. Markenrecht-Klärung (NICHT-CODE)
- DPMA-Suche (register.dpma.de) für „Creamie" und „Creami" als Wortmarke
- Anwaltliche Erstberatung (Spezialgebiet Markenrecht, ~80–200 €)
- Falls Risiko: Plan B Domain-Wechsel (z.B. `eis-werkstatt.de`)
- **Owner: Sönke Berger persönlich**, Code-Aufgabe nur falls Domain-Wechsel nötig

#### F2. Brevo-Setup live
- Brevo-Account anlegen, Liste erstellen, DOI-Template erstellen
- ENV-Variablen in Vercel setzen:
  - `BREVO_API_KEY`
  - `BREVO_LIST_ID`
  - `BREVO_TEMPLATE_ID`
  - `BREVO_REDIRECT_URL` = `https://www.creamie-rezepte.de/newsletter/danke`
- AV-Vertrag mit Brevo abschließen (Brevo Account → Privacy → Sign DPA)
- Test-Anmeldung mit eigener Mail durchführen
- **Owner: Sönke Berger**

#### F3. Favicon-Set + Manifest
- Favicons in `/public/`: `favicon.ico`, `icon.png` (32, 192, 512), `apple-icon.png` (180)
- Empfohlene Quelle: aus dem Logo ableiten (Cream-zu-Berry-Gradient mit „C")
- `app/manifest.ts` erstellen für PWA-Tauglichkeit
- **Owner: Claude Code**, mit Branding-Asset-Vorlage

#### F4. Echte OG-Default-Image
- `/public/og-default.jpg` (1200×630, Foto + Logo + Tagline) erstellen
- Alternative: `app/opengraph-image.tsx` (dynamic OG mit ImageResponse) — Recommended
- **Owner: Claude Code**

#### F5. Fiktive Bewertungen entfernen oder echte sammeln
Aktuell haben alle Rezepte ein hardgecodetes `rating: { value: "4.8", count: "23" }` im Frontmatter. Das ist **wettbewerbsrechtlich problematisch** (UWG § 5).
- **Variante a (sofort):** `rating` aus allen MDX-Frontmattern entfernen, bis echte User-Bewertungen kommen
- **Variante b (später):** Bewertungs-Widget mit localStorage einbauen, das echte Stars sammelt
- **Owner: Claude Code**

### 🟡 Wichtig (innerhalb 2 Wochen)

#### F6. Vercel Region Frankfurt
- Vercel Pro Plan ($20/Monat) für `fra1` Region-Pinning
- Daten bleiben in der EU → DSGVO Art. 44 entspannt
- **Owner: Sönke Berger** (Vercel-Account)

#### F7. Plausible Analytics aktivieren
- Plausible-Account anlegen (oder Self-host)
- Snippet in `app/layout.tsx` einbauen (cookieless, kein Banner nötig):
  ```tsx
  <script
    defer
    data-domain="creamie-rezepte.de"
    src="https://plausible.io/js/script.js"
  />
  ```
- Domain in `.env`: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- **Owner: Claude Code**

#### F8. Google Search Console + Sitemap einreichen
- Property hinzufügen: `https://www.creamie-rezepte.de`
- DNS-TXT-Record verifizieren
- Sitemap einreichen: `https://www.creamie-rezepte.de/sitemap.xml`
- **Owner: Sönke Berger**

#### F9. PDF-Lead-Magnet erstellen
- 8-seitiges PDF „Die 5 besten Ninja Creami Rezepte" generieren
- Empfehlung: Skill `pdf` nutzen, mit Brand-Layout
- Upload nach `/public/lead-magnet.pdf`
- Brevo-Welcome-Mail mit Link einrichten
- **Owner: Claude Code**, mit Sönkes Reviews

#### F10. Mehr Content (Roadmap KW 5–12)
Siehe `ROADMAP_8_MONATE.md`. Pro Woche 2 Artikel. Nächste 8 Artikel:
- `ninja-creami-deluxe-rezepte` (Pillar)
- `low-carb-eis-rezept` (Pillar)
- `veganes-eis-selber-machen` (Pillar)
- `eis-selber-machen-ohne-eismaschine` (Funnel-Pillar)
- `proteineis-vanille` (Spoke)
- `proteineis-erdbeere` (Spoke)
- `frozen-yogurt-erdbeer` (Spoke)
- `himbeer-sorbet-rezept` (Spoke)
- **Owner: Claude Code** (auf Briefing von Sönke)

#### F11. Pinterest-Integration
- Pinterest Business Account
- 5 Pin-Templates pro Rezept (Hochkant 1000×1500, Text-Overlay)
- Empfehlung: Skill für Image-Generation nutzen
- Pinterest-Save-Button auf Recipe-Pages
- **Owner: Claude Code**

#### F12. Author-Foto
- Echtes Foto von Sönke einbinden in `AuthorBox` und About-Page
- Speicherort: `/public/author/soenke.jpg`
- **Owner: Sönke Berger** (Foto liefern)

### 🟢 Nice-to-have (nächste 4–8 Wochen)

#### F13. Stripe-Checkout für Premium-PDF
- Premium-PDF (50 Rezepte) für 14,90 € verkaufen
- Stripe Checkout Embed
- Auslieferung via Resend (transactional Mail)
- **Owner: Claude Code**

#### F14. Comments via Giscus
- GitHub Discussions als Storage
- Privacy-friendly, kostenlos
- Einbau auf Recipe-Pages
- **Owner: Claude Code**

#### F15. Bookmarks / "Mein Rezeptbuch"
- localStorage-basiertes Bookmark-System
- Page `/mein-buch` mit gespeicherten Rezepten
- Save-Button auf RecipeCard und Recipe-Detail
- **Owner: Claude Code**

#### F16. Recipe-Rating Widget
- 5-Sterne-Bewertung über localStorage (1 Stimme pro Browser)
- Aggregate via API-Route (KV oder Edge Storage)
- AggregateRating-Schema dynamisch
- **Owner: Claude Code**

#### F17. Druck-Layout
- `@media print` Styles für Recipe-Pages
- Sauber druckbares Single-Page-Layout
- **Owner: Claude Code**

#### F18. Tag-System
- Frontmatter `tags: ["chocolate", "low-carb"]`
- Tag-Pages `/tag/[name]`
- Tag-Cloud auf About-Page
- **Owner: Claude Code**

#### F19. RSS-Feed
- `/feed.xml` mit allen Rezepten
- **Owner: Claude Code**

#### F20. PWA + Offline
- `manifest.json` (kommt mit F3 zusammen)
- Service Worker (Workbox via `next-pwa`)
- Recipe-Pages offline-fähig (für Kochen ohne Internet)
- **Owner: Claude Code**

#### F21. Sprachausgabe in IceMode
- Web Speech API Integration
- „Vorlesen"-Button pro Schritt
- **Owner: Claude Code**

#### F22. i18n Vorbereitung
- `next-intl` Setup
- Sprachen-Subroutes `/at/`, `/ch/`
- AT-Variante (Topfen statt Quark, andere Affiliate-Links)
- **Owner: Claude Code**, später (Phase 2)

---

## 4. Bekannte Quirks & Stolpersteine

### Build-Probleme historisch (Lessons Learned)

- **Next 15.1.0 hatte CVE** → auf `^15.4.0` gepatcht. Bei nächstem Update auf `latest` checken.
- **next-mdx-remote v6 hatte Probleme** mit JSX-Components in MDX (Array-Props wurden undefined). Aktuell nutzen wir die `/rsc`-Variante in v6 ohne MDX-eingebaute Custom-Components.
- **`@ts-expect-error`** ist in modernen TS-Versionen oft unnötig, weil APIs wie `navigator.vibrate` typisiert sind. Lieber Feature-Detection als Direktiven.
- **Tailwind v4** hat keine `tailwind.config.js` mehr. Tokens stehen via `@theme {}` direkt in `globals.css`.
- **Vercel Cache** kann veraltete Builds liefern. Bei Domain-Änderung in Code: einmal manuell „Redeploy" auslösen ohne Cache.

### Mocking während dev

- `BREVO_API_KEY` nicht gesetzt → Newsletter-Endpoint loggt nur, gibt 200 zurück. Erlaubt Tests ohne Brevo-Account.
- Plausible nicht eingebaut → kein Tracking (gewollt für lokales Dev).

### Tailwind v4 Caveat: Keine Klassen aus String-Templates

Wenn Klassen dynamisch im Code gebaut werden (z.B. `className={\`bg-${color}-500\`}`), erkennt Tailwind sie nicht. Lieber Conditional Strings: `className={active ? "bg-berry-500" : "bg-cream-200"}`.

---

## 5. Brand-Guidelines

### Tonalität

- **Persönlich**, „ich"-Form, nicht „wir-Agentur"
- **Ehrlich**, auch wenn Rezepte nicht funktionieren
- **Konkret**, mit Zahlen (24 h Frostzeit, 25 g Eiweiß, etc.)
- **Locker** ohne anbiedernd, deutsche Direktheit
- **Anti-Marketing-Sprech** („cremig wie aus der Eisdiele" ist OK; „revolutionäre Zubereitungs-Technologie" ist nicht OK)

### Visual

- **Photos**: appetit­anregend, wenig Schatten, Tageslicht-Look. Aktuell Unsplash, später eigene Fotos.
- **Farben**: Cream-Beige (warm) + Berry-Rot (Akzent). Keine schwarzen Flächen.
- **Typografie**: Fraunces für Headlines (warm-elegant), Inter für Body (klar-sauber).
- **Cards**: Rounded-2xl, dezenter Shadow, kein Glas-Effekt.

### Erlaubte und verbotene Begriffe

- ✓ „Ninja Creami" (Marken-Name korrekt geschrieben, mit `®` im Footer)
- ✓ „in der Ninja Creami zubereitet" (deskriptiv)
- ✓ „kompatibel mit Ninja Creami NC300EU"
- ✗ „Original Ninja Creami Rezepte" (suggeriert Hersteller-Verbindung)
- ✗ Logo-Imitation (Ninja-Schriftzug-Stil)

---

## 6. Deployment & Operations

### Repo

- GitHub: [github.com/therealfate/creamie-rezepte](https://github.com/therealfate/creamie-rezepte)
- Branch `main` ist die Produktion. Direkter Push triggert Vercel-Deploy.
- Branch-Protection ist aktuell **AUS** (kein Review-Zwang). Sobald 2+ Personen am Repo arbeiten, einschalten.

### Vercel

- Project: [vercel.com/therealfate/creamie-rezepte](https://vercel.com/therealfate/creamie-rezepte)
- Domain: `www.creamie-rezepte.de` (root und www)
- Build-Settings: Default (Next.js auto-detected)
- ENV-Variablen aktuell zu setzen:
  - `NEXT_PUBLIC_SITE_URL` = `https://www.creamie-rezepte.de`
  - `BREVO_API_KEY` (TODO)
  - `BREVO_LIST_ID` (TODO)
  - `BREVO_TEMPLATE_ID` (TODO)
  - `BREVO_REDIRECT_URL` = `https://www.creamie-rezepte.de/newsletter/danke` (TODO)

### Lokale Entwicklung

```bash
git clone https://github.com/therealfate/creamie-rezepte.git
cd creamie-rezepte
npm install
cp .env.example .env.local       # ENV-Vars eintragen
npm run dev
# http://localhost:3000
```

### Neues Rezept hinzufügen

1. Neue MDX-Datei in `content/recipes/<slug>.mdx`
2. Frontmatter komplett ausfüllen (siehe bestehende Rezepte als Vorlage)
3. **Rating-Felder leer lassen** (siehe F5)
4. Hero-Bild URL aus Unsplash (mit Credit + creditUrl)
5. Mindestens 1 Affiliate-Eintrag (Ninja-Maschine + Hauptzutat)
6. `git commit + push` → Vercel deployt automatisch in ~2 Min

### Recipe-Frontmatter-Spec

```yaml
---
title: "Titel mit Keyword"
slug: "url-friendly-slug"
description: "≤155 Zeichen für SERP"
cluster: "Cluster-Name"        # muss zu CLUSTER_MAP in app/cluster/[slug]/page.tsx passen
type: "pillar" | "spoke"
hero:
  src: "https://images.unsplash.com/..."
  alt: "Beschreibung"
  credit: "Unsplash"
  creditUrl: "https://unsplash.com"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"        # optional, für Re-Crawl-Signal an Google
prepTime: "PT5M"               # ISO 8601 Duration
cookTime: "PT24H"
totalTime: "PT24H5M"
yields: "4"                    # String mit Zahl (Portionen)
category: "Dessert"
cuisine: "International"
ingredients:
  - "500 g Magerquark"         # parsbar durch lib/portions.ts
  - "..."
instructions:
  - "Schritt 1 Text"
  - "..."
nutrition:                     # optional
  calories: "180 kcal"
  protein: "25 g"
affiliate:                     # optional, max 5 Items
  - name: "Produktname"
    url: "https://amazon.de/..."
    price: "ca. 25 €"
    description: "..."
related:                       # optional, slug-list für In-Text-Links
  - "anderer-slug"
---
```

---

## 7. Test-Checkliste vor Re-Deploy

Vor jedem nicht-trivialen Deploy folgende Punkte mental durchgehen:

- [ ] `npm run build` lokal grün?
- [ ] Lighthouse mobile > 90 (Performance, SEO, A11y)?
- [ ] Recipe-Schema validiert über [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Sitemap-URL korrekt: `https://www.creamie-rezepte.de/sitemap.xml`
- [ ] Newsletter-Form funktioniert (mit Test-Mail durchgehen)
- [ ] IceMode auf Handy: Wake Lock greift (Bildschirm bleibt an)
- [ ] PortionConverter: Modell-Wechsel persistiert in localStorage
- [ ] Suche findet bei Eingabe „protein" mindestens den Proteineis-Pillar
- [ ] Mobile-Menu öffnet/schließt sauber, kein Body-Scroll
- [ ] Footer-Disclaimer ist sichtbar, mit korrekten ®-Marken
- [ ] Impressum + Datenschutz erreichbar, mit echten Daten

---

## 8. Quick-Wins für den Anfang (für Claude Code)

Wenn du als Claude Code dieses Projekt übernimmst und Sönke fragt „was zuerst?", die Reihenfolge wäre:

1. **F5 Fiktive Bewertungen entfernen** (5 Min Risiko-Eliminierung)
2. **F3 Favicon-Set + Manifest** (15 Min Polish)
3. **F4 Dynamic OG-Image** (30 Min, riesig fürs Social-Sharing)
4. **F7 Plausible einbauen** (10 Min, dann sieht Sönke endlich Traffic)
5. **F9 Lead-Magnet PDF generieren** (1 h, dann läuft der Funnel)
6. **F10 Nächster Pillar-Artikel:** `ninja-creami-deluxe-rezepte` (60 Min)

Mit diesen 6 Tasks ist die Site nach 3 Stunden „verkaufsfertig" für die ersten echten Besucher.

---

## 9. Kontakt

- **Projekt-Owner:** Sönke Berger · info@soenkeberger.de
- **Tech-Repo:** github.com/therealfate/creamie-rezepte
- **Live-Site:** https://www.creamie-rezepte.de
- **Strategie-Dokument:** `STRATEGIE.docx` (separater Ordner)
- **Roadmap:** `ROADMAP_8_MONATE.md` (im Repo)

Wenn etwas unklar ist, README + dieses Dokument sind die ersten Anlaufstellen. Code ist kommentiert wo nicht selbsterklärend. Fragen direkt an Sönke.

— Letzte Aktualisierung: 02.05.2026
