
// import { useState, useEffect, useRef, useCallback } from "react";
// import { io } from "socket.io-client";
// import { API } from "../../services/api_url";

// /* ─────────────────────────────────────────────
//    PALETTE — Navy & Gold
// ───────────────────────────────────────────── */
// const DECADE_COLORS = [
//   { base: "#004296", light: "#1a6fd8", mid: "#002b66", glow: "rgba(0,66,150,0.55)" },
//   { base: "#005f8a", light: "#0090cc", mid: "#003a55", glow: "rgba(0,95,138,0.50)" },
//   { base: "#1a5276", light: "#2e86c1", mid: "#0f2e45", glow: "rgba(26,82,118,0.50)" },
//   { base: "#1a7a6a", light: "#1abc9c", mid: "#0d4d42", glow: "rgba(26,122,106,0.50)" },
//   { base: "#b8860b", light: "#FBEFA4", mid: "#7a5a05", glow: "rgba(251,239,164,0.50)" },
//   { base: "#c9a227", light: "#ffe066", mid: "#8a6d10", glow: "rgba(201,162,39,0.50)" },
//   { base: "#a07620", light: "#d4a017", mid: "#6b4f10", glow: "rgba(160,118,32,0.50)" },
//   { base: "#7d5a0b", light: "#b8860b", mid: "#4d3608", glow: "rgba(125,90,11,0.45)" },
//   { base: "#3a3a8c", light: "#6666cc", mid: "#1e1e5a", glow: "rgba(58,58,140,0.50)" },
// ];

// function dc(n) { return DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)]; }

// function ballGradient(n) {
//   const c = dc(n);
//   return `radial-gradient(circle at 35% 25%, ${c.light} 0%, ${c.base} 45%, ${c.mid} 100%)`;
// }

// function ballBoxShadow(n, mode = "big") {
//   const c = dc(n);
//   if (mode === "big")
//     return `0 0 0 1px rgba(255,255,255,0.07),
//             0 0 50px ${c.glow},
//             0 0 100px ${c.glow.replace(/[\d.]+\)$/, "0.18)")},
//             inset -10px -10px 24px rgba(0,0,0,0.5),
//             inset 7px 7px 18px rgba(255,255,255,0.20)`;
//   if (mode === "tray")
//     return `inset -3px -3px 10px rgba(0,0,0,0.45),
//             inset 2px 2px 7px rgba(255,255,255,0.18),
//             0 0 20px ${c.glow},
//             0 4px 12px rgba(0,0,0,0.4)`;
//   if (mode === "grid-arriving")
//     return `0 0 0 2px rgba(255,255,255,0.12),
//             0 0 24px ${c.glow},
//             0 0 48px ${c.glow},
//             inset -3px -3px 10px rgba(0,0,0,0.5),
//             inset 2px 2px 8px rgba(255,255,255,0.25)`;
//   if (mode === "grid-called")
//     return `0 0 0 1px rgba(255,255,255,0.05),
//             0 2px 10px rgba(0,0,0,0.4),
//             0 0 12px ${c.glow.replace(/[\d.]+\)$/, "0.28)")},
//             inset -2px -2px 8px rgba(0,0,0,0.45),
//             inset 1px 1px 6px rgba(255,255,255,0.18)`;
//   return "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)";
// }

// /* ─────────────────────────────────────────────
//    PARTICLES
// ───────────────────────────────────────────── */
// function Particles({ active, color, size }) {
//   if (!active) return null;
//   const particles = Array.from({ length: 14 }, (_, i) => {
//     const angle = (i / 14) * 360;
//     const dist = size * 0.65 + Math.random() * size * 0.45;
//     const delay = Math.random() * 0.3;
//     const dur = 1.2 + Math.random() * 0.7;
//     const px = Math.cos((angle * Math.PI) / 180) * dist;
//     const py = Math.sin((angle * Math.PI) / 180) * dist;
//     const s = 2 + Math.random() * 3;
//     return { px, py, delay, dur, s };
//   });
//   return (
//     <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
//       {particles.map((p, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             left: "50%", top: "50%",
//             width: p.s, height: p.s,
//             borderRadius: "50%",
//             background: color,
//             boxShadow: `0 0 5px ${color}`,
//             animation: `tl-particle${i % 3} ${p.dur}s ${p.delay}s ease-out forwards`,
//             transform: "translate(-50%, -50%)",
//             "--px": `${p.px}px`,
//             "--py": `${p.py}px`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    BIG DISPLAY BALL
// ───────────────────────────────────────────── */
// function BigBall({ number, animKey, size = 148 }) {
//   const fontSize = size * 0.34;
//   return (
//     <div
//       key={`wrapper-${animKey}`}
//       style={{
//         animation: number ? "tl-ballReveal 1.8s ease-in-out forwards" : "none",
//         willChange: "transform",
//         width: size,
//         height: size,
//       }}
//     >
//       <div style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         background: number
//           ? ballGradient(number)
//           : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
//         boxShadow: number
//           ? ballBoxShadow(number, "big")
//           : `inset -8px -8px 22px rgba(0,0,0,0.6),
//              inset 6px 6px 16px rgba(255,255,255,0.04)`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         flexShrink: 0,
//       }}>
//         <div style={{
//           position: "absolute", top: size * 0.10, left: size * 0.18, width: size * 0.32, height: size * 0.18,
//           background: "rgba(255,255,255,0.30)", borderRadius: "50%", transform: "rotate(-30deg)", filter: `blur(${size < 100 ? 2 : 4}px)`
//         }} />
//         <div style={{
//           position: "absolute", top: size * 0.14, left: size * 0.22, width: size * 0.20, height: size * 0.10,
//           background: "rgba(255,255,255,0.50)", borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(2px)"
//         }} />
//         <div style={{
//           position: "absolute", bottom: size * 0.14, right: size * 0.18, width: size * 0.18, height: size * 0.08,
//           background: "rgba(255,255,255,0.10)", borderRadius: "50%", transform: "rotate(20deg)", filter: "blur(3px)"
//         }} />
//         <span style={{
//           fontSize: number ? fontSize : fontSize * 0.35,
//           fontWeight: 900, fontFamily: "'Cinzel', serif",
//           color: number ? "#fff" : "rgba(255,255,255,0.07)",
//           textShadow: number ? "0 2px 12px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.2)" : "none",
//           zIndex: 1, lineHeight: 1,
//           letterSpacing: number && number < 10 ? "2px" : "0px",
//         }}>
//           {number ?? "·"}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    TRAY BALL
// ───────────────────────────────────────────── */
// function TrayBall({ number, size = 64, isNew = false }) {
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: ballGradient(number),
//       boxShadow: ballBoxShadow(number, "tray"),
//       display: "flex", alignItems: "center", justifyContent: "center",
//       position: "relative", flexShrink: 0,
//       animation: isNew ? "tl-traySettle 0.6s cubic-bezier(0.16,1.2,0.3,1) forwards" : "none",
//       willChange: "transform",
//     }}>
//       <div style={{
//         position: "absolute", top: size * 0.14, left: size * 0.20, width: size * 0.28, height: size * 0.14,
//         background: "rgba(255,255,255,0.42)", borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(2px)"
//       }} />
//       <div style={{
//         position: "absolute", top: size * 0.18, left: size * 0.24, width: size * 0.16, height: size * 0.08,
//         background: "rgba(255,255,255,0.58)", borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(1px)"
//       }} />
//       <span style={{
//         fontSize: size * 0.32, fontWeight: 900,
//         fontFamily: "'Cinzel', serif", color: "#fff",
//         textShadow: "0 1px 6px rgba(0,0,0,0.7)",
//         zIndex: 1, lineHeight: 1,
//       }}>
//         {number}
//       </span>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    GRID BALL
// ───────────────────────────────────────────── */
// function GridBall({ number, called, arriving, size = 44 }) {
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: called
//         ? ballGradient(number)
//         : "radial-gradient(circle at 35% 25%, #1e2640, #000d1a)",
//       boxShadow: arriving
//         ? ballBoxShadow(number, "grid-arriving")
//         : called
//           ? ballBoxShadow(number, "grid-called")
//           : "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       position: "relative",
//       transition: called ? "box-shadow 0.8s ease, background 0.6s ease" : "none",
//       animation: arriving ? "tl-gridArrive 0.7s cubic-bezier(0.16,1.3,0.3,1) forwards" : "none",
//       cursor: "default", userSelect: "none",
//       transform: called ? "scale(1.04)" : "scale(1)",
//       opacity: called ? 1 : 0.45,
//       willChange: "transform",
//     }}>
//       {called && (
//         <div style={{
//           position: "absolute", top: size * 0.12, left: size * 0.20, width: size * 0.28, height: size * 0.14,
//           background: "rgba(255,255,255,0.38)", borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(1.5px)"
//         }} />
//       )}
//       <span style={{
//         fontSize: size * 0.33, fontWeight: 800,
//         fontFamily: "'Cinzel', serif",
//         color: called ? "#fff" : "rgba(255,255,255,0.20)",
//         textShadow: called ? "0 1px 4px rgba(0,0,0,0.7)" : "none",
//         zIndex: 1, lineHeight: 1,
//       }}>
//         {number}
//       </span>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    FLYING BALL
// ───────────────────────────────────────────── */
// function FlyingBall({ from, to, number, size, targetSize, onDone, duration = 900 }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     if (!ref.current || !from || !to) return;
//     let cancelled = false;

//     const dx = to.x - from.x;
//     const dy = to.y - from.y;
//     const scale = targetSize / size;
//     const arcX = dx * 0.5;
//     const arcY = dy * 0.3 - Math.abs(dx) * 0.15;

//     const anim = ref.current.animate([
//       { transform: "translate(0px, 0px) scale(1)", opacity: 1, offset: 0 },
//       { transform: `translate(${arcX}px, ${arcY}px) scale(${0.9 + scale * 0.1})`, opacity: 1, offset: 0.45 },
//       { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.65, offset: 1 },
//     ], { duration, easing: "cubic-bezier(0.4,0,0.2,1)", fill: "forwards" });

//     anim.onfinish = () => {
//       if (!cancelled) onDone();  // double-fire guard
//     };

//     return () => {
//       cancelled = true;
//       anim.cancel();  // cleanup on unmount
//     };
//   }, []); // empty deps — intentional, ek baar hi run ho

//   return (
//     <div ref={ref} style={{
//       position: "fixed",
//       left: from.x - size / 2, top: from.y - size / 2,
//       width: size, height: size, borderRadius: "50%",
//       background: ballGradient(number),
//       boxShadow: ballBoxShadow(number, "tray"),
//       display: "flex", alignItems: "center", justifyContent: "center",
//       zIndex: 9999, pointerEvents: "none",
//       fontSize: size * 0.3, fontWeight: 900,
//       fontFamily: "'Cinzel', serif", color: "#fff",
//       textShadow: "0 1px 4px rgba(0,0,0,0.7)",
//       willChange: "transform",
//     }}>
//       <div style={{
//         position: "absolute", top: "12%", left: "20%", width: "28%", height: "14%",
//         background: "rgba(255,255,255,0.38)", borderRadius: "50%", transform: "rotate(-30deg)", filter: "blur(2px)"
//       }} />
//       {number}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════ */
// export default function TambolaLive({ gameId }) {
//   /* ── Socket state ── */
//   const socketRef = useRef(null);
//   const [gameStatus, setGameStatus] = useState("waiting");
//   const [connected, setConnected] = useState(false);

//   /* ── Game state ── */
//   const [calledSet, setCalledSet] = useState(new Set());
//   const [calledCount, setCalledCount] = useState(0);
//   const [bigNum, setBigNum] = useState(null);
//   const [bigKey, setBigKey] = useState(0);
//   const [showPulse, setShowPulse] = useState(false);
//   const [showParticles, setShowParticles] = useState(false);
//   const [tray, setTray] = useState([null, null]);
//   const [trayKey, setTrayKey] = useState([0, 0]);
//   const [fly, setFly] = useState(null);
//   const [arrivingCell, setArrivingCell] = useState(null);
//   const [done, setDone] = useState(false);

//   /* ── Backend state ── */
//   const [currentRoundId, setCurrentRoundId] = useState(null);
//   const [allTickets, setAllTickets] = useState([]);
//   const [winners, setWinners] = useState([]);

//   /* ── Responsive ── */
//   const containerRef = useRef(null);
//   const [containerW, setContainerW] = useState(1000);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     setContainerW(el.offsetWidth);
//     const ro = new ResizeObserver(e => setContainerW(e[0].contentRect.width));
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const isMobile = containerW < 520;
//   const isNarrow = containerW < 820;

//   const BIG_BALL_SIZE = isMobile ? 92 : isNarrow ? 116 : 148;
//   const TRAY_BALL_SIZE = isMobile ? 46 : isNarrow ? 54 : 64;
//   const TRAY_SLOT_SIZE = isMobile ? 54 : isNarrow ? 62 : 76;
//   const GRID_BALL_SIZE = isMobile ? 26 : isNarrow ? 36 : 44;
//   const LEFT_PANEL_W = isNarrow ? 210 : 340;

//   /* ── Refs ── */
//   const bigBallRef = useRef(null);
//   const slot0Ref = useRef(null);
//   const slot1Ref = useRef(null);
//   const cellRefs = useRef({});
//   const trayRef = useRef([null, null]);
//   const flyRef = useRef(null);
//   const pendingNumRef = useRef(null);
//   const busyRef = useRef(false);
//   const animatingRef = useRef(false); // FIX: blocks polling during animation
//   const animationTimeoutRef = useRef(null);
//   // FIX: store triggerAnimationForNumber in a ref to avoid circular dep in releaseBusy
//   const triggerRef = useRef(null);

//   trayRef.current = tray;

//   function getCenter(el) {
//     if (!el) return null;
//     const r = el.getBoundingClientRect();
//     return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
//   }

//   /* ─────────────────────────────────────────────
//      FIX: releaseBusy — no longer checks flyRef
//      toSlot0 is ALWAYS the terminal animation step,
//      so we release unconditionally from there.
//   ───────────────────────────────────────────── */
//   const releaseBusyAndProcessNext = useCallback(() => {
//     animatingRef.current = false; // re-enable polling
//     busyRef.current = false;
//     if (pendingNumRef.current !== null) {
//       const next = pendingNumRef.current;
//       pendingNumRef.current = null;
//       // Small delay so React state settles before next animation starts
//       setTimeout(() => {
//         if (triggerRef.current) triggerRef.current(next);
//       }, 50);
//     }
//   }, []);

//   /* ── Fly helpers ── */
//   const doFlySlot1ToBoard = useCallback((num, onDone) => {
//     setTray(p => { const t = [...p]; t[1] = null; return t; });
//     setFly({
//       from: getCenter(slot1Ref.current),
//       to: getCenter(cellRefs.current[num]),
//       number: num, size: TRAY_BALL_SIZE, targetSize: GRID_BALL_SIZE,
//       type: "toBoard", boardTarget: num, onDone, duration: 800,
//     });
//   }, [TRAY_BALL_SIZE, GRID_BALL_SIZE]);

//   const doFlySlot0ToSlot1 = useCallback((num, onDone) => {
//     setTray(p => { const t = [...p]; t[0] = null; return t; });
//     setFly({
//       from: getCenter(slot0Ref.current),
//       to: getCenter(slot1Ref.current),
//       number: num, size: TRAY_BALL_SIZE, targetSize: TRAY_BALL_SIZE,
//       type: "toSlot1", num, onDone, duration: 600,
//     });
//   }, [TRAY_BALL_SIZE]);

//   const doFlyBigToSlot0 = useCallback((num) => {
//     setFly({
//       from: getCenter(bigBallRef.current),
//       to: getCenter(slot0Ref.current),
//       number: num, size: BIG_BALL_SIZE * 0.68, targetSize: TRAY_BALL_SIZE,
//       type: "toSlot0", num, duration: 950,
//     });
//   }, [BIG_BALL_SIZE, TRAY_BALL_SIZE]);

//   const doFlySlot0ToBoard = useCallback((num, onDone) => {
//     setTray(p => { const t = [...p]; t[0] = null; return t; });
//     setFly({
//       from: getCenter(slot0Ref.current),
//       to: getCenter(cellRefs.current[num]),
//       number: num, size: TRAY_BALL_SIZE, targetSize: GRID_BALL_SIZE,
//       type: "toBoard", boardTarget: num, onDone, duration: 800,
//     });
//   }, [TRAY_BALL_SIZE, GRID_BALL_SIZE]);

//   /* ─────────────────────────────────────────────
//      FIX: handleFlyDone
//      - toBoard   → always release after landing
//      - toSlot1   → don't release (more steps follow in chain)
//      - toSlot0   → always release (terminal step in every chain)
//   ───────────────────────────────────────────── */
//   const handleFlyDone = useCallback(() => {
//     const f = flyRef.current;
//     setFly(null);
//     if (!f) return;

//     if (f.type === "toBoard") {
//       setCalledSet(prev => new Set([...prev, f.boardTarget]));
//       setArrivingCell(f.boardTarget);
//       setTimeout(() => setArrivingCell(null), 800);
//       if (f.onDone) setTimeout(f.onDone, 100);
//       // toBoard is terminal when there's no further chain (slot0→board directly)
//       // Release is safe here; subsequent steps (if any) are driven by onDone callback
//       setTimeout(releaseBusyAndProcessNext, 200);

//     } else if (f.type === "toSlot1") {
//       setTray(p => { const t = [...p]; t[1] = f.num; return t; });
//       setTrayKey(p => { const k = [...p]; k[1]++; return k; });
//       // Do NOT release here — the chain continues (big → slot0 follows via onDone)
//       if (f.onDone) setTimeout(f.onDone, 140);

//     } else if (f.type === "toSlot0") {
//       setTray(p => { const t = [...p]; t[0] = f.num; return t; });
//       setTrayKey(p => { const k = [...p]; k[0]++; return k; });
//       // toSlot0 is ALWAYS the last step — release unconditionally
//       setTimeout(releaseBusyAndProcessNext, 200);
//     }
//   }, [releaseBusyAndProcessNext]);

//   // Keep flyRef in sync with fly state
//   useEffect(() => { flyRef.current = fly; }, [fly]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//     };
//   }, []);

//   /* ─────────────────────────────────────────────
//      FIX: triggerAnimationForNumber
//      Sets animatingRef=true so polling is blocked
//      while any animation sequence is in progress.
//   ───────────────────────────────────────────── */
//   const triggerAnimationForNumber = useCallback((n) => {
//     if (busyRef.current) {
//       // Queue only the latest number (discard older pending)
//       pendingNumRef.current = n;
//       return;
//     }
//     busyRef.current = true;
//     animatingRef.current = true; // block polling from overwriting calledSet

//     setBigNum(n);
//     setBigKey(k => k + 1);
//     setShowPulse(true);
//     setShowParticles(false);
//     setTimeout(() => setShowParticles(true), 200);

//     if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

//     animationTimeoutRef.current = setTimeout(() => {
//       setShowPulse(false);
//       setShowParticles(false);
//       setBigNum(null);

//       const currentTray = trayRef.current;
//       const s1 = currentTray[1];
//       const s0 = currentTray[0];

//       if (s1 !== null) {
//         // slot1 → board, then slot0 → slot1, then big → slot0
//         doFlySlot1ToBoard(s1, () => {
//           if (trayRef.current[0] !== null) {
//             doFlySlot0ToSlot1(trayRef.current[0], () => {
//               doFlyBigToSlot0(n);
//             });
//           } else {
//             doFlyBigToSlot0(n);
//           }
//         });
//       } else if (s0 !== null) {
//         // slot0 → slot1, then big → slot0
//         doFlySlot0ToSlot1(s0, () => {
//           doFlyBigToSlot0(n);
//         });
//       } else {
//         // tray empty — big → slot0 directly
//         doFlyBigToSlot0(n);
//       }
//     }, 1800);
//   }, [doFlySlot1ToBoard, doFlySlot0ToSlot1, doFlyBigToSlot0]);

//   // Keep triggerRef in sync (used by releaseBusy to avoid circular dep)
//   useEffect(() => { triggerRef.current = triggerAnimationForNumber; }, [triggerAnimationForNumber]);

//   /* ═══════════════════════════════════════════
//      API HELPERS
//   ═══════════════════════════════════════════ */

//   const loadCurrentRound = useCallback(async () => {
//     if (!gameId) return;
//     try {
//       const res = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameId}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         setCurrentRoundId(result.data.round_id);
//         setGameStatus(result.data.status || "waiting");
//       }
//     } catch (e) { console.warn("loadCurrentRound:", e); }
//   }, [gameId]);

//   const loadAllTickets = useCallback(async () => {
//     if (!gameId) return;
//     try {
//       const res = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameId}`);
//       const result = await res.json();
//       if (result.success && result.data?.length) setAllTickets(result.data);
//     } catch (e) { console.warn("loadAllTickets:", e); }
//   }, [gameId]);

//   /* ─────────────────────────────────────────────
//      FIX: updateCalledNumbers
//      Skips update entirely while an animation is
//      running — prevents polling from clobbering
//      calledSet mid-flight and killing grid animations.
//   ───────────────────────────────────────────── */
//   const updateCalledNumbers = useCallback(async () => {
//     if (!currentRoundId) return;
//     // Don't overwrite state while animation is in progress
//     if (animatingRef.current) return;
//     try {
//       const res = await fetch(`${API.ROUND_ID_SOCKET_URL}${currentRoundId}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         const data = result.data;
//         if (data.called_numbers) {
//           setCalledSet(new Set(data.called_numbers));
//           setCalledCount(data.total_called || data.called_numbers.length);
//         }
//         if (data.round_status) setGameStatus(data.round_status);
//       }
//     } catch (e) { console.warn("updateCalledNumbers:", e); }
//   }, [currentRoundId]);

//   const loadWinners = useCallback(async () => {
//     if (!currentRoundId) return;
//     try {
//       const res = await fetch(`${API.WINNER_LIST_SOCKET_URL}${currentRoundId}`);
//       const result = await res.json();
//       if (result.success && result.data) setWinners(result.data);
//     } catch (e) { console.warn("loadWinners:", e); }
//   }, [currentRoundId]);

//   /* ── Initial load ── */
//   useEffect(() => {
//     loadCurrentRound();
//     loadAllTickets();
//   }, [loadCurrentRound, loadAllTickets]);

//   useEffect(() => {
//     if (currentRoundId) {
//       updateCalledNumbers();
//       loadWinners();
//     }
//   }, [currentRoundId, updateCalledNumbers, loadWinners]);

//   /* ── Polling intervals (2s numbers, 3s winners) ── */
//   useEffect(() => {
//     const t1 = setInterval(updateCalledNumbers, 2000);
//     const t2 = setInterval(loadWinners, 3000);
//     return () => { clearInterval(t1); clearInterval(t2); };
//   }, [updateCalledNumbers, loadWinners]);

//   /* ═══════════════════════════════════════════
//      SOCKET CONNECTION
//   ═══════════════════════════════════════════ */
//   useEffect(() => {
//     const socket = io(API.SOCKET_URL, {
//          transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//     });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       setConnected(true);
//       socket.emit("get_game_data", { game_id: gameId });
//     });
//     socket.on("disconnect", () => setConnected(false));
//     socket.on("connect_error", () => setConnected(false));

//     socket.on("game_started", () => { setGameStatus("started"); setDone(false); });
//     socket.on("game_paused", () => setGameStatus("paused"));
//     socket.on("game_resumed", () => setGameStatus("started"));
//     socket.on("game_over", (data) => {
//       if (data?.round_id === currentRoundId || data?.game_id === gameId) {
//         setGameStatus("over");
//         setDone(true);
//       }
//     });

//     // socket.on("number_called", (data) => {
//     //   if (data.game_id !== gameId) return;
//     //   const number = data.number;
//     //   setCalledCount(prev => prev + 1);

//     //   loadAllTickets();

//     //   try {
//     //     const audio = new Audio(`/sounds/${number}.mp3`);
//     //     audio.volume = 0.85;
//     //     audio.play().catch(() => { });
//     //   } catch (e) { }

//     //   triggerAnimationForNumber(number);
//     // });

//     socket.on("number_called", (data) => {
//       if (data.game_id !== gameId) return;
//       const number = data.number;
//       setCalledCount(prev => prev + 1);
//       loadAllTickets();

//       // 3 second delay — phir sound + animation dono saath
//       setTimeout(() => {
//         try {
//           const audio = new Audio(`/sounds/${number}.mp3`);
//           audio.volume = 0.85;
//           audio.play().catch(() => { });
//         } catch (e) { }
//         triggerAnimationForNumber(number);
//       }, 3000);
//     });

//     socket.on("old_numbers", (data) => {
//       if (data.calledNumbers && data.calledNumbers.length > 0) {
//         const nums = data.calledNumbers;
//         setCalledSet(new Set(nums));
//         setCalledCount(nums.length);
//         if (nums.length >= 2) {
//           setTray([nums[nums.length - 1], nums[nums.length - 2]]);
//         } else if (nums.length === 1) {
//           setTray([nums[0], null]);
//         }
//       }
//     });

//     socket.on("winner_update", (data) => {
//       if (data.round_id === currentRoundId) {
//         loadWinners();
//         loadAllTickets();
//       }
//     });

//     socket.on("winner_created", (data) => {
//       if (data.round_id === currentRoundId || data.game_id === gameId) {
//         loadWinners();
//         loadAllTickets();
//       }
//     });

//     return () => {
//       if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
//       socket.disconnect();
//     };
//   }, [gameId, currentRoundId, triggerAnimationForNumber, loadAllTickets, loadWinners]);

//   /* ── Derived values ── */
//   const pct = Math.round((calledCount / 90) * 100);
//   const numColor = bigNum ? `linear-gradient(135deg, ${dc(bigNum).light}, ${dc(bigNum).base})` : null;

//   /* ═══════════════════════════════════════════
//      SUB-COMPONENTS
//   ═══════════════════════════════════════════ */
//   const BoardGrid = ({ mobile = false }) => (
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: "repeat(10, 1fr)",
//       gap: mobile ? 3 : isNarrow ? 5 : 7,
//       width: "100%",
//       padding: mobile ? "6px" : isNarrow ? "8px" : "12px",
//     }}>
//       {Array.from({ length: 90 }, (_, i) => {
//         const n = i + 1;
//         return (
//           <div key={n}
//             ref={el => { cellRefs.current[n] = el; }}
//             style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}
//           >
//             <GridBall number={n} called={calledSet.has(n)} arriving={arrivingCell === n} size={GRID_BALL_SIZE} />
//           </div>
//         );
//       })}
//     </div>
//   );

//   const TraySlots = ({ vertical = false }) => (
//     <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 14, alignItems: "center" }}>
//       {[0, 1].map(i => (
//         <div key={i}
//           ref={i === 0 ? slot0Ref : slot1Ref}
//           style={{
//             width: TRAY_SLOT_SIZE, height: TRAY_SLOT_SIZE, borderRadius: "50%",
//             background: "rgba(0,10,30,0.55)",
//             border: "1px solid rgba(251,239,164,0.10)",
//             boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,239,164,0.03)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             flexShrink: 0, position: "relative",
//           }}
//         >
//           <div style={{
//             position: "absolute", bottom: "-19px", left: "50%", transform: "translateX(-50%)",
//             fontSize: 7, color: "rgba(251,239,164,0.22)", letterSpacing: 1, whiteSpace: "nowrap",
//             fontFamily: "'Cinzel', serif",
//           }}>
//             {i === 0 ? "LATEST" : "PREV"}
//           </div>
//           {tray[i] !== null
//             ? <div key={trayKey[i]}><TrayBall number={tray[i]} size={TRAY_BALL_SIZE} isNew /></div>
//             : <div style={{
//               width: TRAY_BALL_SIZE * 0.4, height: TRAY_BALL_SIZE * 0.4,
//               borderRadius: "50%",
//               background: "rgba(251,239,164,0.03)",
//               border: "1px dashed rgba(251,239,164,0.09)",
//             }} />
//           }
//         </div>
//       ))}
//     </div>
//   );

//   const StatsBar = ({ compact = false }) => (
//     <div style={{ display: "flex", gap: 8, width: "100%" }}>
//       {[
//         { lbl: "CALLED", val: calledCount, accent: "#FBEFA4" },
//         { lbl: "LEFT", val: 90 - calledCount, accent: "#1abc9c" },
//       ].map(s => (
//         <div key={s.lbl} style={{
//           flex: 1, textAlign: "center",
//           padding: compact ? "6px 4px" : "10px 6px",
//           borderRadius: 10,
//           background: "rgba(0,20,51,0.45)",
//           border: "1px solid rgba(251,239,164,0.09)",
//           backdropFilter: "blur(8px)",
//         }}>
//           <div style={{ fontSize: compact ? 17 : 22, fontWeight: 900, fontFamily: "'Cinzel',serif", color: s.accent, lineHeight: 1 }}>
//             {s.val}
//           </div>
//           <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", letterSpacing: 2, marginTop: 3 }}>{s.lbl}</div>
//         </div>
//       ))}
//     </div>
//   );

//   const ProgressBar = () => (
//     <div style={{ width: "100%", position: "relative" }}>
//       <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(251,239,164,0.08)", overflow: "hidden" }}>
//         <div style={{
//           height: "100%", borderRadius: 2,
//           background: "linear-gradient(90deg, #004296, #b8860b, #FBEFA4)",
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

//   const Legend = () => (
//     <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
//       {DECADE_COLORS.map((d, i) => (
//         <div key={i} style={{
//           display: "flex", alignItems: "center", gap: 3,
//           padding: "2px 6px", borderRadius: 6,
//           background: "rgba(0,20,51,0.4)",
//           border: "1px solid rgba(251,239,164,0.05)",
//         }}>
//           <div style={{
//             width: 7, height: 7, borderRadius: "50%",
//             background: `radial-gradient(circle at 35% 25%, ${d.light}, ${d.base})`,
//             boxShadow: `0 0 4px ${d.glow}`,
//           }} />
//           <span style={{ fontSize: 6, color: "rgba(251,239,164,0.30)", fontFamily: "'Raleway',sans-serif" }}>
//             {i * 10 + 1}–{(i + 1) * 10}
//           </span>
//         </div>
//       ))}
//     </div>
//   );

//   const StatusIndicator = () => (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 8,
//       padding: "6px 14px", borderRadius: 20,
//       background: "rgba(0,20,51,0.60)",
//       border: "1px solid rgba(251,239,164,0.12)",
//       backdropFilter: "blur(8px)",
//     }}>
//       <div style={{
//         width: 8, height: 8, borderRadius: "50%",
//         background: connected ? (gameStatus === "started" ? "#1abc9c" : "#FBEFA4") : "#ff4444",
//         boxShadow: connected ? `0 0 8px ${gameStatus === "started" ? "#1abc9c" : "#FBEFA4"}` : "0 0 8px #ff4444",
//         animation: connected && gameStatus === "started" ? "tl-breathe 2s ease-in-out infinite" : "none",
//       }} />
//       <span style={{
//         fontSize: 9, color: "rgba(255,255,255,0.70)",
//         fontFamily: "'Cinzel',serif", letterSpacing: 1.5,
//       }}>
//         {connected ? gameStatus.toUpperCase() : "OFFLINE MODE"}
//       </span>
//     </div>
//   );

//   /* ═══════════════════════════════════════════
//      RENDER
//   ═══════════════════════════════════════════ */
//   return (
//     <>
//       {/* ── Global styles ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');

//         @keyframes tl-ballReveal {
//           0%   { transform: rotate(0deg)   scale(0.2); opacity: 0; animation-timing-function: ease-in; }
//           50%  { transform: rotate(360deg) scale(0.6); opacity: 0.8; animation-timing-function: ease-out; }
//           100% { transform: rotate(360deg) scale(1);   opacity: 1; }
//         }
//         @keyframes tl-traySettle {
//           0%   { transform: scale(0.3) translateY(-10px); opacity: 0; }
//           60%  { transform: scale(1.06) translateY(1px);  opacity: 1; }
//           80%  { transform: scale(0.97); }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes tl-gridArrive {
//           0%   { transform: scale(0.2);    opacity: 0; filter: brightness(3); }
//           55%  { transform: scale(1.14);   opacity: 1; filter: brightness(1.5); }
//           80%  { transform: scale(0.97);   filter: brightness(1.1); }
//           100% { transform: scale(1.04);   opacity: 1; filter: brightness(1); }
//         }
//         @keyframes tl-softPulse {
//           0%,100% { transform: scale(1);    opacity: 0.7; }
//           50%     { transform: scale(1.55); opacity: 0; }
//         }
//         @keyframes tl-floatDrift {
//           0%,100% { transform: translateY(0px)  rotate(0deg); }
//           33%     { transform: translateY(-8px) rotate(1deg); }
//           66%     { transform: translateY(-4px) rotate(-0.8deg); }
//         }
//         @keyframes tl-shimmerSweep {
//           0%   { background-position: -600px 0; }
//           100% { background-position:  600px 0; }
//         }
//         @keyframes tl-rotateSlow {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         @keyframes tl-breathe {
//           0%,100% { opacity: 0.4; }
//           50%     { opacity: 0.9; }
//         }
//         @keyframes tl-doneFade {
//           0%   { opacity: 0; transform: scale(0.92); }
//           100% { opacity: 1; transform: scale(1); }
//         }
//         @keyframes tl-doneGlow {
//           0%,100% { text-shadow: 0 0 20px rgba(251,239,164,0.6),  0 0 40px  rgba(251,239,164,0.25); }
//           50%     { text-shadow: 0 0 50px rgba(251,239,164,0.95), 0 0 100px rgba(251,239,164,0.45), 0 0 160px rgba(251,239,164,0.18); }
//         }
//         @keyframes tl-particle0 {
//           0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity: 1; }
//           100% { transform: translate(-50%,-50%) translate(var(--px),var(--py)) scale(0); opacity: 0; }
//         }
//         @keyframes tl-particle1 {
//           0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
//           100% { transform: translate(-50%,-50%) translate(calc(var(--px)*0.7),calc(var(--py)*1.2)) scale(0); opacity: 0; }
//         }
//         @keyframes tl-particle2 {
//           0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
//           100% { transform: translate(-50%,-50%) translate(calc(var(--px)*1.2),calc(var(--py)*0.6)) scale(0); opacity: 0; }
//         }

//         .tl-shimmer {
//           background: linear-gradient(90deg, #c9b86c 0%, #ffe066 28%, #FBEFA4 50%, #ffe066 72%, #c9b86c 100%);
//           background-size: 600px 100%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: tl-shimmerSweep 3.5s linear infinite;
//         }
//         .tl-float   { animation: tl-floatDrift 4s ease-in-out infinite; }
//         .tl-breathe { animation: tl-breathe 2s ease-in-out infinite; }
//       `}</style>

//       {/* ── Root wrapper ── */}
//       <div ref={containerRef} style={{
//         width: "100%", overflow: "hidden", borderRadius: 18,
//         background: `
//           radial-gradient(ellipse at 15% 0%,   rgba(0,66,150,0.35) 0%, transparent 55%),
//           radial-gradient(ellipse at 85% 100%,  rgba(251,239,164,0.07) 0%, transparent 50%),
//           linear-gradient(160deg, #002b66 0%, #001433 100%)
//         `,
//         border: "1px solid rgba(251,239,164,0.10)",
//         boxShadow: `
//           0 0 0 1px rgba(0,66,150,0.40),
//           0 30px 80px rgba(0,8,25,0.85),
//           inset 0 1px 0 rgba(251,239,164,0.06)
//         `,
//         color: "#fff", position: "relative",
//         fontFamily: "'Raleway', sans-serif",
//       }}>

//         {/* Status indicator */}
//         <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20 }}>
//           <StatusIndicator />
//         </div>

//         {/* Ambient grid */}
//         <div style={{
//           position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
//           backgroundImage: `
//             linear-gradient(rgba(251,239,164,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(251,239,164,0.025) 1px, transparent 1px)
//           `,
//           backgroundSize: "52px 52px",
//         }} />

//         {/* Decorative rings */}
//         {[
//           { s: 280, t: -90, l: -90, anim: "tl-rotateSlow 32s linear infinite", c: "rgba(0,66,150,0.18)" },
//           { s: 180, t: -50, l: -50, anim: "tl-rotateSlow 20s linear infinite reverse", c: "rgba(251,239,164,0.07)" },
//           { s: 240, b: -70, r: -70, anim: "tl-rotateSlow 28s linear infinite", c: "rgba(251,239,164,0.07)" },
//         ].map((ring, i) => (
//           <div key={i} style={{
//             position: "absolute", borderRadius: "50%",
//             pointerEvents: "none", zIndex: 0,
//             width: ring.s, height: ring.s,
//             top: ring.t, left: ring.l, bottom: ring.b, right: ring.r,
//             border: `1px solid ${ring.c}`,
//             animation: ring.anim,
//           }} />
//         ))}

//         {/* Flying ball layer */}
//         {fly && (
//           <FlyingBall
//             from={fly.from} to={fly.to} number={fly.number}
//             size={fly.size} targetSize={fly.targetSize}
//             onDone={handleFlyDone} duration={fly.duration}
//           />
//         )}

//         {/* ══ MOBILE ══ */}
//         {isMobile && (
//           <div style={{ display: "flex", flexDirection: "column", padding: "14px 10px 20px", gap: 12, position: "relative", zIndex: 1 }}>

//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
//               <h1 className="tl-shimmer" style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, flexShrink: 0, fontFamily: "'Cinzel',serif" }}>
//                 TAMBOLA
//               </h1>
//               <StatsBar compact />
//             </div>

//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
//               <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 {showPulse && bigNum && (<>
//                   {[0, 1, 2].map(k => (
//                     <div key={k} style={{
//                       position: "absolute",
//                       inset: -(6 * (k + 1) + 2),
//                       borderRadius: "50%",
//                       border: `${k < 1 ? "1.5" : "1"}px solid ${k === 0 ? dc(bigNum).light + "55" : dc(bigNum).base + (k === 1 ? "33" : "18")}`,
//                       animation: `tl-softPulse 2.2s ease-out ${k * 0.55}s infinite`,
//                     }} />
//                   ))}
//                   <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
//                 </>)}
//                 <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
//                   <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
//                 </div>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//                 <TraySlots vertical />
//               </div>
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
//               flexShrink: 0, width: LEFT_PANEL_W,
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               gap: 18, padding: "20px 14px",
//               borderRight: "1px solid rgba(251,239,164,0.06)",
//               background: "rgba(0,0,0,0.20)",
//             }}>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 7, color: "rgba(251,239,164,0.38)", letterSpacing: 5, marginBottom: 5, fontFamily: "'Raleway',sans-serif" }}>✦ LIVE DRAW ✦</div>
//                 <h1 className="tl-shimmer" style={{ fontSize: 13, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
//                 <div style={{ fontSize: 7, color: "rgba(255,255,255,0.16)", letterSpacing: 3, marginTop: 3, fontFamily: "'Cinzel',serif" }}>90 BALL · LIVE DRAW</div>
//               </div>

//               <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//                 {showPulse && bigNum && (<>
//                   {[0, 1, 2].map(k => (
//                     <div key={k} style={{
//                       position: "absolute", borderRadius: "50%",
//                       inset: -(6 * (k + 1) + 2),
//                       border: `${k < 1 ? "1.5" : "1"}px solid ${k === 0 ? dc(bigNum).light + "55" : dc(bigNum).base + (k === 1 ? "33" : "18")}`,
//                       animation: `tl-softPulse 2.2s ease-out ${k * 0.55}s infinite`,
//                     }} />
//                   ))}
//                   <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
//                 </>)}
//                 <div style={{
//                   position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)",
//                   width: bigNum ? BIG_BALL_SIZE * 0.8 : 0, height: 10, borderRadius: "50%",
//                   background: bigNum ? `radial-gradient(ellipse, ${dc(bigNum).glow} 0%, transparent 70%)` : "none",
//                   transition: "width 0.8s ease",
//                 }} />
//                 <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
//                   <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
//                 </div>
//                 <div style={{ minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   {bigNum ? (
//                     <div style={{
//                       fontSize: 28, fontWeight: 900, fontFamily: "'Cinzel',serif",
//                       background: numColor,
//                       WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1,
//                     }}>{bigNum}</div>
//                   ) : (
//                     <div style={{ fontSize: 7, color: "rgba(255,255,255,0.14)", letterSpacing: 3, fontFamily: "'Cinzel',serif" }}>
//                       {done ? "COMPLETE" : "WAITING…"}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <TraySlots />
//               <StatsBar />
//               <ProgressBar />
//             </div>

//             <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "16px 14px 14px 12px", gap: 12 }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <div style={{ width: 2, height: 16, background: "linear-gradient(180deg, #FBEFA4, rgba(251,239,164,0))", borderRadius: 2 }} />
//                   <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>FULL BOARD</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)" }}>
//                   <div className="tl-breathe" style={{ width: 5, height: 5, borderRadius: "50%", background: pct === 100 ? "#1abc9c" : "#FBEFA4", boxShadow: pct === 100 ? "0 0 6px #1abc9c" : "0 0 6px #FBEFA4" }} />
//                   <span style={{ fontSize: 8, color: "rgba(255,255,255,0.38)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
//                 </div>
//               </div>
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
//               flexShrink: 0, width: LEFT_PANEL_W,
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               gap: 26, padding: "30px 22px",
//               borderRight: "1px solid rgba(251,239,164,0.07)",
//               background: "rgba(0,0,0,0.18)",
//               backdropFilter: "blur(6px)",
//             }}>

//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 7, color: "rgba(251,239,164,0.40)", letterSpacing: 5, marginBottom: 6, fontFamily: "'Raleway',sans-serif" }}>
//                   ✦ LIVE DRAW ✦
//                 </div>
//                 <h1 className="tl-shimmer" style={{ fontSize: 18, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>
//                   TAMBOLA
//                 </h1>
//                 <div style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: 3, marginTop: 4, fontFamily: "'Cinzel',serif" }}>
//                   90 BALL · LIVE DRAW
//                 </div>
//               </div>

//               <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
//                 {showPulse && bigNum && (<>
//                   {[0, 1, 2].map(k => (
//                     <div key={k} style={{
//                       position: "absolute", borderRadius: "50%",
//                       inset: -(6 * (k + 1) + 2),
//                       border: `${k < 1 ? "1.5" : "1"}px solid ${k === 0 ? dc(bigNum).light + "55" : dc(bigNum).base + (k === 1 ? "33" : "18")}`,
//                       animation: `tl-softPulse 2.2s ease-out ${k * 0.55}s infinite`,
//                     }} />
//                   ))}
//                   <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
//                 </>)}
//                 <div style={{
//                   position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)",
//                   width: bigNum ? BIG_BALL_SIZE * 0.82 : 0, height: 12, borderRadius: "50%",
//                   background: bigNum ? `radial-gradient(ellipse, ${dc(bigNum).glow} 0%, transparent 70%)` : "none",
//                   transition: "width 0.8s ease", pointerEvents: "none",
//                 }} />
//                 <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
//                   <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
//                 </div>
//               </div>

//               <TraySlots />
//               <StatsBar />
//               <ProgressBar />
//               <Legend />
//             </div>

//             <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "24px 24px 20px 18px", gap: 14 }}>

//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <div style={{ width: 2, height: 18, background: "linear-gradient(180deg,#FBEFA4,rgba(251,239,164,0))", borderRadius: 2 }} />
//                   <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>
//                     FULL BOARD
//                   </span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)", backdropFilter: "blur(8px)" }}>
//                   <div className="tl-breathe" style={{ width: 5, height: 5, borderRadius: "50%", background: pct === 100 ? "#1abc9c" : "#FBEFA4", boxShadow: pct === 100 ? "0 0 6px #1abc9c" : "0 0 6px #FBEFA4" }} />
//                   <span style={{ fontSize: 8, color: "rgba(255,255,255,0.40)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
//                 </div>
//               </div>

//               <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
//                 <BoardGrid />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══ DONE OVERLAY ══ */}
//         {done && (
//           <div style={{
//             position: "absolute", inset: 0, zIndex: 50,
//             background: "rgba(0,8,25,0.92)",
//             backdropFilter: "blur(14px)",
//             borderRadius: 18,
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//             gap: 16,
//             animation: "tl-doneFade 0.8s ease forwards",
//           }}>
//             {[
//               { s: 320, a: "tl-rotateSlow 12s linear infinite", c: "rgba(251,239,164,0.09)" },
//               { s: 220, a: "tl-rotateSlow 8s linear infinite reverse", c: "rgba(0,66,150,0.22)" },
//             ].map((r, i) => (
//               <div key={i} style={{ position: "absolute", width: r.s, height: r.s, borderRadius: "50%", border: `1px solid ${r.c}`, animation: r.a }} />
//             ))}
//             <div style={{ fontSize: isMobile ? 11 : 13, letterSpacing: 6, color: "rgba(251,239,164,0.55)", fontFamily: "'Cinzel',serif" }}>✦ ✦ ✦</div>
//             <div style={{
//               fontSize: isMobile ? 24 : 36, fontWeight: 900,
//               fontFamily: "'Cinzel',serif", color: "#FBEFA4",
//               animation: "tl-doneGlow 2s ease-in-out infinite",
//               letterSpacing: 4, textAlign: "center",
//             }}>
//               FULL HOUSE
//             </div>
//             <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 4, fontFamily: "'Raleway',sans-serif" }}>
//               ALL 90 NUMBERS CALLED
//             </div>
//             <div style={{ fontSize: isMobile ? 11 : 13, letterSpacing: 6, color: "rgba(251,239,164,0.55)", fontFamily: "'Cinzel',serif" }}>✦ ✦ ✦</div>
//             <button
//               onClick={() => window.location.reload()}
//               style={{
//                 marginTop: 12, padding: "12px 36px",
//                 fontSize: 10, fontWeight: 700,
//                 fontFamily: "'Cinzel',serif", letterSpacing: 3,
//                 background: "linear-gradient(135deg, #FBEFA4, #c9b86c)",
//                 color: "#001433",
//                 border: "none", borderRadius: 30,
//                 cursor: "pointer",
//                 boxShadow: "0 4px 24px rgba(251,239,164,0.38), 0 0 50px rgba(251,239,164,0.12)",
//                 transition: "transform 0.2s ease, box-shadow 0.2s ease",
//               }}
//               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(251,239,164,0.58)"; }}
//               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(251,239,164,0.38)"; }}
//             >
//               PLAY AGAIN
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// REDESIGNED TAMBOLA LIVE UI
// ─────────────────────────────────────────────────────────────────────────────

export default function TambolaLive({ gameId }) {
  // State management remains the same...
  const [currentRoundId, setCurrentRoundId] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [ballKey, setBallKey] = useState(0);
  const [isBallNew, setIsBallNew] = useState(false);
  const [tray, setTray] = useState([null, null, null]);
  const [trayKeys, setTrayKeys] = useState([0, 0, 0]);
  const [arrivingCell, setArrivingCell] = useState(null);
  const [allTickets, setAllTickets] = useState([]);
  const [winners, setWinners] = useState([]);
  const [gameStatus, setGameStatus] = useState("Loading...");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tab, setTab] = useState("tickets");
  const [isPaused, setIsPaused] = useState(false);
  
  const { audioUnlocked, unlockAudio } = useSoundUnlock();

  // ... rest of your API helpers and effects remain the same ...

  // ── New number handler with sound ─────────────────────────────────────────
  const onNewNumber = useCallback((number) => {
    setCurrentNumber(number);
    setBallKey((k) => k + 1);
    setIsBallNew(true);
    setArrivingCell(number);
    setCalledNumbers((prev) => [...new Set([...prev, number])]);

    // Shift tray
    setTray((prev) => [number, prev[0], prev[1]]);
    setTrayKeys((prev) => [prev[0] + 1, prev[1] + 1, prev[2] + 1]);

    // Play sound immediately (not delayed)
    playNumberSound(number);

    // Reset "new" state
    if (ballNewTimer.current) clearTimeout(ballNewTimer.current);
    ballNewTimer.current = setTimeout(() => setIsBallNew(false), 1100);

    // Clear arriving highlight
    if (arrivalTimer.current) clearTimeout(arrivalTimer.current);
    arrivalTimer.current = setTimeout(() => setArrivingCell(null), 1200);
  }, []);

  // ── NEW: Modern Glass-morphism Card Component ─────────────────────────────
  const GlassCard = ({ children, className = "" }) => (
    <div style={{
      background: "rgba(15, 23, 42, 0.7)",
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(148, 163, 184, 0.1)",
      borderRadius: 24,
      padding: 24,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      ...className
    }}>
      {children}
    </div>
  );

  // ── NEW: Animated Number Orb ──────────────────────────────────────────────
  const NumberOrb = ({ number, size = 120 }) => {
    const decade = number ? Math.floor((number - 1) / 10) : 0;
    const colors = [
      "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", 
      "#EF4444", "#EC4899", "#8B5CF6", "#6366F1", "#14B8A6"
    ];
    const color = colors[Math.min(decade, colors.length - 1)];
    
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        background: number 
          ? `radial-gradient(circle at 30% 30%, ${color}88, ${color})`
          : "radial-gradient(circle at 30% 30%, #1e293b, #0f172a)",
        boxShadow: number 
          ? `0 0 60px ${color}44, 0 0 120px ${color}22, inset 0 -4px 12px rgba(0,0,0,0.5)` 
          : "inset 0 -4px 12px rgba(0,0,0,0.5)",
        animation: isBallNew 
          ? "orbAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" 
          : "orbFloat 4s ease-in-out infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease"
      }}>
        {/* Glossy highlight */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "30%",
          height: "20%",
          background: "linear-gradient(135deg, #ffffff44, transparent)",
          borderRadius: "50%",
          transform: "rotate(-30deg)"
        }} />
        
        {/* Number display */}
        <span style={{
          fontSize: size * 0.35,
          fontWeight: 900,
          fontFamily: "'Inter', 'Rajdhani', sans-serif",
          color: "#fff",
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 1
        }}>
          {number || "?"}
        </span>
      </div>
    );
  };

  // ── NEW: Ticket Mini Grid ─────────────────────────────────────────────────
  const TicketMiniGrid = ({ ticket, onClick }) => {
    const grid = parseTicketGrid(ticket);
    const numbers = getTicketNumbers(ticket);
    const matched = numbers.filter(n => calledNumbers.includes(n));
    const progress = numbers.length > 0 ? (matched.length / numbers.length) * 100 : 0;
    
    return (
      <div 
        onClick={() => onClick(ticket)}
        style={{
          background: "rgba(30, 41, 59, 0.5)",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.1)",
          padding: 16,
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: "translateY(0)",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.3)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.1)";
        }}
      >
        {/* Progress bar background */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 4,
          width: `${progress}%`,
          background: `linear-gradient(90deg, #3B82F6, #06B6D4, #10B981)`,
          transition: "width 1s ease",
          borderRadius: "0 0 16px 16px"
        }} />
        
        {/* Ticket header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: 12 
        }}>
          <span style={{ 
            fontSize: 14, 
            fontWeight: 700, 
            color: "#e2e8f0" 
          }}>
            #{ticket.ticket_number}
          </span>
          <span style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 12,
            background: "rgba(148, 163, 184, 0.1)",
            color: "#94a3b8"
          }}>
            {ticket.user_name || "Unsold"}
          </span>
        </div>
        
        {/* Mini grid */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 2,
          marginBottom: 12 
        }}>
          {grid.map((row, ri) => (
            <div key={ri} style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(9, 1fr)", 
              gap: 2 
            }}>
              {row.map((num, ci) => {
                const isEmpty = num === null || num === undefined || num === 0 || num === "";
                const isCalled = !isEmpty && calledNumbers.includes(Number(num));
                
                return (
                  <div key={ci} style={{
                    height: 20,
                    borderRadius: 4,
                    background: isEmpty 
                      ? "transparent" 
                      : isCalled 
                        ? "#EF4444" 
                        : "rgba(148, 163, 184, 0.1)",
                    border: isEmpty 
                      ? "1px dashed rgba(148, 163, 184, 0.1)" 
                      : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 600,
                    color: isEmpty 
                      ? "transparent" 
                      : isCalled 
                        ? "#fff" 
                        : "#94a3b8",
                    transition: "all 0.3s ease"
                  }}>
                    {isEmpty ? "" : num}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          fontSize: 11,
          color: "#94a3b8"
        }}>
          <span>
            <span style={{ color: "#10B981", fontWeight: 600 }}>{matched.length}</span>
            /{numbers.length} called
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    );
  };

  // ── NEW: Main Layout ──────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes orbAppear {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(3deg); }
          66% { transform: translateY(-3px) rotate(-2deg); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      <div style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        minHeight: "100vh",
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden"
      }}>
        
        {/* Background effects */}
        <div style={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at 50% 50%, #3B82F611 0%, transparent 50%)",
          animation: "pulse 4s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0
        }} />

        {/* Sound unlock overlay */}
        {!audioUnlocked && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              textAlign: "center",
              padding: 40,
              background: "rgba(30, 41, 59, 0.9)",
              borderRadius: 24,
              border: "1px solid rgba(148, 163, 184, 0.2)"
            }}>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>🎱 Ready to Play?</h2>
              <p style={{ color: "#94a3b8", marginBottom: 24 }}>
                Click below to enable sound and start the game
              </p>
              <button
                onClick={unlockAudio}
                style={{
                  padding: "12px 32px",
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Enter Game
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "20px",
          position: "relative",
          zIndex: 1
        }}>
          
          {/* Header */}
          <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            background: "rgba(30, 41, 59, 0.5)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            border: "1px solid rgba(148, 163, 184, 0.1)",
            marginBottom: 24
          }}>
            <div>
              <h1 style={{
                fontSize: 32,
                fontWeight: 900,
                background: "linear-gradient(135deg, #3B82F6, #06B6D4, #10B981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0
              }}>
                TAMBOLA LIVE
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
                Game #{gameId}
              </p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: 12,
                border: "1px solid rgba(16, 185, 129, 0.2)"
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 12px #10B98188"
                }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#10B981" }}>
                  {gameStatus}
                </span>
              </div>
              
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {totalCalled}/90 called
              </div>
            </div>
          </header>

          {/* Main grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 24
          }}>
            
            {/* Left panel - Current ball and stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              <GlassCard>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    color: "#64748b",
                    marginBottom: 20
                  }}>
                    Current Number
                  </div>
                  
                  <NumberOrb number={currentNumber} size={140} />
                  
                  <div style={{
                    fontSize: 64,
                    fontWeight: 900,
                    marginTop: 16,
                    background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    {currentNumber || "—"}
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12
                }}>
                  {[
                    { label: "Called", value: totalCalled, color: "#3B82F6" },
                    { label: "Remaining", value: 90 - totalCalled, color: "#10B981" }
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{
                      textAlign: "center",
                      padding: 16,
                      background: "rgba(30, 41, 59, 0.5)",
                      borderRadius: 12
                    }}>
                      <div style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color
                      }}>
                        {value}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: "#64748b",
                        marginTop: 4
                      }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    height: 6,
                    borderRadius: 3,
                    background: "rgba(148, 163, 184, 0.1)",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
                      borderRadius: 3,
                      transition: "width 1s ease"
                    }} />
                  </div>
                </div>
              </GlassCard>
              
            </div>
            
            {/* Right panel - Board and tickets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Full board */}
              <GlassCard>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 16,
                  color: "#94a3b8"
                }}>
                  Number Board
                </h3>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(10, 1fr)",
                  gap: 8
                }}>
                  {Array.from({ length: 90 }, (_, i) => i + 1).map(num => {
                    const isCalled = calledNumbers.includes(num);
                    const isArriving = arrivingCell === num;
                    const decade = Math.floor((num - 1) / 10);
                    const colors = [
                      "#3B82F6", "#06B6D4", "#10B981", "#F59E0B",
                      "#EF4444", "#EC4899", "#8B5CF6", "#6366F1", "#14B8A6"
                    ];
                    const color = colors[Math.min(decade, colors.length - 1)];
                    
                    return (
                      <div key={num} style={{
                        aspectRatio: "1",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isCalled 
                          ? `linear-gradient(135deg, ${color}44, ${color})`
                          : "rgba(148, 163, 184, 0.1)",
                        border: `1px solid ${isCalled ? color : "rgba(148, 163, 184, 0.05)"}`,
                        color: isCalled ? "#fff" : "#475569",
                        fontWeight: 600,
                        fontSize: 12,
                        boxShadow: isCalled ? `0 0 20px ${color}44` : "none",
                        transition: "all 0.3s ease",
                        transform: isArriving ? "scale(1.1)" : "scale(1)"
                      }}>
                        {num}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
              
              {/* Tickets */}
              <GlassCard>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16
                }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8" }}>
                    Tickets ({filteredTickets.length})
                  </h3>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tickets..."
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      background: "rgba(30, 41, 59, 0.5)",
                      color: "#e2e8f0",
                      fontSize: 14,
                      outline: "none",
                      width: 240
                    }}
                  />
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 16,
                  maxHeight: 400,
                  overflow: "auto"
                }}>
                  {filteredTickets.map(ticket => (
                    <TicketMiniGrid 
                      key={ticket.ticket_id} 
                      ticket={ticket}
                      onClick={setSelectedTicket}
                    />
                  ))}
                </div>
              </GlassCard>
              
            </div>
            
          </div>
        </div>
        
        {/* Ticket modal */}
        {selectedTicket && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            backdropFilter: "blur(10px)",
            padding: 20
          }}>
            <div style={{
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              borderRadius: 24,
              border: "1px solid rgba(148, 163, 184, 0.2)",
              padding: 32,
              maxWidth: 500,
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto"
            }}>
              {/* Modal content - similar to your existing TicketModal */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
              }}>
                <h2 style={{ fontSize: 24, fontWeight: 700 }}>
                  Ticket #{selectedTicket.ticket_number}
                </h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(148, 163, 184, 0.1)",
                    border: "none",
                    color: "#94a3b8",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ✕
                </button>
              </div>
              
              {/* Full ticket display */}
              <div style={{ marginTop: 20 }}>
                <h3 style={{ color: "#94a3b8", marginBottom: 12 }}>
                  {selectedTicket.user_name || "Unsold"}
                </h3>
                {/* Add your full ticket grid here */}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}