
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface BusinessAnalyzerProps {
  name: string;
}

const BusinessAnalyzer: React.FC<BusinessAnalyzerProps> = ({ name }) => {
  // Generate pseudo-analytics based on the name
  const generateAnalytics = (name: string) => {
    const length = name.length;
    const words = name.split(' ').length;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(name);
    const hasNumber = /\d/.test(name);
    const memorable = Math.min(100, 40 + (length > 12 ? 30 : length > 6 ? 60 : 50) + (words > 3 ? -10 : words > 1 ? 10 : 0));
    const brandable = Math.min(100, 60 + (length < 14 ? 20 : -10) + (words < 3 ? 15 : -5) + (hasSpecialChar ? -10 : 0));
    const unique = Math.min(100, 50 + (length > 10 ? 20 : 10) + (hasSpecialChar ? 15 : 0) + (hasNumber ? 10 : 0));
    const marketable = Math.min(100, 55 + (length < 12 ? 15 : -5) + (words < 3 ? 10 : 0) + (hasSpecialChar ? -5 : 5));
    
    return [
      { name: 'Memorable', value: memorable },
      { name: 'Brandable', value: brandable },
      { name: 'Unique', value: unique },
      { name: 'Marketable', value: marketable },
    ];
  };

  const data = generateAnalytics(name);
  
  return (
    <Card className="p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Business Name Analysis</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
          <Bar dataKey="value" fill="#16a34a" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-muted-foreground mt-2">
        Analysis based on name characteristics like length, memorability, and market appeal.
      </p>
    </Card>
  );
};

export default BusinessAnalyzer;
