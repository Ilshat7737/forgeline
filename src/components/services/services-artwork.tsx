import { IsometricTile, StudioArtwork } from "@/components/home/studio-artwork";
import { heroArtworkLabels } from "@/content/hero-artwork";

export function ServicesArtwork() {
  return <StudioArtwork label={heroArtworkLabels.services}>
    <IsometricTile x={222} y={110} width={204} depth={166} height={18} tone="white" />
    {[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]].map(([column, row], index) => {
      const selected = index === 2;
      return <IsometricTile key={index} x={220 + column * 60 - row * 72} y={120 + column * 30 + row * 36 - (selected ? 62 : 0)} width={48} depth={58} height={selected ? 22 : 12} tone={selected ? "coral" : "lavender"}>
        <g fill="none" stroke="var(--color-plum-900)" strokeWidth="3.5" strokeLinecap="round">
          {index % 3 === 0 ? <path d="M14 20h20v20H14Z" /> : index % 3 === 1 ? <circle cx="24" cy="29" r="12" /> : <path d="M12 29h24M24 17v24" />}
        </g>
      </IsometricTile>;
    })}
  </StudioArtwork>;
}
