
import { useState } from "react";
import { useStallionContext } from "@/contexts/StallionContext";

export const useStallionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { stallions } = useStallionContext();

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
