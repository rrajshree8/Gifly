import React from 'react';
import GifCard from './GifCard';

const GifGrid = ({ gifs, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!gifs || gifs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl font-medium text-muted-foreground">No GIFs found</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
};

export default GifGrid;