"use client";

import { useState } from "react";

export function NewsletterForm({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
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
          disabled={status === "loading"}
          className="btn-primary text-sm whitespace-nowrap"
        >
          {status === "loading" ? "..." : "PDF holen"}
        </button>
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
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
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
            disabled={status === "loading"}
            className="btn-primary"
          >
            {status === "loading" ? "..." : "PDF kostenlos holen"}
          </button>
        </form>
        {status === "ok" && (
          <p className="text-sm text-green-700 mt-4">
            ✓ Geschafft! Schau in dein Postfach (auch Spam-Ordner).
          </p>
        )}
        {status === "err" && (
          <p className="text-sm text-red-700 mt-4">
            Hm, etwas ist schiefgelaufen. Bitte später nochmal versuchen.
          </p>
        )}
        <p className="text-xs text-[var(--muted)] mt-3">
          Kein Spam, jederzeit abbestellbar. Datenschutz wird ernst genommen.
        </p>
      </div>
    </div>
  );
}
