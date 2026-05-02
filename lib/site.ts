export const siteConfig = {
  name: "creamie-rezepte.de",
  brandName: "Creamie Rezepte",
  description:
    "Das deutsche Rezept-Magazin für die Ninja Creami und Ninja Swirl. Über 200 getestete Eis-, Sorbet- und Frozen-Yogurt-Rezepte – authentisch, erprobt, mit Liebe gemacht.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.creamie-rezepte.de",
  author: {
    name: "Sönke Berger",
    email: "info@soenkeberger.de",
    bio: "Ich teste seit 2024 Eismaschinen, schreibe über Cremigkeit, Konsistenz und das perfekte Mundgefühl. Diese Seite ist meine Sammlung aller getesteten Ninja Creami und Swirl Rezepte.",
  },
  social: {
    instagram: "https://instagram.com/creamie.rezepte",
    pinterest: "https://pinterest.de/creamie.rezepte",
    youtube: "https://youtube.com/@creamie-rezepte",
  },
  legal: {
    affiliateDisclaimer:
      "Diese Seite ist nicht mit Ninja oder SharkNinja Operating LLC verbunden oder von ihnen autorisiert. Mit * markierte Links sind Affiliate-Links: Wenn du darüber kaufst, bekomme ich eine kleine Provision – für dich bleibt der Preis gleich.",
  },
};

export type SiteConfig = typeof siteConfig;
