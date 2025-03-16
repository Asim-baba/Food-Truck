
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import NameCard from './NameCard';

interface FavoritesSectionProps {
  favorites: string[];
  onCopy: (name: string) => void;
  onToggleFavorite: (name: string) => void;
  onSelectName: (name: string) => void;
  onDownload: () => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  favorites, 
  onCopy, 
  onToggleFavorite,
  onSelectName,
  onDownload
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Favorites</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="copy-button"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((name, index) => (
          <div 
            key={`fav-${name}-${index}`}
            onClick={() => onSelectName(name)}
          >
            <NameCard
              name={name}
              isFavorite={true}
              onCopy={onCopy}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
