import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";

export const alt = home.hero.lines.join(" ");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56, background: "#231525", color: "#f0e5f6", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 32 }}>{site.name}<span style={{ color: "#ff786a" }}>.</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontWeight: 700, fontSize: 78, lineHeight: 1.05, letterSpacing: -3 }}>
        {home.hero.lines.map((line, index) => <div key={line} style={{ color: index === 1 ? "#ff786a" : "#f0e5f6" }}>{line}</div>)}
      </div>
      <div style={{ display: "flex", fontSize: 18, letterSpacing: 3 }}>{home.hero.eyebrow}</div>
    </div>,
    size,
  );
}
