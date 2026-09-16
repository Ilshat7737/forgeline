/** Selectors whose direct children reveal as the visitor scrolls. */
export const REVEAL_SELECTOR = "[data-reveal-group] > *, [data-reveal='stagger'] > *";

/** Observer tuning: reveal once a block is meaningfully inside the viewport. */
export const REVEAL_THRESHOLD = 0.15;
export const REVEAL_ROOT_MARGIN = "0px 0px -10%";

/**
 * Delay for the nth child of a staggered group, in milliseconds.
 * Capped so a long grid never keeps the visitor waiting for its last card.
 */
export function revealDelay(index: number, step = 60, cap = 6): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Math.min(Math.floor(index), cap) * step;
}
