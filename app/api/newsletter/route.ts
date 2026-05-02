import { NextRequest, NextResponse } from "next/server";

/**
 * Brevo (Sendinblue) Newsletter Subscription Handler
 *
 * Setup:
 * 1. Brevo Account anlegen, Liste erstellen
 * 2. BREVO_API_KEY in .env eintragen
 * 3. Brevo Liste-ID in BREVO_LIST_ID eintragen
 *
 * Falls noch nicht konfiguriert: Endpoint loggt Email lokal und gibt 200 zurück.
 */

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Bitte gültige E-Mail angeben." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      // Dev mode: einfach loggen, später Brevo verbinden
      console.log("[newsletter] (dev) Eintrag:", email);
      return NextResponse.json({ ok: true, dev: true });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listId, 10)],
        updateEnabled: true,
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
