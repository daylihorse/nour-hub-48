
import { useNavigate } from "react-router-dom";
import MareDetailCard from "./MareDetailCard";

interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}

interface MareGridViewProps {
  mares: Mare[];
  onEditMare?: (mareId: string) => void;
  onScheduleCheckup?: (mareId: string) => void;
  onViewMedicalRecords?: (mareId: string) => void;
}

const MareGridView = ({ 
  mares, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords 
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
