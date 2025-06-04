
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, Calendar, Download } from "lucide-react";

interface HistoricalComparisonTableProps {
  horse: string;
  analysisType: string;
}

const HistoricalComparisonTable = ({ horse, analysisType }: HistoricalComparisonTableProps) => {
  // Mock historical data
  const historicalData = [
    {
      date: "2024-06-03",
      parameters: {
        "White Blood Cells": { value: "6.5", unit: "x10³/μL", status: "normal", reference: "5.0-10.0" },
        "Red Blood Cells": { value: "8.2", unit: "x10⁶/μL", status: "normal", reference: "6.5-12.0" },
        "Hemoglobin": { value: "14.5", unit: "g/dL", status: "normal", reference: "11.0-18.0" },
        "Hematocrit": { value: "42", unit: "%", status: "normal", reference: "32-48" }
      }
    },
    {
      date: "2024-05-15",
      parameters: {
        "White Blood Cells": { value: "6.2", unit: "x10³/μL", status: "normal", reference: "5.0-10.0" },
        "Red Blood Cells": { value: "8.0", unit: "x10⁶/μL", status: "normal", reference: "6.5-12.0" },
        "Hemoglobin": { value: "14.2", unit: "g/dL", status: "normal", reference: "11.0-18.0" },
        "Hematocrit": { value: "41", unit: "%", status: "normal", reference: "32-48" }
      }
    },
    {
      date: "2024-04-02",
      parameters: {
        "White Blood Cells": { value: "5.8", unit: "x10³/μL", status: "normal", reference: "5.0-10.0" },
        "Red Blood Cells": { value: "7.8", unit: "x10⁶/μL", status: "normal", reference: "6.5-12.0" },
        "Hemoglobin": { value: "13.8", unit: "g/dL", status: "normal", reference: "11.0-18.0" },
        "Hematocrit": { value: "40", unit: "%", status: "normal", reference: "32-48" }
      }
    },
    {
      date: "2024-02-18",
      parameters: {
        "White Blood Cells": { value: "5.5", unit: "x10³/μL", status: "normal", reference: "5.0-10.0" },
        "Red Blood Cells": { value: "7.5", unit: "x10⁶/μL", status: "normal", reference: "6.5-12.0" },
        "Hemoglobin": { value: "13.5", unit: "g/dL", status: "normal", reference: "11.0-18.0" },
        "Hematocrit": { value: "39", unit: "%", status: "normal", reference: "32-48" }
      }
    }
  ];

  const parameters = Object.keys(historicalData[0].parameters);

  const getTrendIcon = (current: string, previous: string) => {
    const currentNum = parseFloat(current);
    const previousNum = parseFloat(previous);
    
    if (isNaN(currentNum) || isNaN(previousNum)) return <Minus className="h-3 w-3 text-gray-400" />;
    
    if (currentNum > previousNum) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (currentNum < previousNum) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      normal: "secondary",
      high: "destructive", 
      low: "destructive"
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap] as any}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Historical Comparison Table</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Parameter</TableHead>
                  <TableHead className="font-semibold">Reference Range</TableHead>
                  {historicalData.map((data, index) => (
                    <TableHead key={index} className="text-center font-semibold">
                      {data.date}
                      {index === 0 && <Badge variant="outline" className="ml-2">Latest</Badge>}
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parameters.map((parameter) => (
                  <TableRow key={parameter}>
                    <TableCell className="font-medium">{parameter}</TableCell>
                    <TableCell>{historicalData[0].parameters[parameter].reference}</TableCell>
                    {historicalData.map((data, index) => {
                      const paramData = data.parameters[parameter];
                      return (
                        <TableCell key={index} className="text-center">
                          <div className="space-y-1">
                            <div className="font-medium">
                              {paramData.value} {paramData.unit}
                            </div>
                            {getStatusBadge(paramData.status)}
                          </div>
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center">
                      {historicalData.length > 1 && getTrendIcon(
                        historicalData[0].parameters[parameter].value,
                        historicalData[1].parameters[parameter].value
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Tests Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">6 months</div>
              <div className="text-sm text-muted-foreground">Time Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-muted-foreground">Trending Up</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Abnormal Values</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalComparisonTable;
