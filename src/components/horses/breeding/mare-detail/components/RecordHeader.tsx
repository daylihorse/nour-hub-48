
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import ViewToggle from "./ViewToggle";

interface RecordHeaderProps {
  title: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onAddRecord: () => void;
  addButtonText: string;
  exportLabel?: string;
}

const RecordHeader = ({
  title,
  viewMode,
  onViewModeChange,
  onAddRecord,
  addButtonText,
  exportLabel = "Export"
}: RecordHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <div className="flex items-center gap-4">
        <ViewToggle currentView={viewMode} onViewChange={onViewModeChange} />
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {exportLabel}
          </Button>
          <Button 
            onClick={onAddRecord} 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {addButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordHeader;
