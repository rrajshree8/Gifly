import React, { useEffect, useRef, useState } from 'react';
import GifCard from './GifCard';
import { Loader2, Search } from 'lucide-react';
import { mockTrendingGifs, mockSearchResults } from '../mock/gifs';

const GifGrid = ({ searchQuery, gifs, loading, onLoadMore, hasMore }) => {
  const [columns, setColumns] = useState(4);
  const gridRef = useRef(null)
  const observerRef = useRef(null);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  // Create columns for masonry layout
  const createColumns = () => {
    const cols = Array.from({ length: columns }, () => []);
    
    gifs.forEach((gif, index) => {
      const colIndex = index % columns;
      cols[colIndex].push(gif);
    });
    
    return cols;
  };

  const gifColumns = createColumns();

  if (gifs.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {searchQuery ? `No GIFs found for "${searchQuery}"` : 'Start searching for GIFs'}
        </h3>
        <p className="text-gray-500 dark:text-gray-500 text-center max-w-md">
          {searchQuery 
            ? 'Try different keywords or browse trending GIFs below'
            : 'Search for your favorite GIFs or explore what\'s trending'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <div 
        ref={gridRef}
        className="flex gap-4 justify-center"
        style={{ 
          columnCount: columns,
          columnGap: '1rem',
          columnFill: 'balance'
        }}
      >
        {gifColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4" style={{ width: `calc(100% / ${columns} - ${(columns - 1) * 0.25}rem)` }}>
            {column.map((gif) => (
              <GifCard key={gif.id} gif={gif} />
            ))}
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            <span className="text-gray-600 dark:text-gray-400">Loading more GIFs...</span>
          </div>
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {hasMore && !loading && (
        <div ref={observerRef} className="h-10 w-full" />
      )}

      {/* End of Results */}
      {!hasMore && gifs.length > 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="h-px bg-gray-300 dark:bg-gray-600 w-20"></div>
            <span className="text-sm">That's all for now!</span>
            <div className="h-px bg-gray-300 dark:bg-gray-600 w-20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GifGrid;