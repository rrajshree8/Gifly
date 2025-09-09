// Giphy API configuration
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const GIPHY_BASE_URL = import.meta.env.VITE_GIPHY_BASE_URL;

// Generate a session ID for tracking user searches
const generateSessionId = () => {
  let sessionId = localStorage.getItem('gifly_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('gifly_session_id', sessionId);
  }
  return sessionId;
};

const SESSION_ID = generateSessionId();

// Helper function to make Giphy API requests
const makeGiphyRequest = async (endpoint, params = {}) => {
  const url = new URL(`${GIPHY_BASE_URL}/${endpoint}`);
  url.searchParams.append('api_key', GIPHY_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Giphy API request failed:', error);
    throw error;
  }
};

// Helper function to transform Giphy data to our format
const transformGifData = (giphyGif) => {
  const imageData = giphyGif.images?.fixed_width || {};
  
  return {
    id: giphyGif.id || '',
    title: giphyGif.title || 'Untitled GIF',
    url: imageData.url || '',
    rating: giphyGif.rating || 'g',
    username: giphyGif.username || 'anonymous',
    height: parseInt(imageData.height) || 200,
    width: parseInt(imageData.width) || 200
  };
};

// Local storage for search history
const getSearchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('gifly_search_history') || '[]');
  } catch {
    return [];
  }
};

const saveSearchHistory = (history) => {
  try {
    localStorage.setItem('gifly_search_history', JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to save search history:', error);
  }
};

export const gifService = {
  /**
   * Get trending GIFs
   */
  async getTrending(offset = 0, limit = 25) {
    try {
      const response = await makeGiphyRequest('trending', { offset, limit });
      
      const gifs = response.data
        .map(transformGifData)
        .filter(gif => gif.url); // Only include GIFs with valid URLs
      
      return {
        data: gifs,
        pagination: {
          total_count: response.pagination?.total_count || 0,
          count: gifs.length,
          offset: response.pagination?.offset || offset
        }
      };
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
      return {
        data: [],
        pagination: { total_count: 0, count: 0, offset }
      };
    }
  },

  /**
   * Search GIFs by query
   */
  async searchGifs(query, offset = 0, limit = 25) {
    try {
      if (!query || !query.trim()) {
        return this.getTrending(offset, limit);
      }

      const response = await makeGiphyRequest('search', {
        q: query.trim(),
        offset,
        limit
      });

      const gifs = response.data
        .map(transformGifData)
        .filter(gif => gif.url); // Only include GIFs with valid URLs

      // Save search to local history
      this.saveSearch(query.trim());

      return {
        data: gifs,
        pagination: {
          total_count: response.pagination?.total_count || 0,
          count: gifs.length,
          offset: response.pagination?.offset || offset
        }
      };
    } catch (error) {
      console.error('Error searching GIFs:', error);
      return {
        data: [],
        pagination: { total_count: 0, count: 0, offset }
      };
    }
  },

  /**
   * Get a random GIF
   */
  async getRandomGif(tag = null) {
    try {
      const params = tag ? { tag } : {};
      const response = await makeGiphyRequest('random', params);
      
      if (response.data) {
        return { data: transformGifData(response.data) };
      }
      return { data: null };
    } catch (error) {
      console.error('Error fetching random GIF:', error);
      return { data: null };
    }
  },

  /**
   * Save a search query to local history
   */
  saveSearch(query) {
    try {
      const history = getSearchHistory();
      const searchItem = {
        query: query.toLowerCase(),
        timestamp: new Date().toISOString(),
        session_id: SESSION_ID
      };
      
      // Remove existing entry if it exists
      const existingIndex = history.findIndex(item => item.query === searchItem.query);
      if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
      }
      
      // Add to beginning
      history.unshift(searchItem);
      
      // Keep only last 50 searches
      if (history.length > 50) {
        history.splice(50);
      }
      
      saveSearchHistory(history);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  },

  /**
   * Get recent searches for current session
   */
  getRecentSearches(limit = 5) {
    try {
      const history = getSearchHistory();
      const sessionSearches = history
        .filter(item => item.session_id === SESSION_ID)
        .slice(0, limit)
        .map(item => item.query);
      
      return [...new Set(sessionSearches)]; // Remove duplicates
    } catch (error) {
      console.error('Error fetching recent searches:', error);
      return [];
    }
  },

  /**
   * Get popular searches (simulated from local history)
   */
  getPopularSearches(limit = 8) {
    try {
      const history = getSearchHistory();
      const searchCounts = {};
      
      history.forEach(item => {
        searchCounts[item.query] = (searchCounts[item.query] || 0) + 1;
      });
      
      const popular = Object.entries(searchCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([query]) => query);
      
      // Fallback to default searches if not enough history
      const defaultSearches = ['funny', 'cute', 'love', 'happy', 'wow', 'cats', 'dogs', 'dance'];
      return popular.length >= limit ? popular : [...popular, ...defaultSearches.slice(0, limit - popular.length)];
    } catch (error) {
      console.error('Error fetching popular searches:', error);
      return ['funny', 'cute', 'love', 'happy', 'wow', 'cats', 'dogs', 'dance'];
    }
  },

  /**
   * Get current session ID
   */
  getSessionId() {
    return SESSION_ID;
  }
};

export default gifService;