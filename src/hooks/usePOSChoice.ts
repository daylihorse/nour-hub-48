
import { useState } from "react";

export const usePOSChoice = (departmentName: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openPOSChoice = () => {
    setIsDialogOpen(true);
  };

  const closePOSChoice = () => {
    setIsDialogOpen(false);
  };

  const handleUseHere = (callback: () => void) => {
    callback();
    closePOSChoice();
  };

  const handleOpenSeparate = (posPath: string) => {
    // Map department names to standalone POS URLs
    const posRoutes: { [key: string]: string } = {
      "Riding Academy": "/pos/academy",
      "Pharmacy": "/pos/pharmacy", 
      "Marketplace": "/pos/marketplace"
    };
    
    const route = posRoutes[departmentName] || posPath;
    window.open(route, '_blank');
    closePOSChoice();
  };

  return {
    isDialogOpen,
    openPOSChoice,
    closePOSChoice,
    handleUseHere,
    handleOpenSeparate,
  };
};
