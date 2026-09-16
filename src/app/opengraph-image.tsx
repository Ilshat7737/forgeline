import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";

export const alt = home.hero.lines.join(" ");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const manrope = await readFile(join(process.cwd(), "src/assets/fonts/manrope-latin-700.ttf"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 40, backgroundColor: "#f5f0f7", backgroundImage: "radial-gradient(ellipse at 10% 10%, #f7d5d0 0%, #f5f0f7 55%, #e6daf5 100%)", color: "#2b2033", fontFamily: "Manrope", fontWeight: 700 }}>
      <div style={{ display: "flex", alignItems: "center", height: 60, fontSize: 36, letterSpacing: -2 }}>{site.name}<span style={{ color: "#a8322a" }}>.</span></div>
      <div style={{ display: "flex", gap: 20, marginTop: 24, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 740, padding: 36, borderRadius: 24, border: "1px solid #b55048", backgroundColor: "#ff8977", boxShadow: "0 4px 16px rgba(43, 32, 51, 0.05)" }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "10px 16px", borderRadius: 100, backgroundColor: "#fffaff", fontSize: 14 }}>{home.hero.eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontSize: 62, lineHeight: 1.12, letterSpacing: -2.8 }}>
            {home.hero.lines.map((line) => <div key={line}>{line}</div>)}
          </div>
          <div style={{ display: "flex", marginTop: 28, gap: 8 }}>
            {[140, 44, 44].map((width, index) => <div key={index} style={{ display: "flex", width, height: 14, borderRadius: 100, backgroundColor: index === 0 ? "#2b2033" : "#fffaff" }} />)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 360 }}>
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 24, border: "1px solid #c6b8d0", backgroundColor: "#ece4fc", boxShadow: "0 4px 16px rgba(43, 32, 51, 0.05)" }}>
            <svg width="300" height="270" viewBox="0 0 300 270">
              {[{ x: 35, y: 82, s: 54 }, { x: 141, y: 45, s: 43 }, { x: 136, y: 154, s: 46 }, { x: 58, y: 203, s: 20 }].map(({ x, y, s }, index) => (
                <g key={index} transform={`translate(${x} ${y}) scale(${s})`}>
                  <path d="M0 0 1-.55 2 0 1 .55Z" fill={index === 3 ? "#ffb5a8" : "#efddff"} />
                  <path d="M0 0 1 .55v1.15L0 1.15Z" fill={index === 3 ? "#ff8977" : "#c8a3e5"} />
                  <path d="m1 .55 1-.55v1.15l-1 .55Z" fill={index === 3 ? "#dd6f66" : "#a77bca"} />
                </g>
              ))}
            </svg>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", height: 108, borderRadius: 24, backgroundColor: "#2b2033", color: "#fcf7ff", fontSize: 13, letterSpacing: 1 }}>
            {home.hero.note.join(" / ")}
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Manrope", data: manrope, weight: 700, style: "normal" }] },
  );
}
