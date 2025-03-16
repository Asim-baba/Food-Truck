
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Hash } from 'lucide-react';

const TrendingInsights: React.FC = () => {
  // Simulated trending food truck name styles and keywords
  const trendingStyles = [
    { name: 'Plant-Based Concepts', color: 'bg-green-100 text-green-800' },
    { name: 'Cultural Fusion Names', color: 'bg-purple-100 text-purple-800' },
    { name: 'Sustainable Themes', color: 'bg-blue-100 text-blue-800' },
    { name: 'Artisanal Terminology', color: 'bg-amber-100 text-amber-800' },
    { name: 'Tech-Food Mashups', color: 'bg-red-100 text-red-800' },
  ];
  
  const trendingKeywords = [
    'artisanal', 'craft', 'organic', 'fusion', 'street', 
    'urban', 'local', 'farm', 'fresh', 'heritage', 'sustainable'
  ];
  
  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center mb-3">
        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-semibold">Trending Food Truck Insights</h3>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Popular Naming Styles</h4>
        <div className="flex flex-wrap gap-2">
          {trendingStyles.map((style, idx) => (
            <Badge 
              key={idx} 
              variant="outline" 
              className={style.color}
            >
              {style.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Trending Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {trendingKeywords.map((keyword, idx) => (
            <div key={idx} className="flex items-center bg-secondary/30 rounded-full px-3 py-1">
              <Hash className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs">{keyword}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Based on recent food industry trends and social media analytics.
        Updated monthly by foodtechnologylabs.com
      </p>
    </Card>
  );
};

export default TrendingInsights;
