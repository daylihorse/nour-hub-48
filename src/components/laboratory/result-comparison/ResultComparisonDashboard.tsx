
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, TrendingUp, FileText, BarChart3, Activity } from "lucide-react";

interface ResultComparisonDashboardProps {
  onHistoricalAnalysis: () => void;
  onTrendAnalysis: () => void;
  onExportOptions: () => void;
}

const ResultComparisonDashboard: React.FC<ResultComparisonDashboardProps> = ({
  onHistoricalAnalysis,
  onTrendAnalysis,
  onExportOptions
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Result Comparison</h2>
        <p className="text-muted-foreground">
          Compare historical test results and analyze trends for comprehensive health insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onHistoricalAnalysis}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <History className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Historical Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Compare test results across different time periods to identify patterns and changes
            </p>
            <Button className="w-full">
              Start Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onTrendAnalysis}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Visualize health trends and parameter changes over time with detailed charts
            </p>
            <Button className="w-full">
              View Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onExportOptions}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Generate comprehensive reports and export data in various formats
            </p>
            <Button className="w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Comparisons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Thunder - Blood Chemistry</p>
                  <p className="text-sm text-muted-foreground">3 months comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Bella - Complete Blood Count</p>
                  <p className="text-sm text-muted-foreground">6 months comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Shadow - Urinalysis</p>
                  <p className="text-sm text-muted-foreground">1 year comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Horses Analyzed</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comparisons This Month</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trends Identified</span>
                <span className="font-semibold">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reports Generated</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultComparisonDashboard;
