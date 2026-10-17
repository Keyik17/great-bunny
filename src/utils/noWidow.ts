/**
 * Bind the last two words with a non-breaking space so a line never ends
 * with a single-word widow. Cross-browser (Safari lacks text-wrap: pretty).
 */
export function noWidow(text: string): string {
  return text.replace(/ (?=\S+$)/, '\u00A0')
}
