
import { useNavigate } from "react-router-dom";

export const useStallionDetailNavigation = () => {
  const navigate = useNavigate();

  const handleBackToStallions = () => {
    navigate("/dashboard/horses", { 
      state: { 
        activeTab: "breeding",
        breedingSubTab: "stallions"
      } 
    });
  };

  return { handleBackToStallions };
};
