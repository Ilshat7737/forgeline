import { IsometricTile, StudioArtwork } from "@/components/home/studio-artwork";
import { heroArtworkLabels } from "@/content/hero-artwork";

export function WorkHeroArtwork() {
  return <StudioArtwork label={heroArtworkLabels.work}>
    <IsometricTile x={210} y={185} width={220} depth={152} height={15} tone="lavender" />
    <g className="studio-artwork__object" transform="matrix(1 .5 0 1 98 62)" stroke="var(--color-plum-900)" strokeWidth="2" strokeLinejoin="round">
      <path d="M0 0 12-6H242V156L230 162H0Z" fill="var(--color-plum-800)" />
      <rect width="230" height="162" rx="10" fill="var(--color-surface-white)" />
      <path d="M0 28H230M47 28V162" fill="none" />
      <circle cx="16" cy="14" r="4" fill="var(--color-surface-coral)" />
      <path d="M15 47h17M15 61h17M15 75h10" fill="none" strokeLinecap="round" strokeWidth="3" />
      <rect x="62" y="44" width="151" height="48" rx="5" fill="var(--color-lavender-300)" />
      <path d="m77 77 27-19 27 13 30-17 36 10" fill="none" strokeWidth="3" />
      <rect x="62" y="107" width="67" height="37" rx="5" fill="var(--color-surface-lavender)" />
      <rect x="142" y="107" width="71" height="37" rx="5" fill="var(--color-surface-coral)" />
    </g>
    <g className="studio-artwork__object" transform="matrix(1 -.5 0 1 317 230)" stroke="var(--color-plum-900)" strokeWidth="2" strokeLinejoin="round">
      <rect x="6" y="4" width="75" height="126" rx="10" fill="var(--color-plum-800)" />
      <rect width="75" height="126" rx="10" fill="var(--color-surface-white)" />
      <path d="M27 12h21" strokeWidth="3" strokeLinecap="round" />
      <rect x="12" y="27" width="51" height="37" rx="5" fill="var(--color-surface-coral)" />
      <path d="M13 81h49M13 94h49M13 107h29" strokeWidth="3" strokeLinecap="round" />
    </g>
  </StudioArtwork>;
}
