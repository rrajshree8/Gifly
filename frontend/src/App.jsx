import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import GifGrid from './components/GifGrid';
import { ThemeProvider } from './contexts/ThemeContext';
import { useGifs } from './hooks/useGifs';
import { TrendingUp, Sparkles } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    gifs,
    loading,
    hasMore,
    currentMode,
    searchQuery: currentQuery,
    error,
    loadTrending,
    searchGifs,
    loadMore
  } = useGifs();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    await searchGifs(query);
  };

  const handleBackToTrending = async () => {
    setSearchQuery('');
    await loadTrending();
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors duration-300">
          <Header 
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {currentMode === 'trending' ? (
                  <>
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Trending GIFs
                    </h2>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6 text-teal-500" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Search Results for "{currentQuery}"
                    </h2>
                  </>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {currentMode === 'trending' 
                  ? 'Discover the most popular GIFs right now, curated for your entertainment'
                  : `Found ${gifs.length} amazing GIFs matching your search`
                }
              </p>

              {/* Error Message */}
              {error && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full">
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Back to Trending Button */}
              {currentMode === 'search' && (
                <button
                  onClick={handleBackToTrending}
                  className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Back to Trending</span>
                </button>
              )}
            </div>

            {/* GIF Grid */}
            <GifGrid 
              searchQuery={currentMode === 'search' ? currentQuery : ''}
              gifs={gifs}
              loading={loading}
              onLoadMore={loadMore}
              hasMore={hasMore}
            />
          </main>

          {/* Footer */}
          <footer className="mt-20 py-12 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-emerald-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Gifly
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your favorite GIF search and discovery platform
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Powered by Giphy API • Made with ❤️ for GIF lovers
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;