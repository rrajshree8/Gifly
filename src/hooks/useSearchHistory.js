import { useState, useEffect } from 'react';

const HISTORY_KEY = 'gifly-search-history';
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;

    setHistory(prevHistory => {
      const newHistory = [searchTerm, ...prevHistory.filter(item => item !== searchTerm)]
        .slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const removeFromHistory = (searchTerm) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item !== searchTerm);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return { history, addToHistory, clearHistory, removeFromHistory };
};