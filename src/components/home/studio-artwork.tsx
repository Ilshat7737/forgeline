import { homeLayout } from "@/content/home-layout";

type Cube = { x: number; y: number; size: number; coral?: boolean; dark?: boolean };
function CubeShape({ x, y, size, coral, dark }: Cube) {
  const colors = coral ? ["#ffb5a8", "#ff8977", "#dd6f66"] : dark ? ["#79618c", "#4b365c", "#302039"] : ["#efddff", "#c8a3e5", "#a77bca"];
  return <g transform={`translate(${x} ${y}) scale(${size})`} strokeWidth="0.015" stroke="#ffffff" strokeOpacity=".14">
    <path d="M0 0 1-.55 2 0 1 .55Z" fill={colors[0]} />
    <path d="M0 0 1 .55v1.15L0 1.15Z" fill={colors[1]} />
    <path d="m1 .55 1-.55v1.15l-1 .55Z" fill={colors[2]} />
    <path d="M0 0 1 .55 2 0" fill="none" stroke="#fff" strokeOpacity=".45" />
  </g>;
}

const cluster: Cube[] = [];
for (let layer = 0; layer < 4; layer++) {
  for (let depth = 0; depth < 9; depth++) {
    for (let x = 0; x < 5; x++) {
      const y = depth - x;
      if (y < 0 || y > 4 || (layer === 3 && (x + y > 5 || x === 0)) || (layer === 0 && x === 4 && y > 2)) continue;
      cluster.push({ x: 185 + (x - y) * 30, y: 170 + (x + y) * 18 - layer * 40, size: 24 });
    }
  }
}
const scatter: Cube[] = [
  { x: 95, y: 138, size: 34 }, { x: 160, y: 102, size: 34 },
  { x: 203, y: 158, size: 37, dark: true }, { x: 278, y: 133, size: 31, coral: true },
  { x: 142, y: 216, size: 39 }, { x: 73, y: 243, size: 16, coral: true },
];
export function CubeArtwork({ variant = "cluster", labelled = false }: { variant?: "cluster" | "scatter"; labelled?: boolean }) {
  return <svg className={`cube-artwork cube-artwork--${variant}`} viewBox={variant === "cluster" ? "0 0 480 400" : "35 60 340 270"} role={labelled ? "img" : undefined} aria-label={labelled ? homeLayout.cubesLabel : undefined} aria-hidden={labelled ? undefined : true} focusable="false">
    <ellipse cx="220" cy="342" rx="138" ry="24" fill="#9f76bd" opacity=".12" />
    {(variant === "cluster" ? cluster : scatter).map((cube, index) => <CubeShape key={index} {...cube} />)}
  </svg>;
}
export function SlabArtwork() {
  return <svg className="slab-artwork" viewBox="0 0 300 300" aria-hidden="true" focusable="false">
    {[190, 146, 102].map((y, index) => <g key={y} transform={`translate(30 ${y})`}>
      <path d="m0 0 145-65 110 35-145 70Z" fill={index === 1 ? "#ffb2a3" : "#654a78"} />
      <path d="m0 0 110 40v24L0 24Z" fill={index === 1 ? "#ff8977" : "#392741"} />
      <path d="m110 40 145-70v24L110 64Z" fill={index === 1 ? "#d86f65" : "#25192f"} />
      <path d="m0 0 110 40 145-70" stroke={index === 1 ? "#ffdbd3" : "#8e6da3"} strokeWidth="1" fill="none" />
    </g>)}
  </svg>;
}
