
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Mare } from '@/types/breeding/mare';

interface MareContextType {
  mares: Mare[];
  selectedMare: Mare | null;
  setSelectedMare: (mare: Mare | null) => void;
  updateMare: (updatedMare: Mare) => void;
  addMare: (mare: Mare) => void;
  removeMare: (mareId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMares: Mare[];
  isLoading: boolean;
  error: string | null;
}

const MareContext = createContext<MareContextType | undefined>(undefined);

interface MareProviderProps {
  children: ReactNode;
}

export const MareProvider = ({ children }: MareProviderProps) => {
  const [mares, setMares] = useState<Mare[]>([
    {
      id: "1",
      horseId: "M001",
      horseName: "Bella",
      status: "pregnant",
      age: 7,
      breed: "Arabian",
      totalFoals: 3,
      liveFoals: 3,
      lastBreedingDate: "2023-05-15",
      expectedDueDate: "2024-01-15",
      pregnancyDay: 280,
      nextHeat: null,
      stallionName: "Thunder",
    },
    {
      id: "2",
      horseId: "M002",
      horseName: "Luna",
      status: "pregnant",
      age: 5,
      breed: "Thoroughbred",
      totalFoals: 1,
      liveFoals: 1,
      lastBreedingDate: "2023-07-20",
      expectedDueDate: "2024-03-20",
      pregnancyDay: 180,
      nextHeat: null,
      stallionName: "Lightning",
    },
    {
      id: "3",
      horseId: "M003",
      horseName: "Aurora",
      status: "open",
      age: 4,
      breed: "Arabian",
      totalFoals: 0,
      liveFoals: 0,
      lastBreedingDate: null,
      expectedDueDate: null,
      pregnancyDay: 0,
      nextHeat: "2024-01-10",
      stallionName: null,
    },
    {
      id: "4",
      horseId: "M004",
      horseName: "Storm",
      status: "nursing",
      age: 9,
      breed: "Warmblood",
      totalFoals: 4,
      liveFoals: 4,
      lastBreedingDate: "2023-02-10",
      expectedDueDate: null,
      pregnancyDay: 0,
      nextHeat: "2024-02-15",
      stallionName: null,
      foalBirthDate: "2023-12-15",
    },
  ]);
  
  const [selectedMare, setSelectedMare] = useState<Mare | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredMares = mares.filter(mare =>
    mare.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mare.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateMare = (updatedMare: Mare) => {
    setMares(prevMares => 
      prevMares.map(mare => 
        mare.id === updatedMare.id ? updatedMare : mare
      )
    );
  };

  const addMare = (mare: Mare) => {
    setMares(prevMares => [...prevMares, mare]);
  };

  const removeMare = (mareId: string) => {
    setMares(prevMares => prevMares.filter(mare => mare.id !== mareId));
  };

  const value: MareContextType = {
    mares,
    selectedMare,
    setSelectedMare,
    updateMare,
    addMare,
    removeMare,
    searchTerm,
    setSearchTerm,
    filteredMares,
    isLoading,
    error
  };

  return (
    <MareContext.Provider value={value}>
      {children}
    </MareContext.Provider>
  );
};

export const useMareContext = () => {
  const context = useContext(MareContext);
  if (context === undefined) {
    throw new Error('useMareContext must be used within a MareProvider');
  }
  return context;
};
