
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DomainCheckerProps {
  name: string;
}

const DomainChecker: React.FC<DomainCheckerProps> = ({ name }) => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  // Remove special characters and spaces for domain suggestions
  const formatForDomain = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/\s+/g, '');
  };

  // Generate domain suggestions based on the name
  const generateDomainSuggestions = () => {
    const baseName = formatForDomain(name);
    const foodRelatedWords = ['eats', 'bites', 'food', 'truck', 'cuisine', 'kitchen', 'taste'];
    const randomWord = foodRelatedWords[Math.floor(Math.random() * foodRelatedWords.length)];

    return [
      `${baseName}.com`,
      `${baseName}food.com`,
      `${baseName}-truck.com`,
      `${baseName}${randomWord}.com`,
      `my${baseName}.com`,
      `${baseName}.net`,
      `${baseName}.co`,
    ];
  };

  const handleCopyDomain = (domain: string) => {
    navigator.clipboard.writeText(domain);
    toast({
      title: "Copied!",
      description: `"${domain}" copied to clipboard`,
    });
  };

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Domain Suggestions</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsChecking(!isChecking)}
          className="text-xs"
        >
          <Globe className="h-3 w-3 mr-1" />
          {isChecking ? "Hide" : "Show"}
        </Button>
      </div>
      
      {isChecking && (
        <div className="space-y-2">
          {generateDomainSuggestions().map((domain, idx) => (
            <div key={idx} className="flex justify-between items-center bg-secondary/50 rounded p-2">
              <Badge variant="outline" className="font-mono">
                {domain}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => handleCopyDomain(domain)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-1">
            Note: These are suggestions only. Check domain registrars for actual availability.
          </p>
        </div>
      )}
    </Card>
  );
};

export default DomainChecker;
