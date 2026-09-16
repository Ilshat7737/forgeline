import { IsometricTile, StudioArtwork } from "@/components/home/studio-artwork";
import { heroArtworkLabels } from "@/content/hero-artwork";

function TeamNode({ x, y }: { x: number; y: number }) {
  return <g className="studio-artwork__object" transform={`translate(${x} ${y})`} stroke="var(--color-plum-900)" strokeWidth="2">
    <path d="M-28 0v20a28 14 0 0 0 56 0V0" fill="var(--color-lavender-300)" />
    <ellipse rx="28" ry="14" fill="var(--color-surface-white)" />
    <ellipse rx="10" ry="5" fill="var(--color-plum-800)" stroke="none" />
  </g>;
}

export function AboutArtwork() {
  return <StudioArtwork label={heroArtworkLabels.about}>
    <path d="m240 109 148 93-148 104-148-104Z" fill="none" stroke="var(--color-plum-900)" strokeWidth="2" />
    <path d="M240 109v197M92 202h296" fill="none" stroke="var(--color-plum-900)" strokeWidth="3" />
    <TeamNode x={240} y={90} />
    <TeamNode x={92} y={183} />
    <TeamNode x={388} y={183} />
    <IsometricTile x={240} y={147} width={76} depth={76} height={28} tone="coral">
      <path d="m23 38 10 10 21-23" fill="none" stroke="var(--color-plum-900)" strokeWidth="5" strokeLinecap="round" />
    </IsometricTile>
    <TeamNode x={240} y={287} />
  </StudioArtwork>;
}
