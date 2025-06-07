
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Baby, Heart, Activity } from "lucide-react";

interface MarePregnancyTableProps {
  mareId: string;
}

const MarePregnancyTable = ({ mareId }: MarePregnancyTableProps) => {
  // Mock pregnancy data
  const pregnancyData = {
    status: "Pregnant",
    pregnancyDay: 280,
    expectedDueDate: "2024-04-15",
    stallionName: "Thunder Storm",
    breedingDate: "2023-07-20",
    lastCheckup: "2024-03-01",
    nextCheckup: "2024-04-01",
    veterinarian: "Dr. Sarah Ahmed",
    complications: "None",
    notes: "Pregnancy progressing normally, mare is healthy and active."
  };

  const calculateProgress = () => {
    return Math.round((pregnancyData.pregnancyDay / 340) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Pregnancy Status</h2>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Checkup
        </Button>
      </div>

      {/* Pregnancy Progress Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Baby className="h-5 w-5" />
            Current Pregnancy Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Day {pregnancyData.pregnancyDay} of 340</span>
              <Badge className="bg-blue-500 text-white">
                {pregnancyData.status}
              </Badge>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Expected Due Date:</span>
                <p className="font-semibold">{new Date(pregnancyData.expectedDueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Days Remaining:</span>
                <p className="font-semibold">{340 - pregnancyData.pregnancyDay} days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pregnancy Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
              <Heart className="h-5 w-5" />
              Breeding Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-600">Stallion:</span>
                <span className="text-slate-800 font-semibold">{pregnancyData.stallionName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-600">Breeding Date:</span>
                <span className="text-slate-800 font-semibold">{new Date(pregnancyData.breedingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-slate-600">Veterinarian:</span>
                <span className="text-slate-800 font-semibold">{pregnancyData.veterinarian}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
              <Activity className="h-5 w-5" />
              Health Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-600">Last Checkup:</span>
                <span className="text-slate-800 font-semibold">{new Date(pregnancyData.lastCheckup).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-600">Next Checkup:</span>
                <span className="text-slate-800 font-semibold">{new Date(pregnancyData.nextCheckup).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-slate-600">Complications:</span>
                <Badge className="bg-green-500 text-white">{pregnancyData.complications}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes Section */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-700">Pregnancy Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">{pregnancyData.notes}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarePregnancyTable;
