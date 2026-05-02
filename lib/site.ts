export const siteConfig = {
  name: "creami-rezepte.de",
  brandName: "Creami Rezepte",
  description:
    "Das deutsche Rezept-Magazin für die Ninja Creami und Ninja Swirl. Über 200 getestete Eis-, Sorbet- und Frozen-Yogurt-Rezepte – authentisch, erprobt, mit Liebe gemacht.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://creami-rezepte.de",
  author: {
    name: "Sönke Berger",
    email: "info@soenkeberger.de",
    bio: "Ich teste seit 2024 Eismaschinen, schreibe über Cremigkeit, Konsistenz und das perfekte Mundgefühl. Diese Seite ist meine Sammlung aller getesteten Ninja Creami und Swirl Rezepte.",
  },
  social: {
    instagram: "https://instagram.com/creami.rezepte",
    pinterest: "https://pinterest.de/creami.rezepte",
    youtube: "https://youtube.com/@creami-rezepte",
  },
  legal: {
    affiliateDisclaimer:
      "Diese Seite ist nicht mit Ninja oder SharkNinja Operating LLC verbunden oder von ihnen autorisiert. Mit * markierte Links sind Affiliate-Links: Wenn du darüber kaufst, bekomme ich eine kleine Provision – für dich bleibt der Preis gleich.",
  },
};

export type SiteConfig = typeof siteConfig;
