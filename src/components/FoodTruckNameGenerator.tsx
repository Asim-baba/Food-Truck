import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Truck, Copy, Heart, RefreshCw, Download } from 'lucide-react';

// Sample food truck name styles
const nameStyles = [
  { id: 'creative', name: 'Creative & Catchy' },
  { id: 'punny', name: 'Punny & Playful' },
  { id: 'elegant', name: 'Elegant & Sophisticated' },
  { id: 'cultural', name: 'Cultural & Regional' },
  { id: 'descriptive', name: 'Descriptive & Direct' },
  { id: 'fusion', name: 'Fusion & Modern' },
];

// Food-related word banks for name generation
const foodWords = [
  'Savory', 'Tasty', 'Delicious', 'Gourmet', 'Fresh', 'Crispy', 'Spicy', 'Sweet', 
  'Juicy', 'Sizzling', 'Flavorful', 'Organic', 'Artisanal', 'Homemade', 'Crafted',
  'Infused', 'Roasted', 'Grilled', 'Smoked', 'Fried', 'Baked', 'Braised', 'Steamed',
  'Whipped', 'Fusion', 'Harvest', 'Seasonal', 'Local', 'Wild', 'Rustic'
];

const conceptWords = [
  'Truck', 'Wagon', 'Kitchen', 'Bites', 'Eats', 'Feast', 'Fare', 'Cart', 'Stop',
  'Hub', 'Spot', 'Joint', 'Express', 'Mobile', 'Wheels', 'Cruiser', 'Station',
  'Corner', 'Avenue', 'Street', 'Road', 'Boulevard', 'Lane', 'Cuisine', 'Diner',
  'Cafe', 'Bistro', 'Eatery', 'Table', 'Plate', 'Fork', 'Spoon', 'Knife', 'Bowl'
];

const funnyPrefixes = [
  'Hungry', 'Hangry', 'Munchy', 'Nomadic', 'Rolling', 'Wandering', 'Roaming',
  'Cruising', 'Drifting', 'Traveling', 'Mobile', 'Urban', 'Street', 'City',
  'Metro', 'Downtown', 'Uptown', 'Roadside', 'Curbside', 'Sidewalk', 'Alley'
];

const FoodTruckNameGenerator: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [style, setStyle] = useState('creative');
  const [numberOfNames, setNumberOfNames] = useState(3);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const conceptInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Load favorites from local storage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('foodTruckNameFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedHistory = localStorage.getItem('foodTruckNameHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Auto-focus on the concept input field when component mounts
    if (conceptInputRef.current) {
      setTimeout(() => {
        conceptInputRef.current?.focus();
      }, 500);
    }
  }, []);

  // Save favorites to local storage when they change
  useEffect(() => {
    localStorage.setItem('foodTruckNameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save history to local storage when it changes
  useEffect(() => {
    localStorage.setItem('foodTruckNameHistory', JSON.stringify(history));
  }, [history]);

  // Helper function to generate random names based on concept and style
  const generateNames = () => {
    if (!concept.trim()) {
      toast({
        title: "Please enter a concept",
        description: "Describe your food truck concept to generate names",
        variant: "destructive",
      });
      conceptInputRef.current?.focus();
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const conceptKeywords = concept.toLowerCase().split(' ');
      const newNames: string[] = [];
      
      // Generate names based on the selected style and concept keywords
      for (let i = 0; i < numberOfNames; i++) {
        let name = "";
        
        switch (style) {
          case 'punny':
            name = generatePunnyName(conceptKeywords);
            break;
          case 'elegant':
            name = generateElegantName(conceptKeywords);
            break;
          case 'cultural':
            name = generateCulturalName(conceptKeywords);
            break;
          case 'descriptive':
            name = generateDescriptiveName(conceptKeywords);
            break;
          case 'fusion':
            name = generateFusionName(conceptKeywords);
            break;
          case 'creative':
          default:
            name = generateCreativeName(conceptKeywords);
            break;
        }
        
        newNames.push(name);
      }
      
      // Filter out any duplicate names and ensure we have the requested number
      const uniqueNames = Array.from(new Set(newNames));
      while (uniqueNames.length < numberOfNames) {
        const additionalName = generateCreativeName(conceptKeywords);
        if (!uniqueNames.includes(additionalName)) {
          uniqueNames.push(additionalName);
        }
      }
      
      setGeneratedNames(uniqueNames);
      
      // Add to history
      setHistory(prev => {
        const updatedHistory = [...prev, uniqueNames];
        // Keep only the last 10 generations
        if (updatedHistory.length > 10) {
          return updatedHistory.slice(updatedHistory.length - 10);
        }
        return updatedHistory;
      });
      
      setIsGenerating(false);
      
      toast({
        title: "Names generated!",
        description: `${numberOfNames} unique food truck names created based on your concept`,
      });
    }, 1500); // Simulating API call delay for better UX
  };

  // Name generation functions based on style
  const generateCreativeName = (keywords: string[]) => {
    const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
    const randomConceptWord = conceptWords[Math.floor(Math.random() * conceptWords.length)];
    
    // 50% chance to use a keyword from the concept if available
    if (keywords.length > 0 && Math.random() > 0.5) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      // 50% chance to put the concept keyword first
      if (Math.random() > 0.5) {
        return `${capitalizedKeyword} ${randomFoodWord}`;
      } else {
        return `${randomFoodWord} ${capitalizedKeyword}`;
      }
    } else {
      // Otherwise create a generic creative name
      return `${randomFoodWord} ${randomConceptWord}`;
    }
  };

  const generatePunnyName = (keywords: string[]) => {
    const foodPuns = [
      'Grilltastic', 'Feast on Wheels', 'Meals on Wheels', 'Food Mood', 
      'Chew Chew Train', 'The Hungry Honk', 'Truck Yeah', 'Lord of the Fries',
      'The Rolling Scones', 'Curry On', 'Thai Tanic', 'Bun Appétit', 'Life of Pie'
    ];
    
    const randomPun = foodPuns[Math.floor(Math.random() * foodPuns.length)];
    
    // Sometimes include a keyword from the concept
    if (keywords.length > 0 && Math.random() > 0.7) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      if (Math.random() > 0.5) {
        return `${capitalizedKeyword} ${randomPun}`;
      } else {
        // Make a pun with the keyword if possible
        const punnedKeyword = makePun(randomKeyword);
        return punnedKeyword || `${randomPun} ${capitalizedKeyword}`;
      }
    }
    
    return randomPun;
  };

  const makePun = (word: string): string | null => {
    const puns: {[key: string]: string} = {
      "burger": "Burgerlicious",
      "pizza": "Pizza the Action",
      "taco": "Taco 'bout Delicious",
      "sandwich": "Sand-which Way to Go",
      "pasta": "Pasta La Vista",
      "grill": "Grill Seekers",
      "cheese": "The Big Cheese",
      "bacon": "Bacon Me Crazy",
      "chicken": "Chicken Out",
      "bbq": "License to Grill",
      "vegan": "Veggin' Out",
      "seafood": "Something's Fishy",
      "ice": "Ice Ice Baby",
      "cream": "Cream of the Crop",
      "sweet": "Sweet Dreams",
      "spicy": "Spice World",
      "coffee": "Bean There Done That",
      "tea": "You're My Cup of Tea",
      "bread": "Bread Winners",
      "cake": "Piece of Cake",
      "soup": "Soup There It Is",
      "salad": "Lettuce Entertain You",
      "healthy": "Health Yeah!",
      "bowl": "Bowl Movement",
      "wrap": "That's a Wrap",
      "roll": "On a Roll",
      "breakfast": "Break Fast Forward",
      "lunch": "Out to Lunch",
      "dinner": "Winner Winner",
      "dessert": "Just Desserts",
      "smoothie": "Smooth Operator",
      "juice": "Juice Got Served",
      "bar": "Raising the Bar",
      "snack": "Snack to the Future",
      "fast": "Fast and Curious",
      "fresh": "Fresh Prince",
      "hot": "Hot and Happening",
      "cold": "Cold Play",
      "fire": "Fire It Up",
      "water": "Water You Waiting For",
      "fruit": "Fruit Loops",
      "veggie": "Veg Out"
    };
    
    for (const [key, punValue] of Object.entries(puns)) {
      if (word.toLowerCase().includes(key)) {
        return punValue;
      }
    }
    
    return null;
  };

  const generateElegantName = (keywords: string[]) => {
    const elegantPrefixes = ['Maison', 'La', 'Le', 'The', 'Château', 'Villa', 'Bistro', 'Café'];
    const elegantSuffixes = ['Gourmet', 'Cuisine', 'Culinary', 'Gastronomy', 'Epicure', 'Fine', 'Select', 'Premier'];
    
    const randomPrefix = elegantPrefixes[Math.floor(Math.random() * elegantPrefixes.length)];
    const randomSuffix = elegantSuffixes[Math.floor(Math.random() * elegantSuffixes.length)];
    
    if (keywords.length > 0) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      // Format as "Prefix Keyword" or "Keyword Suffix"
      if (Math.random() > 0.5) {
        return `${randomPrefix} ${capitalizedKeyword}`;
      } else {
        return `${capitalizedKeyword} ${randomSuffix}`;
      }
    } else {
      // If no keywords, create a generic elegant name
      const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
      return `${randomPrefix} ${randomFoodWord} ${randomSuffix}`;
    }
  };

  const generateCulturalName = (keywords: string[]) => {
    const culturalPrefixes = {
      italian: ['Bella', 'Buon', 'Nonna\'s', 'Trattoria', 'Piccolo'],
      mexican: ['Casa', 'El', 'La', 'Taqueria', 'Sabor'],
      french: ['Chez', 'Le', 'Petit', 'Café', 'Maison'],
      asian: ['Golden', 'Lucky', 'Jade', 'Umami', 'Bamboo'],
      indian: ['Spice', 'Curry', 'Masala', 'Taj', 'Bollywood'],
      greek: ['Opa!', 'Mediterranean', 'Aegean', 'Zeus', 'Athena'],
      american: ['All-American', 'Classic', 'Hometown', 'Liberty', 'Patriot']
    };
    
    // Determine culture from keywords or pick random
    let culture: keyof typeof culturalPrefixes = 'american';
    for (const keyword of keywords) {
      if (keyword.includes('ital')) culture = 'italian';
      else if (keyword.includes('mex') || keyword.includes('taco')) culture = 'mexican';
      else if (keyword.includes('french') || keyword.includes('crepe')) culture = 'french';
      else if (keyword.includes('asia') || keyword.includes('chinese') || 
               keyword.includes('japan') || keyword.includes('thai')) culture = 'asian';
      else if (keyword.includes('india') || keyword.includes('curry')) culture = 'indian';
      else if (keyword.includes('greek') || keyword.includes('med')) culture = 'greek';
    }
    
    const prefixes = culturalPrefixes[culture];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    if (keywords.length > 0) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      return `${randomPrefix} ${capitalizedKeyword}`;
    } else {
      const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
      return `${randomPrefix} ${randomFoodWord}`;
    }
  };

  const generateDescriptiveName = (keywords: string[]) => {
    const descriptivePrefixes = ['The', 'Fresh', 'Simply', 'Just', 'Pure', 'Real'];
    const descriptiveSuffixes = ['Express', 'To Go', 'Mobile', 'Truck', 'Street Food', 'Kitchen'];
    
    const randomPrefix = descriptivePrefixes[Math.floor(Math.random() * descriptivePrefixes.length)];
    const randomSuffix = descriptiveSuffixes[Math.floor(Math.random() * descriptiveSuffixes.length)];
    
    if (keywords.length > 0) {
      // Join 1-2 keywords
      const keywordCount = Math.min(keywords.length, Math.random() > 0.5 ? 2 : 1);
      const selectedKeywords = keywords
        .sort(() => 0.5 - Math.random())
        .slice(0, keywordCount)
        .map(k => k.charAt(0).toUpperCase() + k.slice(1));
      
      const keywordPhrase = selectedKeywords.join(' ');
      
      // Format as "Prefix Keyword Suffix" or just "Keyword Suffix"
      if (Math.random() > 0.5) {
        return `${randomPrefix} ${keywordPhrase} ${randomSuffix}`;
      } else {
        return `${keywordPhrase} ${randomSuffix}`;
      }
    } else {
      const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
      return `${randomPrefix} ${randomFoodWord} ${randomSuffix}`;
    }
  };

  const generateFusionName = (keywords: string[]) => {
    const fusionConnectors = ['Meets', 'Fusion', 'Remix', '&', 'x', 'Blend', 'Mash'];
    const randomConnector = fusionConnectors[Math.floor(Math.random() * fusionConnectors.length)];
    
    // Try to extract two different food types from keywords
    let foodType1 = '';
    let foodType2 = '';
    
    const foodTypes = [
      'burger', 'pizza', 'taco', 'sushi', 'pasta', 'curry', 'bbq', 'grill', 
      'sandwich', 'salad', 'breakfast', 'dessert', 'bao', 'noodle', 'rice'
    ];
    
    for (const keyword of keywords) {
      for (const type of foodTypes) {
        if (keyword.toLowerCase().includes(type)) {
          if (!foodType1) {
            foodType1 = type.charAt(0).toUpperCase() + type.slice(1);
          } else if (!foodType2 && type !== foodType1.toLowerCase()) {
            foodType2 = type.charAt(0).toUpperCase() + type.slice(1);
            break;
          }
        }
      }
      if (foodType1 && foodType2) break;
    }
    
    // If we couldn't find two food types, use random ones
    if (!foodType1) {
      foodType1 = foodTypes[Math.floor(Math.random() * foodTypes.length)];
      foodType1 = foodType1.charAt(0).toUpperCase() + foodType1.slice(1);
    }
    
    if (!foodType2) {
      do {
        foodType2 = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        foodType2 = foodType2.charAt(0).toUpperCase() + foodType2.slice(1);
      } while (foodType2.toLowerCase() === foodType1.toLowerCase());
    }
    
    // Create fusion name
    return `${foodType1} ${randomConnector} ${foodType2}`;
  };
  
  // Utility functions
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `"${text}" copied to clipboard`,
    });
  };
  
  const toggleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(n => n !== name));
      toast({
        title: "Removed from favorites",
        description: `"${name}" removed from your favorites`,
      });
    } else {
      setFavorites([...favorites, name]);
      toast({
        title: "Added to favorites!",
        description: `"${name}" added to your favorites`,
      });
    }
  };
  
  const downloadFavorites = () => {
    if (favorites.length === 0) {
      toast({
        title: "No favorites to download",
        description: "Add some names to your favorites first",
        variant: "destructive",
      });
      return;
    }
    
    const content = `# My Favorite Food Truck Names\n\nGenerated by FoodTechnologyLabs.com\n\n${favorites.map((name, i) => `${i+1}. ${name}`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'food-truck-name-favorites.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Favorites downloaded!",
      description: `${favorites.length} food truck names saved to your device`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <Truck className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Food Truck Name Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create unique and memorable food truck names for foodtechnologylabs.com
        </p>
      </div>
      
      {/* Generator Form */}
      <Card className="p-6 shadow-md animate-fade-in" style={{animationDelay: '0.1s'}}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="concept">
              Describe your food truck concept
            </label>
            <Input
              ref={conceptInputRef}
              id="concept"
              placeholder="e.g., Mexican-Italian fusion tacos with gourmet ingredients"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Name Style
            </label>
            <Select
              value={style}
              onValueChange={setStyle}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a name style" />
              </SelectTrigger>
              <SelectContent>
                {nameStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of names to generate: {numberOfNames}
            </label>
            <Slider
              value={[numberOfNames]}
              onValueChange={(value) => setNumberOfNames(value[0])}
              min={1}
              max={10}
              step={1}
              className="py-4"
            />
          </div>
          
          <Button 
            className="w-full generate-button"
            onClick={generateNames}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Truck className="mr-2 h-4 w-4" />
                GENERATE NAMES
              </>
            )}
          </Button>
        </div>
      </Card>
      
      {/* Generated Names */}
      {generatedNames.length > 0 && (
        <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-bold">Generated Names</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedNames.map((name, index) => (
              <Card 
                key={`${name}-${index}`} 
                className="name-card p-4 flex flex-col justify-between"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">{name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="copy-button"
                    onClick={() => copyToClipboard(name)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="heart-button"
                    onClick={() => toggleFavorite(name)}
                  >
                    <Heart 
                      className={`h-5 w-5 ${favorites.includes(name) ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Favorites</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadFavorites}
              className="copy-button"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((name, index) => (
              <Card 
                key={`fav-${name}-${index}`} 
                className="name-card p-4 flex flex-col justify-between bg-secondary/50"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">{name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="copy-button"
                    onClick={() => copyToClipboard(name)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="heart-button"
                    onClick={() => toggleFavorite(name)}
                  >
                    <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Generation History */}
      {history.length > 0 && (
        <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button
            variant="ghost"
            onClick={() => setShowHistory(!showHistory)}
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
                          onClick={() => toggleFavorite(name)}
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
      )}
    </div>
  );
};

export default FoodTruckNameGenerator;
