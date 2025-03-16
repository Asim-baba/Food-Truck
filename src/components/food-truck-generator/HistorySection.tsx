
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface HistorySectionProps {
  history: string[][];
  favorites: string[];
  showHistory: boolean;
  onToggleHistory: () => void;
  onToggleFavorite: (name: string) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ 
  history, 
  favorites, 
  showHistory, 
  onToggleHistory,
  onToggleFavorite
}) => {
  if (history.length === 0) return null;

  return (
    <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
      <Button
        variant="ghost"
        onClick={onToggleHistory}
        className="flex items-center"
      >
        <h2 className="text-2xl font-bold">Generation History</h2>
        <span className="ml-2 text-xs">
          {showHistory ? '(hide)' : '(show)'}
        </span>
      </Button>
      
      {showHistory && (
        <div className="space-y-4">
          {history.slice().reverse().map((nameSet, historyIndex) => (
            <Card key={`history-${historyIndex}`} className="p-4 bg-secondary/30">
              <h3 className="font-medium mb-2">Generation #{history.length - historyIndex}</h3>
              <div className="flex flex-wrap gap-2">
                {nameSet.map((name, nameIndex) => (
                  <div 
                    key={`history-name-${historyIndex}-${nameIndex}`}
                    className="bg-background rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    <span>{name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1"
                      onClick={() => onToggleFavorite(name)}
                    >
                      <Heart 
                        className={`h-3 w-3 ${favorites.includes(name) ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
