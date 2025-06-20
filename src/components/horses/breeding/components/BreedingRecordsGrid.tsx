
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Baby, Calendar, AlertCircle } from "lucide-react";
import { BreedingRecord } from "@/types/breeding/records";
import BreedingRecordCard from "../BreedingRecordCard";
import { GridSize } from "./GridSizeSelector";

interface BreedingRecordsGridProps {
  records: BreedingRecord[];
  gridSize?: GridSize;
  onViewDetails?: (record: BreedingRecord) => void;
  onEditRecord?: (record: BreedingRecord) => void;
  onDeleteRecord?: (record: BreedingRecord) => void;
}

const BreedingRecordsGrid = ({ 
  records, 
  gridSize = 3,
  onViewDetails = () => {},
  onEditRecord = () => {},
  onDeleteRecord = () => {},
}: BreedingRecordsGridProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "planned":
        return "outline";
      case "cancelled":
        return "destructive";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "breeding":
        return <Heart className="h-4 w-4" />;
      case "pregnancy":
        return <Baby className="h-4 w-4" />;
      case "birth":
        return <Calendar className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Determine grid columns based on grid size
  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No records found</h3>
          <p className="text-muted-foreground">
            No breeding records match your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {records.map((record) => (
        <BreedingRecordCard 
          key={record.id} 
          record={record}
          statusColor={getStatusColor(record.status)}
          typeIcon={getTypeIcon(record.type)}
          onViewDetails={() => onViewDetails(record)}
          onEditRecord={() => onEditRecord(record)}
          onDeleteRecord={() => onDeleteRecord(record)}
        />
      ))}
    </div>
  );
};

export default BreedingRecordsGrid;
