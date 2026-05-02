"""Generate the creamie-rezepte.de PDF lead magnet."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)

# Brand colors
CREAM_BG = HexColor("#fdf6e9")
CREAM_LIGHT = HexColor("#fefcf9")
BERRY = HexColor("#db4a5e")
BERRY_DARK = HexColor("#c43048")
TEXT_DARK = HexColor("#1f1611")
TEXT_MUTED = HexColor("#7a6b5e")
CREAM_BORDER = HexColor("#ebe2d3")
CREAM_200 = HexColor("#f9e7c4")

W, H = A4  # 595 x 842 pt

OUTPUT = r"C:\Users\soenk\Desktop\creamie-rezepte\public\lead-magnet.pdf"

# ── Styles ────────────────────────────────────────────────────────────────────

def make_styles():
    base = dict(fontName="Helvetica", textColor=TEXT_DARK, leading=16)
    return {
        "cover_title": ParagraphStyle(
            "cover_title", fontName="Helvetica-Bold", fontSize=36,
            textColor=BERRY, leading=44, alignment=TA_CENTER, spaceAfter=12
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", fontName="Helvetica", fontSize=18,
            textColor=TEXT_DARK, leading=24, alignment=TA_CENTER, spaceAfter=8
        ),
        "cover_author": ParagraphStyle(
            "cover_author", fontName="Helvetica-Oblique", fontSize=13,
            textColor=TEXT_MUTED, leading=18, alignment=TA_CENTER
        ),
        "section_header": ParagraphStyle(
            "section_header", fontName="Helvetica-Bold", fontSize=22,
            textColor=BERRY, leading=28, spaceAfter=8
        ),
        "recipe_title": ParagraphStyle(
            "recipe_title", fontName="Helvetica-Bold", fontSize=20,
            textColor=BERRY, leading=26, spaceAfter=4
        ),
        "recipe_sub": ParagraphStyle(
            "recipe_sub", fontName="Helvetica-Oblique", fontSize=12,
            textColor=TEXT_MUTED, leading=16, spaceAfter=14
        ),
        "body": ParagraphStyle(
            "body", fontName="Helvetica", fontSize=11,
            textColor=TEXT_DARK, leading=17, spaceAfter=6, alignment=TA_JUSTIFY
        ),
        "ingredient": ParagraphStyle(
            "ingredient", fontName="Helvetica", fontSize=11,
            textColor=TEXT_DARK, leading=16, leftIndent=6
        ),
        "step": ParagraphStyle(
            "step", fontName="Helvetica", fontSize=11,
            textColor=TEXT_DARK, leading=16, spaceAfter=4, leftIndent=6
        ),
        "tip_text": ParagraphStyle(
            "tip_text", fontName="Helvetica-Oblique", fontSize=10,
            textColor=TEXT_DARK, leading=15
        ),
        "sub_heading": ParagraphStyle(
            "sub_heading", fontName="Helvetica-Bold", fontSize=13,
            textColor=TEXT_DARK, leading=18, spaceAfter=6, spaceBefore=8
        ),
        "nutrition": ParagraphStyle(
            "nutrition", fontName="Helvetica", fontSize=10,
            textColor=TEXT_MUTED, leading=14
        ),
        "cta_big": ParagraphStyle(
            "cta_big", fontName="Helvetica-Bold", fontSize=22,
            textColor=white, leading=28, alignment=TA_CENTER
        ),
        "outro_body": ParagraphStyle(
            "outro_body", fontName="Helvetica", fontSize=12,
            textColor=TEXT_DARK, leading=18, spaceAfter=8, alignment=TA_JUSTIFY
        ),
        "footer_note": ParagraphStyle(
            "footer_note", fontName="Helvetica-Oblique", fontSize=8,
            textColor=TEXT_MUTED, leading=12, alignment=TA_CENTER
        ),
    }

S = make_styles()

# ── Helpers ────────────────────────────────────────────────────────────────────

def hline(color=CREAM_BORDER, thickness=0.5):
    return HRFlowable(width="100%", thickness=thickness, color=color, spaceAfter=10, spaceBefore=4)


def tip_box(text):
    """Berry-accented tip callout."""
    inner = Table(
        [[Paragraph(f"<b>Tipp:</b> {text}", S["tip_text"])]],
        colWidths=[W - 2 * 20 * mm - 24]
    )
    inner.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fce7eb")),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBEFORE", (0, 0), (0, -1), 3, BERRY),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
    ]))
    return inner


def nutrition_row(values: str):
    """Small nutrition summary bar."""
    return Paragraph(f"<b>Pro Portion:</b> {values}", S["nutrition"])


def ingredients_and_steps(ingredients, steps):
    """Two-column layout: ingredients left, steps right."""
    col_w = (W - 2 * 20 * mm) / 2 - 6

    ing_items = [Paragraph(f"• {i}", S["ingredient"]) for i in ingredients]
    step_items = [Paragraph(f"{n+1}. {s}", S["step"]) for n, s in enumerate(steps)]

    ing_cell = [Paragraph("<b>Zutaten (4 Portionen)</b>", S["sub_heading"])] + ing_items
    step_cell = [Paragraph("<b>Zubereitung</b>", S["sub_heading"])] + step_items

    t = Table(
        [[ing_cell, step_cell]],
        colWidths=[col_w, col_w + 12]
    )
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


# ── Page builders ──────────────────────────────────────────────────────────────

def cover_page():
    story = []
    story.append(Spacer(1, 28 * mm))

    # Logo mark
    logo = Table(
        [[Paragraph("<b>C</b>", ParagraphStyle(
            "logo_c", fontName="Helvetica-Bold", fontSize=48,
            textColor=BERRY, leading=56, alignment=TA_CENTER
        ))]],
        colWidths=[70]
    )
    logo.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM_200),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("BOX", (0, 0), (-1, -1), 2, BERRY),
    ]))
    centered_logo = Table([[logo]], colWidths=[W - 2 * 20 * mm])
    centered_logo.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(centered_logo)
    story.append(Spacer(1, 14 * mm))

    story.append(Paragraph("Die 5 besten<br/>Ninja Creami Rezepte", S["cover_title"]))
    story.append(Spacer(1, 4 * mm))

    # Berry rule
    story.append(HRFlowable(
        width="60%", thickness=3, color=BERRY,
        hAlign="CENTER", spaceAfter=10, spaceBefore=4
    ))

    story.append(Paragraph("Dein Einstieg in selbst gemachtes Eis", S["cover_sub"]))
    story.append(Spacer(1, 16 * mm))
    story.append(Paragraph("Von Sönke Berger · creamie-rezepte.de", S["cover_author"]))
    story.append(Spacer(1, 20 * mm))

    # Teaser box
    teaser = Table(
        [[Paragraph(
            "Proteineis mit 25g Eiweiß · Klassisches Vanilleeis ·<br/>"
            "Intensives Schokoladeneis · Sommerliches Erdbeereis · Mango-Sorbet",
            ParagraphStyle("teaser", fontName="Helvetica", fontSize=11,
                           textColor=TEXT_DARK, leading=18, alignment=TA_CENTER)
        )]],
        colWidths=[W - 2 * 20 * mm]
    )
    teaser.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM_200),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("BOX", (0, 0), (-1, -1), 1, CREAM_BORDER),
    ]))
    story.append(teaser)
    story.append(PageBreak())
    return story


def intro_page():
    story = []
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph("Warum ich diesen Guide gemacht habe", S["section_header"]))
    story.append(hline(BERRY, 2))
    story.append(Spacer(1, 4 * mm))

    intro_text = (
        "Ich habe die Ninja Creami vor einem Jahr gekauft – und war am Anfang "
        "komplett überfordert. Die Anleitungen online waren entweder zu kompliziert "
        "oder einfach falsch. 24 Stunden einfrieren, dann Spin – so weit so gut. "
        "Aber warum wird's bröselig? Warum schmeckt's eisig statt cremig?"
    )
    story.append(Paragraph(intro_text, S["body"]))
    story.append(Spacer(1, 3 * mm))

    intro_text2 = (
        "Ich habe alles ausprobiert. Fehlgeschlagen, nochmal versucht, notiert, "
        "verbessert. Diese 5 Rezepte sind meine verlässlichsten Ergebnisse. "
        "Kein Marketing-Sprech, keine ungetesteten Hacks – nur Rezepte, die "
        "jedes Mal funktionieren."
    )
    story.append(Paragraph(intro_text2, S["body"]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Viel Spaß damit. – Sönke", S["body"]))
    story.append(Spacer(1, 8 * mm))

    # Signature box
    sig = Table(
        [[Paragraph(
            "Alle Rezepte auf <b>www.creamie-rezepte.de</b> mit Schritt-für-Schritt Fotos",
            S["tip_text"]
        )]],
        colWidths=[W - 2 * 20 * mm]
    )
    sig.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#fce7eb")),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("LINEBEFORE", (0, 0), (0, -1), 3, BERRY),
    ]))
    story.append(sig)

    story.append(Spacer(1, 8 * mm))
    story.append(hline())

    # What's inside
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Was dich erwartet", S["sub_heading"]))
    recipes_list = [
        ("1", "Proteineis mit Magerquark", "25 g Eiweiß, 175 kcal"),
        ("2", "Ninja Creami Vanilleeis", "Der Klassiker, 245 kcal"),
        ("3", "Ninja Creami Schokoladeneis", "Intensiv & cremig, 275 kcal"),
        ("4", "Ninja Creami Erdbeereis", "Sommerlich-fruchtig, 215 kcal"),
        ("5", "Mango-Sorbet", "Vegan & leicht, 120 kcal"),
    ]
    for num, title, sub in recipes_list:
        row_data = [[
            Paragraph(f"<b>{num}</b>", ParagraphStyle(
                "num", fontName="Helvetica-Bold", fontSize=13,
                textColor=white, leading=16, alignment=TA_CENTER
            )),
            Paragraph(f"<b>{title}</b>", S["sub_heading"]),
            Paragraph(sub, S["nutrition"]),
        ]]
        t = Table(row_data, colWidths=[22, 260, 180])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, 0), BERRY),
            ("ALIGN", (0, 0), (0, 0), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LEFTPADDING", (0, 0), (0, 0), 0),
            ("LEFTPADDING", (1, 0), (-1, -1), 8),
            ("BOX", (0, 0), (-1, -1), 0.5, CREAM_BORDER),
        ]))
        story.append(t)
        story.append(Spacer(1, 2))

    story.append(PageBreak())
    return story


def recipe_page(num, title, subtitle, ingredients, steps, tip, nutrition_str):
    story = []
    story.append(Spacer(1, 6 * mm))

    # Recipe number badge + title
    badge_title = Table(
        [[
            Paragraph(f"<b>{num}</b>", ParagraphStyle(
                "badge", fontName="Helvetica-Bold", fontSize=16,
                textColor=white, leading=20, alignment=TA_CENTER
            )),
            Paragraph(title, S["recipe_title"]),
        ]],
        colWidths=[30, W - 2 * 20 * mm - 38]
    )
    badge_title.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), BERRY),
        ("ALIGN", (0, 0), (0, 0), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (1, 0), (1, 0), 10),
    ]))
    story.append(badge_title)
    story.append(Paragraph(subtitle, S["recipe_sub"]))
    story.append(hline(BERRY, 1.5))

    # Ingredients + Steps
    story.append(ingredients_and_steps(ingredients, steps))
    story.append(Spacer(1, 6 * mm))
    story.append(tip_box(tip))
    story.append(Spacer(1, 4 * mm))
    story.append(hline())
    story.append(nutrition_row(nutrition_str))
    story.append(PageBreak())
    return story


def outro_page():
    story = []
    story.append(Spacer(1, 10 * mm))
    story.append(Paragraph("Mehr Rezepte gefällig?", S["section_header"]))
    story.append(hline(BERRY, 2))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph(
        "Das war ein kleiner Vorgeschmack. Auf creamie-rezepte.de findest du "
        "20+ Rezepte für die Ninja Creami und Ninja Swirl – kostenlos, mit "
        "ehrlichen Bewertungen und keinem Marketing-Kram.",
        S["outro_body"]
    ))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Neue Rezepte kommen jede Woche dazu. Wenn du nichts verpassen willst, "
        "meld dich für den Newsletter an – du bekommst jedes neue Rezept "
        "direkt in die Inbox, kein Spam, jederzeit abbestellbar.",
        S["outro_body"]
    ))
    story.append(Spacer(1, 10 * mm))

    # CTA box
    cta = Table(
        [[Paragraph("creamie-rezepte.de", S["cta_big"])]],
        colWidths=[W - 2 * 20 * mm]
    )
    cta.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BERRY),
        ("TOPPADDING", (0, 0), (-1, -1), 18),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
        ("LEFTPADDING", (0, 0), (-1, -1), 20),
        ("RIGHTPADDING", (0, 0), (-1, -1), 20),
    ]))
    story.append(cta)
    story.append(Spacer(1, 16 * mm))

    # Quick links
    story.append(Paragraph("Direkt-Links:", S["sub_heading"]))
    links = [
        "Alle Rezepte: creamie-rezepte.de/rezepte",
        "Newsletter: creamie-rezepte.de/newsletter",
        "Über Sönke: creamie-rezepte.de/ueber",
    ]
    for link in links:
        story.append(Paragraph(f"• {link}", S["body"]))

    story.append(Spacer(1, 20 * mm))
    story.append(hline())
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "© Sönke Berger · creamie-rezepte.de · "
        "Keine Markenzugehörigkeit zu Ninja® oder SharkNinja®. "
        "Alle Rezepte wurden eigenständig entwickelt und getestet.",
        S["footer_note"]
    ))
    return story


# ── Canvas background ──────────────────────────────────────────────────────────

def draw_page_bg(canvas, doc):
    """Draw cream background + thin berry stripe at top."""
    canvas.saveState()
    canvas.setFillColor(CREAM_LIGHT)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Berry top stripe
    canvas.setFillColor(BERRY)
    canvas.rect(0, H - 6, W, 6, fill=1, stroke=0)
    # Cream bottom stripe
    canvas.setFillColor(CREAM_200)
    canvas.rect(0, 0, W, 4, fill=1, stroke=0)
    # Page number (except cover = page 1)
    if doc.page > 1:
        canvas.setFont("Helvetica", 9)
        canvas.setFillColor(TEXT_MUTED)
        canvas.drawCentredString(W / 2, 10, f"creamie-rezepte.de · Seite {doc.page}")
    canvas.restoreState()


# ── Build ──────────────────────────────────────────────────────────────────────

def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=16 * mm,
        title="Die 5 besten Ninja Creami Rezepte",
        author="Sönke Berger",
        subject="Ninja Creami Rezepte – Kostenloses PDF von creamie-rezepte.de",
    )

    story = []
    story += cover_page()
    story += intro_page()

    story += recipe_page(
        "1",
        "Proteineis mit Magerquark",
        "25 g Eiweiss · 175 kcal · 5 Minuten Zubereitung",
        [
            "500 g Magerquark",
            "30 g Whey-Protein Vanille",
            "30 g Erythrit (oder 50 g Zucker)",
            "100 ml Milch",
            "1 TL Vanilleextrakt",
            "1 EL Mandelmus (fuer Cremigkeit)",
            "1 Prise Salz",
        ],
        [
            "Magerquark, Whey-Protein, Erythrit und Salz verrühren.",
            "Milch, Mandelmus und Vanille einrühren, glatt schlagen.",
            "Mischung in den Ninja Creami Becher füllen.",
            "Mindestens 24 Stunden bei -18 °C einfrieren.",
            "Becher in die Maschine, \"Lite Ice Cream\" Programm wählen.",
            "Bei krümeliger Konsistenz 1-2 EL kalte Milch zugeben, Re-Spin starten.",
        ],
        "1 EL Mandelmus ist der Cremigkeits-Trick. Ohne wird Quark-Eis oft bröselig.",
        "175 kcal · 25 g Eiweiss · 9 g Kohlenhydrate · 4 g Fett"
    )

    story += recipe_page(
        "2",
        "Ninja Creami Vanilleeis",
        "Der Klassiker · 245 kcal · 8 Minuten Zubereitung",
        [
            "400 ml Vollmilch",
            "120 ml Sahne",
            "100 g Zucker",
            "1 echte Vanilleschote (oder 2 TL Vanillepaste)",
            "1 Prise Salz",
            "Optional: 2 Eigelb (für Creme-Eis)",
        ],
        [
            "Vanilleschote längs aufschneiden, das Mark herauskratzen.",
            "Milch, Sahne, Zucker, Salz und Vanillemark leicht erwärmen bis Zucker aufgelöst – nicht kochen.",
            "In den Ninja Creami Becher füllen, vollständig abkühlen lassen.",
            "Mindestens 24 Stunden bei -18 °C einfrieren.",
            "Becher in die Maschine, \"Ice Cream\" Programm wählen.",
            "Bei krümeliger Konsistenz 1-2 EL kalte Milch zugeben, Re-Spin starten.",
        ],
        "Echte Vanilleschote macht den Unterschied. Künstliches Aroma verliert im Gefrorenen seinen Geschmack.",
        "245 kcal · 5 g Eiweiss · 26 g Kohlenhydrate · 12 g Fett"
    )

    story += recipe_page(
        "3",
        "Ninja Creami Schokoladeneis",
        "Intensiv-cremig · 275 kcal · 10 Minuten Zubereitung",
        [
            "400 ml Vollmilch",
            "120 ml Sahne",
            "30 g entöltes Kakaopulver",
            "50 g Zartbitter-Schokolade (70%)",
            "100 g Zucker",
            "1 Prise Salz",
            "1 TL Vanilleextrakt",
        ],
        [
            "Milch und Sahne leicht erwärmen.",
            "Kakaopulver, Zucker und Salz einrühren, klümpchenfrei auflösen.",
            "Schokolade in Stücke brechen, in die warme Masse schmelzen lassen.",
            "Vanilleextrakt einrühren, in den Becher füllen.",
            "Vollständig abkühlen, mindestens 24 Stunden bei -18 °C einfrieren.",
            "\"Ice Cream\" Programm wählen. Bei Bedarf Re-Spin mit 1-2 EL Milch.",
        ],
        "Kakao immer zuerst mit etwas warmer Milch zu einer glatten Paste anrühren – sonst Klümpchen.",
        "275 kcal · 6 g Eiweiss · 32 g Kohlenhydrate · 13 g Fett"
    )

    story += recipe_page(
        "4",
        "Ninja Creami Erdbeereis",
        "Sommerlich-fruchtig · 215 kcal · 8 Minuten Zubereitung",
        [
            "300 g TK-Erdbeeren",
            "300 ml Vollmilch",
            "100 ml Sahne",
            "80 g Zucker",
            "1 EL Zitronensaft",
            "1 TL Vanilleextrakt",
            "1 Prise Salz",
        ],
        [
            "TK-Erdbeeren 5 Minuten antauen lassen.",
            "Mit einer Gabel leicht zerdrücken – nicht komplett pürieren.",
            "Milch leicht erwärmen, Zucker und Salz darin auflösen.",
            "Erdbeer-Mischung, Sahne, Zitronensaft und Vanille zugeben, umrühren.",
            "In den Becher füllen, 24 Stunden bei -18 °C einfrieren.",
            "\"Ice Cream\" Programm wählen. Re-Spin falls nötig.",
        ],
        "TK-Erdbeeren sind besser als frische – konzentrierterer Geschmack, weniger Wasseranteil.",
        "215 kcal · 4 g Eiweiss · 28 g Kohlenhydrate · 9 g Fett"
    )

    story += recipe_page(
        "5",
        "Mango-Sorbet",
        "Vegan · leicht · 120 kcal · 5 Minuten Zubereitung",
        [
            "400 g TK-Mango",
            "120 ml Wasser",
            "60 g Zucker",
            "1 EL Limettensaft",
            "1 Eiweiss (optional, für Cremigkeit)",
            "1 Prise Salz",
        ],
        [
            "Wasser, Zucker und Salz erwärmen bis Zucker aufgelöst.",
            "Vom Herd nehmen, Limettensaft einrühren.",
            "TK-Mango in den Becher füllen, Zuckerlösung übergießen.",
            "Optional: 1 Eiweiss einrühren für bessere Konsistenz.",
            "24 Stunden bei -18 °C einfrieren.",
            "\"Sorbet\" Programm wählen. Bei Bedarf Re-Spin mit 1-2 EL Wasser.",
        ],
        "Nie unter 60 g Zucker – Zucker bindet Wasser und verhindert eisige Klümpchen.",
        "120 kcal · 1 g Eiweiss · 30 g Kohlenhydrate · 0 g Fett"
    )

    story += outro_page()

    doc.build(story, onFirstPage=draw_page_bg, onLaterPages=draw_page_bg)
    print(f"PDF generated: {OUTPUT}")


if __name__ == "__main__":
    build()
