import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   PALETTE — Navy & Gold
   #001433  deep navy bg
   #002b66  mid navy
   #004296  bright navy accent
   #FBEFA4  gold highlight
───────────────────────────────────────────── */
const DECADE_COLORS = [
  { base:"#004296", light:"#1a6fd8", mid:"#002b66", glow:"rgba(0,66,150,0.55)"  },  // 1-10  navy
  { base:"#005f8a", light:"#0090cc", mid:"#003a55", glow:"rgba(0,95,138,0.50)"  },  // 11-20
  { base:"#1a5276", light:"#2e86c1", mid:"#0f2e45", glow:"rgba(26,82,118,0.50)" },  // 21-30
  { base:"#1a7a6a", light:"#1abc9c", mid:"#0d4d42", glow:"rgba(26,122,106,0.50)"},  // 31-40
  { base:"#b8860b", light:"#FBEFA4", mid:"#7a5a05", glow:"rgba(251,239,164,0.50)"},  // 41-50 gold
  { base:"#c9a227", light:"#ffe066", mid:"#8a6d10", glow:"rgba(201,162,39,0.50)" },  // 51-60
  { base:"#a07620", light:"#d4a017", mid:"#6b4f10", glow:"rgba(160,118,32,0.50)" },  // 61-70
  { base:"#7d5a0b", light:"#b8860b", mid:"#4d3608", glow:"rgba(125,90,11,0.45)"  },  // 71-80
  { base:"#3a3a8c", light:"#6666cc", mid:"#1e1e5a", glow:"rgba(58,58,140,0.50)"  },  // 81-90
];

function dc(n) { return DECADE_COLORS[Math.min(Math.floor((n - 1) / 10), 8)]; }

function ballGradient(n) {
  const c = dc(n);
  return `radial-gradient(circle at 35% 25%, ${c.light} 0%, ${c.base} 45%, ${c.mid} 100%)`;
}

function ballBoxShadow(n, mode = "big") {
  const c = dc(n);
  if (mode === "big")
    return `0 0 0 1px rgba(255,255,255,0.07),
            0 0 50px ${c.glow},
            0 0 100px ${c.glow.replace(/[\d.]+\)$/, "0.18)")},
            inset -10px -10px 24px rgba(0,0,0,0.5),
            inset 7px 7px 18px rgba(255,255,255,0.20)`;
  if (mode === "tray")
    return `inset -3px -3px 10px rgba(0,0,0,0.45),
            inset 2px 2px 7px rgba(255,255,255,0.18),
            0 0 20px ${c.glow},
            0 4px 12px rgba(0,0,0,0.4)`;
  if (mode === "grid-arriving")
    return `0 0 0 2px rgba(255,255,255,0.12),
            0 0 24px ${c.glow},
            0 0 48px ${c.glow},
            inset -3px -3px 10px rgba(0,0,0,0.5),
            inset 2px 2px 8px rgba(255,255,255,0.25)`;
  if (mode === "grid-called")
    return `0 0 0 1px rgba(255,255,255,0.05),
            0 2px 10px rgba(0,0,0,0.4),
            0 0 12px ${c.glow.replace(/[\d.]+\)$/, "0.28)")},
            inset -2px -2px 8px rgba(0,0,0,0.45),
            inset 1px 1px 6px rgba(255,255,255,0.18)`;
  return "0 1px 4px rgba(0,0,0,0.3), inset -1px -1px 5px rgba(0,0,0,0.4)";
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
   SOUND — plays /sounds/{number}.mp3 on reveal
───────────────────────────────────────────── */
function playNumberSound(n) {
  try {
    const audio = new Audio(`/sounds/${n}.mp3`);
    audio.volume = 0.85;
    audio.play().catch(() => {});
  } catch (e) {}
}

/* ─────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────── */
function Particles({ active, color, size }) {
  if (!active) return null;
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * 360;
    const dist  = size * 0.65 + Math.random() * size * 0.45;
    const delay = Math.random() * 0.3;
    const dur   = 1.2 + Math.random() * 0.7;
    const px    = Math.cos((angle * Math.PI) / 180) * dist;
    const py    = Math.sin((angle * Math.PI) / 180) * dist;
    const s     = 2 + Math.random() * 3;
    return { px, py, delay, dur, s };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            width: p.s, height: p.s,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 5px ${color}`,
            animation: `tl-particle${i % 3} ${p.dur}s ${p.delay}s ease-out forwards`,
            transform: "translate(-50%, -50%)",
            "--px": `${p.px}px`,
            "--py": `${p.py}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BIG DISPLAY BALL
───────────────────────────────────────────── */
function BigBall({ number, animKey, size = 148 }) {
  const fontSize = size * 0.34;
  const c = number ? dc(number) : null;
  return (
    <div
      key={animKey}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: number
          ? ballGradient(number)
          : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
        boxShadow: number
          ? ballBoxShadow(number, "big")
          : `inset -8px -8px 22px rgba(0,0,0,0.6),
             inset 6px 6px 16px rgba(255,255,255,0.04)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", flexShrink: 0,
        animation: number ? "tl-ballReveal 0.9s cubic-bezier(0.16,1.4,0.3,1) forwards" : "none",
        willChange: "transform",
      }}
    >
      <div style={{ position:"absolute", top:size*0.10, left:size*0.18, width:size*0.32, height:size*0.18,
        background:"rgba(255,255,255,0.30)", borderRadius:"50%", transform:"rotate(-30deg)", filter:`blur(${size<100?2:4}px)` }} />
      <div style={{ position:"absolute", top:size*0.14, left:size*0.22, width:size*0.20, height:size*0.10,
        background:"rgba(255,255,255,0.50)", borderRadius:"50%", transform:"rotate(-30deg)", filter:"blur(2px)" }} />
      <div style={{ position:"absolute", bottom:size*0.14, right:size*0.18, width:size*0.18, height:size*0.08,
        background:"rgba(255,255,255,0.10)", borderRadius:"50%", transform:"rotate(20deg)", filter:"blur(3px)" }} />
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
  );
}

/* ─────────────────────────────────────────────
   TRAY BALL
───────────────────────────────────────────── */
function TrayBall({ number, size = 64, isNew = false }) {
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
      <div style={{ position:"absolute", top:size*0.14, left:size*0.20, width:size*0.28, height:size*0.14,
        background:"rgba(255,255,255,0.42)", borderRadius:"50%", transform:"rotate(-30deg)", filter:"blur(2px)" }} />
      <div style={{ position:"absolute", top:size*0.18, left:size*0.24, width:size*0.16, height:size*0.08,
        background:"rgba(255,255,255,0.58)", borderRadius:"50%", transform:"rotate(-30deg)", filter:"blur(1px)" }} />
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
}

/* ─────────────────────────────────────────────
   GRID BALL
───────────────────────────────────────────── */
function GridBall({ number, called, arriving, size = 44 }) {
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
        <div style={{ position:"absolute", top:size*0.12, left:size*0.20, width:size*0.28, height:size*0.14,
          background:"rgba(255,255,255,0.38)", borderRadius:"50%", transform:"rotate(-30deg)", filter:"blur(1.5px)" }} />
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
}

/* ─────────────────────────────────────────────
   FLYING BALL
───────────────────────────────────────────── */
function FlyingBall({ from, to, number, size, targetSize, onDone, duration = 900 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !from || !to) return;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const scale = targetSize / size;
    const arcX  = dx * 0.5;
    const arcY  = dy * 0.3 - Math.abs(dx) * 0.15;
    ref.current.animate([
      { transform: "translate(0px, 0px) scale(1)",                                     opacity: 1,    offset: 0    },
      { transform: `translate(${arcX}px, ${arcY}px) scale(${0.9 + scale * 0.1})`,     opacity: 1,    offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`,                     opacity: 0.65, offset: 1    },
    ], { duration, easing: "cubic-bezier(0.4,0,0.2,1)", fill: "forwards" }).onfinish = onDone;
  }, []);
  if (!from) return null;
  return (
    <div ref={ref} style={{
      position: "fixed",
      left: from.x - size / 2, top: from.y - size / 2,
      width: size, height: size, borderRadius: "50%",
      background: ballGradient(number),
      boxShadow: ballBoxShadow(number, "tray"),
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, pointerEvents: "none",
      fontSize: size * 0.3, fontWeight: 900,
      fontFamily: "'Cinzel', serif", color: "#fff",
      textShadow: "0 1px 4px rgba(0,0,0,0.7)",
      willChange: "transform",
    }}>
      <div style={{ position:"absolute", top:"12%", left:"20%", width:"28%", height:"14%",
        background:"rgba(255,255,255,0.38)", borderRadius:"50%", transform:"rotate(-30deg)", filter:"blur(2px)" }} />
      {number}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function TambolaLive() {
  const [bag, setBag]               = useState(() => shuffle(Array.from({ length: 90 }, (_, i) => i + 1)));
  const [calledSet, setCalledSet]   = useState(new Set());
  const [calledCount, setCalledCount] = useState(0);
  const [bigNum, setBigNum]         = useState(null);
  const [bigKey, setBigKey]         = useState(0);
  const [showPulse, setShowPulse]   = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [tray, setTray]             = useState([null, null]);
  const [trayKey, setTrayKey]       = useState([0, 0]);
  const [fly, setFly]               = useState(null);
  const [arrivingCell, setArrivingCell] = useState(null);
  const [done, setDone]             = useState(false);

  /* ── Responsive ── */
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(1000);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(e => setContainerW(e[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile  = containerW < 520;
  const isNarrow  = containerW < 820;

  const BIG_BALL_SIZE  = isMobile ? 92   : isNarrow ? 116 : 148;
  const TRAY_BALL_SIZE = isMobile ? 46   : isNarrow ? 54  : 64;
  const TRAY_SLOT_SIZE = isMobile ? 54   : isNarrow ? 62  : 76;
  const GRID_BALL_SIZE = isMobile ? 26   : isNarrow ? 36  : 44;
  const LEFT_PANEL_W   = isNarrow ? 210  : 340;

  /* Refs */
  const bigBallRef  = useRef(null);
  const slot0Ref    = useRef(null);
  const slot1Ref    = useRef(null);
  const cellRefs    = useRef({});
  const trayRef     = useRef([null, null]);
  const bagRef      = useRef(bag);
  const busyRef     = useRef(false);

  trayRef.current = tray;
  bagRef.current  = bag;

  function getCenter(el) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  /* ── Fly helpers ── */
  function doFlySlot1ToBoard(num, onDone) {
    setTray(p => { const t = [...p]; t[1] = null; return t; });
    setFly({
      from: getCenter(slot1Ref.current), to: getCenter(cellRefs.current[num]),
      number: num, size: TRAY_BALL_SIZE, targetSize: GRID_BALL_SIZE,
      type: "toBoard", boardTarget: num, onDone, duration: 800,
    });
  }
  function doFlySlot0ToSlot1(num, onDone) {
    setTray(p => { const t = [...p]; t[0] = null; return t; });
    setFly({
      from: getCenter(slot0Ref.current), to: getCenter(slot1Ref.current),
      number: num, size: TRAY_BALL_SIZE, targetSize: TRAY_BALL_SIZE,
      type: "toSlot1", num, onDone, duration: 600,
    });
  }
  function doFlyBigToSlot0(num) {
    setFly({
      from: getCenter(bigBallRef.current), to: getCenter(slot0Ref.current),
      number: num, size: BIG_BALL_SIZE * 0.68, targetSize: TRAY_BALL_SIZE,
      type: "toSlot0", num, duration: 950,
    });
  }
  function doFlySlot0ToBoard(num, onDone) {
    setTray(p => { const t = [...p]; t[0] = null; return t; });
    setFly({
      from: getCenter(slot0Ref.current), to: getCenter(cellRefs.current[num]),
      number: num, size: TRAY_BALL_SIZE, targetSize: GRID_BALL_SIZE,
      type: "toBoard", boardTarget: num, onDone, duration: 800,
    });
  }

  const runCycle = useCallback(() => {
    if (busyRef.current) return;
    const currentBag  = bagRef.current;
    const currentTray = trayRef.current;
    if (currentBag.length === 0 && currentTray[0] === null && currentTray[1] === null) {
      setDone(true); return;
    }
    busyRef.current = true;

    if (currentBag.length > 0) {
      const newBag = [...currentBag];
      const n = newBag.pop();
      setBag(newBag);
      setCalledCount(c => c + 1);
      setBigNum(n);
      setBigKey(k => k + 1);
      setShowPulse(true);
      setShowParticles(false);
      setTimeout(() => setShowParticles(true), 200);
      setTimeout(() => playNumberSound(n), 2800);

      setTimeout(() => {
        setShowPulse(false);
        setShowParticles(false);
        setBigNum(null);
        const ct = trayRef.current;
        const s1 = ct[1], s0 = ct[0];
        if (s1 !== null) {
          doFlySlot1ToBoard(s1, () => {
            if (trayRef.current[0] !== null) {
              doFlySlot0ToSlot1(trayRef.current[0], () => doFlyBigToSlot0(n));
            } else {
              doFlyBigToSlot0(n);
            }
          });
        } else if (s0 !== null) {
          doFlySlot0ToSlot1(s0, () => doFlyBigToSlot0(n));
        } else {
          doFlyBigToSlot0(n);
        }
      }, 4000);
    } else {
      const ct = trayRef.current;
      if (ct[1] !== null) {
        doFlySlot1ToBoard(ct[1], () => {
          setTimeout(() => {
            if (trayRef.current[0] !== null) {
              doFlySlot0ToBoard(trayRef.current[0], () => { busyRef.current = false; setDone(true); });
            } else { busyRef.current = false; setDone(true); }
          }, 300);
        });
      } else if (ct[0] !== null) {
        doFlySlot0ToBoard(ct[0], () => { busyRef.current = false; setDone(true); });
      } else { busyRef.current = false; setDone(true); }
    }
  }, [BIG_BALL_SIZE, TRAY_BALL_SIZE, GRID_BALL_SIZE]);

  function handleFlyDone() {
    const f = fly;
    setFly(null);
    if (f.type === "toBoard") {
      setCalledSet(prev => new Set([...prev, f.boardTarget]));
      setArrivingCell(f.boardTarget);
      setTimeout(() => setArrivingCell(null), 800);
      if (f.onDone) setTimeout(f.onDone, 100);
    } else if (f.type === "toSlot1") {
      setTray(p => { const t = [...p]; t[1] = f.num; return t; });
      setTrayKey(p => { const k = [...p]; k[1]++; return k; });
      if (f.onDone) setTimeout(f.onDone, 140);
    } else if (f.type === "toSlot0") {
      setTray(p => { const t = [...p]; t[0] = f.num; return t; });
      setTrayKey(p => { const k = [...p]; k[0]++; return k; });
      busyRef.current = false;
      setTimeout(runCycle, 1400);
    }
  }

  useEffect(() => {
    const t = setTimeout(runCycle, 1800);
    return () => clearTimeout(t);
  }, [runCycle]);

  const pct = Math.round((calledCount / 90) * 100);

  /* ── Sub-components ── */
  const BoardGrid = ({ mobile = false }) => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gap: mobile ? 3 : isNarrow ? 5 : 7,
      width: "100%",
      padding: mobile ? "6px" : isNarrow ? "8px" : "12px",
    }}>
      {Array.from({ length: 90 }, (_, i) => {
        const n = i + 1;
        return (
          <div key={n}
            ref={el => { cellRefs.current[n] = el; }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}
          >
            <GridBall number={n} called={calledSet.has(n)} arriving={arrivingCell === n} size={GRID_BALL_SIZE} />
          </div>
        );
      })}
    </div>
  );

  const TraySlots = ({ vertical = false }) => (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 14, alignItems: "center" }}>
      {[0, 1].map(i => (
        <div key={i}
          ref={i === 0 ? slot0Ref : slot1Ref}
          style={{
            width: TRAY_SLOT_SIZE, height: TRAY_SLOT_SIZE, borderRadius: "50%",
            background: "rgba(0,10,30,0.55)",
            border: "1px solid rgba(251,239,164,0.10)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,239,164,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, position: "relative",
          }}
        >
          <div style={{
            position: "absolute", bottom: "-19px", left: "50%", transform: "translateX(-50%)",
            fontSize: 7, color: "rgba(251,239,164,0.22)", letterSpacing: 1, whiteSpace: "nowrap",
            fontFamily: "'Cinzel', serif",
          }}>
            {i === 0 ? "LATEST" : "PREV"}
          </div>
          {tray[i] !== null
            ? <div key={trayKey[i]}><TrayBall number={tray[i]} size={TRAY_BALL_SIZE} isNew /></div>
            : <div style={{
                width: TRAY_BALL_SIZE * 0.4, height: TRAY_BALL_SIZE * 0.4,
                borderRadius: "50%",
                background: "rgba(251,239,164,0.03)",
                border: "1px dashed rgba(251,239,164,0.09)",
              }}/>
          }
        </div>
      ))}
    </div>
  );

  const StatsBar = ({ compact = false }) => (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {[
        { lbl: "CALLED", val: calledCount, accent: "#FBEFA4" },
        { lbl: "LEFT",   val: 90 - calledCount, accent: "#1abc9c" },
      ].map(s => (
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

  const ProgressBar = () => (
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
        <span style={{ fontSize: 7, color: "rgba(251,239,164,0.6)",  fontFamily: "'Cinzel',serif" }}>{pct}%</span>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", fontFamily: "'Cinzel',serif" }}>90</span>
      </div>
    </div>
  );

  /* ── Decade legend ── */
  const Legend = () => (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
      {DECADE_COLORS.map((d, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 3,
          padding: "2px 6px", borderRadius: 6,
          background: "rgba(0,20,51,0.4)",
          border: "1px solid rgba(251,239,164,0.05)",
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 25%, ${d.light}, ${d.base})`,
            boxShadow: `0 0 4px ${d.glow}`,
          }} />
          <span style={{ fontSize: 6, color: "rgba(251,239,164,0.30)", fontFamily: "'Raleway',sans-serif" }}>
            {i * 10 + 1}–{(i + 1) * 10}
          </span>
        </div>
      ))}
    </div>
  );

  /* ── Number color for display ── */
  const numColor = bigNum ? `linear-gradient(135deg, ${dc(bigNum).light}, ${dc(bigNum).base})` : null;

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');

        @keyframes tl-ballReveal {
          0%   { transform:scale(0.1) rotate(-180deg); opacity:0; filter:brightness(2.5); }
          55%  { transform:scale(1.08) rotate(5deg);  opacity:1; filter:brightness(1.4); }
          75%  { transform:scale(0.97) rotate(-2deg); filter:brightness(1.1); }
          100% { transform:scale(1)   rotate(0);      opacity:1; filter:brightness(1); }
        }
        @keyframes tl-traySettle {
          0%   { transform:scale(0.3) translateY(-10px); opacity:0; }
          60%  { transform:scale(1.06) translateY(1px);  opacity:1; }
          80%  { transform:scale(0.97); }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes tl-gridArrive {
          0%   { transform:scale(0.2); opacity:0; filter:brightness(3); }
          55%  { transform:scale(1.14); opacity:1; filter:brightness(1.5); }
          80%  { transform:scale(0.97); filter:brightness(1.1); }
          100% { transform:scale(1.04); opacity:1; filter:brightness(1); }
        }
        @keyframes tl-softPulse {
          0%,100% { transform:scale(1);    opacity:0.7; }
          50%     { transform:scale(1.55); opacity:0; }
        }
        @keyframes tl-floatDrift {
          0%,100% { transform:translateY(0px)  rotate(0deg); }
          33%     { transform:translateY(-8px) rotate(1deg); }
          66%     { transform:translateY(-4px) rotate(-0.8deg); }
        }
        @keyframes tl-shimmerSweep {
          0%   { background-position:-600px 0; }
          100% { background-position:600px 0; }
        }
        @keyframes tl-rotateSlow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes tl-breathe {
          0%,100% { opacity:0.4; }
          50%     { opacity:0.9; }
        }
        @keyframes tl-doneFade {
          0%   { opacity:0; transform:scale(0.92); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes tl-doneGlow {
          0%,100% { text-shadow:0 0 20px rgba(251,239,164,0.6), 0 0 40px rgba(251,239,164,0.25); }
          50%     { text-shadow:0 0 50px rgba(251,239,164,0.95), 0 0 100px rgba(251,239,164,0.45), 0 0 160px rgba(251,239,164,0.18); }
        }
        @keyframes tl-particle0 {
          0%   { transform:translate(-50%,-50%) translate(0,0) scale(1); opacity:1; }
          100% { transform:translate(-50%,-50%) translate(var(--px),var(--py)) scale(0); opacity:0; }
        }
        @keyframes tl-particle1 {
          0%   { transform:translate(-50%,-50%) scale(1); opacity:1; }
          100% { transform:translate(-50%,-50%) translate(calc(var(--px)*0.7),calc(var(--py)*1.2)) scale(0); opacity:0; }
        }
        @keyframes tl-particle2 {
          0%   { transform:translate(-50%,-50%) scale(1); opacity:1; }
          100% { transform:translate(-50%,-50%) translate(calc(var(--px)*1.2),calc(var(--py)*0.6)) scale(0); opacity:0; }
        }

        .tl-shimmer {
          background: linear-gradient(90deg,
            #c9b86c 0%, #ffe066 28%, #FBEFA4 50%, #ffe066 72%, #c9b86c 100%);
          background-size: 600px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tl-shimmerSweep 3.5s linear infinite;
        }
        .tl-float   { animation: tl-floatDrift 4s ease-in-out infinite; }
        .tl-breathe { animation: tl-breathe 2s ease-in-out infinite; }
      `}</style>

      {/* ── Root wrapper ── */}
      <div ref={containerRef} style={{
        width: "100%", overflow: "hidden", borderRadius: 18,
        background: `
          radial-gradient(ellipse at 15% 0%,   rgba(0,66,150,0.35) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 100%,  rgba(251,239,164,0.07) 0%, transparent 50%),
          linear-gradient(160deg, #002b66 0%, #001433 100%)
        `,
        border: "1px solid rgba(251,239,164,0.10)",
        boxShadow: `
          0 0 0 1px rgba(0,66,150,0.40),
          0 30px 80px rgba(0,8,25,0.85),
          inset 0 1px 0 rgba(251,239,164,0.06)
        `,
        color: "#fff", position: "relative",
        fontFamily: "'Raleway', sans-serif",
      }}>

        {/* Ambient grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(251,239,164,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,239,164,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }} />

        {/* Decorative rings */}
        {[
          { s: 280, t: -90, l: -90, anim: "tl-rotateSlow 32s linear infinite",         c: "rgba(0,66,150,0.18)"     },
          { s: 180, t: -50, l: -50, anim: "tl-rotateSlow 20s linear infinite reverse",  c: "rgba(251,239,164,0.07)"  },
          { s: 240, b: -70, r: -70, anim: "tl-rotateSlow 28s linear infinite",          c: "rgba(251,239,164,0.07)"  },
        ].map((ring, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            pointerEvents: "none", zIndex: 0,
            width: ring.s, height: ring.s,
            top: ring.t, left: ring.l, bottom: ring.b, right: ring.r,
            border: `1px solid ${ring.c}`,
            animation: ring.anim,
          }} />
        ))}

        {/* Flying ball layer */}
        {fly && (
          <FlyingBall
            from={fly.from} to={fly.to} number={fly.number}
            size={fly.size} targetSize={fly.targetSize}
            onDone={handleFlyDone} duration={fly.duration}
          />
        )}

        {/* ══════════════════════════════════════
            MOBILE  (< 520px)
        ══════════════════════════════════════ */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", padding: "14px 10px 20px", gap: 12, position: "relative", zIndex: 1 }}>

            {/* Mobile header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <h1 className="tl-shimmer" style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, flexShrink: 0, fontFamily: "'Cinzel',serif" }}>
                TAMBOLA
              </h1>
              <StatsBar compact />
            </div>

            {/* Mobile ball + tray row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              {/* Stage */}
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {showPulse && bigNum && (<>
                  {[0,1,2].map(k => (
                    <div key={k} style={{
                      position: "absolute",
                      inset: -(6*(k+1)+2),
                      borderRadius: "50%",
                      border: `${k<1?"1.5":"1"}px solid ${k===0?dc(bigNum).light+"55":dc(bigNum).base+(k===1?"33":"18")}`,
                      animation: `tl-softPulse 2.2s ease-out ${k*0.55}s infinite`,
                    }} />
                  ))}
                  <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
                </>)}
                <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
                  <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
                </div>
              </div>

              {/* Number + tray */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                {bigNum ? (
                  <div style={{
                    fontSize: 26, fontWeight: 900, fontFamily: "'Cinzel',serif",
                    background: numColor,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1,
                  }}>{bigNum}</div>
                ) : (
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>
                    {done ? "COMPLETE" : "DRAWING…"}
                  </div>
                )}
                <TraySlots vertical />
              </div>
            </div>

            <ProgressBar />

            {/* Mobile board */}
            <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 12, border: "1px solid rgba(251,239,164,0.05)" }}>
              <BoardGrid mobile />
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TABLET  (520–820px)
        ══════════════════════════════════════ */}
        {!isMobile && isNarrow && (
          <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 500 }}>

            {/* Narrow left */}
            <div style={{
              flexShrink: 0, width: LEFT_PANEL_W,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 18, padding: "20px 14px",
              borderRight: "1px solid rgba(251,239,164,0.06)",
              background: "rgba(0,0,0,0.20)",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 7, color: "rgba(251,239,164,0.38)", letterSpacing: 5, marginBottom: 5, fontFamily: "'Raleway',sans-serif" }}>✦ LIVE DRAW ✦</div>
                <h1 className="tl-shimmer" style={{ fontSize: 13, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>TAMBOLA</h1>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.16)", letterSpacing: 3, marginTop: 3, fontFamily: "'Cinzel',serif" }}>90 BALL · AUTO DRAW</div>
              </div>

              {/* Stage */}
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                {showPulse && bigNum && (<>
                  {[0,1,2].map(k => (
                    <div key={k} style={{
                      position: "absolute", borderRadius: "50%",
                      inset: -(6*(k+1)+2),
                      border: `${k<1?"1.5":"1"}px solid ${k===0?dc(bigNum).light+"55":dc(bigNum).base+(k===1?"33":"18")}`,
                      animation: `tl-softPulse 2.2s ease-out ${k*0.55}s infinite`,
                    }} />
                  ))}
                  <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
                </>)}
                {/* Floor glow */}
                <div style={{
                  position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)",
                  width: bigNum ? BIG_BALL_SIZE * 0.8 : 0, height: 10, borderRadius: "50%",
                  background: bigNum ? `radial-gradient(ellipse, ${dc(bigNum).glow} 0%, transparent 70%)` : "none",
                  transition: "width 0.8s ease",
                }} />
                <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
                  <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
                </div>
                <div style={{ minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {bigNum ? (
                    <div style={{
                      fontSize: 28, fontWeight: 900, fontFamily: "'Cinzel',serif",
                      background: numColor,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1,
                    }}>{bigNum}</div>
                  ) : (
                    <div style={{ fontSize: 7, color: "rgba(255,255,255,0.14)", letterSpacing: 3, fontFamily: "'Cinzel',serif" }}>
                      {done ? "COMPLETE" : "DRAWING…"}
                    </div>
                  )}
                </div>
              </div>

              <TraySlots />
              <StatsBar />
              <ProgressBar />
            </div>

            {/* Narrow right */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "16px 14px 14px 12px", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 2, height: 16, background: "linear-gradient(180deg, #FBEFA4, rgba(251,239,164,0))", borderRadius: 2 }} />
                  <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>FULL BOARD</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)" }}>
                  <div className="tl-breathe" style={{ width: 5, height: 5, borderRadius: "50%", background: pct===100?"#1abc9c":"#FBEFA4", boxShadow: pct===100?"0 0 6px #1abc9c":"0 0 6px #FBEFA4" }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.38)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
                </div>
              </div>
              <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <BoardGrid />
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            DESKTOP  (≥ 820px)
        ══════════════════════════════════════ */}
        {!isMobile && !isNarrow && (
          <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 560 }}>

            {/* Desktop left */}
            <div style={{
              flexShrink: 0, width: LEFT_PANEL_W,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 26, padding: "30px 22px",
              borderRight: "1px solid rgba(251,239,164,0.07)",
              background: "rgba(0,0,0,0.18)",
              backdropFilter: "blur(6px)",
            }}>

              {/* Title */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 7, color: "rgba(251,239,164,0.40)", letterSpacing: 5, marginBottom: 6, fontFamily: "'Raleway',sans-serif" }}>
                  ✦ LIVE DRAW ✦
                </div>
                <h1 className="tl-shimmer" style={{ fontSize: 18, fontWeight: 900, letterSpacing: 4, fontFamily: "'Cinzel',serif" }}>
                  TAMBOLA
                </h1>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: 3, marginTop: 4, fontFamily: "'Cinzel',serif" }}>
                  90 BALL · AUTO DRAW
                </div>
              </div>

              {/* Big ball stage */}
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                {showPulse && bigNum && (<>
                  {[0,1,2].map(k => (
                    <div key={k} style={{
                      position: "absolute", borderRadius: "50%",
                      inset: -(6*(k+1)+2),
                      border: `${k<1?"1.5":"1"}px solid ${k===0?dc(bigNum).light+"55":dc(bigNum).base+(k===1?"33":"18")}`,
                      animation: `tl-softPulse 2.2s ease-out ${k*0.55}s infinite`,
                    }} />
                  ))}
                  <Particles active={showParticles} color={dc(bigNum).light} size={BIG_BALL_SIZE} />
                </>)}
                {/* Floor glow */}
                <div style={{
                  position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)",
                  width: bigNum ? BIG_BALL_SIZE * 0.82 : 0, height: 12, borderRadius: "50%",
                  background: bigNum ? `radial-gradient(ellipse, ${dc(bigNum).glow} 0%, transparent 70%)` : "none",
                  transition: "width 0.8s ease", pointerEvents: "none",
                }} />

                <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
                  <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
                </div>

                {/* Number display */}
                <div style={{ textAlign: "center", minHeight: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {bigNum ? (
                    <div style={{
                      fontSize: 38, fontWeight: 900, fontFamily: "'Cinzel',serif",
                      background: numColor,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      lineHeight: 1, letterSpacing: 2,
                    }}>{bigNum}</div>
                  ) : (
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.14)", letterSpacing: 3, fontFamily: "'Cinzel',serif" }}>
                      {done ? "COMPLETE" : "DRAWING…"}
                    </div>
                  )}
                </div>
              </div>

              <TraySlots />
              <StatsBar />
              <ProgressBar />
              <Legend />
            </div>

            {/* Desktop right */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "24px 24px 20px 18px", gap: 14 }}>

              {/* Board header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 2, height: 18, background: "linear-gradient(180deg,#FBEFA4,rgba(251,239,164,0))", borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Cinzel',serif", color: "rgba(251,239,164,0.35)", letterSpacing: 3 }}>
                    FULL BOARD
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "rgba(0,20,51,0.50)", border: "1px solid rgba(251,239,164,0.08)", backdropFilter: "blur(8px)" }}>
                  <div className="tl-breathe" style={{ width: 5, height: 5, borderRadius: "50%", background: pct===100?"#1abc9c":"#FBEFA4", boxShadow: pct===100?"0 0 6px #1abc9c":"0 0 6px #FBEFA4" }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.40)", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{calledCount} / 90</span>
                </div>
              </div>

              {/* Grid */}
              <div style={{ flex: 1, background: "rgba(0,8,24,0.35)", borderRadius: 14, border: "1px solid rgba(251,239,164,0.05)", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <BoardGrid />
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            DONE OVERLAY
        ══════════════════════════════════════ */}
        {done && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 50,
            background: "rgba(0,8,25,0.92)",
            backdropFilter: "blur(14px)",
            borderRadius: 18,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 16,
            animation: "tl-doneFade 0.8s ease forwards",
          }}>
            {/* Rings */}
            {[{s:320,a:"tl-rotateSlow 12s linear infinite",c:"rgba(251,239,164,0.09)"},{s:220,a:"tl-rotateSlow 8s linear infinite reverse",c:"rgba(0,66,150,0.22)"}].map((r,i)=>(
              <div key={i} style={{ position:"absolute", width:r.s, height:r.s, borderRadius:"50%", border:`1px solid ${r.c}`, animation:r.a }} />
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
              onMouseOver={e => { e.currentTarget.style.transform="scale(1.07)"; e.currentTarget.style.boxShadow="0 6px 32px rgba(251,239,164,0.58)"; }}
              onMouseOut={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(251,239,164,0.38)"; }}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </>
  );
}