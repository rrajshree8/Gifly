import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSearchHistory } from '../hooks/useSearchHistory';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [showHistory, setShowHistory] = useState(false);
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToHistory(searchTerm.trim());
      onSearch(searchTerm.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    onSearch(term);
    setShowHistory(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for GIFs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowHistory(true)}
          className="pl-10 pr-10 h-12 text-base border-2 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {showHistory && history.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border-2 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
            <span className="text-sm font-medium text-muted-foreground">Recent Searches</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="h-6 text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {history.map((term, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/50 cursor-pointer transition-colors group"
              >
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={() => handleHistoryClick(term)}
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{term}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(term);
                  }}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;