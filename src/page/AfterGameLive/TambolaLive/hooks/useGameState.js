import { useState, useCallback } from "react";

export const useGameState = () => {
  const [calledSet, setCalledSet] = useState(new Set());
  const [calledCount, setCalledCount] = useState(0);
  const [bigNum, setBigNum] = useState(null);
  const [bigKey, setBigKey] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [arrivingCell, setArrivingCell] = useState(null);
  const [done, setDone] = useState(false);
  const [tray, setTray] = useState([null, null]);
  const [trayKey, setTrayKey] = useState([0, 0]);

  const addCalledNumber = useCallback((number) => {
    setCalledSet(prev => {
      const newSet = new Set(prev);
      newSet.add(number);
      return newSet;
    });
    setCalledCount(prev => prev + 1);
  }, []);

  const showNumber = useCallback((number) => {
    setBigNum(number);
    setBigKey(k => k + 1);
    setShowPulse(true);
    setShowParticles(false);
    setTimeout(() => setShowParticles(true), 200);
  }, []);

  const hideNumber = useCallback(() => {
    setShowPulse(false);
    setShowParticles(false);
    setBigNum(null);
  }, []);

  const updateTray = useCallback((number) => {
    setTray(prev => {
      const newTray = [...prev];
      newTray[1] = prev[0];
      newTray[0] = number;
      return newTray;
    });
    setTrayKey(prev => [prev[0] + 1, prev[1] + 1]);
  }, []);

  const markArriving = useCallback((number) => {
    setArrivingCell(number);
    setTimeout(() => setArrivingCell(null), 800);
  }, []);

  const loadOldNumbers = useCallback((numbers) => {
    if (numbers && numbers.length > 0) {
      setCalledSet(new Set(numbers));
      setCalledCount(numbers.length);
      
      if (numbers.length >= 2) {
        setTray([numbers[numbers.length - 1], numbers[numbers.length - 2]]);
      } else if (numbers.length === 1) {
        setTray([numbers[0], null]);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setCalledSet(new Set());
    setCalledCount(0);
    setBigNum(null);
    setBigKey(0);
    setShowPulse(false);
    setShowParticles(false);
    setArrivingCell(null);
    setDone(false);
    setTray([null, null]);
    setTrayKey([0, 0]);
  }, []);

  return {
    calledSet,
    calledCount,
    bigNum,
    bigKey,
    showPulse,
    showParticles,
    arrivingCell,
    done,
    tray,
    trayKey,
    addCalledNumber,
    showNumber,
    hideNumber,
    updateTray,
    markArriving,
    loadOldNumbers,
    setDone,
    reset
  };
};