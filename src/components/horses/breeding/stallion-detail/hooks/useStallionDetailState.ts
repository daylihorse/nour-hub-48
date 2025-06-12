
import { useState } from "react";

interface ActionDialog {
  isOpen: boolean;
  type: string;
  title: string;
}

export const useStallionDetailState = () => {
  const [activeTab, setActiveTab] = useState("collected-semen");
  const [actionDialog, setActionDialog] = useState<ActionDialog>({
    isOpen: false,
    type: "",
    title: ""
  });

  const openActionDialog = (type: string, title: string) => {
    setActionDialog({
      isOpen: true,
      type,
      title
    });
  };

  const closeActionDialog = () => {
    setActionDialog({
      isOpen: false,
      type: "",
      title: ""
    });
  };

  return {
    activeTab,
    setActiveTab,
    actionDialog,
    openActionDialog,
    closeActionDialog
  };
};
