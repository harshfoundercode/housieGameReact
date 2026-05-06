import { useState, useEffect, useRef } from 'react';

export const useTimer = (gameDateTime) => {
  const [timeLeft, setTimeLeft] = useState("");
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (!gameDateTime) return;
    
    const updateTimer = () => {
      const now = new Date();
      const diff = gameDateTime - now;

      if (diff <= 0) {
        setTimeLeft("Game Live 🔴");
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    timerIntervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameDateTime]);

  const getFormattedGameDate = () => {
    if (!gameDateTime) return "Loading...";
    return gameDateTime.toLocaleDateString("en-IN", {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const getFormattedGameTime = () => {
    if (!gameDateTime) return "Loading...";
    return gameDateTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getGameDay = () => {
    if (!gameDateTime) return "Loading...";
    return gameDateTime.toLocaleDateString("en-IN", {
      weekday: 'long'
    });
  };

  return {
    timeLeft,
    getFormattedGameDate,
    getFormattedGameTime,
    getGameDay
  };
};