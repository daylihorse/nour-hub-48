
import { useNavigate } from "react-router-dom";
import StallionCard from "./StallionCard";

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
}

const StallionGrid = ({ stallions }: StallionGridProps) => {
  const navigate = useNavigate();

  const handleStallionClick = (stallionId: string) => {
    navigate(`/dashboard/horses/breeding/stallions/${stallionId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {stallions.map((stallion) => (
        <div key={stallion.id} onClick={() => handleStallionClick(stallion.id)} className="cursor-pointer">
          <StallionCard stallion={stallion} />
        </div>
      ))}
    </div>
  );
};

export default StallionGrid;
