import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #fdf6e9 0%, #f9e7c4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 120,
            fontWeight: 700,
            color: "#db4a5e",
            lineHeight: 1,
          }}
        >
          C
        </span>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
