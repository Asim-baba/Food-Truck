
import {
  generateCreativeName,
  generatePunnyName,
  generateElegantName,
  generateCulturalName,
  generateDescriptiveName,
  generateFusionName,
  generateTrendyName,
  generateLocalName,
  foodEmojis
} from './nameGenerators';

export interface NameGenerationOptions {
  concept: string;
  style: string;
  numberOfNames: number;
  includeEmoji?: boolean;
  businessType?: string;
  nameLength?: number[];
  localRegion?: string;
}

export const generateNames = (options: NameGenerationOptions): string[] => {
  const {
    concept,
    style,
    numberOfNames,
    includeEmoji = false,
    businessType = 'general',
    nameLength = [2],
    localRegion = ''
  } = options;

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
        name = generateLocalName(conceptKeywords, localRegion);
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
  
  return uniqueNames;
};
