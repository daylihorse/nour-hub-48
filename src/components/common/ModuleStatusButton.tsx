
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ModuleStatusButtonProps {
  activeCount: number;
  totalCount: number;
  onClick?: () => void;
}

const ModuleStatusButton: React.FC<ModuleStatusButtonProps> = ({ 
  activeCount, 
  totalCount, 
  onClick 
}) => {
  return (
    <Button variant="outline" className="flex items-center gap-2 shadow-brown" onClick={onClick}>
      <Settings className="h-4 w-4" />
      {activeCount}/{totalCount} Active Modules
    </Button>
  );
};

export default ModuleStatusButton;
