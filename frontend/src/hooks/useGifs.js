import { useState, useEffect, useCallback } from 'react';
import gifService from '../services/gifService';

export const useGifs = (initialMode = 'trending') => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);

  // Reset state when mode or query changes
  const resetState = useCallback(() => {
    setGifs([]);
    setPage(0);
    setHasMore(true);
    setError(null);
  }, []);

  // Load trending GIFs
  const loadTrending = useCallback(async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      if (!isLoadMore) {
        resetState();
        setCurrentMode('trending');
        setSearchQuery('');
      }

      const offset = isLoadMore ? page * 25 : 0;
      const response = await gifService.getTrending(offset, 25);

      if (response && response.data) {
        if (isLoadMore) {
          setGifs(prev => [...prev, ...response.data]);
        } else {
          setGifs(response.data);
        }

        // Check if we have more data
        const { pagination } = response;
        setHasMore(
          pagination && 
          pagination.offset + pagination.count < pagination.total_count
        );

        if (isLoadMore) {
          setPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error loading trending GIFs:', error);
      setError('Failed to load trending GIFs');
    } finally {
      setLoading(false);
    }
  }, [page, resetState]);

  // Search GIFs
  const searchGifs = useCallback(async (query, isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      if (!isLoadMore) {
        resetState();
        setCurrentMode('search');
        setSearchQuery(query);
      }

      const offset = isLoadMore ? page * 25 : 0;
      const response = await gifService.searchGifs(query, offset, 25);

      if (response && response.data) {
        if (isLoadMore) {
          setGifs(prev => [...prev, ...response.data]);
        } else {
          setGifs(response.data);
        }

        // Check if we have more data
        const { pagination } = response;
        setHasMore(
          pagination && 
          pagination.offset + pagination.count < pagination.total_count
        );

        if (isLoadMore) {
          setPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error searching GIFs:', error);
      setError(`Failed to search for "${query}"`);
    } finally {
      setLoading(false);
    }
  }, [page, resetState]);

  // Load more GIFs (infinite scroll)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    if (currentMode === 'trending') {
      await loadTrending(true);
    } else if (currentMode === 'search' && searchQuery) {
      await searchGifs(searchQuery, true);
    }
  }, [loading, hasMore, currentMode, searchQuery, loadTrending, searchGifs]);

  // Initial load
  useEffect(() => {
    loadTrending();
  }, []);

  return {
    gifs,
    loading,
    hasMore,
    currentMode,
    searchQuery,
    error,
    loadTrending,
    searchGifs,
    loadMore,
    resetState
  };
};

export default useGifs;