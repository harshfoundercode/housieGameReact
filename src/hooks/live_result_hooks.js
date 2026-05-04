import { useState, useEffect, useCallback } from 'react';
import { getGameRounds } from '../services/live_schedule_result_services';

export const useGameRounds = () => {
    const [gameRounds, setGameRounds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGameRounds = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getGameRounds();
            setGameRounds(response);
        } catch (err) {
            setError(err.message || 'Failed to fetch game rounds');
            console.error('Fetch error:', err);
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