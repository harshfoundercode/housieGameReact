import { useState, useEffect, useCallback } from 'react';
import { getGameRounds } from '../services/live_schedule_result_services';

export const useGameRounds = () => {
  const [gameRounds, setGameRounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameRounds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getGameRounds();
      setGameRounds(response.toJSON());
      
    } catch (err) {
      console.error("Error fetching game rounds:", err);
      setError(err.message);
      setGameRounds(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGameRounds();
  }, [fetchGameRounds]);

  return {
    gameRounds,
    loading,
    error,
    refreshGameRounds: fetchGameRounds
  };
};