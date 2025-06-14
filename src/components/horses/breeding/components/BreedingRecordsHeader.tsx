
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BreedingRecordsHeaderProps {
  onAddRecord: () => void;
  viewSelector?: ReactNode;
}

const BreedingRecordsHeader = ({ onAddRecord, viewSelector }: BreedingRecordsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Breeding Records</h2>
        <p className="text-muted-foreground">Track breeding activities, pregnancies, and births</p>
      </div>
      <div className="flex items-center gap-4">
        {viewSelector}
        <Button onClick={onAddRecord} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>
    </div>
  );
};

export default BreedingRecordsHeader;
