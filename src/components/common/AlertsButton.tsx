
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface AlertsButtonProps {
  totalAlerts: number;
  onClick?: () => void;
}

const AlertsButton: React.FC<AlertsButtonProps> = ({ totalAlerts, onClick }) => {
  if (totalAlerts === 0) return null;

  return (
    <Button variant="destructive" className="flex items-center gap-2 shadow-brown" onClick={onClick}>
      <AlertTriangle className="h-4 w-4" />
      {totalAlerts} Active Alerts
    </Button>
  );
};

export default AlertsButton;
