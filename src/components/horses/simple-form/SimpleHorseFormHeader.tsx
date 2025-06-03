
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleHorseFormHeaderProps {
  onCancel: () => void;
}

const SimpleHorseFormHeader = ({ onCancel }: SimpleHorseFormHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Add New Horse</CardTitle>
          <p className="text-muted-foreground">Register a new horse in the stable</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </CardHeader>
  );
};

export default SimpleHorseFormHeader;
