
import { Card, CardContent } from "@/components/ui/card";

interface BreedingRecordsStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    planned: number;
  };
}

const BreedingRecordsStats = ({ stats }: BreedingRecordsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-sm text-muted-foreground">Total Records</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          <p className="text-sm text-muted-foreground">Active</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <p className="text-sm text-muted-foreground">Completed</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.planned}</div>
          <p className="text-sm text-muted-foreground">Planned</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingRecordsStats;
