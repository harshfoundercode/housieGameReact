import React from 'react';
import { DECADE_COLORS } from '../utils/colors';

const Legend = () => {
  return (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
      {DECADE_COLORS.map((d, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 3,
          padding: "2px 6px", borderRadius: 6,
          background: "rgba(0,20,51,0.4)",
          border: "1px solid rgba(251,239,164,0.05)",
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 25%, ${d.light}, ${d.base})`,
            boxShadow: `0 0 4px ${d.glow}`,
          }} />
          <span style={{ fontSize: 6, color: "rgba(251,239,164,0.30)", fontFamily: "'Raleway',sans-serif" }}>
            {i * 10 + 1}–{(i + 1) * 10}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;