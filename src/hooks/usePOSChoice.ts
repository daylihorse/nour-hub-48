
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
    window.open(posPath, '_blank');
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
