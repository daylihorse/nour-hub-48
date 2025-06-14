
import { useNavigate } from "react-router-dom";
import MareDetailCard from "./MareDetailCard";
import { Mare } from "@/types/breeding/mare";
import { GridSize } from "./GridSizeSelector";

interface MareGridViewProps {
  mares: Mare[];
  onEditMare?: (mareId: string) => void;
  onScheduleCheckup?: (mareId: string) => void;
  onViewMedicalRecords?: (mareId: string) => void;
  gridSize?: GridSize;
}

const MareGridView = ({ 
  mares, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords,
  gridSize = 3
}: MareGridViewProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (mareId: string) => {
    navigate(`/dashboard/horses/breeding/mares/${mareId}`);
  };

  const handleEditMare = (mareId: string) => {
    if (onEditMare) {
      onEditMare(mareId);
    } else {
      console.log('Edit mare:', mareId);
    }
  };

  const handleScheduleCheckup = (mareId: string) => {
    if (onScheduleCheckup) {
      onScheduleCheckup(mareId);
    } else {
      console.log('Schedule checkup for mare:', mareId);
    }
  };

  const handleViewMedicalRecords = (mareId: string) => {
    if (onViewMedicalRecords) {
      onViewMedicalRecords(mareId);
    } else {
      console.log('View medical records for mare:', mareId);
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

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {mares.map((mare) => (
        <MareDetailCard
          key={mare.id}
          mare={mare}
          onViewDetails={handleViewDetails}
          onEditMare={handleEditMare}
          onScheduleCheckup={handleScheduleCheckup}
          onViewMedicalRecords={handleViewMedicalRecords}
        />
      ))}
    </div>
  );
};

export default MareGridView;
