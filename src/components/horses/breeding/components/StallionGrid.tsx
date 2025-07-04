
import { useNavigate } from "react-router-dom";
import StallionCard from "./StallionCard";
import { GridSize } from "./GridSizeSelector";

interface Stallion {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  studFee: number;
  nextAvailable: string;
  bookings: number;
}

interface StallionGridProps {
  stallions: Stallion[];
  gridSize?: GridSize;
}

const StallionGrid = ({ stallions, gridSize = "medium" }: StallionGridProps) => {
  const navigate = useNavigate();

  const handleStallionClick = (stallionId: string) => {
    navigate(`/dashboard/horses/breeding/stallions/${stallionId}`);
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

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {stallions.map((stallion) => (
        <div key={stallion.id} onClick={() => handleStallionClick(stallion.id)} className="cursor-pointer">
          <StallionCard stallion={stallion} />
        </div>
      ))}
    </div>
  );
};

export default StallionGrid;
