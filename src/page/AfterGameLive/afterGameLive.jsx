// // AfterGameLive.jsx - Fixed Winners API on Game Complete
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// import { ROUTES } from "../../routes/routes";
// import logoImage from "../../assets/tambolaGame.jpeg";
// import { API } from "../../services/api_url";

// import TambolaLive from "./animated_tambola_controller";
// import PlayerRanking from "./GameResultComponents/player_ranking";

// /* ─────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────── */

// /** Deduplicate an array while preserving order */
// function dedupe(arr) {
//   return [...new Set(arr)];
// }

// /** 
//  * Deduplicate winners by winner_id 
//  */
// function dedupeWinners(winners) {
//   if (!winners || !Array.isArray(winners)) return [];
//   const seen = new Set();
//   return winners.filter((w) => {
//     const key = w.winner_id || w.id || w.ticket_number;
//     if (!key) return true;
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

// /* ─────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────── */
// const GAME_STATE_KEY = "tambola_current_game_state";

// const AfterGameLive = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const savedGameState = (() => {
//     try {
//       return JSON.parse(sessionStorage.getItem(GAME_STATE_KEY));
//     } catch {
//       return null;
//     }
//   })();

//   const routeState = location.state && Object.keys(location.state).length ? location.state : savedGameState;
//   const gameData = routeState || {};
//   const gameId = gameData?.gameId;
//   const gameName = gameData?.gameName;
//   const gameDate = gameData?.gameDate;
//   const roundTime = gameData?.roundTime;

//   useEffect(() => {
//     if (routeState?.gameId) {
//       sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(routeState));
//     }
//   }, [routeState]);

//   useEffect(() => {
//     if (!gameId) navigate(ROUTES.HOME);
//   }, [gameId, navigate]);

//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem(GAME_STATE_KEY);
//     };
//   }, []);

//   /* ── Core state ── */
//   const [connected, setConnected] = useState(false);
//   const [gameStatus, setGameStatus] = useState("waiting");
//   const [currentRoundId, setCurrentRoundId] = useState(null);
//   const [calledNumbers, setCalledNumbers] = useState([]);
//   const [calledCount, setCalledCount] = useState(0);
//   const [allTickets, setAllTickets] = useState([]);
//   const [winners, setWinners] = useState([]);
//   const [lastCalledNum, setLastCalledNum] = useState(null);
//   const [loadingWinners, setLoadingWinners] = useState(false);
//   const [isGameOver, setIsGameOver] = useState(false);

//   /* ── Refs ── */
//   const socketRef = useRef(null);
//   const connectedRef = useRef(false);
//   const currentRoundRef = useRef(null);
//   const calledSetRef = useRef(new Set());
//   const gameIdRef = useRef(gameId);
//   gameIdRef.current = gameId;

//   /* Keep roundRef in sync */
//   useEffect(() => {
//     currentRoundRef.current = currentRoundId;
//   }, [currentRoundId]);

//   /* ══════════════════════════════════════════
//      API HELPERS
//   ══════════════════════════════════════════ */
//   const loadCurrentRound = useCallback(async () => {
//     if (!gameIdRef.current) return;
//     try {
//       const res = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameIdRef.current}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         setCurrentRoundId(result.data.round_id);
//         currentRoundRef.current = result.data.round_id;
//         setGameStatus(result.data.status || "waiting");
        
//         // ✅ Agar game already over hai toh winners load karo
//         if (result.data.status === "over" || result.data.status === "completed") {
//           setIsGameOver(true);
//           setTimeout(() => loadWinners(), 500);
//         }
//       }
//     } catch (e) { console.warn("loadCurrentRound:", e); }
//   }, []);

//   const loadAllTickets = useCallback(async () => {
//     if (!gameIdRef.current) return;
//     try {
//       const res = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameIdRef.current}`);
//       const result = await res.json();
//       if (result.success && result.data?.length) setAllTickets(result.data);
//     } catch (e) { console.warn("loadAllTickets:", e); }
//   }, []);

//   const updateCalledNumbers = useCallback(async () => {
//     const roundId = currentRoundRef.current;
//     if (!roundId) return;
//     try {
//       const res = await fetch(`${API.ROUND_ID_SOCKET_URL}${roundId}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         const { called_numbers, total_called, round_status } = result.data;
//         if (called_numbers) {
//           const deduped = dedupe(called_numbers);
//           calledSetRef.current = new Set(deduped);
//           setCalledNumbers(deduped);
//           setCalledCount(total_called ?? deduped.length);
//         }
//         if (round_status) {
//           setGameStatus(round_status);
//           // ✅ Agar round status over hai toh winners load karo
//           if (round_status === "over" || round_status === "completed") {
//             setIsGameOver(true);
//             setTimeout(() => loadWinners(), 500);
//           }
//         }
//       }
//     } catch (e) { console.warn("updateCalledNumbers:", e); }
//   }, []);

//   // ✅ FIXED: loadWinners with better retry logic for game complete
//   const loadWinners = useCallback(async (retryCount = 0) => {
//     const roundId = currentRoundRef.current;
//     if (!roundId) {
//       console.log("⚠️ No roundId available, skipping winner load");
//       return;
//     }
    
//     try {
//       setLoadingWinners(true);
//       console.log(`🔄 Fetching winners for round: ${roundId} (attempt ${retryCount + 1})`);
      
//       const res = await fetch(`${API.WINNER_LIST_SOCKET_URL}${roundId}`);
//       const result = await res.json();
      
//       console.log('📊 Winners API Response:', result);
      
//       if (result.success && result.data && result.data.length > 0) {
//         console.log(`✅ Found ${result.data.length} winners from API`);
//         const dedupedWinners = dedupeWinners(result.data);
//         console.log(`✅ After dedupe: ${dedupedWinners.length} unique winners`);
//         setWinners(dedupedWinners);
//       } else {
//         console.log('⚠️ No winners found or API returned empty');
//         setWinners([]);
        
//         // ✅ Agar game over hai aur winners nahi mile toh retry karo
//         if (isGameOver && retryCount < 5) {
//           console.log(`🔄 Retrying winners fetch (${retryCount + 1}/5)...`);
//           setTimeout(() => {
//             loadWinners(retryCount + 1);
//           }, 2000);
//         }
//       }
//     } catch (e) {
//       console.warn("loadWinners error:", e);
//       setWinners([]);
      
//       // ✅ Error par bhi retry agar game over hai
//       if (isGameOver && retryCount < 5) {
//         console.log(`🔄 Retrying winners fetch after error (${retryCount + 1}/5)...`);
//         setTimeout(() => {
//           loadWinners(retryCount + 1);
//         }, 2000);
//       }
//     } finally {
//       setLoadingWinners(false);
//     }
//   }, [isGameOver]);

//   // ✅ Go Back Handler
//   const handleGoBack = () => {
//     sessionStorage.removeItem(GAME_STATE_KEY);
//     navigate(ROUTES.HOME);
//   };

//   /* ══════════════════════════════════════════
//      INITIAL LOAD
//   ══════════════════════════════════════════ */
//   useEffect(() => {
//     loadCurrentRound();
//     loadAllTickets();
//   }, [loadCurrentRound, loadAllTickets]);

//   useEffect(() => {
//     if (currentRoundId) {
//       updateCalledNumbers();
//       // ✅ Round change par winners load karo
//       setTimeout(() => loadWinners(), 300);
//     }
//   }, [currentRoundId, updateCalledNumbers, loadWinners]);

//   /* ══════════════════════════════════════════
//      POLLING - Increased frequency for game complete
//   ══════════════════════════════════════════ */
//   useEffect(() => {
//     // ✅ Winners poll every 3 seconds (fast for game complete)
//     const t1 = setInterval(() => {
//       loadWinners();
//     }, 3000);
    
//     const t2 = setInterval(loadAllTickets, 8000);
    
//     return () => { 
//       clearInterval(t1); 
//       clearInterval(t2); 
//     };
//   }, [loadWinners, loadAllTickets]);

//   /* ══════════════════════════════════════════
//      SOCKET
//   ══════════════════════════════════════════ */
//   useEffect(() => {
//     if (!gameId) return;

//     console.log("🔌 Initializing socket connection...");

//     const socket = io(API.SOCKET_URL, {
//       transports: ["polling", "websocket"],
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000,
//     });

//     socketRef.current = socket;

//     if (socket.connected) {
//       connectedRef.current = true;
//       setConnected(true);
//     }

//     /* ── Connection ── */
//     socket.on("connect", () => {
//       console.log("✅ Socket CONNECT event fired! ID:", socket.id);
//       connectedRef.current = true;
//       setConnected(true);
//       socket.emit("get_game_data", { game_id: gameId });
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("❌ Socket disconnected. Reason:", reason);
//       connectedRef.current = false;
//       setConnected(false);
//     });

//     socket.on("connect_error", (error) => {
//       console.error("🚫 Connection error:", error.message);
//       connectedRef.current = false;
//       setConnected(false);
//     });

//     socket.on("reconnect", (attempt) => {
//       console.log("🔄 Reconnected after", attempt, "attempts");
//       connectedRef.current = true;
//       setConnected(true);
//       socket.emit("get_game_data", { game_id: gameId });
//     });

//     /* ── Game lifecycle ── */
//     socket.on("game_started", () => {
//       console.log("🎮 Game started");
//       setGameStatus("started");
//       setIsGameOver(false);
//     });

//     socket.on("game_paused", () => {
//       console.log("⏸️ Game paused");
//       setGameStatus("paused");
//     });

//     socket.on("game_resumed", () => {
//       console.log("▶️ Game resumed");
//       setGameStatus("started");
//     });

//     // ✅ FIXED: game_over event with aggressive winner refresh
//     socket.on("game_over", (data) => {
//       console.log("🏁🏁🏁 GAME OVER EVENT RECEIVED 🏁🏁🏁", data);
      
//       const roundMatch = data?.round_id === currentRoundRef.current;
//       const gameMatch = data?.game_id === gameId;
      
//       if (!data || roundMatch || gameMatch) {
//         setGameStatus("over");
//         setIsGameOver(true);
        
//         console.log("🏁 Game is OVER! Force refreshing winners...");
        
//         // ✅ Immediate fetch
//         loadWinners();
        
//         // ✅ Fetch after 1 second
//         setTimeout(() => {
//           console.log("🏁 Fetching winners after 1s...");
//           loadWinners();
//         }, 1000);
        
//         // ✅ Fetch after 3 seconds
//         setTimeout(() => {
//           console.log("🏁 Fetching winners after 3s...");
//           loadWinners();
//         }, 3000);
        
//         // ✅ Fetch after 5 seconds (final attempt)
//         setTimeout(() => {
//           console.log("🏁 Final winners fetch after 5s...");
//           loadWinners();
//         }, 5000);
//       }
//     });

//     /* ── Number called ── */
//     socket.on("number_called", (data) => {
//       console.log("🎯 Number called via socket:", data);

//       const gameMatch = data.game_id === gameId;
//       const roundMatch = data.round_id === currentRoundRef.current;
//       if (!gameMatch && !roundMatch) return;

//       const number = data.number;
//       if (typeof number !== "number") return;

//       if (calledSetRef.current.has(number)) {
//         console.log(`⚠️ Number ${number} already called, skipping`);
//         return;
//       }
//       calledSetRef.current.add(number);

//       setCalledNumbers(prev => dedupe([...prev, number]));
//       setCalledCount(prev => prev + 1);
//       setLastCalledNum({ num: number, ts: Date.now() });

//       setTimeout(loadAllTickets, 800);
//     });

//     /* ── Old numbers ── */
//     socket.on("old_numbers", (data) => {
//       console.log("📜 Old numbers received:", data);
//       if (data.calledNumbers?.length) {
//         const deduped = dedupe(data.calledNumbers);
//         calledSetRef.current = new Set(deduped);
//         setCalledNumbers(deduped);
//         setCalledCount(deduped.length);
//       }
//     });

//     /* ── Winners ── */
//     socket.on("winner_update", (data) => {
//       console.log("🏆 Winner update:", data);
//       if (data.round_id === currentRoundRef.current) {
//         loadWinners();
//         loadAllTickets();
//       }
//     });

//     socket.on("winner_created", (data) => {
//       console.log("👑 Winner created:", data);
//       const roundMatch = data?.round_id === currentRoundRef.current;
//       const gameMatch = data?.game_id === gameId;
//       if (roundMatch || gameMatch) {
//         loadWinners();
//         loadAllTickets();
//       }
//     });

//     /* ── Cleanup ── */
//     return () => {
//       console.log("🧹 Cleaning up socket connection");
//       socket.offAny();
//       socket.disconnect();
//     };
//   }, [gameId]);

//   if (!gameId) return null;

//   const sharedGameProps = {
//     gameId,
//     currentRoundId,
//     connected,
//     gameStatus,
//     calledNumbers,
//     calledCount,
//     allTickets,
//     winners,
//     loadingWinners,
//     lastCalledNum: lastCalledNum?.num ?? null,
//     onReloadTickets: loadAllTickets,
//     onReloadWinners: loadWinners,
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white p-4 md:p-6 relative">

//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-6">

//         {/* ── Header with Back Button ── */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

//           {/* Left Section - Back Button + Logo */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleGoBack}
//               className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-medium border border-white/10 hover:border-white/20"
//             >
//               <svg 
//                 className="w-4 h-4 sm:w-5 sm:h-5" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               <span className="hidden xs:inline">Back</span>
//             </button>

//             <div
//               onClick={() => navigate(ROUTES.HOME)}
//               className="relative group cursor-pointer"
//             >
//               <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
//               <div className="relative w-10 h-10 md:w-14 md:h-14 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
//                 <img src={logoImage} alt="Tambola Logo" className="w-full h-full object-cover rounded-full" />
//               </div>
//             </div>
//           </div>

//           <div className="text-center flex-1">
//             <h1 className="text-lg md:text-2xl font-bold">
//               <span className="text-[#FBEFA4]">TAMBOLA</span>
//               <span className="text-white/60 ml-2">LIVE GAME</span>
//             </h1>
//             {gameName && (
//               <p className="text-xs text-white/40 mt-0.5 tracking-widest font-light">{gameName}</p>
//             )}
//             <span className={`inline-block text-[10px] px-2 py-0.5 rounded mt-1 ${
//               isGameOver || gameStatus === 'over' ? 'bg-red-500/30 text-red-300' :
//               gameStatus === 'started' ? 'bg-green-500/30 text-green-300 animate-pulse' :
//               'bg-yellow-500/30 text-yellow-300'
//             }`}>
//               {isGameOver || gameStatus === 'over' ? '🏁 COMPLETED' :
//                gameStatus === 'started' ? '🔴 LIVE' :
//                '⏳ WAITING'}
//             </span>
//           </div>

//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/10">
//             <span
//               className="w-2 h-2 rounded-full"
//               style={{
//                 background: connected ? "#1abc9c" : "#ff4444",
//                 boxShadow: connected ? "0 0 8px #1abc9c" : "0 0 8px #ff4444",
//                 animation: connected ? "pulse-dot 2s ease-in-out infinite" : "none",
//               }}
//             />
//             <span className="text-[9px] tracking-widest font-semibold text-white/50">
//               {connected ? "LIVE" : "OFFLINE"}
//             </span>
//           </div>

//         </div>

//         <TambolaLive {...sharedGameProps} />
//         <PlayerRanking {...sharedGameProps} />

//         {isGameOver && (
//           <div className="text-center text-sm text-white/60 py-2">
//             🏆 Total Winners: <span className="text-[#FBEFA4] font-bold">{winners.length}</span>
//           </div>
//         )}

//       </div>

//       <div className="fixed bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent opacity-60" />

//       <style>{`
//         @keyframes pulse-dot {
//           0%, 100% { opacity: 0.5; }
//           50%       { opacity: 1;   }
//         }
//         @media (max-width: 480px) {
//           .xs\\:inline { display: inline; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AfterGameLive;
// AfterGameLive.jsx - Fixed: Winner polling never stops after game completes
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";
import { API } from "../../services/api_url";

import TambolaLive from "./animated_tambola_controller";
import PlayerRanking from "./GameResultComponents/player_ranking";

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

/** Deduplicate an array while preserving order */
function dedupe(arr) {
  return [...new Set(arr)];
}

/**
 * Deduplicate winners by winner_id
 */
function dedupeWinners(winners) {
  if (!winners || !Array.isArray(winners)) return [];
  const seen = new Set();
  return winners.filter((w) => {
    const key = w.winner_id || w.id || w.ticket_number;
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const GAME_STATE_KEY = "tambola_current_game_state";

const AfterGameLive = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const savedGameState = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(GAME_STATE_KEY));
    } catch {
      return null;
    }
  })();

  const routeState = location.state && Object.keys(location.state).length ? location.state : savedGameState;
  const gameData = routeState || {};
  const gameId = gameData?.gameId;
  const gameName = gameData?.gameName;

  useEffect(() => {
    if (routeState?.gameId) {
      sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(routeState));
    }
  }, [routeState]);

  useEffect(() => {
    if (!gameId) navigate(ROUTES.HOME);
  }, [gameId, navigate]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(GAME_STATE_KEY);
    };
  }, []);

  /* ── Core state ── */
  const [connected, setConnected] = useState(false);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [currentRoundId, setCurrentRoundId] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [calledCount, setCalledCount] = useState(0);
  const [allTickets, setAllTickets] = useState([]);
  const [winners, setWinners] = useState([]);
  const [lastCalledNum, setLastCalledNum] = useState(null);
  const [loadingWinners, setLoadingWinners] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  /* ── Refs ── */
  const socketRef = useRef(null);
  const connectedRef = useRef(false);
  const currentRoundRef = useRef(null);
  const calledSetRef = useRef(new Set());
  const gameIdRef = useRef(gameId);
  gameIdRef.current = gameId;

  // ✅ Mirrors isGameOver for use inside async closures / socket handlers so
  // they never read a stale value (socket handlers are bound once on mount).
  const isGameOverRef = useRef(false);
  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  // ✅ Tracks pending retry timers so we never let them pile up / leak.
  const retryTimerRef = useRef(null);

  // ✅ Generic fallback: capture round_id from ANY socket payload, regardless
  // of which event it arrives on. This means we don't need to know the exact
  // event name the backend uses to respond to "get_game_data" — whatever it
  // sends, if it contains a round id, we grab it and keep it. This value is
  // NEVER cleared once set, so it survives even if the "current round" REST
  // API stops returning data after the game completes.
  const capturedRoundIdRef = useRef(null);

  /* Keep roundRef in sync */
  useEffect(() => {
    currentRoundRef.current = currentRoundId;
  }, [currentRoundId]);

  /* ══════════════════════════════════════════
     API HELPERS
  ══════════════════════════════════════════ */
  const loadCurrentRound = useCallback(async () => {
    if (!gameIdRef.current) return null;
    try {
      const res = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameIdRef.current}`);
      const result = await res.json();
      if (result.success && result.data) {
        setCurrentRoundId(result.data.round_id);
        currentRoundRef.current = result.data.round_id;
        setGameStatus(result.data.status || "waiting");

        if (result.data.status === "over" || result.data.status === "completed") {
          setIsGameOver(true);
          isGameOverRef.current = true;
        }
        return result.data.round_id;
      }
    } catch (e) {
      console.warn("loadCurrentRound:", e);
    }
    return null;
  }, []);

  const loadAllTickets = useCallback(async () => {
    if (!gameIdRef.current) return;
    try {
      const res = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameIdRef.current}`);
      const result = await res.json();
      if (result.success && result.data?.length) setAllTickets(result.data);
    } catch (e) {
      console.warn("loadAllTickets:", e);
    }
  }, []);

  const updateCalledNumbers = useCallback(async () => {
    const roundId = currentRoundRef.current;
    if (!roundId) return;
    try {
      const res = await fetch(`${API.ROUND_ID_SOCKET_URL}${roundId}`);
      const result = await res.json();
      if (result.success && result.data) {
        const { called_numbers, total_called, round_status } = result.data;
        if (called_numbers) {
          const deduped = dedupe(called_numbers);
          calledSetRef.current = new Set(deduped);
          setCalledNumbers(deduped);
          setCalledCount(total_called ?? deduped.length);
        }
        if (round_status) {
          setGameStatus(round_status);
          if (round_status === "over" || round_status === "completed") {
            setIsGameOver(true);
            isGameOverRef.current = true;
          }
        }
      }
    } catch (e) {
      console.warn("updateCalledNumbers:", e);
    }
  }, []);

  // ✅ FIXED: loadWinners is now a STABLE function — no dependency on
  // isGameOver (reads the latest value via isGameOverRef instead). This means
  // its identity never changes, so anything that depends on it (the polling
  // interval) never gets torn down / recreated. This was the main reason
  // winner polling would silently die right when the game completed.
  const loadWinners = useCallback(async (retryCount = 0) => {
    // ✅ Two modes now:
    // - LIVE game: fetch by round_id (as before) — needed because a game
    //   can have multiple rounds and we want the CURRENT one specifically.
    // - COMPLETED game: fetch by game_id directly. No round_id needed at
    //   all, so all the round-id-hunting fallback logic is skipped entirely
    //   — this is what fixes the "no round id found" dead end after the
    //   game ends.
    const gameIsOver = isGameOverRef.current;
    let url;

    if (gameIsOver) {
      if (!gameIdRef.current) {
        console.log("⚠️ No gameId available, skipping winner load");
        return;
      }
      url = `${API.WINNER_LIST_BY_GAME_URL}${gameIdRef.current}`;
    } else {
      // Priority order for finding a round id while the game is still live:
      // 1. currentRoundRef — the normal, live-tracked value.
      // 2. capturedRoundIdRef — anything sniffed out of any socket event.
      // 3. One fresh call to loadCurrentRound() as a last resort.
      let roundId = currentRoundRef.current || capturedRoundIdRef.current;

      if (!roundId) {
        console.log("⚠️ No roundId available (ref/captured both empty), trying to refresh current round...");
        roundId = await loadCurrentRound();
        if (!roundId) {
          console.log("⚠️ Still no roundId anywhere — cannot fetch winners this cycle");
          return;
        }
      } else if (!currentRoundRef.current) {
        console.log("♻️ Using captured round_id from socket payload:", roundId);
        currentRoundRef.current = roundId;
        setCurrentRoundId(roundId);
      }

      url = `${API.WINNER_LIST_SOCKET_URL}${roundId}`;
    }

    try {
      setLoadingWinners(true);
      console.log(`🔄 [${new Date().toLocaleTimeString()}] Fetching winners (${gameIsOver ? "by game_id" : "by round_id"}): ${url} (attempt ${retryCount + 1})`);

      const res = await fetch(url);
      const result = await res.json();

      console.log("📊 Winners API Response:", result);

      if (result.success && result.data && result.data.length > 0) {
        const dedupedWinners = dedupeWinners(result.data);
        console.log(`✅ Found ${dedupedWinners.length} unique winners`);
        setWinners(dedupedWinners);
      } else {
        console.log("⚠️ No winners found or API returned empty");
        setWinners((prev) => (prev.length ? prev : [])); // don't blindly wipe good data on a transient empty response

        // ✅ Bounded retry chain, but tracked in a ref so we never stack
        // multiple overlapping chains (previous behavior could spawn a new
        // 5-attempt chain from EVERY 3s poll tick once the game was over).
        if (isGameOverRef.current && retryCount < 5) {
          console.log(`🔄 Retrying winners fetch (${retryCount + 1}/5)...`);
          clearTimeout(retryTimerRef.current);
          retryTimerRef.current = setTimeout(() => {
            loadWinners(retryCount + 1);
          }, 2000);
        }
      }
    } catch (e) {
      console.warn("loadWinners error:", e);
      if (isGameOverRef.current && retryCount < 5) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = setTimeout(() => {
          loadWinners(retryCount + 1);
        }, 2000);
      }
    } finally {
      setLoadingWinners(false);
    }
  }, [loadCurrentRound]);

  // ✅ Keep a ref to the latest loadWinners/loadAllTickets so the polling
  // interval (set up ONCE below) always calls the freshest version without
  // needing to be recreated.
  const loadWinnersRef = useRef(loadWinners);
  useEffect(() => {
    loadWinnersRef.current = loadWinners;
  }, [loadWinners]);

  const loadAllTicketsRef = useRef(loadAllTickets);
  useEffect(() => {
    loadAllTicketsRef.current = loadAllTickets;
  }, [loadAllTickets]);

  // ✅ Go Back Handler
  const handleGoBack = () => {
    sessionStorage.removeItem(GAME_STATE_KEY);
    navigate(ROUTES.HOME);
  };

  /* ══════════════════════════════════════════
     INITIAL LOAD
  ══════════════════════════════════════════ */
  useEffect(() => {
    loadCurrentRound();
    loadAllTickets();
  }, [loadCurrentRound, loadAllTickets]);

  useEffect(() => {
    if (currentRoundId) {
      updateCalledNumbers();
      setTimeout(() => loadWinnersRef.current(), 300);
    }
  }, [currentRoundId, updateCalledNumbers]);

  /* ══════════════════════════════════════════
     POLLING — set up ONCE, never torn down until unmount.
     This is the key fix: previously this effect depended on
     [loadWinners, loadAllTickets], so every time loadWinners' identity
     changed (e.g. the moment isGameOver flipped true) the interval was
     cleared and re-created — a fragile transition exactly at game-complete
     time. Now the interval calls through refs, so its own identity never
     needs to change and it truly never stops.
  ══════════════════════════════════════════ */
  useEffect(() => {
    const t1 = setInterval(() => {
      loadWinnersRef.current();
    }, 3000);

    const t2 = setInterval(() => {
      loadAllTicketsRef.current();
    }, 8000);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearTimeout(retryTimerRef.current);
    };
  }, []); // ✅ empty deps — runs once for the lifetime of the component

  /* ══════════════════════════════════════════
     SOCKET
  ══════════════════════════════════════════ */
  useEffect(() => {
    if (!gameId) return;

    console.log("🔌 Initializing socket connection...");

    const socket = io(API.SOCKET_URL, {
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketRef.current = socket;

    // ✅ DIAGNOSTIC + FALLBACK: listen to EVERY event the server sends,
    // log it, and if its payload contains a round id under any common key
    // name, capture it. This is what lets winner-fetching keep working even
    // if we don't know the exact event name the backend uses, and even if
    // the "load current round" REST endpoint stops returning data once the
    // game/round is marked complete.
    socket.onAny((eventName, payload) => {
      console.log(`📡 [socket event] "${eventName}"`, payload);

      const candidate =
        payload?.round_id ??
        payload?.roundId ??
        payload?.data?.round_id ??
        payload?.data?.roundId;

      if (candidate && candidate !== capturedRoundIdRef.current) {
        console.log(`🎯 Captured round_id "${candidate}" from event "${eventName}"`);
        capturedRoundIdRef.current = candidate;
      }
    });

    if (socket.connected) {
      connectedRef.current = true;
      setConnected(true);
    }

    /* ── Connection ── */
    socket.on("connect", () => {
      console.log("✅ Socket CONNECT event fired! ID:", socket.id);
      connectedRef.current = true;
      setConnected(true);

      // ✅ Emit with an acknowledgement callback — if the backend supports
      // socket.io acks (calls the callback it receives as the 3rd arg),
      // we get the response directly here regardless of what event name
      // (if any) it separately broadcasts.
      socket.emit("get_game_data", { game_id: gameId }, (ackResponse) => {
        if (ackResponse) {
          console.log("📩 get_game_data ACK response:", ackResponse);
          const candidate =
            ackResponse?.round_id ??
            ackResponse?.roundId ??
            ackResponse?.data?.round_id ??
            ackResponse?.data?.roundId;
          if (candidate) {
            console.log(`🎯 Captured round_id "${candidate}" from get_game_data ACK`);
            capturedRoundIdRef.current = candidate;
          }
        }
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected. Reason:", reason);
      connectedRef.current = false;
      setConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("🚫 Connection error:", error.message);
      connectedRef.current = false;
      setConnected(false);
    });

    socket.on("reconnect", (attempt) => {
      console.log("🔄 Reconnected after", attempt, "attempts");
      connectedRef.current = true;
      setConnected(true);
      socket.emit("get_game_data", { game_id: gameId });
    });

    /* ── Game lifecycle ── */
    socket.on("game_started", () => {
      console.log("🎮 Game started");
      setGameStatus("started");
      setIsGameOver(false);
      isGameOverRef.current = false;
    });

    socket.on("game_paused", () => {
      console.log("⏸️ Game paused");
      setGameStatus("paused");
    });

    socket.on("game_resumed", () => {
      console.log("▶️ Game resumed");
      setGameStatus("started");
    });

    // ✅ game_over event — uses refs, so this always calls the freshest
    // loadWinners regardless of when the socket connection/effect was set up.
    socket.on("game_over", (data) => {
      console.log("🏁🏁🏁 GAME OVER EVENT RECEIVED 🏁🏁🏁", data);

      const roundMatch = data?.round_id === currentRoundRef.current;
      const gameMatch = data?.game_id === gameId;

      if (!data || roundMatch || gameMatch) {
        setGameStatus("over");
        setIsGameOver(true);
        isGameOverRef.current = true;

        console.log("🏁 Game is OVER! Force refreshing winners...");

        loadWinnersRef.current();
        setTimeout(() => loadWinnersRef.current(), 1000);
        setTimeout(() => loadWinnersRef.current(), 3000);
        setTimeout(() => loadWinnersRef.current(), 5000);

        // The setInterval polling loop (set up once, above) keeps calling
        // loadWinnersRef.current() every 3s forever after this too — it is
        // never cancelled just because the game ended.
      }
    });

    /* ── Number called ── */
    socket.on("number_called", (data) => {
      console.log("🎯 Number called via socket:", data);

      const gameMatch = data.game_id === gameId;
      const roundMatch = data.round_id === currentRoundRef.current;
      if (!gameMatch && !roundMatch) return;

      const number = data.number;
      if (typeof number !== "number") return;

      if (calledSetRef.current.has(number)) {
        console.log(`⚠️ Number ${number} already called, skipping`);
        return;
      }
      calledSetRef.current.add(number);

      setCalledNumbers((prev) => dedupe([...prev, number]));
      setCalledCount((prev) => prev + 1);
      setLastCalledNum({ num: number, ts: Date.now() });

      setTimeout(() => loadAllTicketsRef.current(), 800);
    });

    /* ── Old numbers ── */
    socket.on("old_numbers", (data) => {
      console.log("📜 Old numbers received:", data);
      if (data.calledNumbers?.length) {
        const deduped = dedupe(data.calledNumbers);
        calledSetRef.current = new Set(deduped);
        setCalledNumbers(deduped);
        setCalledCount(deduped.length);
      }

      // ✅ THE MISSING PIECE: when opening a page for an already-completed
      // game, "game_over" never fires (that event only fires for a LIVE
      // transition). The only signal we get is this "completed" flag inside
      // old_numbers. Without reading it, isGameOver stays false forever, so
      // loadWinners always tries the round_id (live) branch — which fails
      // since there's no round_id to find for a game that was already over
      // before this page even connected.
      if (data.completed === true || data.status === "over" || data.status === "completed") {
        console.log("🏁 Detected already-completed game from old_numbers payload");
        setGameStatus("over");
        setIsGameOver(true);
        isGameOverRef.current = true;
        // Fire an immediate winners fetch now that we know it's the
        // game_id-based path — plus a couple of follow-ups in case the
        // backend needs a moment.
        loadWinnersRef.current();
        setTimeout(() => loadWinnersRef.current(), 1000);
        setTimeout(() => loadWinnersRef.current(), 3000);
      }
    });

    /* ── Winners ── */
    socket.on("winner_update", (data) => {
      console.log("🏆 Winner update:", data);
      if (data.round_id === currentRoundRef.current) {
        loadWinnersRef.current();
        loadAllTicketsRef.current();
      }
    });

    socket.on("winner_created", (data) => {
      console.log("👑 Winner created:", data);
      const roundMatch = data?.round_id === currentRoundRef.current;
      const gameMatch = data?.game_id === gameId;
      if (roundMatch || gameMatch) {
        loadWinnersRef.current();
        loadAllTicketsRef.current();
      }
    });

    /* ── Cleanup ── */
    return () => {
      console.log("🧹 Cleaning up socket connection");
      socket.offAny(); // removes both our diagnostic listener and any others attached via onAny
      socket.disconnect();
    };
  }, [gameId]);

  if (!gameId) return null;

  const sharedGameProps = {
    gameId,
    currentRoundId,
    connected,
    gameStatus,
    calledNumbers,
    calledCount,
    allTickets,
    winners,
    loadingWinners,
    lastCalledNum: lastCalledNum?.num ?? null,
    onReloadTickets: loadAllTickets,
    onReloadWinners: loadWinners,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white p-4 md:p-6 relative">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">

        {/* ── Header with Back Button ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

          {/* Left Section - Back Button + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-medium border border-white/10 hover:border-white/20"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden xs:inline">Back</span>
            </button>

            <div
              onClick={() => navigate(ROUTES.HOME)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-10 h-10 md:w-14 md:h-14 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
                <img src={logoImage} alt="Tambola Logo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>

          <div className="text-center flex-1">
            <h1 className="text-lg md:text-2xl font-bold">
              <span className="text-[#FBEFA4]">TAMBOLA</span>
              <span className="text-white/60 ml-2">LIVE GAME</span>
            </h1>
            {gameName && (
              <p className="text-xs text-white/40 mt-0.5 tracking-widest font-light">{gameName}</p>
            )}
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded mt-1 ${
              isGameOver || gameStatus === 'over' ? 'bg-red-500/30 text-red-300' :
              gameStatus === 'started' ? 'bg-green-500/30 text-green-300 animate-pulse' :
              'bg-yellow-500/30 text-yellow-300'
            }`}>
              {isGameOver || gameStatus === 'over' ? '🏁 COMPLETED' :
               gameStatus === 'started' ? '🔴 LIVE' :
               '⏳ WAITING'}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/10">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: connected ? "#1abc9c" : "#ff4444",
                boxShadow: connected ? "0 0 8px #1abc9c" : "0 0 8px #ff4444",
                animation: connected ? "pulse-dot 2s ease-in-out infinite" : "none",
              }}
            />
            <span className="text-[9px] tracking-widest font-semibold text-white/50">
              {connected ? "LIVE" : "OFFLINE"}
            </span>
          </div>

        </div>

        <TambolaLive {...sharedGameProps} />
        <PlayerRanking {...sharedGameProps} />

        {isGameOver && (
          <div className="text-center text-sm text-white/60 py-2">
            🏆 Total Winners: <span className="text-[#FBEFA4] font-bold">{winners.length}</span>
          </div>
        )}

      </div>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent opacity-60" />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        @media (max-width: 480px) {
          .xs\\:inline { display: inline; }
        }
      `}</style>
    </div>
  );
};

export default AfterGameLive;