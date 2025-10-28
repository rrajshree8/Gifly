import React, { useState } from 'react';
import { Copy, Download, ExternalLink, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const GifCard = ({ gif }) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gif.images.original.url);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "GIF URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(gif.images.original.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gif.title || 'gif'}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: "Downloaded!",
        description: "GIF saved to your device",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download GIF",
        variant: "destructive",
      });
    }
  };

  const handleOpenOriginal = () => {
    window.open(gif.url, '_blank');
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative aspect-square bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          </div>
        )}
        <img
          src={gif.images.fixed_width.url}
          alt={gif.title || 'GIF'}
          className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
            {gif.title && (
              <p className="text-white text-sm font-medium line-clamp-2">
                {gif.title}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleCopy}
                className="flex-1 h-8 text-xs"
              >
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleOpenOriginal}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GifCard;