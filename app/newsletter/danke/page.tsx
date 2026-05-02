import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Anmeldung bestätigt – Newsletter",
  description: "Vielen Dank für die Bestätigung deiner Newsletter-Anmeldung.",
  robots: { index: false, follow: false },
};

export default function NewsletterDankePage() {
  return (
    <Container size="narrow" className="py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
        Anmeldung bestätigt
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-6">
        Geschafft – willkommen!
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
        Du erhältst gleich eine erste E-Mail mit den 5 besten Ninja Creami
        Rezepten als PDF. Falls sie nicht in 5 Minuten ankommt, schau bitte im
        Spam-Ordner nach oder schreib mir eine kurze Nachricht.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <a
          href="/lead-magnet.pdf"
          download="creamie-rezepte-5-beste-ninja-creami-rezepte.pdf"
          className="btn-primary"
        >
          PDF direkt herunterladen
        </a>
        <Link href="/rezepte" className="btn-secondary">
          Zu allen Rezepten
        </Link>
      </div>

      <p className="text-sm text-[var(--muted)]">
        Falls das PDF nicht startet: Rechtsklick → &quot;Speichern unter&quot;.
        Kommt auch per E-Mail – schau ggf. im Spam-Ordner.
      </p>
    </Container>
  );
}
