import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Truck, 
  Copy, 
  Heart, 
  RefreshCw, 
  Download, 
  ChevronDown,
  Settings,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import NameCard from './food-truck-generator/NameCard';
import BusinessAnalyzer from './food-truck-generator/BusinessAnalyzer';
import DomainChecker from './food-truck-generator/DomainChecker';
import SocialHandleGenerator from './food-truck-generator/SocialHandleGenerator';
import BrandIdentitySuggestions from './food-truck-generator/BrandIdentitySuggestions';
import ExportUtility from './food-truck-generator/ExportUtility';
import TrendingInsights from './food-truck-generator/TrendingInsights';

const nameStyles = [
  { id: 'creative', name: 'Creative & Catchy' },
  { id: 'punny', name: 'Punny & Playful' },
  { id: 'elegant', name: 'Elegant & Sophisticated' },
  { id: 'cultural', name: 'Cultural & Regional' },
  { id: 'descriptive', name: 'Descriptive & Direct' },
  { id: 'fusion', name: 'Fusion & Modern' },
  { id: 'trendy', name: 'Trendy & Hip' },
  { id: 'local', name: 'Local & Community' },
];

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

const businessTypes = [
  { id: 'general', name: 'General Food Truck' },
  { id: 'burger', name: 'Burger' },
  { id: 'taco', name: 'Taco & Mexican' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'bbq', name: 'BBQ & Grill' },
  { id: 'asian', name: 'Asian Fusion' },
  { id: 'dessert', name: 'Dessert & Sweets' },
  { id: 'coffee', name: 'Coffee & Drinks' },
  { id: 'vegan', name: 'Vegan & Plant-based' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'sandwich', name: 'Sandwich' },
];

const foodEmojis = {
  general: ['🍽️', '🍴', '🥄', '🍕', '🌮', '🍔', '🍗', '🥗', '🥪'],
  burger: ['🍔', '🥓', '🧀', '🥪', '🥫', '🔥', '🥩'],
  taco: ['🌮', '🌯', '🌶️', '🧅', '🌽', '🥑', '🍋'],
  pizza: ['🍕', '🧀', '🍅', '🍄', '🌱', '🔥', '🍞'],
  bbq: ['🥩', '🍖', '🍗', '🔥', '🥓', '🌶️', '💨'],
  asian: ['🍜', '🍱', '🍚', '🥢', '🍣', '🥡', '🍲'],
  dessert: ['🍦', '🍰', '🧁', '🍪', '🍨', '🍩', '🥞'],
  coffee: ['☕', '🥤', '🧋', '🥛', '🫖', '🥃', '🍵'],
  vegan: ['🥗', '🥦', '🥬', '🥕', '🍎', '🥜', '🌱'],
  seafood: ['🦐', '🦀', '🐟', '🦑', '🐙', '🦞', '🌊'],
  breakfast: ['🥞', '🍳', '🥓', '🥐', '☕', '🥪', '🥚'],
  sandwich: ['🥪', '🥖', '🧀', '🥬', '🍅', '🥓', '🥒']
};

const FoodTruckNameGenerator: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [style, setStyle] = useState('creative');
  const [numberOfNames, setNumberOfNames] = useState(3);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedTab, setSelectedTab] = useState("generator");
  const [selectedName, setSelectedName] = useState("");
  
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [includeEmoji, setIncludeEmoji] = useState(false);
  const [businessType, setBusinessType] = useState('general');
  const [nameLength, setNameLength] = useState<number[]>([2]);
  const [localRegion, setLocalRegion] = useState('');
  
  const conceptInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('foodTruckNameFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedHistory = localStorage.getItem('foodTruckNameHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    if (conceptInputRef.current) {
      setTimeout(() => {
        conceptInputRef.current?.focus();
      }, 500);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodTruckNameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('foodTruckNameHistory', JSON.stringify(history));
  }, [history]);

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
          case 'trendy':
            name = generateTrendyName(conceptKeywords);
            break;
          case 'local':
            name = generateLocalName(conceptKeywords);
            break;
          case 'creative':
          default:
            name = generateCreativeName(conceptKeywords);
            break;
        }
        
        if (includeEmoji && businessType) {
          const typeEmojis = foodEmojis[businessType as keyof typeof foodEmojis] || foodEmojis.general;
          const randomEmoji = typeEmojis[Math.floor(Math.random() * typeEmojis.length)];
          
          if (Math.random() > 0.5) {
            name = `${randomEmoji} ${name}`;
          } else {
            name = `${name} ${randomEmoji}`;
          }
        }
        
        const words = name.split(' ');
        const targetWordCount = nameLength[0];
        
        if (words.length > targetWordCount) {
          name = words.slice(0, targetWordCount).join(' ');
        }
        
        newNames.push(name);
      }
      
      const uniqueNames = Array.from(new Set(newNames));
      while (uniqueNames.length < numberOfNames) {
        const additionalName = generateCreativeName(conceptKeywords);
        if (!uniqueNames.includes(additionalName)) {
          uniqueNames.push(additionalName);
        }
      }
      
      setGeneratedNames(uniqueNames);
      if (uniqueNames.length > 0) {
        setSelectedName(uniqueNames[0]);
      }
      
      setHistory(prev => {
        const updatedHistory = [...prev, uniqueNames];
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
    }, 1500);
  };

  const generateCreativeName = (keywords: string[]) => {
    const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
    const randomConceptWord = conceptWords[Math.floor(Math.random() * conceptWords.length)];
    
    if (keywords.length > 0 && Math.random() > 0.5) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      if (Math.random() > 0.5) {
        return `${capitalizedKeyword} ${randomFoodWord}`;
      } else {
        return `${randomFoodWord} ${capitalizedKeyword}`;
      }
    } else {
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
    
    if (keywords.length > 0 && Math.random() > 0.7) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      if (Math.random() > 0.5) {
        return `${capitalizedKeyword} ${randomPun}`;
      } else {
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
      
      if (Math.random() > 0.5) {
        return `${randomPrefix} ${capitalizedKeyword}`;
      } else {
        return `${capitalizedKeyword} ${randomSuffix}`;
      }
    } else {
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
      const keywordCount = Math.min(keywords.length, Math.random() > 0.5 ? 2 : 1);
      const selectedKeywords = keywords
        .sort(() => 0.5 - Math.random())
        .slice(0, keywordCount)
        .map(k => k.charAt(0).toUpperCase() + k.slice(1));
      
      const keywordPhrase = selectedKeywords.join(' ');
      
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
    
    return `${foodType1} ${randomConnector} ${foodType2}`;
  };

  const generateTrendyName = (keywords: string[]) => {
    const trendyPrefixes = ['Craft', 'Artisanal', 'Sustainable', 'Urban', 'Metro', 'Conscious', 'Mindful'];
    const trendySuffixes = ['Collective', 'Project', 'Co.', 'Lab', 'Works', 'Society', 'Provisions'];
    
    const randomPrefix = trendyPrefixes[Math.floor(Math.random() * trendyPrefixes.length)];
    const randomSuffix = trendySuffixes[Math.floor(Math.random() * trendySuffixes.length)];
    
    if (keywords.length > 0) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      if (Math.random() > 0.6) {
        return `${randomPrefix} ${capitalizedKeyword}`;
      } else if (Math.random() > 0.3) {
        return `${capitalizedKeyword} ${randomSuffix}`;
      } else {
        return `${capitalizedKeyword} & ${randomSuffix}`;
      }
    } else {
      const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
      return `${randomPrefix} ${randomFoodWord} ${randomSuffix}`;
    }
  };

  const generateLocalName = (keywords: string[]) => {
    const localPrefixes = ['Local', 'Hometown', 'Neighborhood', 'Community', 'District', 'Native'];
    const localSuffixes = ['Table', 'Kitchen', 'Market', 'Fare', 'Eats', 'Feed', 'Provisions'];
    
    const randomPrefix = localPrefixes[Math.floor(Math.random() * localPrefixes.length)];
    const randomSuffix = localSuffixes[Math.floor(Math.random() * localSuffixes.length)];
    
    if (localRegion) {
      if (Math.random() > 0.5) {
        return `${localRegion} ${randomSuffix}`;
      } else {
        return `${randomPrefix} ${localRegion}`;
      }
    }
    
    if (keywords.length > 0) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const capitalizedKeyword = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
      
      if (Math.random() > 0.6) {
        return `${randomPrefix} ${capitalizedKeyword}`;
      } else {
        return `${capitalizedKeyword} ${randomSuffix}`;
      }
    } else {
      const randomFoodWord = foodWords[Math.floor(Math.random() * foodWords.length)];
      return `${randomPrefix} ${randomFoodWord} ${randomSuffix}`;
    }
  };

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
      
      <Tabs 
        defaultValue="generator" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="animate-fade-in"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="generator">Name Generator</TabsTrigger>
          <TabsTrigger value="analyzer" disabled={!selectedName}>
            <Sparkles className="h-4 w-4 mr-1.5" />
            Business Tools
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-4 w-4 mr-1.5" />
            Industry Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="space-y-6">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Number of names: {numberOfNames}
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
              </div>
              
              <Collapsible 
                open={showAdvancedOptions} 
                onOpenChange={setShowAdvancedOptions}
                className="border rounded-md p-3"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
                    <span className="flex items-center text-sm font-medium">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Options
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedOptions ? 'transform rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Business Type
                      </label>
                      <Select
                        value={businessType}
                        onValueChange={setBusinessType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name Length (words): {nameLength[0]}
                      </label>
                      <Slider
                        value={nameLength}
                        onValueChange={setNameLength}
                        min={1}
                        max={4}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="region">
                        Local Region/City (optional)
                      </label>
                      <Input
                        id="region"
                        placeholder="e.g., San Francisco, NYC, Texas"
                        value={localRegion}
                        onChange={(e) => setLocalRegion(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 p-2">
                      <Checkbox 
                        id="include-emoji" 
                        checked={includeEmoji}
                        onCheckedChange={(checked) => {
                          setIncludeEmoji(checked === true);
                        }}
                      />
                      <Label htmlFor="include-emoji">Include Emoji in Names</Label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
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
          
          {generatedNames.length > 0 && (
            <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold">Generated Names</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedNames.map((name, index) => (
                  <div 
                    key={`${name}-${index}`}
                    onClick={() => {
                      setSelectedName(name);
                      setSelectedTab("analyzer");
                    }}
                  >
                    <NameCard
                      name={name}
                      isFavorite={favorites.includes(name)}
                      onCopy={copyToClipboard}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
              
              <ExportUtility names={generatedNames} favorites={favorites} />
            </div>
          )}
          
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
                  <div 
                    key={`fav-${name}-${index}`}
                    onClick={() => {
                      setSelectedName(name);
                      setSelectedTab("analyzer");
                    }}
                  >
                    <NameCard
                      name={name}
                      isFavorite={true}
                      onCopy={copyToClipboard}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
        </TabsContent>
        
        <TabsContent value="analyzer" className="space-y-6">
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
                          onClick={() => copyToClipboard(selectedName)}
                          className="w-full"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Name
                        </Button>
                        <Button
                          variant={favorites.includes(selectedName) ? "default" : "outline"}
                          onClick={() => toggleFavorite(selectedName)}
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
                onClick={() => setSelectedTab("generator")}
              >
                Go to Generator
              </Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Food Truck Industry Trends</h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest trends in the food truck industry to make informed business decisions.
            </p>
            
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="item-1">
                <AccordionTrigger>Industry Statistics</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p>• The food truck industry market size in 2023 is estimated at $1.2 billion.</p>
                    <p>• Average annual growth rate of 7.5% over the last five years.</p>
                    <p>• Average startup cost ranges from $50,000 to $175,000.</p>
                    <p>• Most successful food trucks reach profitability within 12-18 months.</p>
                    <p>• Social media marketing drives 70% of new customer acquisition.</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Source: FoodTechnologyLabs Market Research, 2023
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Popular Food Truck Concepts</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p>1. Plant-based/Vegan concepts</p>
                    <p>2. Global street food fusion</p>
                    <p>3. Specialty desserts and artisanal ice cream</p>
                    <p>4. Gourmet comfort food with a twist</p>
                    <p>5. Health-focused bowls and smoothies</p>
                    <p>6. Ethnic cuisine with modern interpretations</p>
                    <p>7. Specialty coffee and beverage trucks</p>
                    <p>8. Sustainable and locally-sourced concepts</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Naming & Branding Trends</AccordionTrigger>
                <AccordionContent>
                  <TrendingInsights />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 bg-secondary/30">
                <h3 className="text-lg font-semibold mb-3">Customer Preferences</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Increased demand for health-conscious options</li>
                  <li>Strong preference for transparent ingredient sourcing</li>
                  <li>Growing interest in international flavors</li>
                  <li>Higher willingness to pay for unique food experiences</li>
                  <li>Expectation for sustainable packaging</li>
                  <li>Preference for digital payment options</li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-secondary/30">
                <h3 className="text-lg font-semibold mb-3">Technology Integration</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Online ordering and pre-order capabilities</li>
                  <li>GPS location tracking via mobile apps</li>
                  <li>Digital menu boards with dynamic pricing</li>
                  <li>Loyalty programs and digital rewards</li>
                  <li>Social media integration for real-time updates</li>
                  <li>Contactless payment systems</li>
                </ul>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodTruckNameGenerator;

