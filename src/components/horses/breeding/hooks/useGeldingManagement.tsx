import { useState, useMemo } from "react";
import { Horse } from "@/types/horse";
import { ViewMode } from "../components/ViewSelector";
import { GridSize } from "../components/GridSizeSelector";

// Mock data for geldings
const mockGeldings: Horse[] = [
  {
    id: "gelding-1",
    name: "Thunder Strike",
    arabicName: "صاعقة الرعد",
    breed: "Arabian",
    gender: "male",
    adultMaleType: "gelding",
    birthDate: new Date("2018-05-15"),
    color: "Bay",
    ownerType: "individual",
    ownerName: "Sarah Johnson",
    ownerContact: "+1-555-0123",
    healthStatus: "healthy",
    vaccinationStatus: "up_to_date",
    trainingLevel: "intermediate",
    status: "active",
    insured: true,
    insuranceProvider: "Equine Insurance Co.",
    insuranceValue: 25000,
    images: [],
    documents: [],
    createdAt: new Date("2018-05-15"),
    updatedAt: new Date()
  },
  {
    id: "gelding-2",
    name: "Midnight Runner",
    arabicName: "عداء منتصف الليل",
    breed: "Thoroughbred",
    gender: "male",
    adultMaleType: "gelding",
    birthDate: new Date("2019-08-22"),
    color: "Black",
    ownerType: "individual",
    ownerName: "Michael Davis",
    ownerContact: "+1-555-0124",
    healthStatus: "healthy",
    vaccinationStatus: "up_to_date",
    trainingLevel: "basic",
    status: "active",
    insured: false,
    images: [],
    documents: [],
    createdAt: new Date("2019-08-22"),
    updatedAt: new Date()
  },
  {
    id: "gelding-3",
    name: "Golden Flash",
    arabicName: "البرق الذهبي",
    breed: "Quarter Horse",
    gender: "male",
    adultMaleType: "gelding",
    birthDate: new Date("2017-03-10"),
    color: "Palomino",
    ownerType: "company",
    ownerName: "Elite Stables LLC",
    ownerContact: "+1-555-0125",
    healthStatus: "under_treatment",
    vaccinationStatus: "partial",
    trainingLevel: "advanced",
    status: "active",
    insured: true,
    insuranceProvider: "Horse Guard Insurance",
    insuranceValue: 30000,
    images: [],
    documents: [],
    createdAt: new Date("2017-03-10"),
    updatedAt: new Date()
  }
];

export const useGeldingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [geldings, setGeldings] = useState<Horse[]>(mockGeldings);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const filteredGeldings = useMemo(() => {
    return geldings.filter(gelding =>
      gelding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.arabicName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [geldings, searchTerm]);

  const updateGelding = (updatedGelding: Horse) => {
    setGeldings(prev => 
      prev.map(gelding => 
        gelding.id === updatedGelding.id ? updatedGelding : gelding
      )
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    geldings,
    filteredGeldings,
    updateGelding,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  };
};
