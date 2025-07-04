
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface GeldingHeaderProps {
  viewSelector: React.ReactNode;
  onAddGelding: () => void;
}

const GeldingHeader = ({ viewSelector, onAddGelding }: GeldingHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gelding Management</h2>
        <p className="text-gray-600">Manage your geldings, training, and performance records</p>
      </div>
      
      <div className="flex items-center gap-3">
        {viewSelector}
        <Button onClick={onAddGelding} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Gelding
        </Button>
      </div>
    </div>
  );
};

export default GeldingHeader;
