
import React from 'react';
import FoodTruckNameGenerator from "@/components/FoodTruckNameGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-64 bg-primary/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-primary/5"></div>
        <div className="grid grid-cols-10 h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-full bg-primary/10 w-8 h-8"
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                transform: `scale(${Math.random() * 2 + 0.5})`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <header className="py-4 px-6 text-center">
          <a href="https://foodtechnologylabs.com" className="text-primary font-semibold hover:underline">
            FoodTechnologyLabs.com
          </a>
        </header>
        
        <main>
          <FoodTruckNameGenerator />
        </main>
        
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Food Technology Labs. All rights reserved.</p>
          <p className="mt-1">The ultimate resource for food truck entrepreneurs.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
