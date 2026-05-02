import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-semibold mb-8">Impressum</h1>
      <div className="prose-recipe">
        <p>
          <strong>Angaben gemäß § 5 TMG</strong>
        </p>
        <p>
          {siteConfig.author.name}
          <br />
          [Straße, Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          Deutschland
        </p>

        <p>
          <strong>Kontakt</strong>
          <br />
          E-Mail: {siteConfig.author.email}
        </p>

        <p>
          <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong>
          <br />
          {siteConfig.author.name}, Adresse wie oben.
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Seite werden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch
          keine Gewähr übernommen werden.
        </p>

        <h2>Markenhinweis</h2>
        <p>
          Ninja®, Ninja Creami® und Ninja Swirl® sind eingetragene Marken der
          SharkNinja Operating LLC. Diese Website ist nicht mit SharkNinja
          verbunden, von ihnen autorisiert oder gesponsert. Markenverwendung
          erfolgt rein deskriptiv.
        </p>

        <h2>Affiliate-Hinweis</h2>
        <p>{siteConfig.legal.affiliateDisclaimer}</p>
      </div>
    </Container>
  );
}
