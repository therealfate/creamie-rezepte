import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
        404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
        Seite nicht gefunden
      </h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Diese Seite gibt es (noch) nicht. Vielleicht findest du, was du suchst,
        in der Rezept-Übersicht.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn-secondary">
          Zur Startseite
        </Link>
        <Link href="/rezepte" className="btn-primary">
          Alle Rezepte
        </Link>
      </div>
    </Container>
  );
}
