
import HorsesHealthChart from "./charts/HorsesHealthChart";
import HorsesAgeChart from "./charts/HorsesAgeChart";
import HorsesBreedChart from "./charts/HorsesBreedChart";

const HorsesChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <HorsesHealthChart />
      <HorsesAgeChart />
      <HorsesBreedChart />
    </div>
  );
};

export default HorsesChartsSection;
