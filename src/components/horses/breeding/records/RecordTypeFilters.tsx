
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecordType } from "@/types/breeding/unified-records";
import { getRecordTypeLabel, getRecordTypeIcon } from "./utils/recordUtils";
import { useRecords } from "./RecordsProvider";

interface RecordTypeFiltersProps {
  selectedTypes: RecordType[];
  onTypeToggle: (type: RecordType) => void;
  showCounts?: boolean;
}

const RecordTypeFilters = ({ 
  selectedTypes, 
  onTypeToggle, 
  showCounts = true 
}: RecordTypeFiltersProps) => {
  const { stats } = useRecords();
  
  const recordTypes: RecordType[] = [
    'veterinary_checkup',
    'ultrasound',
    'medication', 
    'appointment',
    'breeding',
    'pregnancy',
    'foaling',
    'health_assessment',
    'heat_cycle'
  ];

  const handleSelectAll = () => {
    if (selectedTypes.length === recordTypes.length) {
      // Deselect all
      selectedTypes.forEach(type => onTypeToggle(type));
    } else {
      // Select all missing types
      recordTypes.forEach(type => {
        if (!selectedTypes.includes(type)) {
          onTypeToggle(type);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Record Types</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSelectAll}
          className="text-xs"
        >
          {selectedTypes.length === recordTypes.length ? 'Deselect All' : 'Select All'}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {recordTypes.map((type) => {
          const IconComponent = getRecordTypeIcon(type);
          const count = stats.byType[type];
          const isSelected = selectedTypes.includes(type);
          
          if (!showCounts && count === 0) return null;
          
          return (
            <Badge
              key={type}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => onTypeToggle(type)}
            >
              <IconComponent className="h-3 w-3 mr-1" />
              {getRecordTypeLabel(type)}
              {showCounts && count > 0 && (
                <span className="ml-1 text-xs opacity-70">({count})</span>
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default RecordTypeFilters;
