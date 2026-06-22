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

/* ══════════════════════════════════════════════════
   BALL COMPONENTS
══════════════════════════════════════════════════ */

function BigBall({ number, size = 148 }) {
  const hasNum = number !== null && number !== undefined;
  const fontSize = size * 0.36;
  
  return (
    <div style={{
      width: size, height: size,
      opacity: hasNum ? 1 : 0,
      transition: "opacity 0.3s ease",
    }}>
      <div style={{
        width: size, height: size,
        borderRadius: "50%",
        background: hasNum
          ? ballGradient(number)
          : "radial-gradient(circle at 35% 25%, #1e2a4a, #001433)",
        boxShadow: hasNum
          ? "0 0 40px rgba(0,66,150,0.5), 0 0 80px rgba(0,66,150,0.2), inset -8px -8px 22px rgba(0,0,0,0.5), inset 6px 6px 16px rgba(255,255,255,0.2)"
          : "inset -8px -8px 22px rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
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
        <span style={{
          fontSize,
          fontWeight: 900,
          fontFamily: "'Cinzel', serif",
          color: "#fff",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          zIndex: 1, lineHeight: 1,
          position: "relative",
        }}>
          {hasNum ? number : ""}
        </span>
      </div>
    </div>
  );
}

function TrayBall({ number, size = 64 }) {
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
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: ballGradient(number),
      boxShadow: "inset -3px -3px 10px rgba(0,0,0,0.45), inset 2px 2px 7px rgba(255,255,255,0.18), 0 0 18px rgba(0,66,150,0.4), 0 4px 12px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", flexShrink: 0,
    }}>
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

function GridBall({ number, called, size = 44 }) {
  return (
    <div style={{
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
    }}>
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

  const isMobile    = containerW < 520;
  const isNarrow    = containerW < 820;
  const BIG         = isMobile ? 88  : isNarrow ? 112 : 144;
  const TRAY        = isMobile ? 48  : isNarrow ? 58  : 68;
  const TRAY_SLOT   = isMobile ? 58  : isNarrow ? 68  : 82;
  const GRID        = isMobile ? 26  : isNarrow ? 35  : 44;
  const LEFT_W      = isNarrow ? 215 : 345;

  /* ── Board state ── */
  const [calledSet, setCalledSet] = useState(new Set());
  const [done, setDone] = useState(false);

  useEffect(() => { 
    setCalledSet(new Set(calledNumbers)); 
  }, [calledNumbers]);
  
  useEffect(() => {
    if (gameStatus === "over")    setDone(true);
    if (gameStatus === "started") setDone(false);
  }, [gameStatus]);

  /* ── Tray state - FIXED ── */
  const [latestNum, setLatestNum] = useState(null);
  const [prevNum, setPrevNum] = useState(null);

  // Track previous value using ref to avoid stale state
  const latestNumRef = useRef(null);

  // Keep ref in sync
  useEffect(() => {
    latestNumRef.current = latestNum;
  }, [latestNum]);

  /* ══════════════════════════════════════════
     QUEUE SYSTEM
  ══════════════════════════════════════════ */
  const GAP_BETWEEN_NUMBERS = 5000; // 5 seconds
  
  const queueRef = useRef([]);
  const isProcessingRef = useRef(false);
  const timerRef = useRef(null);
  const lastNumRef = useRef(null);

  /* ── SOUND - AUTO PLAY ── */
  const audioRef = useRef(null);

  // Force unlock audio immediately
  useEffect(() => {
    // Create a silent audio context to unlock audio
    const unlockAudio = () => {
      // Try AudioContext first (works better for auto-play)
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioCtx = new AudioContext();
          // Create silent buffer
          const buffer = audioCtx.createBuffer(1, 1, 22050);
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.start(0);
          source.onended = () => {
            audioCtx.close();
          };
        }
      } catch (e) {
        // Fallback: try HTML5 Audio
        const silentAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYlmKQsAAAAAAD/+1DEAAAHAAb/AAAAIAAAP8AAAARMQUAABMQUAABLAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAvheh4PxQQBAEAQBP+8y0AABAABBwAAAABBwAAAAAAAAAAAAAAAP/zEMQAAAADSAAAAABQqb0y0AAAADAAAAA0TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        silentAudio.volume = 0.01;
        silentAudio.play().then(() => {
          silentAudio.pause();
          silentAudio.currentTime = 0;
        }).catch(() => {});
      }
    };

    // Try immediately
    unlockAudio();

    // Also try on events
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, unlockAudio, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, []);

  // Play sound function
  const playSoundOnly = useCallback((number) => {
    try {
      // Stop previous
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(`/sounds/${number}.mp3`);
      audio.volume = 1.0;
      audio.preload = 'auto';
      audioRef.current = audio;

      // Try to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If failed, try again with user gesture simulation
          const tryPlay = () => {
            audio.play().catch(() => {
              console.warn('Cannot play sound for', number);
            });
          };
          // Add click handler as fallback
          document.addEventListener('click', tryPlay, { once: true });
        });
      }

      audio.onended = () => { audioRef.current = null; };
      audio.onerror = () => { audioRef.current = null; };
    } catch (e) {
      console.warn('Sound error:', e);
    }
  }, []);

  // Process next number
  const processNextNumber = useCallback(() => {
    if (queueRef.current.length === 0) {
      isProcessingRef.current = false;
      return;
    }

    isProcessingRef.current = true;
    const nextNumber = queueRef.current.shift();
    
    // FIXED: Update prev first, then latest
    setPrevNum(latestNumRef.current);  // Current latest becomes prev
    setLatestNum(nextNumber);          // New number becomes latest
    
    // Play sound
    playSoundOnly(nextNumber);
    
    // Schedule next
    timerRef.current = setTimeout(() => {
      processNextNumber();
    }, GAP_BETWEEN_NUMBERS);
    
  }, [playSoundOnly]);

  // Watch for new numbers
  useEffect(() => {
    if (lastCalledNum !== null && lastCalledNum !== lastNumRef.current) {
      lastNumRef.current = lastCalledNum;
      queueRef.current.push(lastCalledNum);
      
      if (!isProcessingRef.current) {
        processNextNumber();
      }
    }
  }, [lastCalledNum, processNextNumber]);

  // Clear when done
  useEffect(() => {
    if (done) {
      if (timerRef.current) clearTimeout(timerRef.current);
      queueRef.current = [];
      isProcessingRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [done]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const pct = Math.round((calledCount / 90) * 100);

  /* ══ Sub-components ══ */

  const BoardGrid = ({ mobile = false }) => (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(10,1fr)",
      gap: mobile ? 3 : isNarrow ? 5 : 7,
      padding: mobile ? 6 : isNarrow ? 8 : 12,
      width: "100%",
    }}>
      {Array.from({ length: 90 }, (_, i) => {
        const n = i + 1;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}>
            <GridBall
              number={n}
              called={calledSet.has(n)}
              size={GRID}
            />
          </div>
        );
      })}
    </div>
  );

  const TraySlot = ({ slotNum, label, vertical }) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: vertical ? 4 : 6,
    }}>
      <div style={{
        width: TRAY_SLOT, height: TRAY_SLOT,
        borderRadius: "50%",
        background: "rgba(0,10,30,0.55)",
        border: "1px solid rgba(251,239,164,0.10)",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <TrayBall number={slotNum} size={TRAY} />
      </div>
      <span style={{
        fontSize: 7, color: "rgba(251,239,164,0.25)",
        letterSpacing: 1, whiteSpace: "nowrap",
        fontFamily: "'Cinzel',serif",
      }}>
        {label}
      </span>
    </div>
  );

  const TraySlots = ({ vertical = false }) => (
    <div style={{
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      gap: 18, alignItems: "center",
    }}>
      <TraySlot slotNum={latestNum} label="LATEST" vertical={vertical} />
      <TraySlot slotNum={prevNum} label="PREV"   vertical={vertical} />
    </div>
  );

  const BigBallArea = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BigBall number={latestNum} size={BIG} />
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
        <span style={{ fontSize: 7, color: "rgba(251,239,164,0.6)", fontFamily: "'Cinzel',serif" }}>{pct}%</span>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');
        
        .tl-shimmer-text {
          background: linear-gradient(90deg,#c9b86c 0%,#ffe066 28%,#FBEFA4 50%,#ffe066 72%,#c9b86c 100%);
          background-size: 600px 100%;
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      `}</style>

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
              FULL HOUSE
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