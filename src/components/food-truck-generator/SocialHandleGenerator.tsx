
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Instagram, Twitter, Facebook, TikTok } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SocialHandleGeneratorProps {
  name: string;
}

const SocialHandleGenerator: React.FC<SocialHandleGeneratorProps> = ({ name }) => {
  const { toast } = useToast();
  const [showHandles, setShowHandles] = useState(false);

  // Format name for social media handles
  const formatForSocial = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/\s+/g, '');
  };

  // Generate social media handle suggestions
  const generateSocialHandles = () => {
    const baseName = formatForSocial(name);
    const foodRelatedWords = ['eats', 'bites', 'food', 'truck', 'cuisine', 'kitchen', 'taste'];
    
    return {
      instagram: [
        `${baseName}`,
        `${baseName}_food`,
        `${baseName}_truck`,
        `the_${baseName}`,
        `${baseName}_official`
      ],
      twitter: [
        `${baseName}`,
        `${baseName}Food`,
        `${baseName}Truck`,
        `The${baseName}`,
        `${baseName}Official`
      ],
      tiktok: [
        `${baseName}`,
        `${baseName}.food`,
        `${baseName}.truck`,
        `${baseName}.eats`,
        `${baseName}.official`
      ],
      facebook: [
        `${baseName}`,
        `${baseName}FoodTruck`,
        `${baseName}Kitchen`,
        `The${baseName}FoodTruck`,
        `${baseName}OfficialPage`
      ]
    };
  };

  const handleCopySocial = (handle: string) => {
    navigator.clipboard.writeText(handle);
    toast({
      title: "Copied!",
      description: `"${handle}" copied to clipboard`,
    });
  };

  const socialHandles = generateSocialHandles();

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Social Media Handles</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowHandles(!showHandles)}
          className="text-xs"
        >
          {showHandles ? "Hide" : "Show"} Handles
        </Button>
      </div>
      
      {showHandles && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <Instagram className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-sm font-medium">Instagram</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialHandles.instagram.map((handle, idx) => (
                <div key={idx} className="flex items-center bg-secondary/50 rounded-full px-3 py-1">
                  <span className="text-xs mr-1">@{handle}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1" 
                    onClick={() => handleCopySocial(handle)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Twitter className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Twitter/X</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialHandles.twitter.map((handle, idx) => (
                <div key={idx} className="flex items-center bg-secondary/50 rounded-full px-3 py-1">
                  <span className="text-xs mr-1">@{handle}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1" 
                    onClick={() => handleCopySocial(handle)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <TikTok className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">TikTok</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialHandles.tiktok.map((handle, idx) => (
                <div key={idx} className="flex items-center bg-secondary/50 rounded-full px-3 py-1">
                  <span className="text-xs mr-1">@{handle}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1" 
                    onClick={() => handleCopySocial(handle)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SocialHandleGenerator;
