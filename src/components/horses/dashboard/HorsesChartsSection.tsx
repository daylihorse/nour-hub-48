
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid2X2, LayoutList } from "lucide-react";
import HorsesHealthChart from "./charts/HorsesHealthChart";
import HorsesAgeChart from "./charts/HorsesAgeChart";
import HorsesBreedChart from "./charts/HorsesBreedChart";

const HorsesChartsSection = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const charts = [
    { id: 'health', component: <HorsesHealthChart />, title: 'Health Distribution' },
    { id: 'age', component: <HorsesAgeChart />, title: 'Age Distribution' },
    { id: 'breed', component: <HorsesBreedChart />, title: 'Breed Distribution' }
  ];

  return (
    <div className="space-y-4">
      {/* View Selection Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Analytics Overview</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-2"
              >
                <Grid2X2 className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <LayoutList className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Charts Display */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
        : "space-y-6"
      }>
        {charts.map((chart) => (
          <div key={chart.id}>
            {chart.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorsesChartsSection;
