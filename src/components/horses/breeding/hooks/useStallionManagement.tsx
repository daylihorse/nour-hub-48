
import { useState } from "react";

export const useStallionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock stallion data
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
      nextAvailable: "2024-01-08",
      bookings: 3,
    },
    {
      id: "2",
      horseId: "H002",
      horseName: "Lightning",
      status: "active",
      age: 6,
      breed: "Thoroughbred",
      totalMares: 28,
      successfulBreedings: 24,
      livefoals: 22,
      successRate: 91.7,
      studFee: 3500,
      nextAvailable: "2024-01-12",
      bookings: 2,
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
      bookings: 0,
    },
  ];

  const filteredStallions = stallions.filter(stallion =>
    stallion.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stallion.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    stallions,
    filteredStallions,
  };
};
