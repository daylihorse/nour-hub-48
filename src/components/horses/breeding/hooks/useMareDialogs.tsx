
import { useState } from "react";
import { Mare } from "@/types/breeding/mare";

export const useMareDialogs = () => {
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    mare: Mare | null;
  }>({
    isOpen: false,
    mare: null,
  });

  const [addMareDialog, setAddMareDialog] = useState(false);
  
  const [vetCheckupDialog, setVetCheckupDialog] = useState<{
    open: boolean;
    pregnancyId: string | null;
  }>({ open: false, pregnancyId: null });
  
  const [medicalRecordsDialog, setMedicalRecordsDialog] = useState<{
    open: boolean;
    mareId: string | null;
    mareName?: string;
  }>({ open: false, mareId: null, mareName: undefined });

  const handleCloseEditDialog = () => {
    setEditDialog({
      isOpen: false,
      mare: null,
    });
  };

  return {
    editDialog,
    setEditDialog,
    addMareDialog,
    setAddMareDialog,
    vetCheckupDialog,
    setVetCheckupDialog,
    medicalRecordsDialog,
    setMedicalRecordsDialog,
    handleCloseEditDialog,
  };
};
