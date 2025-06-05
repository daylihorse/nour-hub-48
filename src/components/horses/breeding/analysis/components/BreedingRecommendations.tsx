
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const BreedingRecommendations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Breeding Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Recommended Actions</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">PROCEED</span>
                <span className="text-sm">Excellent genetic compatibility - proceed with breeding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">MONITOR</span>
                <span className="text-sm">Monitor respiratory development in offspring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">CONSIDER</span>
                <span className="text-sm">Consider additional nutritional support during pregnancy</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Optimal Breeding Timeline</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Best breeding season:</span>
                <span className="font-medium">Early Spring</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mare age consideration:</span>
                <span className="font-medium">Optimal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stallion availability:</span>
                <span className="font-medium">High demand period</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected foaling:</span>
                <span className="font-medium">Winter (ideal)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingRecommendations;
