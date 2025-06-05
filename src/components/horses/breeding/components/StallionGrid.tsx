
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {stallions.map((stallion) => (
        <StallionCard key={stallion.id} stallion={stallion} />
      ))}
    </div>
  );
};

export default StallionGrid;
