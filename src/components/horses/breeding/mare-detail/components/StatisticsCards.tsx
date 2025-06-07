
import { Card, CardContent } from "@/components/ui/card";

interface StatisticCardData {
  value: string | number;
  label: string;
  color: string;
}

interface StatisticsCardsProps {
  statistics: StatisticCardData[];
}

const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statistics.map((stat, index) => (
        <Card key={index} className={`border-${stat.color}-200 bg-${stat.color}-50`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
            <p className={`text-sm text-${stat.color}-700`}>{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
