import React from 'react';

const StatsBar = ({ compact = false, calledCount }) => {
  const stats = [
    { lbl: "CALLED", val: calledCount, accent: "#FBEFA4" },
    { lbl: "LEFT", val: 90 - calledCount, accent: "#1abc9c" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {stats.map(s => (
        <div key={s.lbl} style={{
          flex: 1, textAlign: "center",
          padding: compact ? "6px 4px" : "10px 6px",
          borderRadius: 10,
          background: "rgba(0,20,51,0.45)",
          border: "1px solid rgba(251,239,164,0.09)",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{ fontSize: compact ? 17 : 22, fontWeight: 900, fontFamily: "'Cinzel',serif", color: s.accent, lineHeight: 1 }}>
            {s.val}
          </div>
          <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", letterSpacing: 2, marginTop: 3 }}>{s.lbl}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;