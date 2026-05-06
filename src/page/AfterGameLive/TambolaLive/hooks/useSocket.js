import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

export const useSocket = (gameId) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [gameStatus, setGameStatus] = useState("waiting");

  const connect = useCallback(() => {
    const socket = io("https://tambola.honeywithmoon.com", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setConnected(true);
      socket.emit("get_game_data", { game_id: gameId });
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnected(false);
    });

    return socket;
  }, [gameId]);

  useEffect(() => {
    const socket = connect();
    return () => {
      socket.disconnect();
    };
  }, [connect]);

  const on = useCallback((event, handler) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  }, []);

  const off = useCallback((event, handler) => {
    if (socketRef.current) {
      socketRef.current.off(event, handler);
    }
  }, []);

  const emit = useCallback((event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return {
    socket: socketRef.current,
    connected,
    gameStatus,
    setGameStatus,
    on,
    off,
    emit
  };
};