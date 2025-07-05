
import { useState } from "react";
import { Horse } from "@/types/horse-unified";

export const useGeldingDialogs = () => {
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    gelding: Horse | null;
  }>({
    isOpen: false,
    gelding: null,
  });

  const [addGeldingDialog, setAddGeldingDialog] = useState(false);
  
  const [vetCheckupDialog, setVetCheckupDialog] = useState<{
    open: boolean;
    horseId: string | null;
  }>({ open: false, horseId: null });
  
  const [medicalRecordsDialog, setMedicalRecordsDialog] = useState<{
    open: boolean;
    horseId: string | null;
    horseName?: string;
  }>({ open: false, horseId: null, horseName: undefined });

  const handleCloseEditDialog = () => {
    setEditDialog({
      isOpen: false,
      gelding: null,
    });
  };

  return {
    editDialog,
    setEditDialog,
    addGeldingDialog,
    setAddGeldingDialog,
    vetCheckupDialog,
    setVetCheckupDialog,
    medicalRecordsDialog,
    setMedicalRecordsDialog,
    handleCloseEditDialog,
  };
};
