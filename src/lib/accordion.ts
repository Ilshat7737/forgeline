/** Keep exactly one item open; activating the current item leaves it open. */
export function nextOpenService(current: string, requested: string, slugs: readonly string[]): string {
  return slugs.includes(requested) ? requested : current;
}
