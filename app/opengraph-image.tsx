import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#fdf6e9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Background accent blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#fce7eb",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#f9e7c4",
            opacity: 0.5,
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "linear-gradient(135deg, #fce7eb 0%, #fdf6e9 100%)",
            border: "3px solid #db4a5e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#db4a5e",
              lineHeight: 1,
            }}
          >
            C
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1f1611",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          creamie
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#7a6b5e",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Ninja Creami Rezepte & selbst gemachtes Eis
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 22,
            color: "#db4a5e",
            fontWeight: 600,
          }}
        >
          creamie-rezepte.de
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
