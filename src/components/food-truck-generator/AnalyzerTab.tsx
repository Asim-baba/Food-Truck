
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Heart } from 'lucide-react';
import BusinessAnalyzer from './BusinessAnalyzer';
import DomainChecker from './DomainChecker';
import SocialHandleGenerator from './SocialHandleGenerator';
import BrandIdentitySuggestions from './BrandIdentitySuggestions';

interface AnalyzerTabProps {
  selectedName: string;
  style: string;
  favorites: string[];
  onCopy: (name: string) => void;
  onToggleFavorite: (name: string) => void;
  onGoToGenerator: () => void;
}

const AnalyzerTab: React.FC<AnalyzerTabProps> = ({ 
  selectedName, 
  style, 
  favorites,
  onCopy,
  onToggleFavorite,
  onGoToGenerator
}) => {
  return (
    <div className="space-y-6">
      {selectedName ? (
        <>
          <Card className="p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">{selectedName}</h2>
            <p className="text-muted-foreground mb-4">
              Analyze your selected food truck name and explore business opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <BusinessAnalyzer name={selectedName} />
                <DomainChecker name={selectedName} />
                <SocialHandleGenerator name={selectedName} />
              </div>
              
              <div className="space-y-6">
                <BrandIdentitySuggestions name={selectedName} style={style} />
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => onCopy(selectedName)}
                      className="w-full"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Name
                    </Button>
                    <Button
                      variant={favorites.includes(selectedName) ? "default" : "outline"}
                      onClick={() => onToggleFavorite(selectedName)}
                      className="w-full"
                    >
                      <Heart 
                        className={`mr-2 h-4 w-4 ${favorites.includes(selectedName) ? 'fill-white' : ''}`} 
                      />
                      {favorites.includes(selectedName) ? 'Favorited' : 'Add to Favorites'}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">
            Please generate and select a name to analyze.
          </p>
          <Button
            className="mt-4"
            onClick={onGoToGenerator}
          >
            Go to Generator
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AnalyzerTab;
