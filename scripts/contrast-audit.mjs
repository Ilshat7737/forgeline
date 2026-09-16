import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--(color-[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value]));
function color(value) {
  if (Array.isArray(value)) return value;
  if (value.startsWith('var(')) return color(tokens[value.slice(6, -1)]);
  if (tokens[`color-${value}`]) return color(tokens[`color-${value}`]);
  assert.match(value, /^#[\da-f]{6}$/i);
  return [1, 3, 5].map(offset => parseInt(value.slice(offset, offset + 2), 16));
}
function luminance(value) {
  const linear = color(value).map(channel => {
    const s = channel / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function ratio(foreground, background) {
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function mix(foreground, background, opacity) {
  return color(foreground).map((channel, i) => channel * opacity + color(background)[i] * (1 - opacity));
}
function measure(foreground, backgrounds, minimum = 4.5) {
  const result = Math.min(...backgrounds.map(background => ratio(foreground, background)));
  assert(result >= minimum, `${foreground} on ${backgrounds}: ${result.toFixed(2)} < ${minimum}`);
  return `${result.toFixed(2)}:1`;
}
// Conservative lower bound: all three glow layers at their maximum opacity simultaneously.
const glow = mix('coral-500', mix('#be91ee', mix('lavender-300', 'canvas', 0.12), 0.16), 0.12);
const surfaces = [
  ['Canvas + strongest combined glow', ['canvas', glow], 'ink', 'text-muted', 'coral-700', 'error-strong', 'border-control', 'plum-900'],
  ['White', ['surface-white'], 'ink', 'text-muted', 'coral-700', 'error-strong', 'border-control', 'plum-900'],
  ['Lavender', ['surface-lavender'], 'ink', 'text-muted', 'coral-700', 'error-strong', 'border-control', 'plum-900'],
  ['Dark plum', ['surface-dark'], 'text-on-dark', 'text-muted-on-dark', 'coral-500', 'error', 'border-dark', 'focus'],
  ['Coral', ['surface-coral'], 'text-on-coral', 'text-muted-on-coral', 'plum-900', 'plum-900', 'plum-900', 'plum-900'],
];
console.log('| Surface | Text / icons | Muted text | Accent | Error | Control boundary | Focus |');
console.log('| --- | ---: | ---: | ---: | ---: | ---: | ---: |');
for (const [name, backgrounds, ...foregrounds] of surfaces) {
  console.log(`| ${name} | ${foregrounds.map((foreground, i) => measure(foreground, backgrounds, i >= 4 ? 3 : 4.5)).join(' | ')} |`);
}
const extra = [
  ['Coral button text, normal / hover (minimum)', 'plum-900', ['coral-500', 'coral-600']],
  ['Dark button / selected filter text, normal / hover (minimum)', 'text-on-dark', ['plum-900', 'plum-800']],
  ['Quiet button text, normal / hover (minimum)', 'plum-900', ['surface-white', 'surface-lavender']],
  ['Dark badge text', 'text-on-dark', ['plum-800']],
  ['Hero artwork note, darkest gradient stop', 'plum-900', ['lavender-300']],
  ['Field placeholder (66% ink on white)', mix('ink', 'surface-white', 0.66), ['surface-white']],
  ['Submission failure text on 8% error tint, white / lavender (minimum)', 'error-strong', [mix('error-strong', 'surface-white', 0.08), mix('error-strong', 'surface-lavender', 0.08)]],
  ['OG wordmark on darkest glow stop', 'plum-900', ['#f7d5d0', '#e6daf5']],
  ['OG wordmark dot on darkest glow stop', 'coral-700', ['#f7d5d0', '#e6daf5']],
  ['Additional Work artwork: ink on white / lavender', 'ink', ['surface-white', 'surface-lavender']],
  ['Additional Work artwork: light text on plum panels', 'text-on-dark', ['plum-950', 'plum-900', 'plum-800']],
  ['Additional Work artwork: plum text on coral tiles', 'plum-900', ['surface-coral']],
  ['Additional Work artwork: lavender graph lines on plum', 'lavender-300', ['plum-950', 'plum-900']],
];
console.log('\n| Additional pairing | Minimum contrast |\n| --- | ---: |');
for (const [name, foreground, backgrounds] of extra) console.log(`| ${name} | ${measure(foreground, backgrounds)} |`);

// Stage 10: opaque meaningful contours, connectors and marks; shadows / depth shading are decorative.
const heroGraphics = [
  ['Module symbols / screen details / message outlines', 'plum-900', ['surface-white', 'surface-lavender', 'lavender-300', 'surface-coral']],
  ['Team connectors on the lavender card', 'plum-900', ['surface-lavender']],
  ['Node centres / message dots on white', 'plum-800', ['surface-white']],
];
console.log('\n| Hero artwork graphics (minimum 3:1) | Minimum contrast |\n| --- | ---: |');
for (const [name, foreground, backgrounds] of heroGraphics) console.log(`| ${name} | ${measure(foreground, backgrounds, 3)} |`);
