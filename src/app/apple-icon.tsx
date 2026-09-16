import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the wordmark initial on the canvas, matching src/app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#201727",
          color: "#fcf7ff",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        F<span style={{ color: "#ff8977" }}>.</span>
      </div>
    ),
    size,
  );
}
