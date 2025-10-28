import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Shuffle } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GifGrid from './components/GifGrid';
import { Button } from './components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Toaster } from './components/ui/toaster';
import { gifService } from './services/gifService';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [randomGif, setRandomGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    loadTrendingGifs();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const loadTrendingGifs = async () => {
    try {
      setLoading(true);
      const gifs = await gifService.getTrendingGifs(20);
      setTrendingGifs(gifs);
    } catch (error) {
      console.error('Error loading trending GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setActiveTab('search');
      const gifs = await gifService.searchGifs(query, 20);
      setSearchResults(gifs);
    } catch (error) {
      console.error('Error searching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomGif = async () => {
    try {
      setLoading(true);
      setActiveTab('random');
      const gif = await gifService.getRandomGif();
      setRandomGif(gif);
    } catch (error) {
      console.error('Error loading random GIF:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === 'random' && !randomGif) {
      handleRandomGif();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-cyan-950/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Discover Amazing GIFs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Search millions of GIFs or explore what's trending right now
            </p>
          </div>
          
          <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2" disabled={!searchQuery.trim()}>
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </TabsTrigger>
              <TabsTrigger value="random" className="flex items-center gap-2">
                <Shuffle className="h-4 w-4" />
                <span className="hidden sm:inline">Random</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending" className="space-y-4">
            <GifGrid gifs={trendingGifs} loading={loading} />
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <GifGrid gifs={searchResults} loading={loading} />
          </TabsContent>

          <TabsContent value="random" className="space-y-4">
            <div className="flex flex-col items-center gap-6">
              <Button
                onClick={handleRandomGif}
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold"
              >
                <Shuffle className="h-5 w-5 mr-2" />
                Get Another Random GIF
              </Button>
              
              {loading ? (
                <div className="w-full max-w-2xl aspect-square rounded-xl bg-muted animate-pulse" />
              ) : randomGif ? (
                <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-500">
                  <GifGrid gifs={[randomGif]} loading={false} />
                </div>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-20 py-8 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Powered by <span className="font-semibold text-foreground">GIPHY</span> • Built with React & Vite
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;