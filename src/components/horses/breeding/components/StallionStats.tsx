
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Heart, Calendar } from "lucide-react";

const StallionStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Overall Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Heart className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">6</div>
            <p className="text-sm text-muted-foreground">Active Stallions</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Calendar className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">93</div>
            <p className="text-sm text-muted-foreground">Total Mares Served</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">92.1%</div>
            <p className="text-sm text-muted-foreground">Average Success Rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85</div>
            <p className="text-sm text-muted-foreground">Expected Foals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StallionStats;
