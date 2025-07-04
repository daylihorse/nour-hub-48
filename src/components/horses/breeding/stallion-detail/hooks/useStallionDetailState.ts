
import { useState } from "react";

interface ActionDialog {
  isOpen: boolean;
  type: string;
  title: string;
  data?: any;
}

export const useStallionDetailState = () => {
  const [activeTab, setActiveTab] = useState("breeding");
  const [actionDialog, setActionDialog] = useState<ActionDialog>({
    isOpen: false,
    type: "",
    title: ""
  });

  const openActionDialog = (type: string, title: string, data?: any) => {
    setActionDialog({
      isOpen: true,
      type,
      title,
      data
    });
  };

  const closeActionDialog = () => {
    setActionDialog({
      isOpen: false,
      type: "",
      title: "",
      data: undefined
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
