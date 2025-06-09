
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  actions: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    disabled?: boolean;
  }>;
  className?: string;
}

const ActionButtons = ({ actions, className }: ActionButtonsProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || "default"}
          size={action.size || "default"}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
