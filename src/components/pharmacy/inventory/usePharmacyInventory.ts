
import { useState } from "react";
import { InventoryItem } from './types';
import { filterItems } from './utils';

// Mock inventory data
const mockInventoryItems: InventoryItem[] = [
  {
    id: "PI001",
    name: "Penicillin Injectable",
    genericName: "Penicillin G Procaine",
    brandName: "Pen-G",
    category: "antibiotic",
    dosageForm: "injection",
    strength: "300,000",
    unit: "IU/ml",
    currentStock: 15,
    minimumStock: 20,
    maximumStock: 100,
    expiryDate: "2024-12-15",
    batchNumber: "PEN2024001",
    supplier: "VetMed Pharmaceuticals",
    unitCost: 12.50,
    sellingPrice: 18.75,
    location: "Cold Storage A-1",
    requiresPrescription: true,
    controlledSubstance: false,
    storageRequirements: "Refrigerate 2-8°C"
  },
  {
    id: "PI002",
    name: "Banamine Paste",
    genericName: "Flunixin Meglumine",
    brandName: "Banamine",
    category: "anti_inflammatory",
    dosageForm: "liquid",
    strength: "1500",
    unit: "mg/tube",
    currentStock: 25,
    minimumStock: 15,
    maximumStock: 75,
    expiryDate: "2025-06-20",
    batchNumber: "BAN2024005",
    supplier: "Merck Animal Health",
    unitCost: 8.25,
    sellingPrice: 14.50,
    location: "Shelf B-3",
    requiresPrescription: true,
    controlledSubstance: false,
    storageRequirements: "Room temperature"
  },
  {
    id: "PI003",
    name: "Vitamin E & Selenium",
    genericName: "Vitamin E & Selenium",
    brandName: "E-Se",
    category: "vitamin",
    dosageForm: "injection",
    strength: "50",
    unit: "mg/ml",
    currentStock: 8,
    minimumStock: 25,
    maximumStock: 100,
    expiryDate: "2024-09-30",
    batchNumber: "VIT2024012",
    supplier: "Animal Health Solutions",
    unitCost: 15.75,
    sellingPrice: 24.00,
    location: "Refrigerator C-2",
    requiresPrescription: false,
    controlledSubstance: false,
    storageRequirements: "Refrigerate 2-8°C"
  },
  {
    id: "PI004",
    name: "Dexamethasone",
    genericName: "Dexamethasone Sodium Phosphate",
    brandName: "Azium",
    category: "anti_inflammatory",
    dosageForm: "injection",
    strength: "2",
    unit: "mg/ml",
    currentStock: 30,
    minimumStock: 20,
    maximumStock: 80,
    expiryDate: "2025-03-15",
    batchNumber: "DEX2024008",
    supplier: "Zoetis",
    unitCost: 22.50,
    sellingPrice: 35.00,
    location: "Shelf A-5",
    requiresPrescription: true,
    controlledSubstance: false,
    storageRequirements: "Room temperature, protect from light"
  }
];

export const usePharmacyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [inventoryItems] = useState<InventoryItem[]>(mockInventoryItems);

  const filteredItems = filterItems(inventoryItems, searchTerm, categoryFilter, stockFilter);

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    inventoryItems,
    filteredItems
  };
};
