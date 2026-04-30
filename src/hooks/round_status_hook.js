
import { useState, useEffect, useCallback } from 'react';
import { getRoundStatus } from '../services/roundStatus_service';

export const useRoundStatus = (roundId) => {
  const [roundStatus, setRoundStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoundStatus = useCallback(async () => {
    if (!roundId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await getRoundStatus(roundId);
      setRoundStatus(response.toJSON());
      
    } catch (err) {
      console.error("Error fetching round status:", err);
      setError(err.message);
      setRoundStatus(null);
    } finally {
      setLoading(false);
    }
  }, [roundId]);

  useEffect(() => {
    fetchRoundStatus();
  }, [fetchRoundStatus]);

  // Auto-refresh every 10 seconds for live updates
  useEffect(() => {
    if (!roundId) return;
    
    const interval = setInterval(() => {
      fetchRoundStatus();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [roundId, fetchRoundStatus]);

  return {
    roundStatus,
    loading,
    error,
    refreshRoundStatus: fetchRoundStatus
  };
};