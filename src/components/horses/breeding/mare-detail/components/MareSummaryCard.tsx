
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MareSummaryCardProps {
  mare: {
    name: string;
    breed: string;
    age: number;
    image: string;
    totalFoals: number;
    liveFoals: number;
    pregnancyDay: number;
  };
}

const MareSummaryCard = ({ mare }: MareSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Mare Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={mare.image} 
              alt={mare.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <p className="font-semibold text-slate-700">{mare.breed}</p>
              <p className="text-sm text-muted-foreground">Age: {mare.age} years</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{mare.totalFoals}</div>
            <p className="text-sm text-muted-foreground">Total Foals</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{mare.liveFoals}</div>
            <p className="text-sm text-muted-foreground">Live Foals</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{mare.pregnancyDay}</div>
            <p className="text-sm text-muted-foreground">Pregnancy Day</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareSummaryCard;
