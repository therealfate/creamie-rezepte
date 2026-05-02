import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Impressum",
  description:
    "Impressum und Pflichtangaben gemäß § 5 TMG für creamie-rezepte.de.",
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-semibold mb-2">Impressum</h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        Rechtliche Informationen und Pflichtangaben
      </p>

      <div className="prose-recipe">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Sönke Berger
          <br />
          Pastorenstraße 11
          <br />
          29525 Uelzen
          <br />
          Niedersachsen, Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+491744301668">0174 4301668</a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Sönke Berger
          <br />
          Pastorenstraße 11
          <br />
          29525 Uelzen
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Markenrechtlicher Hinweis</h2>
        <p>
          <strong>Ninja®</strong>, <strong>Ninja Creami®</strong>,{" "}
          <strong>Ninja Swirl®</strong> sowie weitere Produktbezeichnungen sind
          eingetragene Marken bzw. Markenrechte der SharkNinja Operating LLC,
          USA. Die Verwendung dieser Marken auf creamie-rezepte.de erfolgt
          ausschließlich deskriptiv im Sinne des § 23 MarkenG, um die
          Kompatibilität von Rezepten und Anleitungen mit den jeweiligen Geräten
          zu beschreiben.
        </p>
        <p>
          Diese Website ist <strong>nicht</strong> mit der SharkNinja Operating
          LLC verbunden, von ihr autorisiert, gesponsert oder anderweitig
          unterstützt. „Creamie Rezepte" ist eine eigenständige Marke des
          Betreibers Sönke Berger und steht in keinerlei rechtlicher oder
          wirtschaftlicher Verbindung zu SharkNinja.
        </p>
        <p>
          Sollten Sie als Markeninhaber Bedenken hinsichtlich einer hier
          erfolgten Markenverwendung haben, kontaktieren Sie uns gerne unter{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
          . Wir werden umgehend reagieren und gegebenenfalls Anpassungen
          vornehmen.
        </p>

        <h2>Affiliate-Hinweis</h2>
        <p>
          Auf dieser Website werden Affiliate-Links eingesetzt – insbesondere im
          Rahmen des Amazon-PartnerNet-Programms. Mit einem Sternchen (*) oder
          dem Hinweis „Werbung" gekennzeichnete Links sind Affiliate-Links.
          Klickt ein Nutzer auf einen solchen Link und erwirbt im verlinkten
          Shop ein Produkt, erhält der Betreiber dieser Seite eine geringe
          Provision. Für die Nutzer entstehen dadurch keine Mehrkosten.
        </p>
        <p>
          Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Die
          Auswahl der empfohlenen Produkte erfolgt unabhängig von der jeweiligen
          Provisionshöhe und basiert auf eigener Praxiserfahrung.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werde ich diese Inhalte
          umgehend entfernen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werde ich derartige Links
          umgehend entfernen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde
          ich derartige Inhalte umgehend entfernen.
        </p>

        <h2>Bildnachweise</h2>
        <p>
          Auf creamie-rezepte.de werden teilweise Bilder unter der Unsplash
          Lizenz (
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            unsplash.com/license
          </a>
          ) verwendet. Diese Bilder sind kostenlos für kommerzielle und
          nicht-kommerzielle Zwecke nutzbar. Eine Quellenangabe erfolgt jeweils
          direkt am Bild.
        </p>
      </div>
    </Container>
  );
}
