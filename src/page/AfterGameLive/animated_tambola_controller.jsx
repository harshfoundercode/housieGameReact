import { useState, useEffect, useRef, useCallback } from "react";


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const DECADE_COLORS = [
  { base:"#e63946", light:"#ff7b85", shadow:"#7a0000" },
  { base:"#e040fb", light:"#f58cff", shadow:"#6a0070" },
  { base:"#7c4dff", light:"#b17cff", shadow:"#2e0099" },
  { base:"#2979ff", light:"#70aaff", shadow:"#003b9f" },
  { base:"#00bcd4", light:"#5eefff", shadow:"#006070" },
  { base:"#ff6d00", light:"#ffa040", shadow:"#8d3600" },
  { base:"#c6a800", light:"#ffd740", shadow:"#7a6700" },
  { base:"#e91e63", light:"#ff5e92", shadow:"#880e40" },
  { base:"#00c853", light:"#5efc82", shadow:"#007722" },
];

function dc(n) { return DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)]; }
function ballBg(n) {
  const c = dc(n);
  return `radial-gradient(circle at 38% 28%, ${c.light} 0%, ${c.base} 50%, ${c.shadow} 100%)`;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────────────────────────────────
   SOUND
───────────────────────────────────────────── */
function playNumberSound(n) {
  try {
    const audio = new Audio(`/sounds/${n}.mp3`);
    audio.volume = 1;
    audio.play().catch(() => {});
  } catch (e) {}
}

/* ─────────────────────────────────────────────
   BALL COMPONENTS
───────────────────────────────────────────── */
function BigBall({ number, animKey, size = 140 }) {
  const fontSize = size * 0.36;
  const c = number ? dc(number) : null;
  return (
    <div
      key={animKey}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: number
          ? ballBg(number)
          : "radial-gradient(circle at 38% 28%, #2a2a4a, #0d0d2b)",
        boxShadow: number
          ? `0 0 0 5px rgba(255,255,255,.07), 0 0 50px ${c.base}99, inset -10px -10px 24px rgba(0,0,0,.45), inset 7px 7px 18px rgba(255,255,255,.28)`
          : "inset -8px -8px 20px rgba(0,0,0,.5), inset 5px 5px 14px rgba(255,255,255,.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        animation: number ? "bigDrop 0.7s cubic-bezier(0.22,1.6,0.36,1) forwards" : "none",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: size * 0.14, left: size * 0.22,
        width: size * 0.28, height: size * 0.15,
        background: "rgba(255,255,255,.38)", borderRadius: "50%",
        transform: "rotate(-28deg)", filter: "blur(3px)",
      }} />
      <span style={{
        // fontFamily: "'Orbitron', monospace",
        fontSize: number ? fontSize : fontSize * 0.55,
        fontWeight: 900,
        color: number ? "#fff" : "rgba(255,255,255,.2)",
        textShadow: "0 2px 8px rgba(0,0,0,.6)", zIndex: 1, lineHeight: 1,
      }}>
        {number ?? "?"}
      </span>
    </div>
  );
}

function TrayBall({ number, size = 60 }) {
  const c = dc(number);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: ballBg(number),
      boxShadow: `inset -3px -3px 10px rgba(0,0,0,.42), inset 2px 2px 7px rgba(255,255,255,.25), 0 0 14px ${c.base}66`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", flexShrink: 0,
      animation: "trayBounceIn 0.5s cubic-bezier(0.22,1.5,0.36,1) forwards",
    }}>
      <div style={{
        position: "absolute",
        top: size * 0.15, left: size * 0.2,
        width: size * 0.3, height: size * 0.15,
        background: "rgba(255,255,255,.42)", borderRadius: "50%",
        transform: "rotate(-28deg)", filter: "blur(2px)",
      }} />
      <span style={{
        // fontFamily: "'Orbitron', monospace",
        fontSize: size * 0.3, fontWeight: 700,
        color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,.6)", zIndex: 1,
      }}>
        {number}
      </span>
    </div>
  );
}

/* position:fixed is fine here — it renders on top of everything but
   does NOT contribute to layout width, so no horizontal overflow */
function FlyingBall({ from, to, number, size, targetSize, onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !from || !to) return;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const rot = Math.round(dist / 55) * 360;
    ref.current.animate([
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(${dx*.4}px,${dy*.3}px) scale(0.88) rotate(${rot*.3}deg)`, offset:.3, opacity:1 },
      { transform: `translate(${dx*.85}px,${dy*.78}px) scale(${targetSize/size}) rotate(${rot*.7}deg)`, offset:.72, opacity:1 },
      { transform: `translate(${dx}px,${dy}px) scale(${targetSize/size}) rotate(${rot}deg)`, opacity:.5 },
    ], { duration: 750, easing: "ease-in-out", fill: "forwards" }).onfinish = onDone;
  }, []);
  if (!from) return null;
  return (
    <div ref={ref} style={{
      position: "fixed",
      left: from.x - size / 2, top: from.y - size / 2,
      width: size, height: size, borderRadius: "50%",
      background: ballBg(number),
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, pointerEvents: "none",
      // fontFamily: "'Orbitron', monospace",
      fontSize: size * 0.32, fontWeight: 700,
      color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,.6)",
    }}>
      {number}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   KEY DESIGN DECISIONS for embedded use:
   1. Root = width:100% + overflow:hidden  (no 100vw)
   2. Heights = auto / minHeight           (no 100vh)
   3. Responsive via ResizeObserver on container (not window.innerWidth)
   4. No position:fixed on layout elements (only FlyingBall uses it, harmless)
   5. minWidth:0 on flex children to prevent overflow
───────────────────────────────────────────── */
export default function TambolaLive() {
  const [bag, setBag] = useState(() => shuffle(Array.from({ length: 90 }, (_, i) => i + 1)));
  const [calledSet, setCalledSet] = useState(new Set());
  const [calledCount, setCalledCount] = useState(0);
  const [bigNum, setBigNum] = useState(null);
  const [bigKey, setBigKey] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [tray, setTray] = useState([null, null]);
  const [trayKey, setTrayKey] = useState([0, 0]);
  const [fly, setFly] = useState(null);
  const [arrivingCell, setArrivingCell] = useState(null);
  const [done, setDone] = useState(false);

  /* ── Container-aware responsive (NOT window width) ── */
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(900);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(entries => {
      setContainerW(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile  = containerW < 520;
  const isNarrow  = containerW < 800;   // laptop ~768-800px range

  const bigBallSize  = isMobile ? 88  : isNarrow ? 108 : 140;
  const trayBallSize = isMobile ? 42  : isNarrow ? 50  : 60;
  const traySlotSize = isMobile ? 48  : isNarrow ? 56  : 68;
  const leftPanelW   = isNarrow ? 190 : 400;

  /* ── refs ── */
  const bigBallRef = useRef(null);
  const slot0Ref   = useRef(null);
  const slot1Ref   = useRef(null);
  const cellRefs   = useRef({});
  const trayRef    = useRef([null, null]);
  const bagRef     = useRef(bag);
  const busyRef    = useRef(false);
  trayRef.current  = tray;
  bagRef.current   = bag;

  function getCenter(el) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  const runCycle = useCallback(() => {
    if (busyRef.current) return;
    const currentBag  = bagRef.current;
    const currentTray = trayRef.current;
    if (currentBag.length === 0 && currentTray[0] === null && currentTray[1] === null) {
      setDone(true); return;
    }
    busyRef.current = true;
    const freeSlot = currentTray[0] === null ? 0 : currentTray[1] === null ? 1 : -1;

    if (currentBag.length > 0 && freeSlot !== -1) {
      const newBag = [...currentBag];
      const n = newBag.pop();
      setBag(newBag);
      setCalledCount(c => c + 1);
      setBigNum(n);
      setBigKey(k => k + 1);
      setShowPulse(true);
      setTimeout(() => { playNumberSound(n); }, 3000);
      setTimeout(() => {
        setShowPulse(false);
        setBigNum(null);
        const fromPos = getCenter(bigBallRef.current);
        const slotEl  = freeSlot === 0 ? slot0Ref.current : slot1Ref.current;
        const toPos   = getCenter(slotEl);
        setFly({ from: fromPos, to: toPos, number: n, size: bigBallSize * 0.65, targetSize: trayBallSize, slotIdx: freeSlot });
      }, 4200);
    } else if (currentTray[0] !== null || currentTray[1] !== null) {
      flushTraySlot(0, () => {
        setTimeout(() => flushTraySlot(1, () => {
          busyRef.current = false;
          setTimeout(runCycle, 800);
        }), 350);
      });
    } else {
      busyRef.current = false;
    }
  }, [bigBallSize, trayBallSize]);

  function flushTraySlot(slotIdx, onDoneCb) {
    const n = trayRef.current[slotIdx];
    if (n === null) { onDoneCb(); return; }
    const slotEl  = slotIdx === 0 ? slot0Ref.current : slot1Ref.current;
    const cellEl  = cellRefs.current[n];
    const fromPos = getCenter(slotEl);
    const toPos   = getCenter(cellEl);
    setTray(prev => { const t = [...prev]; t[slotIdx] = null; return t; });
    setFly({ from: fromPos, to: toPos, number: n, size: trayBallSize, targetSize: 22, slotIdx: -1, boardTarget: n, onDone: onDoneCb });
  }

  function handleFlyDone() {
    const f = fly;
    setFly(null);
    if (f.slotIdx >= 0) {
      setTray(prev => { const t = [...prev]; t[f.slotIdx] = f.number; return t; });
      setTrayKey(prev => { const k = [...prev]; k[f.slotIdx]++; return k; });
      setTimeout(() => {
        const ct = trayRef.current;
        if (ct[0] !== null && ct[1] !== null) {
          flushTraySlot(0, () => {
            setTimeout(() => flushTraySlot(1, () => {
              busyRef.current = false;
              setTimeout(runCycle, 1000);
            }), 350);
          });
        } else {
          busyRef.current = false;
          setTimeout(runCycle, 1200);
        }
      }, 200);
    } else {
      if (f.boardTarget) {
        setCalledSet(prev => new Set([...prev, f.boardTarget]));
        setArrivingCell(f.boardTarget);
        setTimeout(() => setArrivingCell(null), 600);
      }
      if (f.onDone) f.onDone();
    }
  }

  useEffect(() => {
    const t = setTimeout(runCycle, 1500);
    return () => clearTimeout(t);
  }, [runCycle]);

  const pct = Math.round((calledCount / 90) * 100);

  /* ── Shared sub-components ── */
  const BoardGrid = () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gap: isMobile ? 2 : 4,
      width: "100%",
    }}>
      {Array.from({ length: 90 }, (_, i) => {
        const n = i + 1;
        const called   = calledSet.has(n);
        const arriving = arrivingCell === n;
        const c = dc(n);
        return (
          <div
            key={n}
            ref={el => { cellRefs.current[n] = el; }}
            style={{
              aspectRatio: "1",            
              borderRadius: "100%",     
              display: "flex", alignItems: "center", justifyContent: "center",
              // fontFamily: "'Orbitron',monospace",
              fontSize: isMobile ? 7 : isNarrow ? 9 : 15,
              fontWeight: 700,
              background: called ? c.base : "rgba(255,255,255,.055)",
              color: called ? "#fff" : "rgba(255,255,255,.22)",
              border: `1px solid ${called ? c.base : "rgba(255,255,255,.07)"}`,
              boxShadow: arriving ? `0 0 10px ${c.base}, 0 0 20px ${c.base}66`
                : called ? `0 0 4px ${c.base}55` : "none",
              transition: "background .3s, color .3s, box-shadow .3s",
              animation: arriving ? "cellArrive .55s cubic-bezier(.22,1.5,.36,1) forwards" : "none",
              cursor: "default", userSelect: "none",
            }}
          >
            {n}
          </div>
        );
      })}
    </div>
  );

  const TraySlots = ({ vertical = false }) => (
    <div style={{ display:"flex", flexDirection: vertical ? "column" : "row", gap:10, alignItems:"center" }}>
      {[0,1].map(i => (
        <div
          key={i}
          ref={i === 0 ? slot0Ref : slot1Ref}
          style={{
            width: traySlotSize, height: traySlotSize, borderRadius:"50%",
            border:"2px dashed rgba(255,255,255,.2)",
            background:"rgba(255,255,255,.04)",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}
        >
          {tray[i] !== null ? (
            <div key={trayKey[i]}><TrayBall number={tray[i]} size={trayBallSize} /></div>
          ) : (
            <span style={{ fontSize:9, color:"rgba(255,255,255,.18)" }}>{i===0?"①":"②"}</span>
          )}
        </div>
      ))}
    </div>
  );

  const StatsBar = ({ compact = false }) => (
    <div style={{ display:"flex", gap:8, width:"100%" }}>
      {[
        { lbl:"Called", val:calledCount, color:"#ffd700" },
        { lbl:"Left",   val:90-calledCount, color:"#0cf" },
      ].map(s => (
        <div key={s.lbl} style={{
          flex:1, textAlign:"center",
          padding: compact ? "4px" : "6px 4px",
          borderRadius:8,
          background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(255,255,255,.09)",
        }}>
          <div style={{
            //  fontFamily:"'Orbitron',monospace",
              fontSize: compact?15:19, fontWeight:700, color:s.color }}>{s.val}</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,.4)", letterSpacing:1 }}>{s.lbl}</div>
        </div>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div style={{ width:"100%", height:5, borderRadius:3, background:"rgba(255,255,255,.09)", overflow:"hidden" }}>
      <div style={{
        height:"100%", borderRadius:3,
        background:"linear-gradient(90deg,#ffd700,#ff4500)",
        width:`${pct}%`, transition:"width .6s ease",
      }} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Baloo+2:wght@600;800&display=swap');
        @keyframes bigDrop {
          0%   { transform: translateY(-60px) scale(0.3) rotate(-160deg); opacity: 0; }
          55%  { transform: translateY(7px) scale(1.07) rotate(5deg); }
          75%  { transform: translateY(-3px) scale(0.96); }
          100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
        }
        @keyframes trayBounceIn {
          0%   { transform: scale(0.2) rotate(-90deg); opacity: 0; }
          60%  { transform: scale(1.1) rotate(4deg); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes cellArrive {
          0%   { transform: scale(1.6); opacity: 0; }
          55%  { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmerText {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes floatBall {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes donePulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.6; }
        }
        @keyframes soundBar {
          0%,100% { transform: scaleY(0.3); }
          50%     { transform: scaleY(1); }
        }
        .tl-shimmer {
          background: linear-gradient(90deg,#ffd700,#ff8c00,#ffe066,#ff8c00,#ffd700);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 2.5s linear infinite;
        }
        .tl-float { animation: floatBall 3s ease-in-out infinite; }
      `}</style>

      {/*
        ROOT WRAPPER RULES:
        - width: 100%  → fits parent, never causes horiz scroll
        - overflow: hidden  → clips decorative glow orbs
        - NO 100vw, NO 100vh, NO position:fixed on this element
      */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 14,
          background: "radial-gradient(ellipse at 85% 90%, rgba(0, 43, 102, 1) 0%, transparent 60%),radial-gradient(ellipse at 18% 12%, rgba(0, 66, 150, 1) 0%, rgba(0, 20, 51, 1) 55%)",

          // background: "radial-gradient(ellipse at 18% 12%, #1a0540 0%, #080818 55%), radial-gradient(ellipse at 85% 90%, #001a28 0%, transparent 60%)",
          // fontFamily: "'Baloo 2', cursive",
          color: "#fff",
          position: "relative",
        }}
      >
        {/* decorative grid — contained by overflow:hidden */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(0,180,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,.03) 1px,transparent 1px)",
          backgroundSize:"36px 36px",
        }} />
        {/* glow orbs — % sizing so they never exceed container */}
        <div style={{ position:"absolute", top:"-12%", left:"-6%", width:"38%", paddingBottom:"38%", borderRadius:"50%", background:"radial-gradient(circle,rgba(120,40,255,.16) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-12%", right:"-6%", width:"34%", paddingBottom:"34%", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,180,120,.12) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* FlyingBall: position:fixed, does NOT cause layout overflow */}
        {fly && (
          <FlyingBall
            from={fly.from} to={fly.to} number={fly.number}
            size={fly.size} targetSize={fly.targetSize} onDone={handleFlyDone}
          />
        )}

        {/* ══ MOBILE LAYOUT ══ */}
        {isMobile && (
          <div style={{ display:"flex", flexDirection:"column", padding:"10px 8px 14px", gap:8, position:"relative", zIndex:1 }}>

            {/* top bar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
              <h1 className="tl-shimmer" style={{ 
                // fontFamily:"'Orbitron',monospace",
                 fontSize:10, fontWeight:900, letterSpacing:2, flexShrink:0 }}>
                🎱 TAMBOLA
              </h1>
              <StatsBar compact />
            </div>

            {/* ball + tray side by side */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
              <div style={{ position:"relative" }}>
                {showPulse && bigNum && (
                  <>
                    <div style={{ position:"absolute", width:bigBallSize, height:bigBallSize, borderRadius:"50%", border:`2px solid ${dc(bigNum).base}`, animation:"pulseRing 1.3s ease-out infinite", top:0, left:0 }} />
                    <div style={{ position:"absolute", width:bigBallSize, height:bigBallSize, borderRadius:"50%", border:`1px solid ${dc(bigNum).light}`, animation:"pulseRing 1.3s ease-out 0.4s infinite", top:0, left:0 }} />
                  </>
                )}
                <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
                  <BigBall number={bigNum} animKey={bigKey} size={bigBallSize} />
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                {bigNum
                  ? <div style={{ 
                    // fontFamily:"'Orbitron',monospace", 
                    
                    fontSize:22, fontWeight:900, color:"#ffd700", lineHeight:1 }}>{bigNum}</div>
                  : <div style={{ fontSize:9, color:"rgba(255,255,255,.3)" }}>{done?"Done!":"Drawing…"}</div>
                }
                <TraySlots vertical />
              </div>
            </div>

            <ProgressBar />
            <BoardGrid />
          </div>
        )}

        {/* ══ DESKTOP / TABLET LAYOUT ══ */}
        {!isMobile && (
          <div style={{ display:"flex", alignItems:"stretch", position:"relative", zIndex:1, minHeight:440 }}>

            {/* LEFT PANEL */}
            <div style={{
              flexShrink: 0,
              width: leftPanelW,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: isNarrow ? 16 : 22,
              padding: isNarrow ? "16px 10px" : "20px 14px",
              borderRight: "1px solid rgba(255,255,255,.06)",
            }}>
              <div style={{ textAlign:"center" }}>
                <h1 className="tl-shimmer" style={{ 
                  // fontFamily:"'Orbitron',monospace", 
                  fontSize: isNarrow?12:15, fontWeight:900, letterSpacing:2 }}>
                  🎱 TAMBOLA LIVE
                </h1>
                <p style={{ fontSize:8, color:"rgba(0,200,255,.5)", letterSpacing:2, marginTop:2 }}>90 BALL · AUTO DRAW</p>
              </div>

              {/* Big ball + number */}
              <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                {showPulse && bigNum && (
                  <>
                    <div style={{ position:"absolute", width:bigBallSize, height:bigBallSize, borderRadius:"50%", border:`3px solid ${dc(bigNum).base}`, animation:"pulseRing 1.3s ease-out infinite", top:0, left:0 }} />
                    <div style={{ position:"absolute", width:bigBallSize, height:bigBallSize, borderRadius:"50%", border:`2px solid ${dc(bigNum).light}`, animation:"pulseRing 1.3s ease-out 0.4s infinite", top:0, left:0 }} />
                  </>
                )}
                <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
                  <BigBall number={bigNum} animKey={bigKey} size={bigBallSize} />
                </div>
                <div style={{ textAlign:"center", minHeight:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  {bigNum ? (
                    <>
                      {/* <div style={{ 
                        // fontFamily:"'Orbitron',monospace",
                         fontSize: isNarrow?26:34, fontWeight:900, color:"#ffd700", textShadow:"0 0 18px rgba(255,215,0,.7)", lineHeight:1 }}>
                        {bigNum}
                      </div> */}
                      <div style={{ display:"flex", gap:2, alignItems:"flex-end", marginTop:4, height:12 }}>
                        {[1,2,3,4,3,2,1].map((h,idx) => (
                          <div key={idx} style={{ width:2, height:h*3, background:"rgba(0,200,255,.6)", borderRadius:1, animation:`soundBar 0.6s ease-in-out ${idx*0.08}s infinite`, transformOrigin:"bottom" }} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.25)" }}>{done?"All Done!":"Drawing…"}</div>
                  )}
                </div>
              </div>

              <TraySlots />
              <StatsBar />
              <ProgressBar />
            </div>

            {/* RIGHT PANEL — minWidth:0 is CRITICAL to prevent flex overflow */}
            <div style={{
              flex: 1,
              minWidth: 0,
              display: "flex", flexDirection: "column",
              padding: isNarrow ? "12px 10px 12px 8px" : "16px 16px 12px 10px",
              gap: 8,
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <h2 style={{
                  //  fontFamily:"'Orbitron',monospace",
                    fontSize: isNarrow?9:11, fontWeight:900, letterSpacing:2, color:"rgba(0,200,255,.7)" }}>
                  FULL BOARD 1–90
                </h2>
                <span style={{ fontSize:9, color:"rgba(255,255,255,.35)", letterSpacing:1 }}>{pct}% complete</span>
              </div>

              <div style={{ flex:1 }}><BoardGrid /></div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center" }}>
                {DECADE_COLORS.map((d,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:3 }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:d.base }} />
                    <span style={{ fontSize:7, color:"rgba(255,255,255,.3)" }}>{i*10+1}–{(i+1)*10}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DONE overlay */}
        {done && (
          <div style={{
            position:"absolute", inset:0, zIndex:50,
            background:"rgba(0,0,0,.85)", borderRadius:14,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:12,
          }}>
            <div style={{
              // fontFamily:"'Orbitron',monospace", 
              fontSize: isMobile?22:30, fontWeight:900,
              color:"#ffd700", textShadow:"0 0 28px rgba(255,215,0,.8)",
              textAlign:"center", animation:"donePulse 1.5s ease-in-out infinite",
            }}>🎉 FULL HOUSE!</div>
            <div style={{ color:"rgba(255,255,255,.55)", fontSize:12 }}>All 90 balls called!</div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop:8, padding:"8px 24px",
                // fontFamily:"'Orbitron',monospace",
                 fontSize:11, fontWeight:700,
                background:"linear-gradient(135deg,#ffd700,#ff8c00)",
                color:"#1a0a2e", border:"none", borderRadius:10, cursor:"pointer",
                boxShadow:"0 4px 14px rgba(255,165,0,.4)",
              }}
            >PLAY AGAIN</button>
          </div>
        )}
      </div>
    </>
  );
}