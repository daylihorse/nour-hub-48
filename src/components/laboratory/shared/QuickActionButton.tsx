
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline";
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = "outline" 
}) => (
  <Button 
    variant={variant} 
    className="h-20 flex flex-col gap-2" 
    onClick={onClick}
  >
    <Icon className="h-6 w-6" />
    <span>{label}</span>
  </Button>
);

export default QuickActionButton;
