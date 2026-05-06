import { getDecadeColor } from './colors';

export const ballGradient = (n) => {
  const c = getDecadeColor(n);
  return `radial-gradient(circle at 35% 25%, ${c.light} 0%, ${c.base} 45%, ${c.mid} 100%)`;
};

export const ballBoxShadow = (n, mode = "big") => {
  const c = getDecadeColor(n);
  const shadows = {
    big: `0 0 0 1px rgba(255,255,255,0.07),
          0 0 50px ${c.glow},
          0 0 100px ${c.glow.replace(/[\d.]+\)$/, "0.18)")},
          inset -10px -10px 24px rgba(0,0,0,0.5),
          inset 7px 7px 18px rgba(255,255,255,0.20)`,
    tray: `inset -3px -3px 10px rgba(0,0,0,0.45),
           inset 2px 2px 7px rgba(255,255,255,0.18),
           0 0 20px ${c.glow},
           0 4px 12px rgba(0,0,0,0.4)`,
    'grid-arriving': `0 0 0 2px rgba(255,255,255,0.12),
                      0 0 24px ${c.glow},
                      0 0 48px ${c.glow},
                      inset -3px -3px 10px rgba(0,0,0,0.5),
                      inset 2px 2px 8px rgba(255,255,255,0.25)`,
    'grid-called': `0 0 0 1px rgba(255,255,255,0.05),
                    0 2px 10px rgba(0,0,0,0.4),
                    0 0 12px ${c.glow.replace(/[\d.]+\)$/, "0.28)")},
                    inset -2px -2px 8px rgba(0,0,0,0.45),
                    inset 1px 1px 6px rgba(255,255,255,0.18)`,
    default: "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)"
  };
  return shadows[mode] || shadows.default;
};

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};