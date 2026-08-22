// import { useState, useEffect, useRef, useCallback } from "react";

// /* ─────────────────────────────────────────────
//    PALETTE
// ───────────────────────────────────────────── */
// const DECADE_COLORS = [
//   { base: "#004296", light: "#1a6fd8", mid: "#002b66" },
//   { base: "#005f8a", light: "#0090cc", mid: "#003a55" },
//   { base: "#1a5276", light: "#2e86c1", mid: "#0f2e45" },
//   { base: "#1a7a6a", light: "#1abc9c", mid: "#0d4d42" },
//   { base: "#b8860b", light: "#FBEFA4", mid: "#7a5a05" },
//   { base: "#c9a227", light: "#ffe066", mid: "#8a6d10" },
//   { base: "#a07620", light: "#d4a017", mid: "#6b4f10" },
//   { base: "#7d5a0b", light: "#b8860b", mid: "#4d3608" },
//   { base: "#3a3a8c", light: "#6666cc", mid: "#1e1e5a" },
// ];

// function dc(n) {
//   if (!n || n < 1) return DECADE_COLORS[0];
//   return DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)];
// }

// function ballGradient(n) {
//   const c = dc(n);
//   return `radial-gradient(circle at 35% 25%, ${c.light} 0%, ${c.base} 45%, ${c.mid} 100%)`;
// }

// /* ─────────────────────────────────────────────
//    ALL KEYFRAMES & ANIMATION STYLES
// ───────────────────────────────────────────── */
// const ANIMATION_STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');

//   * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }

//   .tl-shimmer-text {
//     background: linear-gradient(90deg,#c9b86c 0%,#ffe066 28%,#FBEFA4 50%,#ffe066 72%,#c9b86c 100%);
//     background-size: 600px 100%;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   /* ── IDLE FLOAT ── */
//   @keyframes tl-floatBig {
//     0%,100% { transform: translateY(0) scale(1); }
//     50%      { transform: translateY(-7px) scale(1.018); }
//   }
//   @keyframes tl-floatSmall {
//     0%,100% { transform: translateY(0) scale(1); }
//     50%      { transform: translateY(-4px) scale(1.022); }
//   }

//   /* ── BIG BALL GLOW PULSE ── */
//   @keyframes tl-bigGlow {
//     0%,100% {
//       box-shadow: 0 0 40px rgba(0,100,220,0.5), 0 0 80px rgba(0,66,150,0.2),
//                   inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.2);
//     }
//     50% {
//       box-shadow: 0 0 90px rgba(0,155,255,0.9), 0 0 160px rgba(0,66,150,0.5),
//                   inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.28);
//     }
//   }

//   /* ── TRAY BALL GLOW PULSE ── */
//   @keyframes tl-trayGlow {
//     0%,100% {
//       box-shadow: inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18),
//                   0 0 14px rgba(0,66,150,0.35), 0 4px 12px rgba(0,0,0,0.4);
//     }
//     50% {
//       box-shadow: inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18),
//                   0 0 30px rgba(0,120,255,0.65), 0 4px 12px rgba(0,0,0,0.4);
//     }
//   }

//   /* ── DROP IN (first number) ── */
//   @keyframes tl-ballDrop {
//     0%   { transform: translateY(-220px) scale(0.35) rotate(-18deg); opacity: 0; }
//     48%  { transform: translateY(20px) scale(1.13) rotate(2.5deg);   opacity: 1; }
//     64%  { transform: translateY(-10px) scale(0.93) rotate(-1deg); }
//     78%  { transform: translateY(6px) scale(1.04) rotate(0.5deg); }
//     89%  { transform: translateY(-2px) scale(0.98); }
//     100% { transform: translateY(0) scale(1) rotate(0deg);            opacity: 1; }
//   }

//   /* ── FLIP (subsequent numbers) ── */
//   @keyframes tl-ballFlip {
//     0%   { transform: rotateY(0deg) scale(1);    opacity: 1; }
//     30%  { transform: rotateY(90deg) scale(0.78); opacity: 0.08; }
//     70%  { transform: rotateY(-90deg) scale(0.78); opacity: 0.08; }
//     100% { transform: rotateY(0deg) scale(1);    opacity: 1; }
//   }

//   /* ── NUMBER POP ── */
//   @keyframes tl-numPop {
//     0%   { transform: scale(0.15) rotate(-12deg); opacity: 0; }
//     58%  { transform: scale(1.30) rotate(2deg); }
//     78%  { transform: scale(0.88) rotate(-1deg); }
//     100% { transform: scale(1) rotate(0deg);      opacity: 1; }
//   }

//   /* ── NUMBER PULSE (after pop) ── */
//   @keyframes tl-numPulse {
//     0%,100% { text-shadow: 0 2px 12px rgba(0,0,0,0.8); }
//     50%      { text-shadow: 0 0 22px rgba(255,255,255,0.7), 0 2px 12px rgba(0,0,0,0.8); }
//   }

//   /* ── SHINE SWEEP ── */
//   @keyframes tl-shine {
//     0%   { left: -90%; opacity: 0; }
//     8%   { opacity: 0.9; }
//     68%  { left: 135%; opacity: 0.85; }
//     100% { left: 135%; opacity: 0; }
//   }

//   /* ── TRIPLE RINGS ── */
//   @keyframes tl-ring1 { 0% { transform: scale(0.88); opacity: 0.95; } 100% { transform: scale(2.8);  opacity: 0; } }
//   @keyframes tl-ring2 { 0% { transform: scale(0.88); opacity: 0.65; } 100% { transform: scale(3.8);  opacity: 0; } }
//   @keyframes tl-ring3 { 0% { transform: scale(0.88); opacity: 0.35; } 100% { transform: scale(5.0);  opacity: 0; } }

//   /* ── SPARKLE PARTICLES ── */
//   @keyframes tl-spark {
//     0%   { transform: translate(0,0) scale(0); opacity: 1; }
//     55%  { opacity: 1; }
//     100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
//   }

//   /* ── TRAY SLIDE IN ── */
//   @keyframes tl-trayIn {
//     0%   { transform: translateY(-20px) scale(0.68); opacity: 0; }
//     65%  { transform: translateY(4px)   scale(1.06); opacity: 1; }
//     100% { transform: translateY(0)     scale(1);    opacity: 1; }
//   }

//   /* ── PREV BALL SETTLE ── */
//   @keyframes tl-prevSettle {
//     0%   { transform: scale(1.08); opacity: 0.5; }
//     100% { transform: scale(1);    opacity: 1; }
//   }

//   /* ── FLYING NUMBER ── */
//   @keyframes tl-flyNum {
//     0%   { opacity: 1; transform: scale(1.1); }
//     80%  { opacity: 0.85; }
//     100% { opacity: 0;    transform: scale(0.4); }
//   }

//   /* ── GRID CELL HIT ── */
//   @keyframes tl-cellHit {
//     0%   { transform: scale(1.04); }
//     35%  { transform: scale(1.58); }
//     58%  { transform: scale(0.87); }
//     78%  { transform: scale(1.14); }
//     100% { transform: scale(1.04); }
//   }
//   @keyframes tl-cellGlow {
//     0%,100% {
//       box-shadow: 0 0 10px rgba(0,66,150,0.3),
//                   inset -2px -2px 8px rgba(0,0,0,0.45),
//                   inset 1px 1px 6px rgba(255,255,255,0.18);
//     }
//     40% {
//       box-shadow: 0 0 32px rgba(80,180,255,0.95), 0 0 55px rgba(0,120,255,0.55),
//                   inset -2px -2px 8px rgba(0,0,0,0.3),
//                   inset 1px 1px 6px rgba(255,255,255,0.35);
//     }
//   }

//   /* ── MINI CONFETTI ── */
//   @keyframes tl-confetti {
//     0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
//     100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)) scale(0.3); opacity: 0; }
//   }

//   /* ── STATS POP ── */
//   @keyframes tl-statPop {
//     0%   { transform: scale(1); }
//     40%  { transform: scale(1.40); color: #fff; }
//     100% { transform: scale(1); }
//   }

//   /* ── GRID BALL IDLE (uncalled) ── */
//   @keyframes tl-gridIdle {
//     0%,100% { opacity: 0.45; }
//     50%      { opacity: 0.55; }
//   }

//   /* ─── Animation utility classes ─── */
//   .tl-float-big   { animation: tl-floatBig   3.2s ease-in-out infinite; }
//   .tl-float-small { animation: tl-floatSmall 2.8s ease-in-out infinite; }
//   .tl-float-small2{ animation: tl-floatSmall 3.4s ease-in-out 0.4s infinite; }

//   .tl-big-idle {
//     animation: tl-floatBig 3.2s ease-in-out infinite,
//                tl-bigGlow  2.8s ease-in-out infinite;
//   }
//   .tl-tray-idle {
//     animation: tl-floatSmall 2.8s ease-in-out infinite,
//                tl-trayGlow  2.6s ease-in-out infinite;
//   }
//   .tl-tray-idle2 {
//     animation: tl-floatSmall 3.4s ease-in-out 0.4s infinite,
//                tl-trayGlow  3.0s ease-in-out 0.3s infinite;
//   }

//   .tl-ball-drop {
//     animation: tl-ballDrop 0.80s cubic-bezier(0.22,0.61,0.36,1) forwards,
//                tl-bigGlow  2.8s ease-in-out 0.95s infinite,
//                tl-floatBig 3.2s ease-in-out 1.20s infinite;
//   }
//   .tl-ball-flip {
//     animation: tl-ballFlip 0.54s ease-in-out forwards,
//                tl-bigGlow  2.8s ease-in-out 0.60s infinite,
//                tl-floatBig 3.2s ease-in-out 0.80s infinite;
//   }

//   .tl-num-pop {
//     animation: tl-numPop   0.52s cubic-bezier(0.34,1.56,0.64,1) 0.54s both,
//                tl-numPulse 2.4s ease-in-out 1.2s infinite;
//   }
//   .tl-num-pop-flip {
//     animation: tl-numPop   0.52s cubic-bezier(0.34,1.56,0.64,1) 0.36s both,
//                tl-numPulse 2.4s ease-in-out 1.0s infinite;
//   }

//   .tl-shine-anim        { animation: tl-shine 1.1s ease-out 0.64s forwards; }
//   .tl-shine-anim-flip   { animation: tl-shine 1.1s ease-out 0.44s forwards; }

//   .tl-tray-in    { animation: tl-trayIn    0.45s cubic-bezier(0.34,1.3,0.64,1) both,
//                                tl-trayGlow  2.6s ease-in-out 0.5s infinite,
//                                tl-floatSmall 2.8s ease-in-out 0.5s infinite; }
//   .tl-prev-in    { animation: tl-prevSettle 0.38s ease both,
//                                tl-trayGlow  3.0s ease-in-out 0.3s infinite,
//                                tl-floatSmall 3.4s ease-in-out 0.4s infinite; }

//   .tl-cell-hit   { animation: tl-cellHit  0.55s cubic-bezier(0.34,1.4,0.64,1) both,
//                                tl-cellGlow 1.2s ease 0.25s; }
//   .tl-stat-pop   { animation: tl-statPop  0.4s ease both; }
// `;

// /* ─────────────────────────────────────────────
//    ANIMATION HELPERS
// ───────────────────────────────────────────── */

// /** Restart a CSS animation by toggling the class */
// function restartAnim(el, className) {
//   if (!el) return;
//   el.classList.remove(className);
//   void el.offsetWidth; // reflow
//   el.classList.add(className);
// }

// /** Fire ring burst around an element */
// function fireRings(wrapEl, n) {
//   if (!wrapEl) return;
//   const c = dc(n);
//   const configs = [
//     { id: "tl-ring1", color: `${c.light}cc`, anim: "tl-ring1 1.0s ease-out 0.18s forwards" },
//     { id: "tl-ring2", color: `${c.base}88`, anim: "tl-ring2 1.25s ease-out 0.30s forwards" },
//     { id: "tl-ring3", color: "rgba(251,239,164,0.45)", anim: "tl-ring3 1.55s ease-out 0.44s forwards" },
//   ];
//   configs.forEach(({ id, color, anim }) => {
//     let el = wrapEl.querySelector(`[data-ring="${id}"]`);
//     if (!el) return;
//     el.style.animation = "none";
//     el.style.borderColor = color;
//     void el.offsetWidth;
//     el.style.animation = anim;
//   });
// }

// /** Fire sparkle particles from center of an element */
// function fireSparkles(containerEl, originEl, n) {
//   if (!containerEl || !originEl) return;
//   const c = dc(n);
//   const oRect = originEl.getBoundingClientRect();
//   const cRect = containerEl.getBoundingClientRect();
//   const cx = oRect.left - cRect.left + oRect.width / 2;
//   const cy = oRect.top - cRect.top + oRect.height / 2;
//   const cols = [c.light, c.base, "#FBEFA4", "#fff", "#1abc9c", "#ffe066"];
//   const angles = Array.from({ length: 20 }, (_, i) => i * (360 / 20));
//   const frags = [];
//   angles.forEach((a, i) => {
//     const rad = a * Math.PI / 180;
//     const dist = 52 + Math.random() * 52;
//     const tx = Math.round(Math.cos(rad) * dist);
//     const ty = Math.round(Math.sin(rad) * dist);
//     const sz = 2.5 + Math.random() * 4.5;
//     const clr = cols[i % cols.length];
//     const isCircle = Math.random() > 0.45;
//     const delay = 0.22 + i * 0.024;
//     frags.push(
//       `<div style="position:absolute;left:${cx}px;top:${cy}px;width:${sz}px;height:${isCircle ? sz : sz * 2.5}px;` +
//       `border-radius:${isCircle ? "50%" : "2px"};background:${clr};` +
//       `--tx:${tx}px;--ty:${ty}px;` +
//       `animation:tl-spark ${0.75 + Math.random() * 0.35}s ease-out ${delay}s forwards;` +
//       `box-shadow:0 0 5px ${clr};transform:scale(0)"></div>`
//     );
//   });
//   containerEl.innerHTML = frags.join("");
//   setTimeout(() => { if (containerEl) containerEl.innerHTML = ""; }, 1600);
// }

// /** Fire mini confetti on a grid cell */
// function fireCellConfetti(containerEl, cellEl, n) {
//   if (!containerEl || !cellEl) return;
//   const c = dc(n);
//   const cRect = containerEl.getBoundingClientRect();
//   const rect = cellEl.getBoundingClientRect();
//   const cx = rect.left - cRect.left + rect.width / 2;
//   const cy = rect.top - cRect.top + rect.height / 2;
//   const cols = [c.light, "#FBEFA4", "#1abc9c", "#fff", c.base];
//   const frags = [];
//   for (let i = 0; i < 12; i++) {
//     const angle = Math.random() * Math.PI * 2;
//     const dist = 12 + Math.random() * 22;
//     const tx = Math.cos(angle) * dist;
//     const ty = Math.sin(angle) * dist;
//     const rot = (Math.random() - 0.5) * 720 + "deg";
//     const sz = 2 + Math.random() * 3.5;
//     const clr = cols[i % cols.length];
//     const dur = 0.5 + Math.random() * 0.3;
//     const delay = Math.random() * 0.1;
//     frags.push(
//       `<div style="position:absolute;left:${cx}px;top:${cy}px;width:${sz}px;height:${sz * (Math.random() > 0.5 ? 1 : 2.8)}px;` +
//       `border-radius:2px;background:${clr};` +
//       `--cx:${tx}px;--cy:${ty}px;--cr:${rot};` +
//       `animation:tl-confetti ${dur}s ease-out ${delay}s forwards"></div>`
//     );
//   }
//   containerEl.innerHTML += frags.join("");
//   setTimeout(() => { if (containerEl) containerEl.innerHTML = ""; }, 900);
// }

// /** Fly a number from tray to a grid cell using rAF bezier arc */
// function flyNumberToGrid(trayEl, gridEl, n, onLand) {
//   if (!trayEl || !gridEl) { onLand(); return; }
//   const tRect = trayEl.getBoundingClientRect();
//   const gRect = gridEl.getBoundingClientRect();
//   const c = dc(n);

//   const flyer = document.createElement("div");
//   const startX = tRect.left + tRect.width / 2 - 16;
//   const startY = tRect.top + tRect.height / 2 - 16;
//   const endX = gRect.left + gRect.width / 2 - 16;
//   const endY = gRect.top + gRect.height / 2 - 16;
//   const midX = (startX + endX) / 2;
//   const midY = Math.min(startY, endY) - 60;

//   flyer.style.cssText = [
//     "position:fixed",
//     `left:${startX}px`, `top:${startY}px`,
//     "width:32px", "height:32px",
//     "border-radius:50%",
//     `background:${ballGradient(n)}`,
//     `box-shadow:0 0 20px ${c.light}cc,inset -2px -2px 8px rgba(0,0,0,0.4)`,
//     "display:flex", "align-items:center", "justify-content:center",
//     "font-size:13px", "font-weight:900", "font-family:'Cinzel',serif",
//     "color:#fff", "text-shadow:0 1px 4px rgba(0,0,0,0.8)",
//     "z-index:9999", "pointer-events:none", "will-change:left,top,transform,opacity",
//   ].join(";");
//   flyer.textContent = n;
//   document.body.appendChild(flyer);

//   const dur = 520;
//   const start = performance.now();
//   const easeOut = t => 1 - Math.pow(1 - t, 3);

//   function step(now) {
//     const t = Math.min((now - start) / dur, 1);
//     const et = easeOut(t);
//     const bx = (1 - et) * (1 - et) * startX + 2 * (1 - et) * et * midX + et * et * endX;
//     const by = (1 - et) * (1 - et) * startY + 2 * (1 - et) * et * midY + et * et * endY;
//     flyer.style.left = bx + "px";
//     flyer.style.top = by + "px";
//     const sc = t < 0.5 ? 1 + t * 0.3 : 1.3 - (t - 0.5) * 2 * 0.9;
//     flyer.style.transform = `scale(${sc})`;
//     flyer.style.opacity = t > 0.8 ? String(1 - (t - 0.8) * 5) : "1";
//     if (t < 1) { requestAnimationFrame(step); }
//     else { flyer.remove(); onLand(); }
//   }
//   requestAnimationFrame(step);
// }

// /* ══════════════════════════════════════════════════
//    BALL COMPONENTS  (animations added, logic unchanged)
// ══════════════════════════════════════════════════ */

// function BigBall({ number, size = 148, animKey = 0, isFirstDrop = false, sparkContainerRef }) {
//   const sphereRef = useRef(null);
//   const numRef = useRef(null);
//   const shineRef = useRef(null);
//   const wrapRef = useRef(null);
//   const prevKeyRef = useRef(-1);

//   const hasNum = number !== null && number !== undefined;

//   // Idle float+glow when no number yet
//   useEffect(() => {
//     const sp = sphereRef.current;
//     if (!sp || hasNum) return;
//     sp.className = "tl-big-idle";
//   }, [hasNum]);

//   // Trigger entry animation on animKey change
//   useEffect(() => {
//     if (!hasNum || animKey === prevKeyRef.current) return;
//     prevKeyRef.current = animKey;

//     const sp = sphereRef.current;
//     const nm = numRef.current;
//     const sh = shineRef.current;
//     if (!sp || !nm || !sh) return;

//     // Reset
//     sp.style.animation = "none"; nm.style.animation = "none"; sh.style.animation = "none";
//     void sp.offsetWidth;

//     // Entry
//     sp.className = isFirstDrop ? "tl-ball-drop" : "tl-ball-flip";
//     nm.className = isFirstDrop ? "tl-num-pop" : "tl-num-pop-flip";
//     sh.className = isFirstDrop ? "tl-shine-anim" : "tl-shine-anim-flip";

//     // Rings + sparkles
//     fireRings(wrapRef.current, number);
//     const delay = isFirstDrop ? 300 : 200;
//     const sc = sparkContainerRef?.current;
//     const sp2 = sphereRef.current;
//     setTimeout(() => fireSparkles(sc, sp2, number), delay);
//   }, [animKey, hasNum, isFirstDrop, number, sparkContainerRef]);

//   const fontSize = size * 0.36;

//   return (
//     <div ref={wrapRef} style={{ width: size, height: size, opacity: hasNum ? 1 : 0, transition: "opacity 0.3s ease", position: "relative" }}>
//       {/* Triple rings */}
//       {["tl-ring1", "tl-ring2", "tl-ring3"].map(id => (
//         <div key={id} data-ring={id} style={{
//           position: "absolute", inset: 0, borderRadius: "50%",
//           border: "2px solid transparent", pointerEvents: "none", opacity: 0,
//         }} />
//       ))}
//       {/* Sphere */}
//       <div
//         ref={sphereRef}
//         className={hasNum ? "" : "tl-big-idle"}
//         style={{
//           width: size, height: size,
//           borderRadius: "50%",
//           background: hasNum ? ballGradient(number) : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
//           boxShadow: hasNum
//             ? "0 0 40px rgba(0,66,150,0.5), 0 0 80px rgba(0,66,150,0.2), inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.2)"
//             : "inset -8px -8px 22px rgba(0,0,0,0.6)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           position: "relative", overflow: "hidden",
//         }}
//       >
//         {hasNum && (
//           <div style={{
//             position: "absolute",
//             top: size * 0.10, left: size * 0.18,
//             width: size * 0.32, height: size * 0.18,
//             background: "rgba(255,255,255,0.25)",
//             borderRadius: "50%",
//             transform: "rotate(-30deg)",
//             filter: `blur(${size < 60 ? 1.5 : 4}px)`,
//             pointerEvents: "none",
//           }} />
//         )}
//         {/* Shine sweep */}
//         <div
//           ref={shineRef}
//           style={{
//             position: "absolute", top: 0, bottom: 0, width: "42%",
//             background: "linear-gradient(108deg, transparent, rgba(255,255,255,0.45), transparent)",
//             borderRadius: "50%", left: "-90%", opacity: 0, pointerEvents: "none",
//           }}
//         />
//         <span
//           ref={numRef}
//           style={{
//             fontSize,
//             fontWeight: 900,
//             fontFamily: "'Cinzel', serif",
//             color: "#fff",
//             textShadow: "0 2px 12px rgba(0,0,0,0.8)",
//             zIndex: 1, lineHeight: 1,
//             position: "relative",
//           }}
//         >
//           {hasNum ? number : ""}
//         </span>
//       </div>
//     </div>
//   );
// }

// function TrayBall({ number, size = 64, animVariant = "none", forwardRef }) {
//   const ballRef = useRef(null);

//   // Merge internal ref + forwardRef
//   const setRef = useCallback((el) => {
//     ballRef.current = el;
//     if (forwardRef) forwardRef.current = el;
//   }, [forwardRef]);

//   useEffect(() => {
//     const el = ballRef.current;
//     if (!el || number === null || number === undefined) return;
//     el.style.animation = "none";
//     void el.offsetWidth;
//     if (animVariant === "latest") el.className = "tl-tray-in";
//     else if (animVariant === "prev") el.className = "tl-prev-in";
//     else el.className = "tl-tray-idle";
//   }, [number, animVariant]);

//   if (number === null || number === undefined) {
//     return (
//       <div style={{
//         width: size * 0.45, height: size * 0.45,
//         borderRadius: "50%",
//         background: "rgba(251,239,164,0.04)",
//         border: "1px dashed rgba(251,239,164,0.12)",
//       }} />
//     );
//   }

//   return (
//     <div
//       ref={setRef}
//       className="tl-tray-idle"
//       style={{
//         width: size, height: size,
//         borderRadius: "50%",
//         background: ballGradient(number),
//         boxShadow: "inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18), 0 0 18px rgba(0,66,150,0.4), 0 4px 12px rgba(0,0,0,0.4)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         position: "relative", flexShrink: 0,
//       }}
//     >
//       <div style={{
//         position: "absolute",
//         top: size * 0.10, left: size * 0.18,
//         width: size * 0.32, height: size * 0.18,
//         background: "rgba(255,255,255,0.25)",
//         borderRadius: "50%",
//         transform: "rotate(-30deg)",
//         filter: "blur(2px)",
//         pointerEvents: "none",
//       }} />
//       <span style={{
//         fontSize: size * 0.33, fontWeight: 900,
//         fontFamily: "'Cinzel', serif", color: "#fff",
//         textShadow: "0 1px 6px rgba(0,0,0,0.7)",
//         zIndex: 1, lineHeight: 1, position: "relative",
//       }}>
//         {number}
//       </span>
//     </div>
//   );
// }

// function GridBall({ number, called, size = 44, justCalled = false, registerRef, confContainerRef }) {
//   const ballRef = useRef(null);

//   // Register DOM ref into parent's gridCellRefs map
//   const setRef = useCallback((el) => {
//     ballRef.current = el;
//     if (registerRef) registerRef(number, el);
//   }, [number, registerRef]);

//   // Cell-hit animation + confetti when justCalled flips to true
//   useEffect(() => {
//     if (!justCalled) return;
//     const el = ballRef.current;
//     if (!el) return;
//     el.style.animation = "none";
//     void el.offsetWidth;
//     el.className = "tl-cell-hit";
//     fireCellConfetti(confContainerRef?.current, el, number);
//   }, [justCalled, number, confContainerRef]);

//   return (
//     <div
//       ref={setRef}
//       style={{
//         width: size, height: size,
//         borderRadius: "50%",
//         background: called
//           ? ballGradient(number)
//           : "radial-gradient(circle at 35% 25%, #1e2640, #000d1a)",
//         boxShadow: called
//           ? "0 0 10px rgba(0,66,150,0.3), inset -2px -2px 8px rgba(0,0,0,0.45), inset 1px 1px 6px rgba(255,255,255,0.18)"
//           : "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         position: "relative",
//         transform: called ? "scale(1.04)" : "scale(1)",
//         opacity: called ? 1 : 0.45,
//         transition: "all 0.3s ease",
//       }}
//     >
//       {called && (
//         <div style={{
//           position: "absolute",
//           top: size * 0.10, left: size * 0.18,
//           width: size * 0.28, height: size * 0.16,
//           background: "rgba(255,255,255,0.2)",
//           borderRadius: "50%",
//           transform: "rotate(-30deg)",
//           filter: "blur(1.5px)",
//           pointerEvents: "none",
//         }} />
//       )}
//       <span style={{
//         fontSize: size * 0.33, fontWeight: 800,
//         fontFamily: "'Cinzel', serif",
//         color: called ? "#fff" : "rgba(255,255,255,0.20)",
//         textShadow: called ? "0 1px 4px rgba(0,0,0,0.7)" : "none",
//         zIndex: 1, lineHeight: 1, position: "relative",
//       }}>
//         {number}
//       </span>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════
//    MAIN COMPONENT  (all original logic preserved)
// ══════════════════════════════════════════════════ */
// export default function TambolaLive({
//   gameId,
//   connected = false,
//   gameStatus = "waiting",
//   calledNumbers = [],
//   calledCount = 0,
//   lastCalledNum = null,
// }) {
//   /* ── Responsive ── */
//   const containerRef = useRef(null);
//   const [containerW, setContainerW] = useState(1000);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     setContainerW(el.offsetWidth);
//     const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const isMobile = containerW < 520;
//   const isNarrow = containerW < 820;
//   const BIG = isMobile ? 88 : isNarrow ? 112 : 144;
//   const TRAY = isMobile ? 48 : isNarrow ? 58 : 68;
//   const TRAY_SLOT = isMobile ? 58 : isNarrow ? 68 : 82;
//   const GRID = isMobile ? 26 : isNarrow ? 35 : 44;
//   const LEFT_W = isNarrow ? 215 : 345;

//   /* ── Board state ── */
//   const [calledSet, setCalledSet] = useState(new Set());
//   const [done, setDone] = useState(false);
//   // Numbers jinka reveal (grid highlight) ho chuka hai
//   const revealedNumbersRef = useRef(new Set());
//   // Numbers jo abhi animation queue mein hain (inhe turant reveal mat karo)
//   const queuedNumbersRef = useRef(new Set());

//   useEffect(() => {
//     const incoming = new Set(calledNumbers);
//     let changed = false;

//     incoming.forEach((n) => {
//       // Agar ye number queue mein nahi hai (matlab kabhi announce hi nahi hua,
//       // jaise page reload / reconnect / bulk sync), to turant reveal karo
//       if (!revealedNumbersRef.current.has(n) && !queuedNumbersRef.current.has(n)) {
//         revealedNumbersRef.current.add(n);
//         changed = true;
//       }
//     });

//     if (changed) {
//       setCalledSet(new Set(revealedNumbersRef.current));
//     }
//   }, [calledNumbers]);

//   useEffect(() => {
//     if (gameStatus === "over") setDone(true);
//     if (gameStatus === "started") setDone(false);
//   }, [gameStatus]);

//   /* ── Tray state (original, unchanged) ── */
//   const [latestNum, setLatestNum] = useState(null);
//   const [prevNum, setPrevNum] = useState(null);
//   const latestNumRef = useRef(null);
//   useEffect(() => { latestNumRef.current = latestNum; }, [latestNum]);

//   /* ── Animation state (NEW — layered on top) ── */
//   const [animKey, setAnimKey] = useState(0);
//   const [isFirstDrop, setIsFirstDrop] = useState(true);
//   const isFirstDropRef = useRef(true);  // ref mirror — readable inside callbacks
//   const [justCalledNum, setJustCalledNum] = useState(null); // which grid cell to animate
//   const [latestTrayVariant, setLatestTrayVariant] = useState("none");
//   const [prevTrayVariant, setPrevTrayVariant] = useState("none");

//   // Refs for DOM access needed by flying animation + sparkles + confetti
//   const sparkContainerRef = useRef(null);
//   const confContainerRef = useRef(null);
//   const trayLatestRef = useRef(null); // DOM ref for latest tray ball
//   const gridCellRefs = useRef({});   // { [number]: DOM el }

//   /* ── QUEUE SYSTEM (original, unchanged) ── */
//   const GAP_BETWEEN_NUMBERS = 5000;
//   const queueRef = useRef([]);
//   const isProcessingRef = useRef(false);
//   const timerRef = useRef(null);
//   const lastNumRef = useRef(null);

//   /* ── SOUND (original, unchanged) ── */
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const unlockAudio = () => {
//       try {
//         const AudioContext = window.AudioContext || window.webkitAudioContext;
//         if (AudioContext) {
//           const audioCtx = new AudioContext();
//           const buffer = audioCtx.createBuffer(1, 1, 22050);
//           const source = audioCtx.createBufferSource();
//           source.buffer = buffer;
//           source.connect(audioCtx.destination);
//           source.start(0);
//           source.onended = () => audioCtx.close();
//         }
//       } catch {
//         const silentAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYlmKQsAAAAAAD/+1DEAAAHAAb/AAAAIAAAP8AAAARMQUAABMQUAABLAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAvheh4PxQQBAEAQBP+8y0AABAABBwAAAABBwAAAAAAAAAAAAAAAP/zEMQAAAADSAAAAABQqb0y0AAAADAAAAA0TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
//         silentAudio.volume = 0.01;
//         silentAudio.play().then(() => { silentAudio.pause(); silentAudio.currentTime = 0; }).catch(() => { });
//       }
//     };
//     unlockAudio();
//     const events = ["click", "touchstart", "keydown", "scroll", "mousemove"];
//     events.forEach(ev => document.addEventListener(ev, unlockAudio, { once: true }));
//     return () => events.forEach(ev => document.removeEventListener(ev, unlockAudio));
//   }, []);

//   const playSoundOnly = useCallback((number) => {
//     try {
//       if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
//       const audio = new Audio(`/sounds/${number}.mp3`);
//       audio.volume = 1.0;
//       audio.preload = "auto";
//       audioRef.current = audio;
//       const p = audio.play();
//       if (p !== undefined) {
//         p.catch(() => {
//           const tryPlay = () => audio.play().catch(() => console.warn("Cannot play sound for", number));
//           document.addEventListener("click", tryPlay, { once: true });
//         });
//       }
//       audio.onended = () => { audioRef.current = null; };
//       audio.onerror = () => { audioRef.current = null; };
//     } catch (e) { console.warn("Sound error:", e); }
//   }, []);

//   /* ── processNextNumber — original logic + animation triggers ── */
//   const processNextNumber = useCallback(() => {
//     if (queueRef.current.length === 0) { isProcessingRef.current = false; return; }

//     isProcessingRef.current = true;
//     const nextNumber = queueRef.current.shift();

//     // ── 1. Big ball announces (original state updates) ──
//     const currentLatest = latestNumRef.current;
//     setPrevNum(currentLatest);
//     setLatestNum(nextNumber);

//     // ── 2. Trigger big ball animation ──
//     const firstDrop = isFirstDropRef.current;
//     if (firstDrop) {
//       isFirstDropRef.current = false;
//       setIsFirstDrop(false);
//     }
//     setAnimKey(k => k + 1);
//     setLatestTrayVariant("latest");
//     setPrevTrayVariant(currentLatest !== null ? "prev" : "none");

//     // ── 3. Play sound (original) ──
//     playSoundOnly(nextNumber);

//     // ── 4. Wait for tray to render with new number (2 frames) then fly ──
//     //       We need trayLatestRef to have updated position after React re-renders.
//     const flyDelay = firstDrop ? 900 : 700;
//     setTimeout(() => {
//       // Use requestAnimationFrame to ensure DOM has painted with new tray number
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           const trayEl = trayLatestRef.current;
//           const gridEl = gridCellRefs.current[nextNumber];
//           if (!trayEl || !gridEl) return; // silently skip if refs not ready
//           flyNumberToGrid(trayEl, gridEl, nextNumber, () => {
//             // ✅ Ab grid highlight yahin hoga — animation land hone ke baad
//         queuedNumbersRef.current.delete(nextNumber);
//         revealedNumbersRef.current.add(nextNumber);
//         setCalledSet(new Set(revealedNumbersRef.current));
//             // On land: trigger cell hit + confetti
//             setJustCalledNum(nextNumber);
//             setTimeout(() => setJustCalledNum(null), 800);
//           });
//         });
//       });
//     }, flyDelay);

//     // ── 5. Schedule next (original) ──
//     timerRef.current = setTimeout(processNextNumber, GAP_BETWEEN_NUMBERS);
//   }, [playSoundOnly]);

//   /* ── Watch for new numbers (original) ── */
//   useEffect(() => {
//     if (lastCalledNum !== null && lastCalledNum !== lastNumRef.current) {
//       lastNumRef.current = lastCalledNum;
//        queuedNumbersRef.current.add(lastCalledNum);   // ✅ ye grid mein turant highlight nahi hoga
//       queueRef.current.push(lastCalledNum);
//       if (!isProcessingRef.current) processNextNumber();
//     }
//   }, [lastCalledNum, processNextNumber]);

//   /* ── Clear when done (original) ── */
//   useEffect(() => {
//     if (done) {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       queueRef.current = [];
//       isProcessingRef.current = false;
//       if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
//     }
//   }, [done]);

//   /* ── Cleanup (original) ── */
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
//     };
//   }, []);

//   const pct = Math.round((calledCount / 90) * 100);

//   /* ══ Sub-components ══ */

//   // Stable callback — registers each GridBall's DOM element into gridCellRefs map
//   const registerGridRef = useCallback((n, el) => {
//     if (el) gridCellRefs.current[n] = el;
//     else delete gridCellRefs.current[n];
//   }, []);

//   const BoardGrid = ({ mobile = false }) => (
//     <div style={{
//       display: "grid", gridTemplateColumns: "repeat(10,1fr)",
//       gap: mobile ? 3 : isNarrow ? 5 : 7,
//       padding: mobile ? 6 : isNarrow ? 8 : 12,
//       width: "100%",
//       position: "relative",
//     }}>
//       {Array.from({ length: 90 }, (_, i) => {
//         const n = i + 1;
//         return (
//           <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}>
//             <GridBall
//               number={n}
//               called={calledSet.has(n)}
//               size={GRID}
//               justCalled={justCalledNum === n}
//               confContainerRef={confContainerRef}
//               registerRef={registerGridRef}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );

//   const TraySlot = ({ slotNum, label, vertical, variant = "none", ballRef }) => (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: vertical ? 4 : 6 }}>
//       <div style={{
//         width: TRAY_SLOT, height: TRAY_SLOT,
//         borderRadius: "50%",
//         background: "rgba(0,10,30,0.55)",
//         border: "1px solid rgba(251,239,164,0.10)",
//         boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         flexShrink: 0,
//       }}>
//         {/* ballRef goes on TrayBall itself so flyNumberToGrid gets the actual ball rect */}
//         <TrayBall number={slotNum} size={TRAY} animVariant={variant} forwardRef={variant === "latest" ? ballRef : undefined} />
//       </div>
//       <span style={{ fontSize: 7, color: "rgba(251,239,164,0.25)", letterSpacing: 1, whiteSpace: "nowrap", fontFamily: "'Cinzel',serif" }}>
//         {label}
//       </span>
//     </div>
//   );

//   const TraySlots = ({ vertical = false }) => (
//     <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 18, alignItems: "center" }}>
//       <TraySlot slotNum={latestNum} label="LATEST" vertical={vertical} variant={latestTrayVariant} ballRef={trayLatestRef} />
//       <TraySlot slotNum={prevNum} label="PREV" vertical={vertical} variant={prevTrayVariant} />
//     </div>
//   );

//   const BigBallArea = () => (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <BigBall
//         number={latestNum}
//         size={BIG}
//         animKey={animKey}
//         isFirstDrop={animKey === 1}   // animKey 1 = first ever call = drop; rest = flip
//         sparkContainerRef={sparkContainerRef}
//       />
//     </div>
//   );

//   const StatsBar = ({ compact = false }) => (
//     <div style={{ display: "flex", gap: 8, width: "100%" }}>
//       {[
//         { lbl: "CALLED", val: calledCount, color: "#FBEFA4" },
//         { lbl: "LEFT", val: 90 - calledCount, color: "#1abc9c" },
//       ].map(s => (
//         <div key={s.lbl} style={{
//           flex: 1, textAlign: "center",
//           padding: compact ? "5px 4px" : "9px 6px",
//           borderRadius: 10,
//           background: "rgba(0,20,51,0.45)",
//           border: "1px solid rgba(251,239,164,0.09)",
//         }}>
//           <div style={{ fontSize: compact ? 16 : 22, fontWeight: 900, fontFamily: "'Cinzel',serif", color: s.color, lineHeight: 1 }}>
//             {s.val}
//           </div>
//           <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", letterSpacing: 2, marginTop: 3 }}>{s.lbl}</div>
//         </div>
//       ))}
//     </div>
//   );

//   const ProgressBar = () => (
//     <div style={{ width: "100%" }}>
//       <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(251,239,164,0.08)", overflow: "hidden" }}>
//         <div style={{
//           height: "100%", borderRadius: 2,
//           background: "linear-gradient(90deg,#004296,#b8860b,#FBEFA4)",
//           width: `${pct}%`,
//           transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
//           boxShadow: "0 0 8px rgba(251,239,164,0.55)",
//         }} />
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
//         <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>0</span>
//         <span style={{ fontSize: 7, color: "rgba(251,239,164,0.6)", fontFamily: "'Cinzel',serif" }}>{pct}%</span>
//         <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>90</span>
//       </div>
//     </div>
//   );

//   const StatusDot = () => (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 8,
//       padding: "6px 14px", borderRadius: 20,
//       background: "rgba(0,20,51,0.60)",
//       border: "1px solid rgba(251,239,164,0.12)",
//     }}>
//       <div style={{
//         width: 8, height: 8, borderRadius: "50%",
//         background: connected ? (gameStatus === "started" ? "#1abc9c" : "#FBEFA4") : "#ff4444",
//         boxShadow: connected ? `0 0 8px ${gameStatus === "started" ? "#1abc9c" : "#FBEFA4"}` : "0 0 8px #ff4444",
//       }} />
//       <span style={{ fontSize: 9, color: "rgba(255,255,255,0.70)", fontFamily: "'Cinzel',serif", letterSpacing: 1.5 }}>
//         {connected ? gameStatus.toUpperCase() : "OFFLINE"}
//       </span>
//     </div>
//   );

//   /* ══════════════════════════════════════════
//      RENDER
//   ══════════════════════════════════════════ */
//   return (
//     <>
//       <style>{ANIMATION_STYLES}</style>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%", overflow: "hidden", borderRadius: 18,
//           background: `
//             radial-gradient(ellipse at 15% 0%,  rgba(0,66,150,0.35) 0%, transparent 55%),
//             radial-gradient(ellipse at 85% 100%,rgba(251,239,164,0.07) 0%, transparent 50%),
//             linear-gradient(160deg,#002b66 0%,#001433 100%)
//           `,
//           border: "1px solid rgba(251,239,164,0.10)",
//           boxShadow: "0 0 0 1px rgba(0,66,150,0.40), 0 30px 80px rgba(0,8,25,0.85)",
//           color: "#fff", position: "relative",
//           fontFamily: "'Raleway',sans-serif",
//         }}
//       >
//         {/* Status */}
//         <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20 }}>
//           <StatusDot />
//         </div>

//         {/* Grid lines */}
//         <div style={{
//           position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
//           backgroundImage: `
//             linear-gradient(rgba(251,239,164,0.025) 1px,transparent 1px),
//             linear-gradient(90deg,rgba(251,239,164,0.025) 1px,transparent 1px)
//           `,
//           backgroundSize: "52px 52px",
//         }} />

//         {/* ── Spark overlay (sparkles from big ball) ── */}
//         <div
//           ref={sparkContainerRef}
//           style={{
//             position: "absolute", inset: 0, pointerEvents: "none",
//             zIndex: 18, borderRadius: 18, overflow: "hidden",
//           }}
//         />

//         {/* ── Confetti overlay (cell landing confetti) ── */}
//         <div
//           ref={confContainerRef}
//           style={{
//             position: "absolute", inset: 0, pointerEvents: "none",
//             zIndex: 17, borderRadius: 18, overflow: "hidden",
//           }}
//         />

//         {/* ══ MOBILE ══ */}
//         {isMobile && (
//           <div style={{ display: "flex", flexDirection: "column", padding: "14px 10px 20px", gap: 12, position: "relative", zIndex: 1 }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
//               <h1 className="tl-shimmer-text" style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, flexShrink: 0, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
//               <StatsBar compact />
//             </div>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
//               <BigBallArea />
//               <TraySlots vertical />
//             </div>
//             <ProgressBar />
//             <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 12, border: "1px solid rgba(251,239,164,0.05)" }}>
//               <BoardGrid mobile />
//             </div>
//           </div>
//         )}

//         {/* ══ TABLET ══ */}
//         {!isMobile && isNarrow && (
//           <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 500 }}>
//             <div style={{
//               flexShrink: 0, width: LEFT_W,
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               gap: 20, padding: "20px 14px",
//               borderRight: "1px solid rgba(251,239,164,0.06)",
//               background: "rgba(0,0,0,0.18)",
//             }}>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 7, color: "rgba(251,239,164,0.38)", letterSpacing: 5, marginBottom: 5 }}>✦ LIVE DRAW ✦</div>
//                 <h1 className="tl-shimmer-text" style={{ fontSize: 13, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
//               </div>
//               <BigBallArea />
//               <TraySlots />
//               <StatsBar />
//               <ProgressBar />
//             </div>
//             <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "16px 14px 14px 12px" }}>
//               <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
//                 <BoardGrid />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══ DESKTOP ══ */}
//         {!isMobile && !isNarrow && (
//           <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 560 }}>
//             <div style={{
//               flexShrink: 0, width: LEFT_W,
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               gap: 28, padding: "30px 22px",
//               borderRight: "1px solid rgba(251,239,164,0.07)",
//               background: "rgba(0,0,0,0.16)",
//               backdropFilter: "blur(6px)",
//             }}>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 7, color: "rgba(251,239,164,0.40)", letterSpacing: 5, marginBottom: 6 }}>✦ LIVE DRAW ✦</div>
//                 <h1 className="tl-shimmer-text" style={{ fontSize: 18, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
//                 <div style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: 3, marginTop: 4, fontFamily: "'Cinzel',serif" }}>90 BALL · LIVE DRAW</div>
//               </div>
//               <BigBallArea />
//               <TraySlots />
//               <StatsBar />
//               <ProgressBar />
//             </div>
//             <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "24px 24px 20px 18px", gap: 14 }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <div style={{ width: 2, height: 18, background: "linear-gradient(180deg,#FBEFA4,rgba(251,239,164,0))", borderRadius: 2 }} />
//                   <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>FULL BOARD</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)" }}>
//                   <span style={{ fontSize: 8, color: "rgba(255,255,255,0.40)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
//                 </div>
//               </div>
//               <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
//                 <BoardGrid />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══ DONE ══ */}
//         {done && (
//           <div style={{
//             position: "absolute", inset: 0, zIndex: 50,
//             background: "rgba(0,8,25,0.92)", backdropFilter: "blur(14px)",
//             borderRadius: 18,
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//             gap: 16,
//           }}>
//             <div style={{
//               fontSize: isMobile ? 24 : 36, fontWeight: 900,
//               fontFamily: "'Cinzel',serif", color: "#FBEFA4",
//               letterSpacing: 4,
//             }}>
//               GAME IS COMPLETED
//             </div>
//             <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 4 }}>ALL 90 NUMBERS CALLED</div>
//             <button
//               onClick={() => window.location.reload()}
//               style={{
//                 marginTop: 12, padding: "12px 36px",
//                 fontSize: 10, fontWeight: 700, fontFamily: "'Cinzel',serif", letterSpacing: 3,
//                 background: "linear-gradient(135deg,#FBEFA4,#c9b86c)", color: "#001433",
//                 border: "none", borderRadius: 30, cursor: "pointer",
//                 boxShadow: "0 4px 24px rgba(251,239,164,0.38)",
//               }}
//             >
//               PLAY AGAIN
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const DECADE_COLORS = [
  { base: "#004296", light: "#1a6fd8", mid: "#002b66" },
  { base: "#005f8a", light: "#0090cc", mid: "#003a55" },
  { base: "#1a5276", light: "#2e86c1", mid: "#0f2e45" },
  { base: "#1a7a6a", light: "#1abc9c", mid: "#0d4d42" },
  { base: "#b8860b", light: "#FBEFA4", mid: "#7a5a05" },
  { base: "#c9a227", light: "#ffe066", mid: "#8a6d10" },
  { base: "#a07620", light: "#d4a017", mid: "#6b4f10" },
  { base: "#7d5a0b", light: "#b8860b", mid: "#4d3608" },
  { base: "#3a3a8c", light: "#6666cc", mid: "#1e1e5a" },
];

function dc(n) {
  if (!n || n < 1) return DECADE_COLORS[0];
  return DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)];
}

function ballGradient(n) {
  const c = dc(n);
  return `radial-gradient(circle at 35% 25%, ${c.light} 0%, ${c.base} 45%, ${c.mid} 100%)`;
}

/* ─────────────────────────────────────────────
   ALL KEYFRAMES & ANIMATION STYLES
───────────────────────────────────────────── */
const ANIMATION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');

  * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }

  .tl-shimmer-text {
    background: linear-gradient(90deg,#c9b86c 0%,#ffe066 28%,#FBEFA4 50%,#ffe066 72%,#c9b86c 100%);
    background-size: 600px 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── IDLE FLOAT ── */
  @keyframes tl-floatBig {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-7px) scale(1.018); }
  }
  @keyframes tl-floatSmall {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-4px) scale(1.022); }
  }

  /* ── BIG BALL GLOW PULSE ── */
  @keyframes tl-bigGlow {
    0%,100% {
      box-shadow: 0 0 40px rgba(0,100,220,0.5), 0 0 80px rgba(0,66,150,0.2),
                  inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.2);
    }
    50% {
      box-shadow: 0 0 90px rgba(0,155,255,0.9), 0 0 160px rgba(0,66,150,0.5),
                  inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.28);
    }
  }

  /* ── TRAY BALL GLOW PULSE ── */
  @keyframes tl-trayGlow {
    0%,100% {
      box-shadow: inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18),
                  0 0 14px rgba(0,66,150,0.35), 0 4px 12px rgba(0,0,0,0.4);
    }
    50% {
      box-shadow: inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18),
                  0 0 30px rgba(0,120,255,0.65), 0 4px 12px rgba(0,0,0,0.4);
    }
  }

  /* ── DROP IN (first number) ── */
  @keyframes tl-ballDrop {
    0%   { transform: translateY(-220px) scale(0.35) rotate(-18deg); opacity: 0; }
    48%  { transform: translateY(20px) scale(1.13) rotate(2.5deg);   opacity: 1; }
    64%  { transform: translateY(-10px) scale(0.93) rotate(-1deg); }
    78%  { transform: translateY(6px) scale(1.04) rotate(0.5deg); }
    89%  { transform: translateY(-2px) scale(0.98); }
    100% { transform: translateY(0) scale(1) rotate(0deg);            opacity: 1; }
  }

  /* ── FLIP (subsequent numbers) ── */
  @keyframes tl-ballFlip {
    0%   { transform: rotateY(0deg) scale(1);    opacity: 1; }
    30%  { transform: rotateY(90deg) scale(0.78); opacity: 0.08; }
    70%  { transform: rotateY(-90deg) scale(0.78); opacity: 0.08; }
    100% { transform: rotateY(0deg) scale(1);    opacity: 1; }
  }

  /* ── NUMBER POP ── */
  @keyframes tl-numPop {
    0%   { transform: scale(0.15) rotate(-12deg); opacity: 0; }
    58%  { transform: scale(1.30) rotate(2deg); }
    78%  { transform: scale(0.88) rotate(-1deg); }
    100% { transform: scale(1) rotate(0deg);      opacity: 1; }
  }

  /* ── NUMBER PULSE (after pop) ── */
  @keyframes tl-numPulse {
    0%,100% { text-shadow: 0 2px 12px rgba(0,0,0,0.8); }
    50%      { text-shadow: 0 0 22px rgba(255,255,255,0.7), 0 2px 12px rgba(0,0,0,0.8); }
  }

  /* ── SHINE SWEEP ── */
  @keyframes tl-shine {
    0%   { left: -90%; opacity: 0; }
    8%   { opacity: 0.9; }
    68%  { left: 135%; opacity: 0.85; }
    100% { left: 135%; opacity: 0; }
  }

  /* ── TRIPLE RINGS ── */
  @keyframes tl-ring1 { 0% { transform: scale(0.88); opacity: 0.95; } 100% { transform: scale(2.8);  opacity: 0; } }
  @keyframes tl-ring2 { 0% { transform: scale(0.88); opacity: 0.65; } 100% { transform: scale(3.8);  opacity: 0; } }
  @keyframes tl-ring3 { 0% { transform: scale(0.88); opacity: 0.35; } 100% { transform: scale(5.0);  opacity: 0; } }

  /* ── SPARKLE PARTICLES ── */
  @keyframes tl-spark {
    0%   { transform: translate(0,0) scale(0); opacity: 1; }
    55%  { opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
  }

  /* ── TRAY SLIDE IN ── */
  @keyframes tl-trayIn {
    0%   { transform: translateY(-20px) scale(0.68); opacity: 0; }
    65%  { transform: translateY(4px)   scale(1.06); opacity: 1; }
    100% { transform: translateY(0)     scale(1);    opacity: 1; }
  }

  /* ── PREV BALL SETTLE ── */
  @keyframes tl-prevSettle {
    0%   { transform: scale(1.08); opacity: 0.5; }
    100% { transform: scale(1);    opacity: 1; }
  }

  /* ── FLYING NUMBER ── */
  @keyframes tl-flyNum {
    0%   { opacity: 1; transform: scale(1.1); }
    80%  { opacity: 0.85; }
    100% { opacity: 0;    transform: scale(0.4); }
  }

  /* ── GRID CELL HIT ── */
  @keyframes tl-cellHit {
    0%   { transform: scale(1.04); }
    35%  { transform: scale(1.58); }
    58%  { transform: scale(0.87); }
    78%  { transform: scale(1.14); }
    100% { transform: scale(1.04); }
  }
  @keyframes tl-cellGlow {
    0%,100% {
      box-shadow: 0 0 10px rgba(0,66,150,0.3),
                  inset -2px -2px 8px rgba(0,0,0,0.45),
                  inset 1px 1px 6px rgba(255,255,255,0.18);
    }
    40% {
      box-shadow: 0 0 32px rgba(80,180,255,0.95), 0 0 55px rgba(0,120,255,0.55),
                  inset -2px -2px 8px rgba(0,0,0,0.3),
                  inset 1px 1px 6px rgba(255,255,255,0.35);
    }
  }

  /* ── MINI CONFETTI ── */
  @keyframes tl-confetti {
    0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)) scale(0.3); opacity: 0; }
  }

  /* ── STATS POP ── */
  @keyframes tl-statPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.40); color: #fff; }
    100% { transform: scale(1); }
  }

  /* ── GRID BALL IDLE (uncalled) ── */
  @keyframes tl-gridIdle {
    0%,100% { opacity: 0.45; }
    50%      { opacity: 0.55; }
  }

  /* ─── Animation utility classes ─── */
  .tl-float-big   { animation: tl-floatBig   3.2s ease-in-out infinite; }
  .tl-float-small { animation: tl-floatSmall 2.8s ease-in-out infinite; }
  .tl-float-small2{ animation: tl-floatSmall 3.4s ease-in-out 0.4s infinite; }

  .tl-big-idle {
    animation: tl-floatBig 3.2s ease-in-out infinite,
               tl-bigGlow  2.8s ease-in-out infinite;
  }
  .tl-tray-idle {
    animation: tl-floatSmall 2.8s ease-in-out infinite,
               tl-trayGlow  2.6s ease-in-out infinite;
  }
  .tl-tray-idle2 {
    animation: tl-floatSmall 3.4s ease-in-out 0.4s infinite,
               tl-trayGlow  3.0s ease-in-out 0.3s infinite;
  }

  .tl-ball-drop {
    animation: tl-ballDrop 0.80s cubic-bezier(0.22,0.61,0.36,1) forwards,
               tl-bigGlow  2.8s ease-in-out 0.95s infinite,
               tl-floatBig 3.2s ease-in-out 1.20s infinite;
  }
  .tl-ball-flip {
    animation: tl-ballFlip 0.54s ease-in-out forwards,
               tl-bigGlow  2.8s ease-in-out 0.60s infinite,
               tl-floatBig 3.2s ease-in-out 0.80s infinite;
  }

  .tl-num-pop {
    animation: tl-numPop   0.52s cubic-bezier(0.34,1.56,0.64,1) 0.54s both,
               tl-numPulse 2.4s ease-in-out 1.2s infinite;
  }
  .tl-num-pop-flip {
    animation: tl-numPop   0.52s cubic-bezier(0.34,1.56,0.64,1) 0.36s both,
               tl-numPulse 2.4s ease-in-out 1.0s infinite;
  }

  .tl-shine-anim        { animation: tl-shine 1.1s ease-out 0.64s forwards; }
  .tl-shine-anim-flip   { animation: tl-shine 1.1s ease-out 0.44s forwards; }

  .tl-tray-in    { animation: tl-trayIn    0.45s cubic-bezier(0.34,1.3,0.64,1) both,
                               tl-trayGlow  2.6s ease-in-out 0.5s infinite,
                               tl-floatSmall 2.8s ease-in-out 0.5s infinite; }
  .tl-prev-in    { animation: tl-prevSettle 0.38s ease both,
                               tl-trayGlow  3.0s ease-in-out 0.3s infinite,
                               tl-floatSmall 3.4s ease-in-out 0.4s infinite; }

  .tl-cell-hit   { animation: tl-cellHit  0.55s cubic-bezier(0.34,1.4,0.64,1) both,
                               tl-cellGlow 1.2s ease 0.25s; }
  .tl-stat-pop   { animation: tl-statPop  0.4s ease both; }
`;

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */

/** Restart a CSS animation by toggling the class */
function restartAnim(el, className) {
  if (!el) return;
  el.classList.remove(className);
  void el.offsetWidth; // reflow
  el.classList.add(className);
}

/** Fire ring burst around an element */
function fireRings(wrapEl, n) {
  if (!wrapEl) return;
  const c = dc(n);
  const configs = [
    { id: "tl-ring1", color: `${c.light}cc`, anim: "tl-ring1 1.0s ease-out 0.18s forwards" },
    { id: "tl-ring2", color: `${c.base}88`,  anim: "tl-ring2 1.25s ease-out 0.30s forwards" },
    { id: "tl-ring3", color: "rgba(251,239,164,0.45)", anim: "tl-ring3 1.55s ease-out 0.44s forwards" },
  ];
  configs.forEach(({ id, color, anim }) => {
    let el = wrapEl.querySelector(`[data-ring="${id}"]`);
    if (!el) return;
    el.style.animation = "none";
    el.style.borderColor = color;
    void el.offsetWidth;
    el.style.animation = anim;
  });
}

/** Fire sparkle particles from center of an element */
function fireSparkles(containerEl, originEl, n) {
  if (!containerEl || !originEl) return;
  const c = dc(n);
  const oRect = originEl.getBoundingClientRect();
  const cRect = containerEl.getBoundingClientRect();
  const cx = oRect.left - cRect.left + oRect.width / 2;
  const cy = oRect.top  - cRect.top  + oRect.height / 2;
  const cols = [c.light, c.base, "#FBEFA4", "#fff", "#1abc9c", "#ffe066"];
  const angles = Array.from({ length: 20 }, (_, i) => i * (360 / 20));
  const frags = [];
  angles.forEach((a, i) => {
    const rad = a * Math.PI / 180;
    const dist = 52 + Math.random() * 52;
    const tx = Math.round(Math.cos(rad) * dist);
    const ty = Math.round(Math.sin(rad) * dist);
    const sz = 2.5 + Math.random() * 4.5;
    const clr = cols[i % cols.length];
    const isCircle = Math.random() > 0.45;
    const delay = 0.22 + i * 0.024;
    frags.push(
      `<div style="position:absolute;left:${cx}px;top:${cy}px;width:${sz}px;height:${isCircle ? sz : sz * 2.5}px;` +
      `border-radius:${isCircle ? "50%" : "2px"};background:${clr};` +
      `--tx:${tx}px;--ty:${ty}px;` +
      `animation:tl-spark ${0.75 + Math.random() * 0.35}s ease-out ${delay}s forwards;` +
      `box-shadow:0 0 5px ${clr};transform:scale(0)"></div>`
    );
  });
  containerEl.innerHTML = frags.join("");
  setTimeout(() => { if (containerEl) containerEl.innerHTML = ""; }, 1600);
}

/** Fire mini confetti on a grid cell */
function fireCellConfetti(containerEl, cellEl, n) {
  if (!containerEl || !cellEl) return;
  const c = dc(n);
  const cRect = containerEl.getBoundingClientRect();
  const rect  = cellEl.getBoundingClientRect();
  const cx = rect.left - cRect.left + rect.width / 2;
  const cy = rect.top  - cRect.top  + rect.height / 2;
  const cols = [c.light, "#FBEFA4", "#1abc9c", "#fff", c.base];
  const frags = [];
  for (let i = 0; i < 12; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = 12 + Math.random() * 22;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const rot   = (Math.random() - 0.5) * 720 + "deg";
    const sz    = 2 + Math.random() * 3.5;
    const clr   = cols[i % cols.length];
    const dur   = 0.5 + Math.random() * 0.3;
    const delay = Math.random() * 0.1;
    frags.push(
      `<div style="position:absolute;left:${cx}px;top:${cy}px;width:${sz}px;height:${sz * (Math.random() > 0.5 ? 1 : 2.8)}px;` +
      `border-radius:2px;background:${clr};` +
      `--cx:${tx}px;--cy:${ty}px;--cr:${rot};` +
      `animation:tl-confetti ${dur}s ease-out ${delay}s forwards"></div>`
    );
  }
  containerEl.innerHTML += frags.join("");
  setTimeout(() => { if (containerEl) containerEl.innerHTML = ""; }, 900);
}

/** Fly a number from tray to a grid cell using rAF bezier arc */
function flyNumberToGrid(trayEl, gridEl, n, onLand) {
  if (!trayEl || !gridEl) { onLand(); return; }
  const tRect = trayEl.getBoundingClientRect();
  const gRect = gridEl.getBoundingClientRect();
  const c = dc(n);

  const flyer = document.createElement("div");
  const startX = tRect.left + tRect.width / 2 - 16;
  const startY = tRect.top  + tRect.height / 2 - 16;
  const endX   = gRect.left + gRect.width  / 2 - 16;
  const endY   = gRect.top  + gRect.height / 2 - 16;
  const midX   = (startX + endX) / 2;
  const midY   = Math.min(startY, endY) - 60;

  flyer.style.cssText = [
    "position:fixed",
    `left:${startX}px`, `top:${startY}px`,
    "width:32px", "height:32px",
    "border-radius:50%",
    `background:${ballGradient(n)}`,
    `box-shadow:0 0 20px ${c.light}cc,inset -2px -2px 8px rgba(0,0,0,0.4)`,
    "display:flex", "align-items:center", "justify-content:center",
    "font-size:13px", "font-weight:900", "font-family:'Cinzel',serif",
    "color:#fff", "text-shadow:0 1px 4px rgba(0,0,0,0.8)",
    "z-index:9999", "pointer-events:none", "will-change:left,top,transform,opacity",
  ].join(";");
  flyer.textContent = n;
  document.body.appendChild(flyer);

  const dur = 520;
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const t  = Math.min((now - start) / dur, 1);
    const et = easeOut(t);
    const bx = (1 - et) * (1 - et) * startX + 2 * (1 - et) * et * midX + et * et * endX;
    const by = (1 - et) * (1 - et) * startY + 2 * (1 - et) * et * midY + et * et * endY;
    flyer.style.left = bx + "px";
    flyer.style.top  = by + "px";
    const sc = t < 0.5 ? 1 + t * 0.3 : 1.3 - (t - 0.5) * 2 * 0.9;
    flyer.style.transform = `scale(${sc})`;
    flyer.style.opacity   = t > 0.8 ? String(1 - (t - 0.8) * 5) : "1";
    if (t < 1) { requestAnimationFrame(step); }
    else        { flyer.remove(); onLand(); }
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════════
   BALL COMPONENTS  (animations added, logic unchanged)
══════════════════════════════════════════════════ */

function BigBall({ number, size = 148, animKey = 0, isFirstDrop = false, sparkContainerRef }) {
  const sphereRef  = useRef(null);
  const numRef     = useRef(null);
  const shineRef   = useRef(null);
  const wrapRef    = useRef(null);
  const prevKeyRef = useRef(-1);

  const hasNum = number !== null && number !== undefined;

  // Idle float+glow when no number yet
  useEffect(() => {
    const sp = sphereRef.current;
    if (!sp || hasNum) return;
    sp.className = "tl-big-idle";
  }, [hasNum]);

  // Trigger entry animation on animKey change
  useEffect(() => {
    if (!hasNum || animKey === prevKeyRef.current) return;
    prevKeyRef.current = animKey;

    const sp = sphereRef.current;
    const nm = numRef.current;
    const sh = shineRef.current;
    if (!sp || !nm || !sh) return;

    // Reset
    sp.style.animation = "none"; nm.style.animation = "none"; sh.style.animation = "none";
    void sp.offsetWidth;

    // Entry
    sp.className    = isFirstDrop ? "tl-ball-drop" : "tl-ball-flip";
    nm.className    = isFirstDrop ? "tl-num-pop"   : "tl-num-pop-flip";
    sh.className    = isFirstDrop ? "tl-shine-anim" : "tl-shine-anim-flip";

    // Rings + sparkles
    fireRings(wrapRef.current, number);
    const delay = isFirstDrop ? 300 : 200;
    const sc = sparkContainerRef?.current;
    const sp2 = sphereRef.current;
    setTimeout(() => fireSparkles(sc, sp2, number), delay);
  }, [animKey, hasNum, isFirstDrop, number, sparkContainerRef]);

  const fontSize = size * 0.36;

  return (
    <div ref={wrapRef} style={{ width: size, height: size, opacity: hasNum ? 1 : 0, transition: "opacity 0.3s ease", position: "relative" }}>
      {/* Triple rings */}
      {["tl-ring1", "tl-ring2", "tl-ring3"].map(id => (
        <div key={id} data-ring={id} style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid transparent", pointerEvents: "none", opacity: 0,
        }} />
      ))}
      {/* Sphere */}
      <div
        ref={sphereRef}
        className={hasNum ? "" : "tl-big-idle"}
        style={{
          width: size, height: size,
          borderRadius: "50%",
          background: hasNum ? ballGradient(number) : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
          boxShadow: hasNum
            ? "0 0 40px rgba(0,66,150,0.5), 0 0 80px rgba(0,66,150,0.2), inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.2)"
            : "inset -8px -8px 22px rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {hasNum && (
          <div style={{
            position: "absolute",
            top: size * 0.10, left: size * 0.18,
            width: size * 0.32, height: size * 0.18,
            background: "rgba(255,255,255,0.25)",
            borderRadius: "50%",
            transform: "rotate(-30deg)",
            filter: `blur(${size < 60 ? 1.5 : 4}px)`,
            pointerEvents: "none",
          }} />
        )}
        {/* Shine sweep */}
        <div
          ref={shineRef}
          style={{
            position: "absolute", top: 0, bottom: 0, width: "42%",
            background: "linear-gradient(108deg, transparent, rgba(255,255,255,0.45), transparent)",
            borderRadius: "50%", left: "-90%", opacity: 0, pointerEvents: "none",
          }}
        />
        <span
          ref={numRef}
          style={{
            fontSize,
            fontWeight: 900,
            fontFamily: "'Cinzel', serif",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            zIndex: 1, lineHeight: 1,
            position: "relative",
          }}
        >
          {hasNum ? number : ""}
        </span>
      </div>
    </div>
  );
}

function TrayBall({ number, size = 64, animVariant = "none", forwardRef }) {
  const ballRef = useRef(null);

  // Merge internal ref + forwardRef
  const setRef = useCallback((el) => {
    ballRef.current = el;
    if (forwardRef) forwardRef.current = el;
  }, [forwardRef]);

  useEffect(() => {
    const el = ballRef.current;
    if (!el || number === null || number === undefined) return;
    el.style.animation = "none";
    void el.offsetWidth;
    if      (animVariant === "latest") el.className = "tl-tray-in";
    else if (animVariant === "prev")   el.className = "tl-prev-in";
    else                               el.className = "tl-tray-idle";
  }, [number, animVariant]);

  if (number === null || number === undefined) {
    return (
      <div style={{
        width: size * 0.45, height: size * 0.45,
        borderRadius: "50%",
        background: "rgba(251,239,164,0.04)",
        border: "1px dashed rgba(251,239,164,0.12)",
      }} />
    );
  }

  return (
    <div
      ref={setRef}
      className="tl-tray-idle"
      style={{
        width: size, height: size,
        borderRadius: "50%",
        background: ballGradient(number),
        boxShadow: "inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18), 0 0 18px rgba(0,66,150,0.4), 0 4px 12px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: size * 0.10, left: size * 0.18,
        width: size * 0.32, height: size * 0.18,
        background: "rgba(255,255,255,0.25)",
        borderRadius: "50%",
        transform: "rotate(-30deg)",
        filter: "blur(2px)",
        pointerEvents: "none",
      }} />
      <span style={{
        fontSize: size * 0.33, fontWeight: 900,
        fontFamily: "'Cinzel', serif", color: "#fff",
        textShadow: "0 1px 6px rgba(0,0,0,0.7)",
        zIndex: 1, lineHeight: 1, position: "relative",
      }}>
        {number}
      </span>
    </div>
  );
}

function GridBall({ number, called, size = 44, justCalled = false, registerRef, confContainerRef }) {
  const ballRef = useRef(null);

  // Register DOM ref into parent's gridCellRefs map
  const setRef = useCallback((el) => {
    ballRef.current = el;
    if (registerRef) registerRef(number, el);
  }, [number, registerRef]);

  // Cell-hit animation + confetti when justCalled flips to true
  useEffect(() => {
    if (!justCalled) return;
    const el = ballRef.current;
    if (!el) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.className = "tl-cell-hit";
    fireCellConfetti(confContainerRef?.current, el, number);
  }, [justCalled, number, confContainerRef]);

  return (
    <div
      ref={setRef}
      style={{
        width: size, height: size,
        borderRadius: "50%",
        background: called
          ? ballGradient(number)
          : "radial-gradient(circle at 35% 25%, #1e2640, #000d1a)",
        boxShadow: called
          ? "0 0 10px rgba(0,66,150,0.3), inset -2px -2px 8px rgba(0,0,0,0.45), inset 1px 1px 6px rgba(255,255,255,0.18)"
          : "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        transform: called ? "scale(1.04)" : "scale(1)",
        opacity: called ? 1 : 0.45,
        transition: "all 0.3s ease",
      }}
    >
      {called && (
        <div style={{
          position: "absolute",
          top: size * 0.10, left: size * 0.18,
          width: size * 0.28, height: size * 0.16,
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          transform: "rotate(-30deg)",
          filter: "blur(1.5px)",
          pointerEvents: "none",
        }} />
      )}
      <span style={{
        fontSize: size * 0.33, fontWeight: 800,
        fontFamily: "'Cinzel', serif",
        color: called ? "#fff" : "rgba(255,255,255,0.20)",
        textShadow: called ? "0 1px 4px rgba(0,0,0,0.7)" : "none",
        zIndex: 1, lineHeight: 1, position: "relative",
      }}>
        {number}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function TambolaLive({
  gameId,
  connected    = false,
  gameStatus   = "waiting",
  calledNumbers = [],
  calledCount   = 0,
  lastCalledNum = null,
}) {
  /* ── Responsive ── */
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(1000);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile  = containerW < 520;
  const isNarrow  = containerW < 820;
  const BIG       = isMobile ? 88  : isNarrow ? 112 : 144;
  const TRAY      = isMobile ? 48  : isNarrow ? 58  : 68;
  const TRAY_SLOT = isMobile ? 58  : isNarrow ? 68  : 82;
  const GRID      = isMobile ? 26  : isNarrow ? 35  : 44;
  const LEFT_W    = isNarrow ? 215 : 345;

  /* ── Board state ── */
  const [calledSet, setCalledSet] = useState(new Set());
  const [done, setDone] = useState(false);

  // ✅ NEW: two-bucket tracking so the grid only lights up a number once its
  // announcement animation has actually landed — not the instant it shows
  // up in the `calledNumbers` prop from the server/socket.
  //
  // - revealedNumbersRef: numbers that are ALLOWED to show as highlighted
  //   in the grid right now (either because their reveal animation already
  //   landed, or because they were already-called numbers we picked up on
  //   mount/reconnect and never had an announcement to wait for).
  // - queuedNumbersRef: numbers that have been pushed into the animation
  //   queue and are waiting for / currently playing their announcement.
  //   While a number sits in this set we deliberately do NOT add it to
  //   calledSet, even though it's already present in the `calledNumbers`
  //   prop — this is what prevents the "grid shows it before it's announced"
  //   bug.
  const revealedNumbersRef = useRef(new Set());
  const queuedNumbersRef   = useRef(new Set());

  // ✅ CRITICAL: this tracks the last `lastCalledNum` we've already marked
  // as "queued". It must be updated during RENDER (see the line right after
  // this ref block), NOT inside a useEffect. Here's why:
  //
  // The parent fires `setCalledNumbers(...)` and `setLastCalledNum(...)`
  // together in the same socket handler tick, so React batches them into
  // ONE render/commit. Effects then run in the order they're declared in
  // this file. If marking a number as "queued" happened inside a
  // `useEffect([lastCalledNum])` declared AFTER the `useEffect([calledNumbers])`
  // below, then on that shared commit the calledNumbers-effect would run
  // FIRST — before the number had a chance to be marked queued — and it
  // would incorrectly reveal the number in the grid immediately, ahead of
  // its announcement animation.
  //
  // Writing to a ref during render (not in an effect) happens synchronously
  // as part of that same render pass, guaranteeing it is visible to every
  // effect that runs afterward for that commit, regardless of declaration
  // order or how React batches the two state updates.
  const lastSeenLastCalledNumRef = useRef(null);
  if (lastCalledNum !== null && lastCalledNum !== lastSeenLastCalledNumRef.current) {
    lastSeenLastCalledNumRef.current = lastCalledNum;
    queuedNumbersRef.current.add(lastCalledNum);
  }

  useEffect(() => {
    const incoming = new Set(calledNumbers);
    let changed = false;

    incoming.forEach((n) => {
      // Only auto-reveal numbers that are NOT currently waiting on an
      // announcement animation. Numbers that arrive via the live queue
      // get revealed later, from inside processNextNumber's landing
      // callback, once their fly-to-grid animation actually completes.
      if (!revealedNumbersRef.current.has(n) && !queuedNumbersRef.current.has(n)) {
        revealedNumbersRef.current.add(n);
        changed = true;
      }
    });

    if (changed) {
      setCalledSet(new Set(revealedNumbersRef.current));
    }
  }, [calledNumbers]);

  useEffect(() => {
    if (gameStatus === "over")    setDone(true);
    if (gameStatus === "started") setDone(false);
  }, [gameStatus]);

  /* ── Tray state (original, unchanged) ── */
  const [latestNum, setLatestNum] = useState(null);
  const [prevNum, setPrevNum]     = useState(null);
  const latestNumRef = useRef(null);
  useEffect(() => { latestNumRef.current = latestNum; }, [latestNum]);

  /* ── Animation state (NEW — layered on top) ── */
  const [animKey, setAnimKey]         = useState(0);
  const [isFirstDrop, setIsFirstDrop] = useState(true);
  const isFirstDropRef                = useRef(true);  // ref mirror — readable inside callbacks
  const [justCalledNum, setJustCalledNum] = useState(null); // which grid cell to animate
  const [latestTrayVariant, setLatestTrayVariant] = useState("none");
  const [prevTrayVariant, setPrevTrayVariant]     = useState("none");

  // Refs for DOM access needed by flying animation + sparkles + confetti
  const sparkContainerRef = useRef(null);
  const confContainerRef  = useRef(null);
  const trayLatestRef     = useRef(null); // DOM ref for latest tray ball
  const gridCellRefs      = useRef({});   // { [number]: DOM el }

  /* ── QUEUE SYSTEM (original, unchanged) ── */
  const GAP_BETWEEN_NUMBERS = 5000;
  const queueRef        = useRef([]);
  const isProcessingRef = useRef(false);
  const timerRef        = useRef(null);
  const lastNumRef      = useRef(null);

  /* ── SOUND (original, unchanged) ── */
  const audioRef = useRef(null);

  useEffect(() => {
    const unlockAudio = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioCtx = new AudioContext();
          const buffer   = audioCtx.createBuffer(1, 1, 22050);
          const source   = audioCtx.createBufferSource();
          source.buffer  = buffer;
          source.connect(audioCtx.destination);
          source.start(0);
          source.onended = () => audioCtx.close();
        }
      } catch {
        const silentAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYlmKQsAAAAAAD/+1DEAAAHAAb/AAAAIAAAP8AAAARMQUAABMQUAABLAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAvheh4PxQQBAEAQBP+8y0AABAABBwAAAABBwAAAAAAAAAAAAAAAP/zEMQAAAADSAAAAABQqb0y0AAAADAAAAA0TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        silentAudio.volume = 0.01;
        silentAudio.play().then(() => { silentAudio.pause(); silentAudio.currentTime = 0; }).catch(() => {});
      }
    };
    unlockAudio();
    const events = ["click", "touchstart", "keydown", "scroll", "mousemove"];
    events.forEach(ev => document.addEventListener(ev, unlockAudio, { once: true }));
    return () => events.forEach(ev => document.removeEventListener(ev, unlockAudio));
  }, []);

  const playSoundOnly = useCallback((number) => {
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      const audio = new Audio(`/sounds/${number}.mp3`);
      audio.volume  = 1.0;
      audio.preload = "auto";
      audioRef.current = audio;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          const tryPlay = () => audio.play().catch(() => console.warn("Cannot play sound for", number));
          document.addEventListener("click", tryPlay, { once: true });
        });
      }
      audio.onended = () => { audioRef.current = null; };
      audio.onerror = () => { audioRef.current = null; };
    } catch (e) { console.warn("Sound error:", e); }
  }, []);

  /* ── processNextNumber — original logic + animation triggers ── */
  const processNextNumber = useCallback(() => {
    if (queueRef.current.length === 0) { isProcessingRef.current = false; return; }

    isProcessingRef.current = true;
    const nextNumber = queueRef.current.shift();

    // ── 1. Big ball announces (original state updates) ──
    const currentLatest = latestNumRef.current;
    setPrevNum(currentLatest);
    setLatestNum(nextNumber);

    // ── 2. Trigger big ball animation ──
    const firstDrop = isFirstDropRef.current;
    if (firstDrop) {
      isFirstDropRef.current = false;
      setIsFirstDrop(false);
    }
    setAnimKey(k => k + 1);
    setLatestTrayVariant("latest");
    setPrevTrayVariant(currentLatest !== null ? "prev" : "none");

    // ── 3. Play sound (original) ──
    playSoundOnly(nextNumber);

    // ── 4. Wait for tray to render with new number (2 frames) then fly ──
    //       We need trayLatestRef to have updated position after React re-renders.
    const flyDelay = firstDrop ? 900 : 700;
    setTimeout(() => {
      // Use requestAnimationFrame to ensure DOM has painted with new tray number
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const trayEl = trayLatestRef.current;
          const gridEl = gridCellRefs.current[nextNumber];
          if (!trayEl || !gridEl) {
            // Refs not ready — still reveal the number in the grid so we
            // never get permanently stuck with it hidden forever.
            queuedNumbersRef.current.delete(nextNumber);
            revealedNumbersRef.current.add(nextNumber);
            setCalledSet(new Set(revealedNumbersRef.current));
            return;
          }
          flyNumberToGrid(trayEl, gridEl, nextNumber, () => {
            // ✅ Grid only gets highlighted HERE — once the fly-to-grid
            // animation has actually landed. This is what keeps the grid
            // in sync with the announcement instead of leaking the number
            // early.
            queuedNumbersRef.current.delete(nextNumber);
            revealedNumbersRef.current.add(nextNumber);
            setCalledSet(new Set(revealedNumbersRef.current));

            // On land: trigger cell hit + confetti
            setJustCalledNum(nextNumber);
            setTimeout(() => setJustCalledNum(null), 800);
          });
        });
      });
    }, flyDelay);

    // ── 5. Schedule next (original) ──
    timerRef.current = setTimeout(processNextNumber, GAP_BETWEEN_NUMBERS);
  }, [playSoundOnly]);

  /* ── Watch for new numbers (original queue-push logic) ── */
  useEffect(() => {
    if (lastCalledNum !== null && lastCalledNum !== lastNumRef.current) {
      lastNumRef.current = lastCalledNum;
      // Note: queuedNumbersRef.current.add(lastCalledNum) already happened
      // during render (see lastSeenLastCalledNumRef block above) — this is
      // just a safe idempotent re-add (Set.add is a no-op if already present).
      queuedNumbersRef.current.add(lastCalledNum);
      queueRef.current.push(lastCalledNum);
      if (!isProcessingRef.current) processNextNumber();
    }
  }, [lastCalledNum, processNextNumber]);

  /* ── Clear when done (original) ── */
  useEffect(() => {
    if (done) {
      if (timerRef.current) clearTimeout(timerRef.current);
      queueRef.current       = [];
      isProcessingRef.current = false;
      if (audioRef.current)  { audioRef.current.pause(); audioRef.current = null; }
    }
  }, [done]);

  /* ── Cleanup (original) ── */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const pct = Math.round((calledCount / 90) * 100);

  /* ══ Sub-components ══ */

  // Stable callback — registers each GridBall's DOM element into gridCellRefs map
  const registerGridRef = useCallback((n, el) => {
    if (el) gridCellRefs.current[n] = el;
    else    delete gridCellRefs.current[n];
  }, []);

  const BoardGrid = ({ mobile = false }) => (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(10,1fr)",
      gap: mobile ? 3 : isNarrow ? 5 : 7,
      padding: mobile ? 6 : isNarrow ? 8 : 12,
      width: "100%",
      position: "relative",
    }}>
      {Array.from({ length: 90 }, (_, i) => {
        const n = i + 1;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}>
            <GridBall
              number={n}
              called={calledSet.has(n)}
              size={GRID}
              justCalled={justCalledNum === n}
              confContainerRef={confContainerRef}
              registerRef={registerGridRef}
            />
          </div>
        );
      })}
    </div>
  );

  const TraySlot = ({ slotNum, label, vertical, variant = "none", ballRef }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: vertical ? 4 : 6 }}>
      <div style={{
        width: TRAY_SLOT, height: TRAY_SLOT,
        borderRadius: "50%",
        background: "rgba(0,10,30,0.55)",
        border: "1px solid rgba(251,239,164,0.10)",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {/* ballRef goes on TrayBall itself so flyNumberToGrid gets the actual ball rect */}
        <TrayBall number={slotNum} size={TRAY} animVariant={variant} forwardRef={variant === "latest" ? ballRef : undefined} />
      </div>
      <span style={{ fontSize: 7, color: "rgba(251,239,164,0.25)", letterSpacing: 1, whiteSpace: "nowrap", fontFamily: "'Cinzel',serif" }}>
        {label}
      </span>
    </div>
  );

  const TraySlots = ({ vertical = false }) => (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 18, alignItems: "center" }}>
      <TraySlot slotNum={latestNum} label="LATEST" vertical={vertical} variant={latestTrayVariant} ballRef={trayLatestRef} />
      <TraySlot slotNum={prevNum}   label="PREV"   vertical={vertical} variant={prevTrayVariant} />
    </div>
  );

  const BigBallArea = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BigBall
        number={latestNum}
        size={BIG}
        animKey={animKey}
        isFirstDrop={animKey === 1}   // animKey 1 = first ever call = drop; rest = flip
        sparkContainerRef={sparkContainerRef}
      />
    </div>
  );

  const StatsBar = ({ compact = false }) => (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {[
        { lbl: "CALLED", val: calledCount,      color: "#FBEFA4" },
        { lbl: "LEFT",   val: 90 - calledCount, color: "#1abc9c" },
      ].map(s => (
        <div key={s.lbl} style={{
          flex: 1, textAlign: "center",
          padding: compact ? "5px 4px" : "9px 6px",
          borderRadius: 10,
          background: "rgba(0,20,51,0.45)",
          border: "1px solid rgba(251,239,164,0.09)",
        }}>
          <div style={{ fontSize: compact ? 16 : 22, fontWeight: 900, fontFamily: "'Cinzel',serif", color: s.color, lineHeight: 1 }}>
            {s.val}
          </div>
          <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", letterSpacing: 2, marginTop: 3 }}>{s.lbl}</div>
        </div>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(251,239,164,0.08)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: "linear-gradient(90deg,#004296,#b8860b,#FBEFA4)",
          width: `${pct}%`,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 8px rgba(251,239,164,0.55)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>0</span>
        <span style={{ fontSize: 7, color: "rgba(251,239,164,0.6)",  fontFamily: "'Cinzel',serif" }}>{pct}%</span>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>90</span>
      </div>
    </div>
  );

  const StatusDot = () => (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "6px 14px", borderRadius: 20,
      background: "rgba(0,20,51,0.60)",
      border: "1px solid rgba(251,239,164,0.12)",
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: connected ? (gameStatus === "started" ? "#1abc9c" : "#FBEFA4") : "#ff4444",
        boxShadow: connected ? `0 0 8px ${gameStatus === "started" ? "#1abc9c" : "#FBEFA4"}` : "0 0 8px #ff4444",
      }} />
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.70)", fontFamily: "'Cinzel',serif", letterSpacing: 1.5 }}>
        {connected ? gameStatus.toUpperCase() : "OFFLINE"}
      </span>
    </div>
  );

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <>
      <style>{ANIMATION_STYLES}</style>

      <div
        ref={containerRef}
        style={{
          width: "100%", overflow: "hidden", borderRadius: 18,
          background: `
            radial-gradient(ellipse at 15% 0%,  rgba(0,66,150,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 100%,rgba(251,239,164,0.07) 0%, transparent 50%),
            linear-gradient(160deg,#002b66 0%,#001433 100%)
          `,
          border: "1px solid rgba(251,239,164,0.10)",
          boxShadow: "0 0 0 1px rgba(0,66,150,0.40), 0 30px 80px rgba(0,8,25,0.85)",
          color: "#fff", position: "relative",
          fontFamily: "'Raleway',sans-serif",
        }}
      >
        {/* Status */}
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20 }}>
          <StatusDot />
        </div>

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(251,239,164,0.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(251,239,164,0.025) 1px,transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }} />

        {/* ── Spark overlay (sparkles from big ball) ── */}
        <div
          ref={sparkContainerRef}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            zIndex: 18, borderRadius: 18, overflow: "hidden",
          }}
        />

        {/* ── Confetti overlay (cell landing confetti) ── */}
        <div
          ref={confContainerRef}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            zIndex: 17, borderRadius: 18, overflow: "hidden",
          }}
        />

        {/* ══ MOBILE ══ */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", padding: "14px 10px 20px", gap: 12, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <h1 className="tl-shimmer-text" style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, flexShrink: 0, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
              <StatsBar compact />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <BigBallArea />
              <TraySlots vertical />
            </div>
            <ProgressBar />
            <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 12, border: "1px solid rgba(251,239,164,0.05)" }}>
              <BoardGrid mobile />
            </div>
          </div>
        )}

        {/* ══ TABLET ══ */}
        {!isMobile && isNarrow && (
          <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 500 }}>
            <div style={{
              flexShrink: 0, width: LEFT_W,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 20, padding: "20px 14px",
              borderRight: "1px solid rgba(251,239,164,0.06)",
              background: "rgba(0,0,0,0.18)",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 7, color: "rgba(251,239,164,0.38)", letterSpacing: 5, marginBottom: 5 }}>✦ LIVE DRAW ✦</div>
                <h1 className="tl-shimmer-text" style={{ fontSize: 13, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
              </div>
              <BigBallArea />
              <TraySlots />
              <StatsBar />
              <ProgressBar />
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "16px 14px 14px 12px" }}>
              <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <BoardGrid />
              </div>
            </div>
          </div>
        )}

        {/* ══ DESKTOP ══ */}
        {!isMobile && !isNarrow && (
          <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 560 }}>
            <div style={{
              flexShrink: 0, width: LEFT_W,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 28, padding: "30px 22px",
              borderRight: "1px solid rgba(251,239,164,0.07)",
              background: "rgba(0,0,0,0.16)",
              backdropFilter: "blur(6px)",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 7, color: "rgba(251,239,164,0.40)", letterSpacing: 5, marginBottom: 6 }}>✦ LIVE DRAW ✦</div>
                <h1 className="tl-shimmer-text" style={{ fontSize: 18, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: 3, marginTop: 4, fontFamily: "'Cinzel',serif" }}>90 BALL · LIVE DRAW</div>
              </div>
              <BigBallArea />
              <TraySlots />
              <StatsBar />
              <ProgressBar />
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "24px 24px 20px 18px", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 2, height: 18, background: "linear-gradient(180deg,#FBEFA4,rgba(251,239,164,0))", borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>FULL BOARD</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)" }}>
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.40)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
                </div>
              </div>
              <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <BoardGrid />
              </div>
            </div>
          </div>
        )}

        {/* ══ DONE ══ */}
        {done && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 50,
            background: "rgba(0,8,25,0.92)", backdropFilter: "blur(14px)",
            borderRadius: 18,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 16,
          }}>
            <div style={{
              fontSize: isMobile ? 24 : 36, fontWeight: 900,
              fontFamily: "'Cinzel',serif", color: "#FBEFA4",
              letterSpacing: 4,
            }}>
             GAME IS COMPLETED
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 4 }}>ALL 90 NUMBERS CALLED</div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 12, padding: "12px 36px",
                fontSize: 10, fontWeight: 700, fontFamily: "'Cinzel',serif", letterSpacing: 3,
                background: "linear-gradient(135deg,#FBEFA4,#c9b86c)", color: "#001433",
                border: "none", borderRadius: 30, cursor: "pointer",
                boxShadow: "0 4px 24px rgba(251,239,164,0.38)",
              }}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </>
  );
}