
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Lightbulb, Brush, Type } from 'lucide-react';

interface BrandIdentitySuggestionsProps {
  name: string;
  style: string;
}

const BrandIdentitySuggestions: React.FC<BrandIdentitySuggestionsProps> = ({ name, style }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate color suggestions based on name style
  const generateColorPalettes = () => {
    const palettes = {
      creative: [
        { name: 'Vibrant', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' },
        { name: 'Bold', primary: '#1A535C', secondary: '#4ECDC4', accent: '#F7FFF7' },
      ],
      punny: [
        { name: 'Playful', primary: '#FFC857', secondary: '#E9724C', accent: '#C5D86D' },
        { name: 'Quirky', primary: '#5C2751', secondary: '#F67E7D', accent: '#843B62' },
      ],
      elegant: [
        { name: 'Sophisticated', primary: '#114B5F', secondary: '#1A936F', accent: '#F3E9D2' },
        { name: 'Classic', primary: '#540B0E', secondary: '#9E2A2B', accent: '#E09F3E' },
      ],
      cultural: [
        { name: 'Heritage', primary: '#5F0F40', secondary: '#9A031E', accent: '#FB8B24' },
        { name: 'Regional', primary: '#0F4C5C', secondary: '#5F0F40', accent: '#E36414' },
      ],
      descriptive: [
        { name: 'Clear', primary: '#3D5A80', secondary: '#98C1D9', accent: '#E0FBFC' },
        { name: 'Direct', primary: '#2B2D42', secondary: '#8D99AE', accent: '#EDF2F4' },
      ],
      fusion: [
        { name: 'Blend', primary: '#006D77', secondary: '#83C5BE', accent: '#FFDDD2' },
        { name: 'Mix', primary: '#E07A5F', secondary: '#3D405B', accent: '#81B29A' },
      ],
      trendy: [
        { name: 'Modern', primary: '#7400B8', secondary: '#5E60CE', accent: '#64DFDF' },
        { name: 'Contemporary', primary: '#80FFDB', secondary: '#64DFDF', accent: '#48BFE3' },
      ],
      local: [
        { name: 'Earthy', primary: '#606C38', secondary: '#283618', accent: '#FEFAE0' },
        { name: 'Community', primary: '#BC6C25', secondary: '#DDA15E', accent: '#FEFAE0' },
      ]
    };
    
    return palettes[style as keyof typeof palettes] || palettes.creative;
  };

  // Generate typography suggestions based on name style
  const generateTypographySuggestions = () => {
    const suggestions = {
      creative: ['Montserrat paired with Roboto', 'Poppins paired with Open Sans'],
      punny: ['Pacifico paired with Montserrat', 'Comic Neue paired with Lato'],
      elegant: ['Playfair Display paired with Raleway', 'Cormorant Garamond paired with Montserrat'],
      cultural: ['Lora paired with Source Sans Pro', 'Merriweather paired with Lato'],
      descriptive: ['Work Sans paired with Roboto', 'Nunito paired with Open Sans'],
      fusion: ['Josefin Sans paired with Lato', 'Ubuntu paired with Open Sans'],
      trendy: ['DM Sans paired with Inter', 'Outfit paired with Plus Jakarta Sans'],
      local: ['Cabin paired with Source Sans Pro', 'Archivo paired with Inter']
    };
    
    return suggestions[style as keyof typeof suggestions] || suggestions.creative;
  };

  // Generate logo style suggestions based on name style
  const generateLogoSuggestions = () => {
    const suggestions = {
      creative: ['Abstract mark with creative lettering', 'Distinctive icon with modern typography'],
      punny: ['Playful mascot with a visual pun', 'Whimsical icon with hand-drawn feel'],
      elegant: ['Minimalist wordmark with refined details', 'Sophisticated monogram with classic elements'],
      cultural: ['Cultural symbols with authentic typography', 'Heritage-inspired emblem with traditional elements'],
      descriptive: ['Simple icon representing your core offering', 'Clear wordmark with descriptive symbol'],
      fusion: ['Combined cultural elements in harmony', 'Blended style mark with fusion symbolism'],
      trendy: ['Geometric shapes with clean lines', 'Minimal design with subtle gradient'],
      local: ['Local landmark or symbol integration', 'Community-focused emblematic design']
    };
    
    return suggestions[style as keyof typeof suggestions] || suggestions.creative;
  };

  // Generate tagline suggestions based on name
  const generateTaglineSuggestions = () => {
    const foodRelatedTaglines = [
      `Savor the ${name} experience`,
      `${name}: Where flavor meets the road`,
      `Fresh ideas, fresh food at ${name}`,
      `Discover the taste of ${name}`,
      `${name}: Rolling out delicious, every day`
    ];
    
    const styleSpecificTaglines = {
      creative: [`Creativity served fresh at ${name}`, `Reimagining food on wheels`],
      punny: [`Food that's wheely good`, `We're on a roll with flavor`],
      elegant: [`Elevating street food to fine dining`, `Sophisticated flavors, casual setting`],
      cultural: [`Authentic recipes, modern mobility`, `A world of flavor in every bite`],
      descriptive: [`Simple food, exceptional taste`, `Exactly what you're craving`],
      fusion: [`Where culinary worlds collide`, `The best of both worlds on a plate`],
      trendy: [`The food truck everyone's talking about`, `Next-level street food experience`],
      local: [`Locally sourced, locally loved`, `Your neighborhood's favorite food truck`]
    };
    
    return [
      ...foodRelatedTaglines,
      ...(styleSpecificTaglines[style as keyof typeof styleSpecificTaglines] || styleSpecificTaglines.creative)
    ];
  };

  const colorPalettes = generateColorPalettes();
  const typography = generateTypographySuggestions();
  const logoStyles = generateLogoSuggestions();
  const taglines = generateTaglineSuggestions();

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Brand Identity Suggestions</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-xs"
        >
          {showSuggestions ? "Hide" : "Show"} Suggestions
        </Button>
      </div>
      
      {showSuggestions && (
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="logos">
              <Brush className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Logo</span>
            </TabsTrigger>
            <TabsTrigger value="taglines">
              <Lightbulb className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Taglines</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="pt-4">
            <div className="space-y-4">
              {colorPalettes.map((palette, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-sm font-medium">{palette.name} Palette</h4>
                  <div className="flex space-x-2">
                    <div className="flex flex-col items-center">
                      <div 
                        className="h-12 w-12 rounded-md" 
                        style={{ backgroundColor: palette.primary }}
                      />
                      <span className="text-xs mt-1">{palette.primary}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="h-12 w-12 rounded-md" 
                        style={{ backgroundColor: palette.secondary }}
                      />
                      <span className="text-xs mt-1">{palette.secondary}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="h-12 w-12 rounded-md" 
                        style={{ backgroundColor: palette.accent }}
                      />
                      <span className="text-xs mt-1">{palette.accent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="pt-4">
            <div className="space-y-4">
              {typography.map((font, idx) => (
                <div key={idx} className="p-3 bg-secondary/30 rounded-md">
                  <p className="text-sm mb-1">Suggestion {idx + 1}:</p>
                  <p className="font-medium">{font}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                Pro tip: Choose fonts that reflect your brand personality while remaining legible on signage and menus.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="logos" className="pt-4">
            <div className="space-y-4">
              {logoStyles.map((style, idx) => (
                <div key={idx} className="p-3 bg-secondary/30 rounded-md">
                  <p className="text-sm mb-1">Style {idx + 1}:</p>
                  <p className="font-medium">{style}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                Pro tip: Your logo should work well on your truck, packaging, and small digital formats like social media icons.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="taglines" className="pt-4">
            <div className="space-y-3">
              {taglines.map((tagline, idx) => (
                <div key={idx} className="p-3 bg-secondary/30 rounded-md">
                  <p className="italic">"{tagline}"</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                Pro tip: A good tagline is short, memorable, and communicates your unique value proposition.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};

export default BrandIdentitySuggestions;
