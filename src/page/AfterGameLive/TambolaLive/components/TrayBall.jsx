import React from 'react';
import { ballGradient, ballBoxShadow } from '../utils/styles';

const TrayBall = ({ number, size = 64, isNew = false }) => {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: ballGradient(number),
      boxShadow: ballBoxShadow(number, "tray"),
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", flexShrink: 0,
      animation: isNew ? "tl-traySettle 0.6s cubic-bezier(0.16,1.2,0.3,1) forwards" : "none",
      willChange: "transform",
    }}>
      <div style={{
        position: "absolute", top: size * 0.14, left: size * 0.20,
        width: size * 0.28, height: size * 0.14,
        background: "rgba(255,255,255,0.42)", borderRadius: "50%",
        transform: "rotate(-30deg)", filter: "blur(2px)"
      }} />
      <div style={{
        position: "absolute", top: size * 0.18, left: size * 0.24,
        width: size * 0.16, height: size * 0.08,
        background: "rgba(255,255,255,0.58)", borderRadius: "50%",
        transform: "rotate(-30deg)", filter: "blur(1px)"
      }} />
      <span style={{
        fontSize: size * 0.32, fontWeight: 900,
        fontFamily: "'Cinzel', serif", color: "#fff",
        textShadow: "0 1px 6px rgba(0,0,0,0.7)",
        zIndex: 1, lineHeight: 1,
      }}>
        {number}
      </span>
    </div>
  );
};

export default TrayBall;