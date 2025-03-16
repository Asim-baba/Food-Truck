
import React, { useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
import { Truck, RefreshCw, Settings, ChevronDown } from 'lucide-react';

export interface FormData {
  concept: string;
  style: string;
  numberOfNames: number;
  includeEmoji: boolean;
  businessType: string;
  nameLength: number[];
  localRegion: string;
}

interface GeneratorFormProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  nameStyles: Array<{ id: string, name: string }>;
  businessTypes: Array<{ id: string, name: string }>;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ 
  formData, 
  updateFormData, 
  onGenerate, 
  isGenerating,
  nameStyles,
  businessTypes 
}) => {
  const { toast } = useToast();
  const conceptInputRef = useRef<HTMLInputElement>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState(false);

  const handleGenerate = () => {
    if (!formData.concept.trim()) {
      toast({
        title: "Please enter a concept",
        description: "Describe your food truck concept to generate names",
        variant: "destructive",
      });
      conceptInputRef.current?.focus();
      return;
    }

    onGenerate();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="concept">
          Describe your food truck concept
        </label>
        <Input
          ref={conceptInputRef}
          id="concept"
          placeholder="e.g., Mexican-Italian fusion tacos with gourmet ingredients"
          value={formData.concept}
          onChange={(e) => updateFormData('concept', e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Name Style
          </label>
          <Select
            value={formData.style}
            onValueChange={(value) => updateFormData('style', value)}
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
            Number of names: {formData.numberOfNames}
          </label>
          <Slider
            value={[formData.numberOfNames]}
            onValueChange={(value) => updateFormData('numberOfNames', value[0])}
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
                value={formData.businessType}
                onValueChange={(value) => updateFormData('businessType', value)}
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
                Name Length (words): {formData.nameLength[0]}
              </label>
              <Slider
                value={formData.nameLength}
                onValueChange={(value) => updateFormData('nameLength', value)}
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
                value={formData.localRegion}
                onChange={(e) => updateFormData('localRegion', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2 p-2">
              <Checkbox 
                id="include-emoji" 
                checked={formData.includeEmoji}
                onCheckedChange={(checked) => {
                  updateFormData('includeEmoji', checked === true);
                }}
              />
              <Label htmlFor="include-emoji">Include Emoji in Names</Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Button 
        className="w-full generate-button"
        onClick={handleGenerate}
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
  );
};

export default GeneratorForm;
