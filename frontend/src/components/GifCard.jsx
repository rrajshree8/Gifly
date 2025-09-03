import React, { useState } from 'react';
import { Heart, Copy, Share2, Download, User } from 'lucide-react';

const GifCard = ({ gif }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(gif.url);
    // In real app, show toast notification
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gif.title,
        url: gif.url
      });
    }
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ breakInside: 'avoid' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GIF Container */}
      <div className="relative overflow-hidden">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"
               style={{ height: `${gif.height * 0.6}px` }}>
          </div>
        )}
        
        <img
          src={gif.url}
          alt={gif.title}
          className={`w-full h-auto object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-3">
              <button
                onClick={handleCopyUrl}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Copy URL"
              >
                <Copy className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-white" />
              </button>
              <button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                title="Download"
              >
                <Download className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Love Button */}
        <button
          onClick={() => setIsLoved(!isLoved)}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Heart 
            className={`h-5 w-5 transition-colors duration-200 ${
              isLoved ? 'text-red-500 fill-red-500' : 'text-white'
            }`} 
          />
        </button>
      </div>

      {/* GIF Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {gif.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>@{gif.username}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              gif.rating === 'g' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {gif.rating.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifCard;