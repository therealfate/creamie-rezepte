import { NextRequest, NextResponse } from "next/server";

/**
 * Brevo (Sendinblue) Newsletter Subscription Handler – Double Opt-In
 *
 * Setup:
 * 1. Brevo Account anlegen, Liste erstellen.
 * 2. Double-Opt-In Template in Brevo erstellen (Marketing → Templates → Confirmation).
 * 3. Folgende ENV-Variablen in Vercel setzen:
 *    - BREVO_API_KEY        (https://app.brevo.com/settings/keys/api)
 *    - BREVO_LIST_ID        (Marketing → Lists → ID)
 *    - BREVO_TEMPLATE_ID    (ID des DOI-Templates)
 *    - BREVO_REDIRECT_URL   z.B. https://www.creamie-rezepte.de/newsletter/danke
 *
 * Sicherheit / Compliance:
 * - Verwendet Brevo's createDoiContact-Endpoint = Double-Opt-In nach DSGVO.
 * - Speichert IP-Adresse für Anmelde-Beweis (Art. 7 (1) DSGVO).
 * - Bei Fehlen der ENV-Variablen wird die Anfrage nur geloggt (DEV-Modus).
 */

export async function POST(req: NextRequest) {
  try {
    const { email, consent } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Bitte gültige E-Mail angeben." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Einwilligung erforderlich." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;
    const templateId = process.env.BREVO_TEMPLATE_ID;
    const redirectUrl =
      process.env.BREVO_REDIRECT_URL ??
      "https://www.creamie-rezepte.de/newsletter/danke";

    // IP für Anmelde-Beweis (Compliance)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!apiKey || !listId || !templateId) {
      // Dev mode: einfach loggen, später Brevo verbinden
      console.log("[newsletter] (dev mode) Eintrag:", { email, ip });
      return NextResponse.json({ ok: true, dev: true });
    }

    // Brevo Double-Opt-In Endpoint
    const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        includeListIds: [parseInt(listId, 10)],
        templateId: parseInt(templateId, 10),
        redirectionUrl: redirectUrl,
        attributes: {
          OPTIN_IP: ip,
          OPTIN_DATE: new Date().toISOString(),
          SOURCE: "creamie-rezepte.de",
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[newsletter] Brevo error:", text);
      return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[newsletter] Exception:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
