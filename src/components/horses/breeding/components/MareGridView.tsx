
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
}

const MareGridView = ({ mares }: MareGridViewProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (mareId: string) => {
    navigate(`/dashboard/horses/breeding/mares/${mareId}`);
  };

  const handleEditMare = (mareId: string) => {
    console.log('Edit mare:', mareId);
    // TODO: Implement edit functionality
  };

  const handleScheduleCheckup = (mareId: string) => {
    console.log('Schedule checkup for mare:', mareId);
    // TODO: Implement checkup scheduling
  };

  const handleViewMedicalRecords = (mareId: string) => {
    console.log('View medical records for mare:', mareId);
    // TODO: Implement medical records view
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
