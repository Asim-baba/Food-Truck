
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Heart } from 'lucide-react';

interface NameCardProps {
  name: string;
  isFavorite: boolean;
  onCopy: (name: string) => void;
  onToggleFavorite: (name: string) => void;
}

const NameCard: React.FC<NameCardProps> = ({ 
  name, 
  isFavorite, 
  onCopy, 
  onToggleFavorite 
}) => {
  return (
    <Card className="name-card p-4 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
      </div>
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="copy-button"
          onClick={() => onCopy(name)}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="heart-button"
          onClick={() => onToggleFavorite(name)}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} 
          />
        </Button>
      </div>
    </Card>
  );
};

export default NameCard;
