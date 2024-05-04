const lightenColor = (hex, steps) => {
  // Parse hex color to RGB
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Adjust brightness (lighten)
  r = Math.min(r + steps, 255);
  g = Math.min(g + steps, 255);
  b = Math.min(b + steps, 255);

  // Convert RGB back to hex
  let result = (r << 16) | (g << 8) | b;
  return `#${result.toString(16).padStart(6, "0")}`;
};

export default lightenColor;
