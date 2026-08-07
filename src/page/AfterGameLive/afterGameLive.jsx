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

// /** Deduplicate winners by a composite key (round_id + prize_type + ticket_id) */
// function dedupeWinners(winners) {
//   const seen = new Set();
//   return winners.filter((w) => {
//     const key = `${w.round_id}-${w.prize_type}-${w.ticket_id ?? w.id}`;
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

// /* ─────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────── */
// const AfterGameLive = () => {
//   const navigate  = useNavigate();
//   const location  = useLocation();

//   const gameData  = location.state;
//   const gameId    = gameData?.gameId;
//   const gameName  = gameData?.gameName;
//   const gameDate  = gameData?.gameDate;
//   const roundTime = gameData?.roundTime;

//   useEffect(() => {
//     if (!gameId) navigate(ROUTES.HOME);
//   }, [gameId, navigate]);

//   /* ── Core state ── */
//   const [connected,      setConnected]      = useState(false);
//   const [gameStatus,     setGameStatus]     = useState("waiting");
//   const [currentRoundId, setCurrentRoundId] = useState(null);
//   const [calledNumbers,  setCalledNumbers]  = useState([]);
//   const [calledCount,    setCalledCount]    = useState(0);
//   const [allTickets,     setAllTickets]     = useState([]);
//   const [winners,        setWinners]        = useState([]);

//   /**
//    * lastCalledNum — passed to TambolaLive to trigger animation.
//    * We use an object { num, ts } so that if the same number is
//    * somehow re-sent, incrementing ts still causes a re-render.
//    */
//   const [lastCalledNum, setLastCalledNum] = useState(null);

//   /* ── Refs ── */
//   const socketRef        = useRef(null);
//   const connectedRef     = useRef(false);
//   const currentRoundRef  = useRef(null);   // mirror of currentRoundId without closure issues
//   const calledSetRef     = useRef(new Set()); // source-of-truth for dedup (no stale closure)
//   const gameIdRef        = useRef(gameId);
//   gameIdRef.current      = gameId;

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
//       const res    = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameIdRef.current}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         setCurrentRoundId(result.data.round_id);
//         currentRoundRef.current = result.data.round_id;
//         setGameStatus(result.data.status || "waiting");
//       }
//     } catch (e) { console.warn("loadCurrentRound:", e); }
//   }, []);

//   const loadAllTickets = useCallback(async () => {
//     if (!gameIdRef.current) return;
//     try {
//       const res    = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameIdRef.current}`);
//       const result = await res.json();
//       if (result.success && result.data?.length) setAllTickets(result.data);
//     } catch (e) { console.warn("loadAllTickets:", e); }
//   }, []);

//   const updateCalledNumbers = useCallback(async () => {
//     const roundId = currentRoundRef.current;
//     if (!roundId) return;
//     try {
//       const res    = await fetch(`${API.ROUND_ID_SOCKET_URL}${roundId}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         const { called_numbers, total_called, round_status } = result.data;
//         if (called_numbers) {
//           const deduped = dedupe(called_numbers);
//           // Sync the ref
//           calledSetRef.current = new Set(deduped);
//           setCalledNumbers(deduped);
//           setCalledCount(total_called ?? deduped.length);
//         }
//         if (round_status) setGameStatus(round_status);
//       }
//     } catch (e) { console.warn("updateCalledNumbers:", e); }
//   }, []);

//   const loadWinners = useCallback(async () => {
//     const roundId = currentRoundRef.current;
//     if (!roundId) return;
//     try {
//       const res    = await fetch(`${API.WINNER_LIST_SOCKET_URL}${roundId}`);
//       const result = await res.json();
//       if (result.success && result.data) {
//         // Deduplicate to prevent the duplicate-key React warning
//         setWinners(dedupeWinners(result.data));
//       }
//     } catch (e) { console.warn("loadWinners:", e); }
//   }, []);

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
//       loadWinners();
//     }
//   }, [currentRoundId, updateCalledNumbers, loadWinners]);

//   /* ══════════════════════════════════════════
//      POLLING — only winners & tickets, NOT calledNumbers.
//      calledNumbers are driven by socket; polling them
//      every 2s conflicts with the animation queue.
//   ══════════════════════════════════════════ */
//   useEffect(() => {
//     // Light poll for winners / tickets so latecomers see updated state.
//     // calledNumbers are NOT polled — the socket handles them.
//     const t1 = setInterval(loadWinners,    5000);
//     const t2 = setInterval(loadAllTickets, 8000);
//     return () => { clearInterval(t1); clearInterval(t2); };
//   }, [loadWinners, loadAllTickets]);

//   /* ══════════════════════════════════════════
//      SOCKET
//      - Created once on mount (gameId dep only)
//      - Uses refs for currentRoundId / calledSet
//        so the socket handlers never go stale
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
//     });

//     socket.on("game_paused", () => {
//       console.log("⏸️ Game paused");
//       setGameStatus("paused");
//     });

//     socket.on("game_resumed", () => {
//       console.log("▶️ Game resumed");
//       setGameStatus("started");
//     });

//     socket.on("game_over", (data) => {
//       console.log("🏁 Game over:", data);
//       const roundMatch = data?.round_id === currentRoundRef.current;
//       const gameMatch  = data?.game_id  === gameId;
//       if (!data || roundMatch || gameMatch) {
//         setGameStatus("over");
//       }
//     });

//     /* ── Number called ── */
//     socket.on("number_called", (data) => {
//       console.log("🎯 Number called via socket:", data);

//       // Accept if game_id OR round_id matches (server may send either)
//       const gameMatch  = data.game_id  === gameId;
//       const roundMatch = data.round_id === currentRoundRef.current;
//       if (!gameMatch && !roundMatch) return;

//       const number = data.number;
//       if (typeof number !== "number") return;

//       // Dedup via ref — immune to stale closures
//       if (calledSetRef.current.has(number)) {
//         console.log(`⚠️ Number ${number} already called, skipping`);
//         return;
//       }
//       calledSetRef.current.add(number);

//       // Update state
//       setCalledNumbers(prev => dedupe([...prev, number]));
//       setCalledCount(prev => prev + 1);

//       // Trigger animation — use { num, ts } object so the same number
//       // can be re-triggered if needed (e.g. after reconnect)
//       setLastCalledNum({ num: number, ts: Date.now() });

//       // Refresh tickets after a brief delay
//       setTimeout(loadAllTickets, 800);
//     });

//     /* ── Old numbers (on reconnect / page refresh) ── */
//     socket.on("old_numbers", (data) => {
//       console.log("📜 Old numbers received:", data);
//       if (data.calledNumbers?.length) {
//         const deduped = dedupe(data.calledNumbers);
//         calledSetRef.current = new Set(deduped);
//         setCalledNumbers(deduped);
//         setCalledCount(deduped.length);
//         // Don't animate old numbers — just show them on the board
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
//       const gameMatch  = data?.game_id  === gameId;
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
//   // Only re-create socket when gameId changes — NOT on currentRoundId
//   // eslint-disable-next-line react-hooks/exhaustive-deps
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
//     // Pass only the number to TambolaLive; ts is just for triggering
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

//         {/* ── Header ── */}
//         <div className="flex justify-between items-center">

//           {/* Logo */}
//           <div
//             onClick={() => navigate(ROUTES.HOME)}
//             className="relative group cursor-pointer"
//           >
//             <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
//             <div className="relative w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
//               <img src={logoImage} alt="Tambola Logo" className="w-full h-full object-cover rounded-full" />
//             </div>
//           </div>

//           {/* Title */}
//           <div className="text-center">
//             <h1 className="text-xl md:text-2xl font-bold">
//               <span className="text-[#FBEFA4]">TAMBOLA</span>
//               <span className="text-white/60 ml-2">LIVE GAME</span>
//             </h1>
//             {gameName && (
//               <p className="text-xs text-white/40 mt-1 tracking-widest font-light">{gameName}</p>
//             )}
//           </div>

//           {/* Connection status */}
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

//         {/* ── Game components ── */}
//         <TambolaLive {...sharedGameProps} />
//         <PlayerRanking {...sharedGameProps} />

//       </div>

//       <div className="fixed bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent opacity-60" />

//       <style>{`
//         @keyframes pulse-dot {
//           0%, 100% { opacity: 0.5; }
//           50%       { opacity: 1;   }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AfterGameLive;
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
 * Since your API returns unique winners with winner_id, this is just a safety measure
 */
function dedupeWinners(winners) {
  if (!winners || !Array.isArray(winners)) return [];
  const seen = new Set();
  return winners.filter((w) => {
    // Use winner_id as the unique key
    const key = w.winner_id || w.id || w.ticket_number;
    if (!key) return true; // Keep items without an ID (shouldn't happen)
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const AfterGameLive = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const gameData  = location.state;
  const gameId    = gameData?.gameId;
  const gameName  = gameData?.gameName;
  const gameDate  = gameData?.gameDate;
  const roundTime = gameData?.roundTime;

  useEffect(() => {
    if (!gameId) navigate(ROUTES.HOME);
  }, [gameId, navigate]);

  /* ── Core state ── */
  const [connected,      setConnected]      = useState(false);
  const [gameStatus,     setGameStatus]     = useState("waiting");
  const [currentRoundId, setCurrentRoundId] = useState(null);
  const [calledNumbers,  setCalledNumbers]  = useState([]);
  const [calledCount,    setCalledCount]    = useState(0);
  const [allTickets,     setAllTickets]     = useState([]);
  const [winners,        setWinners]        = useState([]);

  /**
   * lastCalledNum — passed to TambolaLive to trigger animation.
   * We use an object { num, ts } so that if the same number is
   * somehow re-sent, incrementing ts still causes a re-render.
   */
  const [lastCalledNum, setLastCalledNum] = useState(null);

  /* ── Refs ── */
  const socketRef        = useRef(null);
  const connectedRef     = useRef(false);
  const currentRoundRef  = useRef(null);   // mirror of currentRoundId without closure issues
  const calledSetRef     = useRef(new Set()); // source-of-truth for dedup (no stale closure)
  const gameIdRef        = useRef(gameId);
  gameIdRef.current      = gameId;

  /* Keep roundRef in sync */
  useEffect(() => {
    currentRoundRef.current = currentRoundId;
  }, [currentRoundId]);

  /* ══════════════════════════════════════════
     API HELPERS
  ══════════════════════════════════════════ */
  const loadCurrentRound = useCallback(async () => {
    if (!gameIdRef.current) return;
    try {
      const res    = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameIdRef.current}`);
      const result = await res.json();
      if (result.success && result.data) {
        setCurrentRoundId(result.data.round_id);
        currentRoundRef.current = result.data.round_id;
        setGameStatus(result.data.status || "waiting");
      }
    } catch (e) { console.warn("loadCurrentRound:", e); }
  }, []);

  const loadAllTickets = useCallback(async () => {
    if (!gameIdRef.current) return;
    try {
      const res    = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameIdRef.current}`);
      const result = await res.json();
      if (result.success && result.data?.length) setAllTickets(result.data);
    } catch (e) { console.warn("loadAllTickets:", e); }
  }, []);

  const updateCalledNumbers = useCallback(async () => {
    const roundId = currentRoundRef.current;
    if (!roundId) return;
    try {
      const res    = await fetch(`${API.ROUND_ID_SOCKET_URL}${roundId}`);
      const result = await res.json();
      if (result.success && result.data) {
        const { called_numbers, total_called, round_status } = result.data;
        if (called_numbers) {
          const deduped = dedupe(called_numbers);
          // Sync the ref
          calledSetRef.current = new Set(deduped);
          setCalledNumbers(deduped);
          setCalledCount(total_called ?? deduped.length);
        }
        if (round_status) setGameStatus(round_status);
      }
    } catch (e) { console.warn("updateCalledNumbers:", e); }
  }, []);

  const loadWinners = useCallback(async () => {
    const roundId = currentRoundRef.current;
    if (!roundId) return;
    try {
      const res    = await fetch(`${API.WINNER_LIST_SOCKET_URL}${roundId}`);
      const result = await res.json();
      
      console.log('📊 Winners API Response:', result);
      
      if (result.success && result.data) {
        // Ensure we're setting all winners
        console.log('📊 Number of winners from API:', result.data.length);
        
        // Deduplicate by winner_id to prevent duplicates
        const dedupedWinners = dedupeWinners(result.data);
        
        console.log('📊 Deduped winners count:', dedupedWinners.length);
        console.log('📊 Winners data:', dedupedWinners);
        
        // ✅ SET ALL WINNERS
        setWinners(dedupedWinners);
      }
    } catch (e) { console.warn("loadWinners:", e); }
  }, []);

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
      loadWinners();
    }
  }, [currentRoundId, updateCalledNumbers, loadWinners]);

  /* ══════════════════════════════════════════
     POLLING — only winners & tickets, NOT calledNumbers.
     calledNumbers are driven by socket; polling them
     every 2s conflicts with the animation queue.
  ══════════════════════════════════════════ */
  useEffect(() => {
    // Light poll for winners / tickets so latecomers see updated state.
    // calledNumbers are NOT polled — the socket handles them.
    const t1 = setInterval(loadWinners,    5000);
    const t2 = setInterval(loadAllTickets, 8000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [loadWinners, loadAllTickets]);

  /* ══════════════════════════════════════════
     SOCKET
     - Created once on mount (gameId dep only)
     - Uses refs for currentRoundId / calledSet
       so the socket handlers never go stale
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

    if (socket.connected) {
      connectedRef.current = true;
      setConnected(true);
    }

    /* ── Connection ── */
    socket.on("connect", () => {
      console.log("✅ Socket CONNECT event fired! ID:", socket.id);
      connectedRef.current = true;
      setConnected(true);
      socket.emit("get_game_data", { game_id: gameId });
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
    });

    socket.on("game_paused", () => {
      console.log("⏸️ Game paused");
      setGameStatus("paused");
    });

    socket.on("game_resumed", () => {
      console.log("▶️ Game resumed");
      setGameStatus("started");
    });

    socket.on("game_over", (data) => {
      console.log("🏁 Game over:", data);
      const roundMatch = data?.round_id === currentRoundRef.current;
      const gameMatch  = data?.game_id  === gameId;
      if (!data || roundMatch || gameMatch) {
        setGameStatus("over");
      }
    });

    /* ── Number called ── */
    socket.on("number_called", (data) => {
      console.log("🎯 Number called via socket:", data);

      // Accept if game_id OR round_id matches (server may send either)
      const gameMatch  = data.game_id  === gameId;
      const roundMatch = data.round_id === currentRoundRef.current;
      if (!gameMatch && !roundMatch) return;

      const number = data.number;
      if (typeof number !== "number") return;

      // Dedup via ref — immune to stale closures
      if (calledSetRef.current.has(number)) {
        console.log(`⚠️ Number ${number} already called, skipping`);
        return;
      }
      calledSetRef.current.add(number);

      // Update state
      setCalledNumbers(prev => dedupe([...prev, number]));
      setCalledCount(prev => prev + 1);

      // Trigger animation — use { num, ts } object so the same number
      // can be re-triggered if needed (e.g. after reconnect)
      setLastCalledNum({ num: number, ts: Date.now() });

      // Refresh tickets after a brief delay
      setTimeout(loadAllTickets, 800);
    });

    /* ── Old numbers (on reconnect / page refresh) ── */
    socket.on("old_numbers", (data) => {
      console.log("📜 Old numbers received:", data);
      if (data.calledNumbers?.length) {
        const deduped = dedupe(data.calledNumbers);
        calledSetRef.current = new Set(deduped);
        setCalledNumbers(deduped);
        setCalledCount(deduped.length);
        // Don't animate old numbers — just show them on the board
      }
    });

    /* ── Winners ── */
    socket.on("winner_update", (data) => {
      console.log("🏆 Winner update:", data);
      if (data.round_id === currentRoundRef.current) {
        loadWinners();
        loadAllTickets();
      }
    });

    socket.on("winner_created", (data) => {
      console.log("👑 Winner created:", data);
      const roundMatch = data?.round_id === currentRoundRef.current;
      const gameMatch  = data?.game_id  === gameId;
      if (roundMatch || gameMatch) {
        loadWinners();
        loadAllTickets();
      }
    });

    /* ── Cleanup ── */
    return () => {
      console.log("🧹 Cleaning up socket connection");
      socket.offAny();
      socket.disconnect();
    };
  // Only re-create socket when gameId changes — NOT on currentRoundId
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Pass only the number to TambolaLive; ts is just for triggering
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

        {/* ── Header ── */}
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div
            onClick={() => navigate(ROUTES.HOME)}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
              <img src={logoImage} alt="Tambola Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-[#FBEFA4]">TAMBOLA</span>
              <span className="text-white/60 ml-2">LIVE GAME</span>
            </h1>
            {gameName && (
              <p className="text-xs text-white/40 mt-1 tracking-widest font-light">{gameName}</p>
            )}
          </div>

          {/* Connection status */}
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

        {/* ── Game components ── */}
        <TambolaLive {...sharedGameProps} />
        <PlayerRanking {...sharedGameProps} />

      </div>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent opacity-60" />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default AfterGameLive;