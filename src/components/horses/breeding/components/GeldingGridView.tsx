
import GeldingCard from "./GeldingCard";
import { GridSize } from "./GridSizeSelector";
import { Horse } from "@/types/horse-unified";

interface GeldingGridViewProps {
  geldings: Horse[];
  gridSize: GridSize;
  onEditGelding: (geldingId: string) => void;
  onScheduleCheckup: (geldingId: string) => void;
  onViewMedicalRecords: (geldingId: string) => void;
}

const GeldingGridView = ({
  geldings,
  gridSize,
  onEditGelding,
  onScheduleCheckup,
  onViewMedicalRecords,
}: GeldingGridViewProps) => {
  const getGridCols = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (geldings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No geldings found</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${getGridCols()}`}>
      {geldings.map((gelding) => (
        <GeldingCard
          key={gelding.id}
          gelding={gelding}
          onEdit={() => onEditGelding(gelding.id)}
          onScheduleCheckup={() => onScheduleCheckup(gelding.id)}
          onViewMedicalRecords={() => onViewMedicalRecords(gelding.id)}
        />
      ))}
    </div>
  );
};

export default GeldingGridView;
