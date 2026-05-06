import React from 'react';
import { ballGradient, ballBoxShadow } from '../utils/styles';

const GridBall = ({ number, called, arriving, size = 44 }) => {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: called
        ? ballGradient(number)
        : "radial-gradient(circle at 35% 25%, #1e2640, #000d1a)",
      boxShadow: arriving
        ? ballBoxShadow(number, "grid-arriving")
        : called
          ? ballBoxShadow(number, "grid-called")
          : "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
      transition: called ? "box-shadow 0.8s ease, background 0.6s ease" : "none",
      animation: arriving ? "tl-gridArrive 0.7s cubic-bezier(0.16,1.3,0.3,1) forwards" : "none",
      cursor: "default", userSelect: "none",
      transform: called ? "scale(1.04)" : "scale(1)",
      opacity: called ? 1 : 0.45,
      willChange: "transform",
    }}>
      {called && (
        <div style={{
          position: "absolute", top: size * 0.12, left: size * 0.20,
          width: size * 0.28, height: size * 0.14,
          background: "rgba(255,255,255,0.38)", borderRadius: "50%",
          transform: "rotate(-30deg)", filter: "blur(1.5px)"
        }} />
      )}
      <span style={{
        fontSize: size * 0.33, fontWeight: 800,
        fontFamily: "'Cinzel', serif",
        color: called ? "#fff" : "rgba(255,255,255,0.20)",
        textShadow: called ? "0 1px 4px rgba(0,0,0,0.7)" : "none",
        zIndex: 1, lineHeight: 1,
      }}>
        {number}
      </span>
    </div>
  );
};

export default GridBall;