export const DECADE_COLORS = [
  { base: "#004296", light: "#1a6fd8", mid: "#002b66", glow: "rgba(0,66,150,0.55)" },
  { base: "#005f8a", light: "#0090cc", mid: "#003a55", glow: "rgba(0,95,138,0.50)" },
  { base: "#1a5276", light: "#2e86c1", mid: "#0f2e45", glow: "rgba(26,82,118,0.50)" },
  { base: "#1a7a6a", light: "#1abc9c", mid: "#0d4d42", glow: "rgba(26,122,106,0.50)" },
  { base: "#b8860b", light: "#FBEFA4", mid: "#7a5a05", glow: "rgba(251,239,164,0.50)" },
  { base: "#c9a227", light: "#ffe066", mid: "#8a6d10", glow: "rgba(201,162,39,0.50)" },
  { base: "#a07620", light: "#d4a017", mid: "#6b4f10", glow: "rgba(160,118,32,0.50)" },
  { base: "#7d5a0b", light: "#b8860b", mid: "#4d3608", glow: "rgba(125,90,11,0.45)" },
  { base: "#3a3a8c", light: "#6666cc", mid: "#1e1e5a", glow: "rgba(58,58,140,0.50)" },
];

export const getDecadeColor = (n) => DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)];