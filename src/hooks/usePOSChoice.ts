
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

  const handleOpenSeparate = () => {
    // Generate the correct POS URL based on department
    let posUrl = '';
    switch (departmentName.toLowerCase()) {
      case 'marketplace':
        posUrl = '/pos/marketplace';
        break;
      case 'riding academy':
        posUrl = '/pos/academy';
        break;
      case 'inventory':
        posUrl = '/pos/inventory';
        break;
      case 'clinic':
        posUrl = '/pos/clinic';
        break;
      case 'laboratory':
        posUrl = '/pos/laboratory';
        break;
      case 'pharmacy':
        posUrl = '/pos/pharmacy';
        break;
      default:
        posUrl = `/pos/${departmentName.toLowerCase()}`;
    }
    
    window.open(posUrl, '_blank');
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
