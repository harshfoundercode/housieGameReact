import React from 'react';

const Particles = ({ active, color, size }) => {
  if (!active) return null;
  
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * 360;
    const dist = size * 0.65 + Math.random() * size * 0.45;
    const delay = Math.random() * 0.3;
    const dur = 1.2 + Math.random() * 0.7;
    const px = Math.cos((angle * Math.PI) / 180) * dist;
    const py = Math.sin((angle * Math.PI) / 180) * dist;
    const s = 2 + Math.random() * 3;
    return { px, py, delay, dur, s };
  });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            width: p.s, height: p.s,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 5px ${color}`,
            animation: `tl-particle${i % 3} ${p.dur}s ${p.delay}s ease-out forwards`,
            transform: "translate(-50%, -50%)",
            "--px": `${p.px}px`,
            "--py": `${p.py}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;