import { StudioArtwork } from "@/components/home/studio-artwork";
import { heroArtworkLabels } from "@/content/hero-artwork";

export function ContactArtwork() {
  return <StudioArtwork label={heroArtworkLabels.contact} compact>
    <g className="studio-artwork__object" stroke="var(--color-plum-900)" strokeWidth="3" strokeLinejoin="round">
      <g transform="matrix(1 .5 -1 .5 232 75)">
        <path d="M0 12Q0 0 12 0H182Q194 0 194 12V112Q194 124 182 124H70L40 151V124H12Q0 124 0 112Z" fill="var(--color-surface-lavender)" />
        <path d="M35 40h120M35 62h80" fill="none" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="matrix(1 .5 -1 .5 247 175)">
        <path d="M0 12Q0 0 12 0H142Q154 0 154 12V92Q154 104 142 104H118V128L88 104H12Q0 104 0 92Z" fill="var(--color-surface-white)" />
        {[44, 77, 110].map((cx) => <circle key={cx} cx={cx} cy="52" r="8" fill={cx === 110 ? "var(--color-surface-coral)" : "var(--color-plum-800)"} />)}
      </g>
    </g>
  </StudioArtwork>;
}
