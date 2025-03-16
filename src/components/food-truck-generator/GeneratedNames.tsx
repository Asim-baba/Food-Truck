
import React from 'react';
import NameCard from './NameCard';
import ExportUtility from './ExportUtility';

interface GeneratedNamesProps {
  names: string[];
  favorites: string[];
  onCopy: (name: string) => void;
  onToggleFavorite: (name: string) => void;
  onSelectName: (name: string) => void;
}

const GeneratedNames: React.FC<GeneratedNamesProps> = ({ 
  names, 
  favorites, 
  onCopy, 
  onToggleFavorite,
  onSelectName
}) => {
  if (names.length === 0) return null;

  return (
    <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
      <h2 className="text-2xl font-bold">Generated Names</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((name, index) => (
          <div 
            key={`${name}-${index}`}
            onClick={() => onSelectName(name)}
          >
            <NameCard
              name={name}
              isFavorite={favorites.includes(name)}
              onCopy={onCopy}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
      
      <ExportUtility names={names} favorites={favorites} />
    </div>
  );
};

export default GeneratedNames;
