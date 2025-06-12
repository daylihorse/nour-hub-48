
import React, { createContext, useContext, useState } from 'react';

interface StallionContextType {
  stallions: any[];
  error: string | null;
  clearError: () => void;
}

const StallionContext = createContext<StallionContextType | undefined>(undefined);

export const StallionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Mock stallions data
  const stallions = [
    {
      id: "stallion-1",
      horseId: "horse-1",
      horseName: "Thunder Storm",
      status: "active",
      breed: "Arabian",
      studFee: 25000,
      successRate: 85.5,
      totalMares: 45,
      successfulBreedings: 38,
      livefoals: 35,
      nextAvailable: "Feb 15, 2024",
      bookings: 8
    },
    {
      id: "stallion-2", 
      horseId: "horse-2",
      horseName: "Golden Eagle",
      status: "active",
      breed: "Thoroughbred",
      studFee: 35000,
      successRate: 78.2,
      totalMares: 32,
      successfulBreedings: 25,
      livefoals: 24,
      nextAvailable: "Feb 20, 2024",
      bookings: 5
    }
  ];

  const clearError = () => setError(null);

  return (
    <StallionContext.Provider value={{ stallions, error, clearError }}>
      {children}
    </StallionContext.Provider>
  );
};

export const useStallionContext = () => {
  const context = useContext(StallionContext);
  if (context === undefined) {
    throw new Error('useStallionContext must be used within a StallionProvider');
  }
  return context;
};
