"use client";

import { useState } from "react";

export function NewsletterForm({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email, consent: true }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={onSubmit} className="space-y-3 max-w-md">
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="flex-1 px-4 py-2.5 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-berry-500"
          />
          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className="btn-primary text-sm whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "..." : "PDF holen"}
          </button>
        </div>
        <label className="flex items-start gap-2 text-xs text-[var(--muted)]">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span>
            Ich stimme zu, den Newsletter zu erhalten und der Verarbeitung meiner
            E-Mail-Adresse gemäß{" "}
            <a href="/datenschutz" className="underline">
              Datenschutzerklärung
            </a>
            . Du erhältst eine Bestätigungs-Mail (Double-Opt-In).
          </span>
        </label>
      </form>
    );
  }

  return (
    <div className="my-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-cream-200 via-cream-100 to-berry-50 border border-cream-300">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-wider text-berry-600 font-semibold mb-2">
          Gratis-Geschenk
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
          Die 5 besten Ninja Creami Rezepte als PDF
        </h3>
        <p className="text-[var(--muted)] mb-6">
          Trage deine E-Mail ein und ich schicke dir mein meistgekochtes
          Rezeptpaket – inklusive Cremigkeits-Spickzettel und meiner Lieblings-
          Mengen-Tabelle für die Ninja Creami.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="flex-1 px-4 py-3 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-berry-500"
            />
            <button
              type="submit"
              disabled={status === "loading" || !consent}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : "PDF kostenlos holen"}
            </button>
          </div>
          <label className="flex items-start gap-2 text-xs text-[var(--muted)] leading-relaxed">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 flex-shrink-0"
            />
            <span>
              Ich stimme zu, den Newsletter zu erhalten und der Verarbeitung
              meiner E-Mail-Adresse gemäß{" "}
              <a href="/datenschutz" className="underline">
                Datenschutzerklärung
              </a>
              . Du erhältst eine Bestätigungs-Mail (Double-Opt-In) und musst den
              dortigen Link anklicken, um die Anmeldung abzuschließen. Eine
              Abmeldung ist jederzeit über den Link in jeder Newsletter-Mail
              möglich.
            </span>
          </label>
        </form>
        {status === "ok" && (
          <p className="text-sm text-green-700 mt-4">
            ✓ Fast geschafft! Wir haben dir eine Bestätigungs-Mail geschickt.
            Klicke auf den Link in der Mail, um die Anmeldung abzuschließen
            (auch Spam-Ordner prüfen).
          </p>
        )}
        {status === "err" && (
          <p className="text-sm text-red-700 mt-4">
            Hm, etwas ist schiefgelaufen. Bitte später nochmal versuchen.
          </p>
        )}
      </div>
    </div>
  );
}
