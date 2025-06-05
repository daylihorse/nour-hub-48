
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mares.map((mare) => (
        <MareCard key={mare.id} mare={mare} />
      ))}
    </div>
  );
};

export default MareGrid;
