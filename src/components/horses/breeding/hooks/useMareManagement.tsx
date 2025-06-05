
import { useState } from "react";

export const useMareManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock mare data
  const mares = [
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
  ];

  const filteredMares = mares.filter(mare =>
    mare.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mare.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    mares,
    filteredMares,
  };
};
