import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";
import { API } from "../../services/api_url";

import TambolaLive from "./animated_tambola_controller";
import PlayerRanking from "./GameResultComponents/player_ranking";

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

  const [connected,      setConnected]      = useState(false);
  const [gameStatus,     setGameStatus]     = useState("waiting");
  const [currentRoundId, setCurrentRoundId] = useState(null);
  const [calledNumbers,  setCalledNumbers]  = useState([]);
  const [calledCount,    setCalledCount]    = useState(0);
  const [allTickets,     setAllTickets]     = useState([]);
  const [winners,        setWinners]        = useState([]);
  const [lastCalledNum,  setLastCalledNum]  = useState(null);

  const socketRef = useRef(null);
  const connectedRef = useRef(false); // 👈 ADD THIS: Track real connection state

  /* ══ API HELPERS ══ */
  const loadCurrentRound = useCallback(async () => {
    if (!gameId) return;
    try {
      const res    = await fetch(`${API.LOAD_CURRENT_ROUND_URL}${gameId}`);
      const result = await res.json();
      if (result.success && result.data) {
        setCurrentRoundId(result.data.round_id);
        setGameStatus(result.data.status || "waiting");
      }
    } catch (e) { console.warn("loadCurrentRound:", e); }
  }, [gameId]);

  const loadAllTickets = useCallback(async () => {
    if (!gameId) return;
    try {
      const res    = await fetch(`${API.BOOKING_ALL_TICKET_SOCKET_URL}${gameId}`);
      const result = await res.json();
      if (result.success && result.data?.length) setAllTickets(result.data);
    } catch (e) { console.warn("loadAllTickets:", e); }
  }, [gameId]);

  const updateCalledNumbers = useCallback(async () => {
    if (!currentRoundId) return;
    try {
      const res    = await fetch(`${API.ROUND_ID_SOCKET_URL}${currentRoundId}`);
      const result = await res.json();
      if (result.success && result.data) {
        const data = result.data;
        if (data.called_numbers) {
          setCalledNumbers(data.called_numbers);
          setCalledCount(data.total_called ?? data.called_numbers.length);
        }
        if (data.round_status) setGameStatus(data.round_status);
      }
    } catch (e) { console.warn("updateCalledNumbers:", e); }
  }, [currentRoundId]);

  const loadWinners = useCallback(async () => {
    if (!currentRoundId) return;
    try {
      const res    = await fetch(`${API.WINNER_LIST_SOCKET_URL}${currentRoundId}`);
      const result = await res.json();
      if (result.success && result.data) setWinners(result.data);
    } catch (e) { console.warn("loadWinners:", e); }
  }, [currentRoundId]);

  /* ══ INITIAL LOAD ══ */
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

  /* ══ POLLING ══ */
  useEffect(() => {
    const t1 = setInterval(updateCalledNumbers, 2000);
    const t2 = setInterval(loadWinners, 3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [updateCalledNumbers, loadWinners]);

  /* ══ SOCKET - FIXED VERSION ══ */
  useEffect(() => {
    if (!gameId) return;

    console.log("🔌 Initializing socket connection...");

    const socket = io(API.SOCKET_URL, {
      transports: [ "polling","websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });
    
    socketRef.current = socket;

    // 👇 IMMEDIATELY CHECK IF ALREADY CONNECTED
    if (socket.connected) {
      console.log("✅ Socket already connected on init!");
      connectedRef.current = true;
      setConnected(true);
    }

    // 👇 SOCKET EVENT HANDLERS
    socket.on("connect", () => {
      console.log("✅ Socket CONNECT event fired! ID:", socket.id);
      connectedRef.current = true;
      setConnected(true); // 👈 THIS SHOULD NOW WORK
      
      // Verify state update
      setTimeout(() => {
        console.log("🔍 Connected state after 100ms:", connectedRef.current);
      }, 100);
      
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

    socket.on("reconnect", (attemptNumber) => {
      console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
      connectedRef.current = true;
      setConnected(true);
      socket.emit("get_game_data", { game_id: gameId });
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("🔄 Reconnection attempt:", attemptNumber);
    });

    socket.on("reconnect_error", (error) => {
      console.error("🚫 Reconnection error:", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("❌ Reconnection failed after all attempts");
      connectedRef.current = false;
      setConnected(false);
    });

    // Game events
    socket.on("game_started", () => {
      console.log("🎮 Game started event received");
      setGameStatus("started");
    });

    socket.on("game_paused", () => {
      console.log("⏸️ Game paused event received");
      setGameStatus("paused");
    });

    socket.on("game_resumed", () => {
      console.log("▶️ Game resumed event received");
      setGameStatus("started");
    });

    socket.on("game_over", (data) => {
      console.log("🏁 Game over event received:", data);
      if (data?.round_id === currentRoundId || data?.game_id === gameId) {
        setGameStatus("over");
      }
    });

    socket.on("number_called", (data) => {
      console.log("🎯 Number called via socket:", data);
      if (data.game_id !== gameId && data.round_id !== currentRoundId) return;

      const number = data.number;

      setCalledNumbers(prev => {
        if (prev.includes(number)) {
          console.log(`Number ${number} already called, skipping`);
          return prev;
        }
        
        const newNumbers = [...prev, number];
        setCalledCount(newNumbers.length);
        
        // Use setTimeout instead of queueMicrotask for better compatibility
        setTimeout(() => {
          setLastCalledNum(number);
        }, 0);
        
        return newNumbers;
      });

      setTimeout(loadAllTickets, 500);
    });

    socket.on("old_numbers", (data) => {
      console.log("📜 Old numbers received:", data);
      if (data.calledNumbers?.length) {
        const nums = data.calledNumbers;
        setCalledNumbers(nums);
        setCalledCount(nums.length);
      }
    });

    socket.on("winner_update", (data) => {
      console.log("🏆 Winner update:", data);
      if (data.round_id === currentRoundId) {
        loadWinners();
        loadAllTickets();
      }
    });

    socket.on("winner_created", (data) => {
      console.log("👑 Winner created:", data);
      if (data.round_id === currentRoundId || data.game_id === gameId) {
        loadWinners();
        loadAllTickets();
      }
    });

    // 👇 CLEANUP
    return () => {
      console.log("🧹 Cleaning up socket connection");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("game_started");
      socket.off("game_paused");
      socket.off("game_resumed");
      socket.off("game_over");
      socket.off("number_called");
      socket.off("old_numbers");
      socket.off("winner_update");
      socket.off("winner_created");
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, currentRoundId]);

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
    lastCalledNum,
    onReloadTickets: loadAllTickets,
    onReloadWinners: loadWinners,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004296] via-[#002b66] to-[#001433] text-white p-4 md:p-6 relative">

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

        {/* Header */}
        <div className="flex justify-between items-center">
          <div
            onClick={() => navigate(ROUTES.HOME)}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
              <img src={logoImage} alt="Tambola Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-[#FBEFA4]">TAMBOLA</span>
              <span className="text-white/60 ml-2">LIVE GAME</span>
            </h1>
            {gameName && (
              <p className="text-xs text-white/40 mt-1 tracking-widest font-light">{gameName}</p>
            )}
          </div>

          {/* 👇 FIXED STATUS INDICATOR - Uses connectedRef for real-time check */}
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
            {/* 👇 DEBUG BUTTON - Remove in production */}
            <button 
              onClick={() => {
                console.log("Manual check:", {
                  connected,
                  socketConnected: socketRef.current?.connected,
                  socketId: socketRef.current?.id,
                  connectedRef: connectedRef.current
                });
                if (socketRef.current?.connected) {
                  setConnected(true);
                }
              }}
              className="ml-2 text-[8px] px-2 py-0.5 bg-white/10 rounded hover:bg-white/20"
            >
              ⟳
            </button>
          </div>
        </div>

        <TambolaLive {...sharedGameProps} />
        <PlayerRanking {...sharedGameProps} />

      </div>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FBEFA4] to-transparent opacity-60" />

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