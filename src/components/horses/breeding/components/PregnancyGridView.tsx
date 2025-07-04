
import { useNavigate } from "react-router-dom";
import PregnancyCard from "../PregnancyCard";
import { PregnancyRecord } from "@/types/breeding";
import { GridSize } from "./GridSizeSelector";

interface PregnancyGridViewProps {
  pregnancies: PregnancyRecord[];
  onScheduleUltrasound?: (pregnancyId: string) => void;
  onScheduleCheckup?: (pregnancyId: string) => void;
  onEditPregnancy?: (pregnancyId: string) => void;
  gridSize?: GridSize;
}

const PregnancyGridView = ({ 
  pregnancies, 
  onScheduleUltrasound, 
  onScheduleCheckup, 
  onEditPregnancy,
  gridSize = "medium"
}: PregnancyGridViewProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (pregnancyId: string) => {
    navigate(`/dashboard/horses/breeding/pregnancies/${pregnancyId}`);
  };

  const handleScheduleUltrasound = (pregnancyId: string) => {
    if (onScheduleUltrasound) {
      onScheduleUltrasound(pregnancyId);
    } else {
      console.log('Schedule ultrasound for pregnancy:', pregnancyId);
    }
  };

  const handleScheduleCheckup = (pregnancyId: string) => {
    if (onScheduleCheckup) {
      onScheduleCheckup(pregnancyId);
    } else {
      console.log('Schedule checkup for pregnancy:', pregnancyId);
    }
  };

  const handleEditPregnancy = (pregnancyId: string) => {
    if (onEditPregnancy) {
      onEditPregnancy(pregnancyId);
    } else {
      console.log('Edit pregnancy:', pregnancyId);
    }
  };

  // Determine grid columns based on grid size
  const getGridColumns = () => {
    switch (gridSize) {
      case "large":
        return "grid-cols-1 md:grid-cols-2";
      case "medium":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "small":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "monitoring":
        return "secondary";
      case "delivered":
        return "outline";
      case "lost":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {pregnancies.map((pregnancy) => (
        <PregnancyCard 
          key={pregnancy.id} 
          pregnancy={pregnancy}
          statusColor={getStatusColor(pregnancy.status)}
          onScheduleUltrasound={handleScheduleUltrasound}
          onScheduleCheckup={handleScheduleCheckup}
        />
      ))}
    </div>
  );
};

export default PregnancyGridView;
