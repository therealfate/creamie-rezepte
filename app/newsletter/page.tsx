import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Gratis: 5 beste Ninja Creami Rezepte als PDF",
  description:
    "Trage dich in den Newsletter ein und erhalte sofort die 5 meistgekochten Ninja Creami Rezepte als PDF – inklusive Cremigkeits-Spickzettel.",
};

export default function NewsletterPage() {
  return (
    <Container size="narrow" className="py-12 sm:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3 text-center">
        Gratis-Geschenk
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-6 text-center">
        5 Rezepte für deinen ersten cremigen Moment
      </h1>
      <p className="text-lg text-[var(--muted)] text-center max-w-2xl mx-auto mb-12 leading-relaxed">
        Über 200 Rezepte habe ich getestet. Diese fünf sind die, die ich am
        häufigsten mache. Trag deine E-Mail ein und du bekommst sie sofort als
        PDF.
      </p>

      <NewsletterForm />

      <div className="mt-16 prose-recipe mx-auto">
        <h2>Was du im PDF bekommst</h2>
        <ul>
          <li>
            <strong>Proteineis mit Magerquark</strong> – 25 g Eiweiß, 175 kcal,
            fertig in 5 Minuten
          </li>
          <li>
            <strong>Klassisches Vanilleeis</strong> – das Rezept, das jedes Mal
            funktioniert
          </li>
          <li>
            <strong>Schokoladeneis</strong> – mit echtem Kakao und Zartbitterschokolade,
            nicht aus dem Briefchen
          </li>
          <li>
            <strong>Erdbeereis</strong> – warum TK-Erdbeeren besser sind als frische
          </li>
          <li>
            <strong>Mango-Sorbet</strong> – vegan, 120 kcal, nur 5 Zutaten
          </li>
        </ul>

        <h2>Was kommt danach?</h2>
        <p>
          Etwa einmal im Monat schicke ich eine kurze E-Mail mit dem
          Rezept-Highlight des Monats und einem Tipp. Kein Spam, jederzeit
          abbestellbar mit einem Klick. Daten werden nach DSGVO bei Brevo
          (deutscher Server) gespeichert und nicht weitergegeben.
        </p>
      </div>
    </Container>
  );
}
