import React from 'react';

const ProgressBar = ({ calledCount }) => {
  const pct = Math.round((calledCount / 90) * 100);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(251,239,164,0.08)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: "linear-gradient(90deg, #004296, #b8860b, #FBEFA4)",
          width: `${pct}%`,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 8px rgba(251,239,164,0.55)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>0</span>
        <span style={{ fontSize: 7, color: "rgba(251,239,164,0.6)", fontFamily: "'Cinzel',serif" }}>{pct}%</span>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>90</span>
      </div>
    </div>
  );
};

export default ProgressBar;