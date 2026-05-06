import React from 'react';
import { getDecadeColor } from '../utils/colors';
import { ballGradient, ballBoxShadow } from '../utils/styles';

const BigBall = ({ number, animKey, size = 148 }) => {
  const fontSize = size * 0.34;
  const c = number ? getDecadeColor(number) : null;

  return (
    <div
      key={`wrapper-${animKey}`}
      style={{
        animation: number ? "tl-ballReveal 1.8s ease-in-out forwards" : "none",
        willChange: "transform",
        width: size,
        height: size,
      }}
    >
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: number
          ? ballGradient(number)
          : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
        boxShadow: number
          ? ballBoxShadow(number, "big")
          : `inset -8px -8px 22px rgba(0,0,0,0.6),
             inset 6px 6px 16px rgba(255,255,255,0.04)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: size * 0.10, left: size * 0.18,
          width: size * 0.32, height: size * 0.18,
          background: "rgba(255,255,255,0.30)", borderRadius: "50%",
          transform: "rotate(-30deg)", filter: `blur(${size < 100 ? 2 : 4}px)`
        }} />
        <div style={{
          position: "absolute", top: size * 0.14, left: size * 0.22,
          width: size * 0.20, height: size * 0.10,
          background: "rgba(255,255,255,0.50)", borderRadius: "50%",
          transform: "rotate(-30deg)", filter: "blur(2px)"
        }} />
        <div style={{
          position: "absolute", bottom: size * 0.14, right: size * 0.18,
          width: size * 0.18, height: size * 0.08,
          background: "rgba(255,255,255,0.10)", borderRadius: "50%",
          transform: "rotate(20deg)", filter: "blur(3px)"
        }} />
        <span style={{
          fontSize: number ? fontSize : fontSize * 0.35,
          fontWeight: 900, fontFamily: "'Cinzel', serif",
          color: number ? "#fff" : "rgba(255,255,255,0.07)",
          textShadow: number ? "0 2px 12px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.2)" : "none",
          zIndex: 1, lineHeight: 1,
          letterSpacing: number && number < 10 ? "2px" : "0px",
        }}>
          {number ?? "·"}
        </span>
      </div>
    </div>
  );
};

export default BigBall;