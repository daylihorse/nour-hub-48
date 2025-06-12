
import React, { createContext, useContext, useState } from 'react';

interface StallionContextType {
  stallions: any[];
  error: string | null;
  clearError: () => void;
}

const StallionContext = createContext<StallionContextType | undefined>(undefined);

export const StallionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Updated stallions data to match the useStallionManagement structure
  const stallions = [
    {
      id: "1",
      horseId: "H001",
      horseName: "Thunder",
      status: "active",
      age: 8,
      breed: "Arabian",
      totalMares: 45,
      successfulBreedings: 38,
      livefoals: 35,
      successRate: 92.1,
      studFee: 5000,
      nextAvailable: "Feb 15, 2024",
      bookings: 3
    },
    {
      id: "2",
      horseId: "H002", 
      horseName: "Lightning",
      status: "active",
      age: 6,
      breed: "Thoroughbred",
      totalMares: 32,
      successfulBreedings: 25,
      livefoals: 24,
      successRate: 91.7,
      studFee: 3500,
      nextAvailable: "Feb 20, 2024",
      bookings: 5
    },
    {
      id: "3",
      horseId: "H003",
      horseName: "Storm",
      status: "retired",
      age: 15,
      breed: "Arabian",
      totalMares: 120,
      successfulBreedings: 105,
      livefoals: 98,
      successRate: 93.3,
      studFee: 0,
      nextAvailable: "N/A",
      bookings: 0
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
