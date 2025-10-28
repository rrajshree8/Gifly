import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-white" strokeWidth={2.5} />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Gifly
          </h1>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-white hover:bg-white/20 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;