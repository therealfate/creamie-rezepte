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

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/rezepte" className="btn-primary">
          Zu allen Rezepten
        </Link>
        <Link href="/" className="btn-secondary">
          Zur Startseite
        </Link>
      </div>
    </Container>
  );
}
