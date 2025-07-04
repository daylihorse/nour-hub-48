
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
    gender: "gelding",
    birth_date: "2018-05-15",
    color: "Bay",
    owner_type: "individual",
    owner_name: "Sarah Johnson",
    owner_contact: "+1-555-0123",
    health_status: "healthy",
    status: "active",
    insured: true,
    insurance_provider: "Equine Insurance Co.",
    insurance_value: 25000,
    images: [],
    documents: []
  },
  {
    id: "gelding-2",
    name: "Midnight Runner",
    arabicName: "عداء منتصف الليل",
    breed: "Thoroughbred",
    gender: "gelding",
    birth_date: "2019-08-22",
    color: "Black",
    owner_type: "individual",
    owner_name: "Michael Davis",
    owner_contact: "+1-555-0124",
    health_status: "healthy",
    status: "active",
    insured: false,
    images: [],
    documents: []
  },
  {
    id: "gelding-3",
    name: "Golden Flash",
    arabicName: "البرق الذهبي",
    breed: "Quarter Horse",
    gender: "gelding",
    birth_date: "2017-03-10",
    color: "Palomino",
    owner_type: "company",
    owner_name: "Elite Stables LLC",
    owner_contact: "+1-555-0125",
    health_status: "under_treatment",
    status: "active",
    insured: true,
    insurance_provider: "Horse Guard Insurance",
    insurance_value: 30000,
    images: [],
    documents: []
  }
];

export const useGeldingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [geldings, setGeldings] = useState<Horse[]>(mockGeldings);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>("medium");

  const filteredGeldings = useMemo(() => {
    return geldings.filter(gelding =>
      gelding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.arabicName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gelding.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
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
