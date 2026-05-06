// import React, { useEffect, useRef } from "react";
// import { useSocket } from "../TambolaLive/hooks/useSocket";
// import { useGameState } from "../TambolaLive/hooks/useGameState";
// import { useResponsive } from "../TambolaLive/hooks/useResponsive";
// import { playNumberSound } from "../TambolaLive/utils/sounds";
// import StatusIndicator from "../TambolaLive/components/StatusIndicator";
// import DoneOverlay from "../TambolaLive/components/DoneOverlay";
// import MobileLayout from "../TambolaLive/components/MobileLayout";
// import TabletLayout from "../TambolaLive/components/TabletLayout";
// import DesktopLayout from "../TambolaLive/components/DesktopLayout";
// import "../../../styles/animations.css";


// export default function TambolaLive({ gameId = 1 }) {
//   const { connected, gameStatus, setGameStatus, on } = useSocket(gameId);
//   const gameState = useGameState();
//   const { containerRef, isMobile, isNarrow, sizes } = useResponsive();

//   const bigBallRef = useRef(null);
//   const slot0Ref = useRef(null);
//   const slot1Ref = useRef(null);
//   const cellRefs = useRef({});

//   // Socket event handlers
//   useEffect(() => {
//     on("game_started", () => {
//       setGameStatus("started");
//       gameState.setDone(false);
//     });

//     on("game_paused", () => setGameStatus("paused"));
//     on("game_resumed", () => setGameStatus("started"));
    
//     on("game_over", () => {
//       setGameStatus("over");
//       gameState.setDone(true);
//     });

//     on("number_called", (data) => {
//       if (data.game_id !== gameId) return;
//       const number = data.number;
      
//       playNumberSound(number);
//       gameState.showNumber(number);
//       gameState.addCalledNumber(number);
//       gameState.markArriving(number);
//       gameState.updateTray(number);
      
//       setTimeout(() => gameState.hideNumber(), 4000);
//     });

//     on("old_numbers", (data) => {
//       gameState.loadOldNumbers(data.calledNumbers);
//     });
//   }, [on, gameId, gameState, setGameStatus]);

//   return (
//     <div ref={containerRef} style={{
//       width: "100%", overflow: "hidden", borderRadius: 18,
//       background: `
//         radial-gradient(ellipse at 15% 0%, rgba(0,66,150,0.35) 0%, transparent 55%),
//         radial-gradient(ellipse at 85% 100%, rgba(251,239,164,0.07) 0%, transparent 50%),
//         linear-gradient(160deg, #002b66 0%, #001433 100%)
//       `,
//       border: "1px solid rgba(251,239,164,0.10)",
//       boxShadow: `
//         0 0 0 1px rgba(0,66,150,0.40),
//         0 30px 80px rgba(0,8,25,0.85),
//         inset 0 1px 0 rgba(251,239,164,0.06)
//       `,
//       color: "#fff", position: "relative",
//       fontFamily: "'Raleway', sans-serif",
//     }}>
//       <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20 }}>
//         <StatusIndicator connected={connected} gameStatus={gameStatus} />
//       </div>

//       {/* Ambient grid background */}
//       <div style={{
//         position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
//         backgroundImage: `
//           linear-gradient(rgba(251,239,164,0.025) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(251,239,164,0.025) 1px, transparent 1px)
//         `,
//         backgroundSize: "52px 52px",
//       }} />

//       {/* Decorative rings */}
//       {[
//         { s: 280, t: -90, l: -90, anim: "tl-rotateSlow 32s linear infinite", c: "rgba(0,66,150,0.18)" },
//         { s: 180, t: -50, l: -50, anim: "tl-rotateSlow 20s linear infinite reverse", c: "rgba(251,239,164,0.07)" },
//         { s: 240, b: -70, r: -70, anim: "tl-rotateSlow 28s linear infinite", c: "rgba(251,239,164,0.07)" },
//       ].map((ring, i) => (
//         <div key={i} style={{
//           position: "absolute", borderRadius: "50%",
//           pointerEvents: "none", zIndex: 0,
//           width: ring.s, height: ring.s,
//           top: ring.t, left: ring.l, bottom: ring.b, right: ring.r,
//           border: `1px solid ${ring.c}`,
//           animation: ring.anim,
//         }} />
//       ))}

//       {/* Layouts */}
//       {isMobile && (
//         <MobileLayout 
//           gameState={gameState} 
//           sizes={sizes} 
//           isNarrow={isNarrow}
//           bigBallRef={bigBallRef}
//           slot0Ref={slot0Ref}
//           slot1Ref={slot1Ref}
//           cellRefs={cellRefs}
//         />
//       )}

//       {!isMobile && isNarrow && (
//         <TabletLayout 
//           gameState={gameState} 
//           sizes={sizes} 
//           isNarrow={isNarrow}
//           bigBallRef={bigBallRef}
//           slot0Ref={slot0Ref}
//           slot1Ref={slot1Ref}
//           cellRefs={cellRefs}
//         />
//       )}

//       {!isMobile && !isNarrow && (
//         <DesktopLayout 
//           gameState={gameState} 
//           sizes={sizes} 
//           isNarrow={isNarrow}
//           bigBallRef={bigBallRef}
//           slot0Ref={slot0Ref}
//           slot1Ref={slot1Ref}
//           cellRefs={cellRefs}
//         />
//       )}

//       {gameState.done && <DoneOverlay isMobile={isMobile} />}
//     </div>
//   );
// }