
import { useNavigate } from "react-router-dom";
import MareCard from "./MareCard";

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

interface MareGridProps {
  mares: Mare[];
}

const MareGrid = ({ mares }: MareGridProps) => {
  const navigate = useNavigate();

  const handleMareClick = (mareId: string) => {
    navigate(`/dashboard/horses/breeding/mares/${mareId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mares.map((mare) => (
        <div key={mare.id} onClick={() => handleMareClick(mare.id)} className="cursor-pointer">
          <MareCard mare={mare} />
        </div>
      ))}
    </div>
  );
};

export default MareGrid;
