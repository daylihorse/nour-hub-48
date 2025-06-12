
import { useNavigate } from "react-router-dom";

export const useMareDetailNavigation = () => {
  const navigate = useNavigate();

  const handleBackToMares = () => {
    navigate("/dashboard/horses", { 
      state: { 
        activeTab: "breeding",
        breedingSubTab: "mares"
      } 
    });
  };

  return { handleBackToMares };
};
