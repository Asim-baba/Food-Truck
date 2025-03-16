
// Name generation utility functions

export const foodWords = [
  'Savory', 'Tasty', 'Delicious', 'Gourmet', 'Fresh', 'Crispy', 'Spicy', 'Sweet', 
  'Juicy', 'Sizzling', 'Flavorful', 'Organic', 'Artisanal', 'Homemade', 'Crafted',
  'Infused', 'Roasted', 'Grilled', 'Smoked', 'Fried', 'Baked', 'Braised', 'Steamed',
  'Whipped', 'Fusion', 'Harvest', 'Seasonal', 'Local', 'Wild', 'Rustic'
];

export const conceptWords = [
  'Truck', 'Wagon', 'Kitchen', 'Bites', 'Eats', 'Feast', 'Fare', 'Cart', 'Stop',
  'Hub', 'Spot', 'Joint', 'Express', 'Mobile', 'Wheels', 'Cruiser', 'Station',
  'Corner', 'Avenue', 'Street', 'Road', 'Boulevard', 'Lane', 'Cuisine', 'Diner',
  'Cafe', 'Bistro', 'Eatery', 'Table', 'Plate', 'Fork', 'Spoon', 'Knife', 'Bowl'
];

export const funnyPrefixes = [
  'Hungry', 'Hangry', 'Munchy', 'Nomadic', 'Rolling', 'Wandering', 'Roaming',
  'Cruising', 'Drifting', 'Traveling', 'Mobile', 'Urban', 'Street', 'City',
  'Metro', 'Downtown', 'Uptown', 'Roadside', 'Curbside', 'Sidewalk', 'Alley'
];

export const foodEmojis = {
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

export const generateCreativeName = (keywords: string[]) => {
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

export const makePun = (word: string): string | null => {
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

export const generatePunnyName = (keywords: string[]) => {
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

export const generateElegantName = (keywords: string[]) => {
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

export const generateCulturalName = (keywords: string[]) => {
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

export const generateDescriptiveName = (keywords: string[]) => {
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

export const generateFusionName = (keywords: string[]) => {
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

export const generateTrendyName = (keywords: string[]) => {
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

export const generateLocalName = (keywords: string[], localRegion: string = '') => {
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
