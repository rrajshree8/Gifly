const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const gifService = {
  searchGifs: async (query, limit = 20, offset = 0) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=g`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error searching GIFs:', error);
      throw error;
    }
  },

  getTrendingGifs: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}&rating=g`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
      throw error;
    }
  },

  getRandomGif: async (tag = '') => {
    try {
      const tagParam = tag ? `&tag=${encodeURIComponent(tag)}` : '';
      const response = await fetch(
        `${BASE_URL}/random?api_key=${GIPHY_API_KEY}${tagParam}&rating=g`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching random GIF:', error);
      throw error;
    }
  },
};