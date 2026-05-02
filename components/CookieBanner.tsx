"use client";

/**
 * CookieBanner – DSGVO/TTDSG-konformes Consent-Banner
 *
 * Status: AKTUELL DEAKTIVIERT.
 *
 * Hintergrund: Solange diese Seite nur cookielose Tools (Plausible) sowie
 * technisch notwendige Cookies einsetzt, ist nach § 25 Abs. 2 Nr. 2 TTDSG
 * KEIN Banner erforderlich.
 *
 * Aktivierung: Sobald folgende Tools dazukommen, dieses Banner in
 * `app/layout.tsx` einbauen:
 *   - Amazon Affiliate Klick-Cookies
 *   - Stripe Checkout (kann Cookies setzen)
 *   - YouTube-Embeds
 *   - Google Tag Manager / Analytics
 *
 * Aktivierung in app/layout.tsx:
 *   import { CookieBanner } from "@/components/CookieBanner";
 *   ...
 *   <body>
 *     ...
 *     <CookieBanner />
 *   </body>
 *
 * Der Banner speichert die Entscheidung im localStorage unter
 * "cookie-consent-v1" als JSON: { necessary: true, marketing: bool, ... }
 */

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-v1";

type Consent = {
  necessary: true;
  marketing: boolean;
  analytics: boolean;
  decidedAt: string;
};

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) setShow(true);
    } catch {
      // localStorage blocked – sicherheitshalber nicht zeigen
    }
  }, []);

  function save(consent: Partial<Consent>) {
    const value: Consent = {
      necessary: true,
      marketing: consent.marketing ?? false,
      analytics: consent.analytics ?? false,
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore
    }
    setShow(false);
    // Hier später: window.dispatchEvent(new CustomEvent("consent-changed", { detail: value }));
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-[var(--fg)] max-w-3xl">
          <p className="mb-1 font-semibold">Cookies & Datenschutz</p>
          <p className="text-[var(--muted)]">
            Wir nutzen technisch notwendige Cookies und cookielose Analyse
            (Plausible). Optional kannst du Marketing-Cookies (Affiliate-Tracking)
            zulassen. Mehr in unserer{" "}
            <Link href="/datenschutz" className="underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <button
            onClick={() => save({ marketing: false, analytics: false })}
            className="btn-secondary text-sm"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => save({ marketing: true, analytics: true })}
            className="btn-primary text-sm"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hilfsfunktion zum Auslesen des aktuellen Consents in anderen Komponenten.
 * Beispiel: const c = getConsent(); if (c?.marketing) loadAffiliatePixel();
 */
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}
