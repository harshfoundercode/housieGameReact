import React from 'react';

const DoneOverlay = ({ isMobile }) => {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: "rgba(0,8,25,0.92)",
      backdropFilter: "blur(14px)",
      borderRadius: 18,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 16,
      animation: "tl-doneFade 0.8s ease forwards",
    }}>
      {[{ s: 320, a: "tl-rotateSlow 12s linear infinite", c: "rgba(251,239,164,0.09)" }, 
        { s: 220, a: "tl-rotateSlow 8s linear infinite reverse", c: "rgba(0,66,150,0.22)" }]
        .map((r, i) => (
          <div key={i} style={{ position: "absolute", width: r.s, height: r.s, borderRadius: "50%", border: `1px solid ${r.c}`, animation: r.a }} />
        ))}
      <div style={{ fontSize: isMobile ? 11 : 13, letterSpacing: 6, color: "rgba(251,239,164,0.55)", fontFamily: "'Cinzel',serif" }}>✦ ✦ ✦</div>
      <div style={{
        fontSize: isMobile ? 24 : 36, fontWeight: 900,
        fontFamily: "'Cinzel',serif", color: "#FBEFA4",
        animation: "tl-doneGlow 2s ease-in-out infinite",
        letterSpacing: 4, textAlign: "center",
      }}>
        FULL HOUSE
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 4, fontFamily: "'Raleway',sans-serif" }}>
        ALL 90 NUMBERS CALLED
      </div>
      <div style={{ fontSize: isMobile ? 11 : 13, letterSpacing: 6, color: "rgba(251,239,164,0.55)", fontFamily: "'Cinzel',serif" }}>✦ ✦ ✦</div>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: 12, padding: "12px 36px",
          fontSize: 10, fontWeight: 700,
          fontFamily: "'Cinzel',serif", letterSpacing: 3,
          background: "linear-gradient(135deg, #FBEFA4, #c9b86c)",
          color: "#001433",
          border: "none", borderRadius: 30,
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(251,239,164,0.38), 0 0 50px rgba(251,239,164,0.12)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(251,239,164,0.58)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(251,239,164,0.38)"; }}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default DoneOverlay;