
import { useState } from "react";

export const useMareDetailState = () => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: 'checkup' | 'breeding' | 'health' | 'birth' | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    title: ''
  });

  const openActionDialog = (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => {
    setActionDialog({ isOpen: true, type, title });
  };

  const closeActionDialog = () => {
    setActionDialog({ isOpen: false, type: null, title: '' });
  };

  return {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    actionDialog,
    openActionDialog,
    closeActionDialog
  };
};
