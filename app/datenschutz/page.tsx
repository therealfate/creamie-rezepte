import { Container } from "@/components/Container";

export const metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-semibold mb-8">Datenschutz</h1>
      <div className="prose-recipe">
        <p>
          <strong>Hinweis:</strong> Diese Datenschutzerklärung ist eine
          Ausgangsversion. Bitte vor Live-Gang von einem Datenschutz-Experten
          oder über{" "}
          <a href="https://datenschutz-generator.de" target="_blank" rel="noopener noreferrer">
            datenschutz-generator.de
          </a>{" "}
          finalisieren.
        </p>

        <h2>1. Allgemeines</h2>
        <p>
          Diese Website verarbeitet personenbezogene Daten ausschließlich nach
          den geltenden gesetzlichen Bestimmungen, insbesondere der DSGVO und
          dem BDSG.
        </p>

        <h2>2. Server-Logs</h2>
        <p>
          Diese Seite wird auf Vercel gehostet. Vercel speichert IP-Adressen und
          Zugriffszeiten temporär für 24 Stunden zur Sicherheit.
        </p>

        <h2>3. Newsletter</h2>
        <p>
          Wenn Sie sich für den Newsletter anmelden, wird Ihre E-Mail-Adresse
          bei Brevo (Sendinblue) gespeichert (Server in Deutschland/EU). Eine
          Abmeldung ist jederzeit möglich.
        </p>

        <h2>4. Analytics</h2>
        <p>
          Diese Seite nutzt Plausible Analytics (DSGVO-konform, ohne Cookies).
          Es werden anonymisierte Nutzungsdaten erfasst, keine
          personenbezogenen Daten.
        </p>

        <h2>5. Affiliate-Links</h2>
        <p>
          Beim Klick auf Amazon-Affiliate-Links wird Ihre Anfrage zu Amazon
          weitergeleitet. Amazon setzt eigene Cookies. Details in der
          Datenschutzerklärung von Amazon.
        </p>

        <h2>6. Rechte der Betroffenen</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung, Datenübertragbarkeit und Widerspruch. Anfragen an die
          im Impressum genannte E-Mail-Adresse.
        </p>
      </div>
    </Container>
  );
}
