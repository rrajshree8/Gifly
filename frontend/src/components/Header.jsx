import React, { useState } from 'react';
import { Search, Moon, Sun, Sparkles, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';

const Header = ({ onSearch, searchQuery, setSearchQuery }) => {
  const { isDark, toggleTheme } = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { recentSearches, popularSearches, refreshSuggestions } = useSearchSuggestions();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
      // Refresh suggestions after search
      setTimeout(() => refreshSuggestions(), 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    // Refresh suggestions after search
    setTimeout(() => refreshSuggestions(), 1000);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-emerald-500 animate-pulse" />
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-sm opacity-20"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Gifly
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search for GIFs..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
                <div className="space-y-4">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map(search => (
                          <button
                            key={search}
                            onClick={() => handleSuggestionClick(search)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors duration-200"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map(search => (
                        <button
                          key={search}
                          onClick={() => handleSuggestionClick(search)}
                          className="px-3 py-1 bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors duration-200"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;