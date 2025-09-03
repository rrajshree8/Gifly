import { useState, useEffect } from 'react';
import gifService from '../services/gifService';

export const useSearchSuggestions = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load search suggestions
  const loadSuggestions = () => {
    try {
      setLoading(true);
      
      const recent = gifService.getRecentSearches(5);
      const popular = gifService.getPopularSearches(8);

      setRecentSearches(recent);
      setPopularSearches(popular);
    } catch (error) {
      console.error('Error loading search suggestions:', error);
      // Set fallback popular searches
      setPopularSearches(['funny', 'cute', 'love', 'happy', 'wow', 'cats', 'dogs', 'dance']);
    } finally {
      setLoading(false);
    }
  };

  // Load suggestions on mount
  useEffect(() => {
    loadSuggestions();
  }, []);

  // Refresh suggestions (call after a search is made)
  const refreshSuggestions = () => {
    loadSuggestions();
  };

  return {
    recentSearches,
    popularSearches,
    loading,
    refreshSuggestions
  };
};

export default useSearchSuggestions;