import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Über mich – ${siteConfig.author.name}`,
  description: `Wer steckt hinter ${siteConfig.brandName}? Sönke Berger schreibt seit 2024 über Eismaschinen, Cremigkeit und das perfekte Mundgefühl.`,
};

export default function UeberPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
        Über
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-8">
        Hi, ich bin {siteConfig.author.name.split(" ")[0]}.
      </h1>

      <div className="prose-recipe">
        <p>
          Vor zwei Jahren stand bei uns zuhause plötzlich eine Ninja Creami auf
          der Küchentheke – Geschenk meiner Schwester, »weil du immer Eis am
          Stiel kaufst«. Was als Spielerei begann, ist mittlerweile ein
          ausgewachsenes Hobby geworden: Über 200 Rezepte sind durch die
          Maschine gewandert, dreimal so viele wieder verworfen worden.
        </p>

        <p>
          Was mich an den meisten Online-Rezepten gestört hat: Sie funktionieren
          oft schlicht nicht. Mengenangaben, die zu krümeligem Eis führen.
          Spinning-Zeiten, die nie genannt werden. Fettanteile, die fürs
          Mundgefühl entscheidend sind, aber im Rezept fehlen. Diese Seite
          versucht das anders zu machen.
        </p>

        <h2>Was diese Seite anders macht</h2>
        <ul>
          <li>
            <strong>Jedes Rezept persönlich getestet.</strong> Mit Datum,
            Spinning-Zeit, Konsistenz-Bewertung und Anpassungs-Notizen, falls
            etwas nicht funktioniert hat.
          </li>
          <li>
            <strong>Ehrliche Affiliate-Links.</strong> Mit * markiert. Kaufst du
            darüber, bekomme ich eine kleine Provision – für dich bleibt der
            Preis gleich. Empfohlen wird nur, was wirklich genutzt wird.
          </li>
          <li>
            <strong>Updates statt Vergessen.</strong> Wenn ich ein Rezept
            verbessere, sehe das auch im Datum oben. Keine Lock-in-Inhalte aus
            2022, die als »aktuell« vermarktet werden.
          </li>
          <li>
            <strong>Kommentar-Sektion ist offen.</strong> Wenn was nicht klappt,
            schreib's drunter – ich antworte normalerweise innerhalb 24h.
          </li>
        </ul>

        <h2>Meine Geräte (Stand 2026)</h2>
        <ul>
          <li>Ninja Creami NC300EU (seit Februar 2024 in Betrieb)</li>
          <li>Ninja Creami Deluxe NC500EU (seit November 2024 in Betrieb)</li>
          <li>Ninja Swirl (im Test seit März 2026)</li>
          <li>3× Pint-Behälter, 2× XL-Behälter, 1× Crosshatch-Klinge</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          {siteConfig.legal.affiliateDisclaimer}
        </p>

        <h2>Kontakt</h2>
        <p>
          Fragen, Rezeptwünsche, Korrekturhinweise gerne an{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
          . Ich lese alles selbst.
        </p>
      </div>
    </Container>
  );
}
