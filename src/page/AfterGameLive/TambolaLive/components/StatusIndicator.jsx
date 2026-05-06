import React from 'react';

const StatusIndicator = ({ connected, gameStatus }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      borderRadius: 20,
      background: "rgba(0,20,51,0.60)",
      border: "1px solid rgba(251,239,164,0.12)",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: connected ? (gameStatus === "started" ? "#1abc9c" : "#FBEFA4") : "#ff4444",
        boxShadow: connected ? `0 0 8px ${gameStatus === "started" ? "#1abc9c" : "#FBEFA4"}` : "0 0 8px #ff4444",
        animation: connected && gameStatus === "started" ? "tl-breathe 2s ease-in-out infinite" : "none",
      }} />
      <span style={{
        fontSize: 9,
        color: "rgba(255,255,255,0.70)",
        fontFamily: "'Cinzel',serif",
        letterSpacing: 1.5,
      }}>
        {connected ? gameStatus.toUpperCase() : "OFFLINE MODE"}
      </span>
    </div>
  );
};

export default StatusIndicator;