/**
 * Convert an HEX color string to RGBA
 * @param {string} hex - HEX color code
 * @param {Number} alpha - Alpha number
 * @returns {string} - RGBA color
 */
export function rgba(hex, alpha = 1) {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Darken an HEX color
 * @param {string} hex - HEX color code
 * @param {Number} amount Amount to darken
 * @returns {string} - Darkened HEX color code
 */
export function darken(hex, amount) {
  return adjustColorBrightness(hex, -amount);
}

/**
 * Brighten an HEX color
 * @param {string} hex - HEX color code
 * @param {Number} amount Amount to brighten
 * @returns {string} - Brightened HEX color code
 */
export function brighten(hex, amount) {
  return adjustColorBrightness(hex, amount);
}

/**
 * Adjust the brightness of an HEX color
 * @param {string} hex - HEX color code
 * @param {Number} amount Amount to adjust
 * @returns {string} - Adjusted HEX color code
 */
function adjustColorBrightness(hex, amount) {
  return `#${hex
    .replace(/^#/, '')
    .replace(/../g, color =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
        16,
      )}`.substr(-2),
    )}`;
}
