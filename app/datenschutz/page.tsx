import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf creamie-rezepte.de gemäß DSGVO und BDSG.",
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-semibold mb-2">
        Datenschutzerklärung
      </h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        Stand: 02.05.2026
      </p>

      <div className="prose-recipe">
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          Sönke Berger
          <br />
          Pastorenstraße 11
          <br />
          29525 Uelzen
          <br />
          Telefon: <a href="tel:+491744301668">0174 4301668</a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
        </p>

        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung dieser Website sowie unserer Inhalte und Leistungen
          erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
          Einwilligung der Nutzer (Art. 6 Abs. 1 lit. a DSGVO), zur Erfüllung
          eines Vertrages (Art. 6 Abs. 1 lit. b DSGVO), aufgrund einer
          rechtlichen Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO) oder bei
          überwiegendem berechtigten Interesse (Art. 6 Abs. 1 lit. f DSGVO).
        </p>

        <h2>3. Hosting (Vercel)</h2>
        <p>
          Diese Website wird gehostet bei Vercel Inc., 340 S Lemon Ave #4133,
          Walnut, CA 91789, USA. Beim Aufruf der Website werden technisch
          notwendige Daten (z.B. IP-Adresse, Datum und Uhrzeit des Aufrufs,
          aufgerufene Seiten, User-Agent) verarbeitet, um die Auslieferung der
          Inhalte zu ermöglichen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der technischen Bereitstellung).
        </p>
        <p>
          Vercel kann Daten in die USA übertragen. Die Übermittlung erfolgt auf
          Basis der EU-Standardvertragsklauseln nach Art. 46 DSGVO. Vercel hat
          sich zudem dem EU-US Data Privacy Framework angeschlossen.
          Datenschutzerklärung von Vercel:{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com/legal/privacy-policy
          </a>
        </p>

        <h2>4. Content Delivery Network (Cloudflare)</h2>
        <p>
          Wir nutzen Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
          USA, als CDN, um Ladezeiten zu verbessern und vor Angriffen zu
          schützen. Dabei werden technische Verbindungsdaten (IP-Adresse,
          User-Agent) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          Übermittlung in die USA erfolgt auf Basis von
          EU-Standardvertragsklauseln. Datenschutzerklärung:{" "}
          <a
            href="https://www.cloudflare.com/de-de/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            cloudflare.com/de-de/privacypolicy
          </a>
        </p>

        <h2>5. Server-Logfiles</h2>
        <p>
          Bei jedem Aufruf erhebt unser Hosting-Anbieter automatisch Daten und
          Informationen, die in den Server-Logfiles gespeichert werden. Dies
          sind:
        </p>
        <ul>
          <li>IP-Adresse (anonymisiert nach 24 Stunden)</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>Aufgerufene URL</li>
          <li>HTTP-Statuscode</li>
          <li>User-Agent (Browser, Betriebssystem)</li>
          <li>Referrer-URL</li>
        </ul>
        <p>
          Diese Daten werden nicht mit anderen personenbezogenen Daten
          zusammengeführt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Die
          Speicherdauer beträgt maximal 14 Tage.
        </p>

        <h2>6. Newsletter (Brevo)</h2>
        <p>
          Wenn Sie sich für unseren Newsletter anmelden, verwenden wir die dafür
          erforderlichen oder gesondert von Ihnen mitgeteilten Daten, um Ihnen
          regelmäßig per E-Mail unseren Newsletter zuzusenden. Anmeldung erfolgt
          im Double-Opt-In-Verfahren: nach Eintragung Ihrer E-Mail-Adresse
          erhalten Sie eine Bestätigungs-E-Mail. Erst durch Klick auf den darin
          enthaltenen Link wird Ihre Adresse in den Newsletter-Verteiler
          aufgenommen.
        </p>
        <p>
          Versanddienstleister ist Sendinblue GmbH (Brevo), Köpenicker Straße
          126, 10179 Berlin, Deutschland. Mit Brevo besteht ein
          Auftragsverarbeitungsvertrag. Brevo speichert Ihre Daten DSGVO-konform
          auf europäischen Servern.
        </p>
        <p>
          Wir erfassen außerdem die IP-Adresse zum Zeitpunkt der Anmeldung sowie
          den Zeitpunkt der Anmeldung und Bestätigung, um den Anmeldevorgang
          dokumentieren zu können. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO
          (Einwilligung). Sie können den Newsletter jederzeit kündigen, indem
          Sie auf den Abmeldelink in jeder E-Mail klicken oder eine kurze
          Nachricht an{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>{" "}
          schicken.
        </p>
        <p>
          Datenschutzerklärung von Brevo:{" "}
          <a
            href="https://www.brevo.com/de/legal/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            brevo.com/de/legal/privacypolicy
          </a>
        </p>

        <h2>7. Analyse mit Plausible (cookielos)</h2>
        <p>
          Wir nutzen Plausible Analytics von Plausible Insights OÜ, Västriku tn
          2, 50403 Tartu, Estland. Plausible erfasst statistisch
          Seitenaufrufe ohne Setzen von Cookies und ohne IP-Speicherung. Es
          werden keine personenbezogenen Daten erhoben oder an Dritte
          weitergegeben. Eine Identifikation einzelner Nutzer ist nicht
          möglich.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          aggregierter Reichweitenanalyse). Datenschutzerklärung:{" "}
          <a
            href="https://plausible.io/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            plausible.io/privacy
          </a>
        </p>

        <h2>8. Affiliate-Programme</h2>
        <p>
          Wir nehmen am Amazon-PartnerNet-Programm teil, einem
          Werbeprogramm-Konzept, das mittels Werbemittel und Verlinkungen zu
          Amazon.de Werbekostenerstattungen ermöglicht (Amazon Europe Core
          S.à.r.l., 38 avenue John F. Kennedy, L-1855 Luxembourg).
        </p>
        <p>
          Beim Klick auf einen Affiliate-Link wird Ihr Browser zur Website von
          Amazon umgeleitet. Dabei werden technische Daten (IP-Adresse,
          User-Agent, Referrer) an Amazon übertragen. Amazon setzt eigene Cookies
          zur Tracking-Identifikation. Datenschutzerklärung von Amazon:{" "}
          <a
            href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010"
            target="_blank"
            rel="noopener noreferrer"
          >
            amazon.de/datenschutz
          </a>
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch
          aktiven Klick auf Affiliate-Link).
        </p>

        <h2>9. Eingebettete Bilder (Unsplash)</h2>
        <p>
          Diese Website lädt einige Bilder über das Content Delivery Network
          von Unsplash Inc., 401 Bay Street, 16th Floor, Toronto, Ontario, M5H
          2Y4, Kanada. Beim Laden eines Bildes wird Ihre IP-Adresse an Unsplash
          übermittelt. Wir haben keinen Einfluss auf die Datenverarbeitung durch
          Unsplash. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an performanten Bildauslieferung). Datenschutzerklärung:{" "}
          <a
            href="https://unsplash.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            unsplash.com/privacy
          </a>
        </p>

        <h2>10. Cookies</h2>
        <p>
          Diese Website setzt aktuell <strong>keine</strong> Tracking- oder
          Marketing-Cookies. Es werden lediglich technisch notwendige Cookies
          eingesetzt (z.B. zur Aufrechterhaltung der Session bei
          Newsletter-Anmeldung). Diese sind nach § 25 Abs. 2 Nr. 2 TTDSG ohne
          Einwilligung zulässig.
        </p>
        <p>
          Sollten in Zukunft weitere Cookies eingesetzt werden (z.B. durch
          Affiliate-Klicks oder Stripe-Checkout), informieren wir Sie über einen
          Cookie-Banner und holen Ihre Einwilligung ein, bevor entsprechende
          Cookies gesetzt werden.
        </p>

        <h2>11. Ihre Rechte</h2>
        <p>
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
          betreffenden personenbezogenen Daten:
        </p>
        <ul>
          <li>
            <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO) – Sie können
            Auskunft darüber verlangen, welche Daten wir über Sie speichern.
          </li>
          <li>
            <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO) – Sie können
            unrichtige Daten korrigieren lassen.
          </li>
          <li>
            <strong>Recht auf Löschung</strong> (Art. 17 DSGVO) – Sie können die
            Löschung Ihrer Daten verlangen, sofern keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </li>
          <li>
            <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18
            DSGVO).
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO).
          </li>
          <li>
            <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO) – Sie können der
            Verarbeitung Ihrer Daten widersprechen.
          </li>
          <li>
            <strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) –
            erteilte Einwilligungen können Sie jederzeit für die Zukunft
            widerrufen.
          </li>
          <li>
            <strong>Beschwerderecht</strong> bei einer Aufsichtsbehörde (Art. 77
            DSGVO). Zuständig für Niedersachsen ist die Landesbeauftragte für
            den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover.
          </li>
        </ul>

        <h2>12. Datensicherheit</h2>
        <p>
          Wir nutzen ausschließlich verschlüsselte Verbindungen (HTTPS/TLS) zum
          Schutz vor unbefugtem Zugriff. Dies ist an dem Schloss-Symbol in der
          Adresszeile Ihres Browsers erkennbar.
        </p>

        <h2>13. Aktualität und Änderung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand vom
          02.05.2026. Durch die Weiterentwicklung der Website oder aufgrund
          geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig
          werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle
          Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen
          werden.
        </p>

        <h2>14. Kontakt</h2>
        <p>
          Bei Fragen zum Datenschutz wenden Sie sich an:{" "}
          <a href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
        </p>
      </div>
    </Container>
  );
}
