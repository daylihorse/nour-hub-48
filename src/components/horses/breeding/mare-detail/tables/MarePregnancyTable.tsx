
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, Baby, Activity, Eye, Download } from "lucide-react";

interface MarePregnancyTableProps {
  mareId: string;
}

const MarePregnancyTable = ({ mareId }: MarePregnancyTableProps) => {
  // Mock current pregnancy data
  const currentPregnancy = {
    id: "PREG001",
    stallion: "Thunder Storm",
    breedingDate: "2023-07-20",
    expectedDueDate: "2024-04-15",
    currentDay: 280,
    totalDays: 340,
    status: "Active",
    veterinarian: "Dr. Sarah Ahmed",
    lastCheckup: "2024-01-15",
    nextCheckup: "2024-02-15"
  };

  // Mock ultrasound records
  const ultrasounds = [
    {
      id: "US001",
      date: "2024-01-15",
      day: 265,
      findings: "Healthy fetal development, normal heartbeat",
      veterinarian: "Dr. Sarah Ahmed",
      images: 3,
      notes: "All parameters within normal range"
    },
    {
      id: "US002",
      date: "2023-12-01",
      day: 220,
      findings: "Fetal movement detected, good positioning",
      veterinarian: "Dr. Sarah Ahmed",
      images: 2,
      notes: "Mare showing excellent condition"
    },
    {
      id: "US003",
      date: "2023-10-15",
      day: 173,
      findings: "Pregnancy confirmed, fetal heartbeat strong",
      veterinarian: "Dr. Sarah Ahmed",
      images: 4,
      notes: "Initial confirmation ultrasound"
    }
  ];

  // Mock vet checkup records
  const checkups = [
    {
      id: "VC001",
      date: "2024-01-15",
      type: "Routine",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Mare in excellent condition, pregnancy progressing well",
      recommendations: "Continue current nutrition plan, monitor for signs of foaling",
      nextDate: "2024-02-15"
    },
    {
      id: "VC002",
      date: "2023-12-01",
      type: "Ultrasound",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Fetal development on track, mare healthy",
      recommendations: "Increase feed portions, maintain exercise routine",
      nextDate: "2024-01-15"
    }
  ];

  const pregnancyProgress = (currentPregnancy.currentDay / currentPregnancy.totalDays) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Current Pregnancy</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Checkup
          </Button>
        </div>
      </div>

      {/* Current Pregnancy Overview */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Baby className="h-5 w-5" />
            Pregnancy Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Progress</span>
                  <span className="text-sm font-bold text-slate-800">Day {currentPregnancy.currentDay}/{currentPregnancy.totalDays}</span>
                </div>
                <Progress value={pregnancyProgress} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Breeding Date</p>
                  <p className="font-semibold">{new Date(currentPregnancy.breedingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{new Date(currentPregnancy.expectedDueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Stallion</p>
                <p className="font-semibold">{currentPregnancy.stallion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Veterinarian</p>
                <p className="font-semibold">{currentPregnancy.veterinarian}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-green-500 text-white">
                  {currentPregnancy.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Last Checkup</p>
                <p className="font-semibold">{new Date(currentPregnancy.lastCheckup).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Checkup</p>
                <p className="font-semibold">{new Date(currentPregnancy.nextCheckup).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="font-semibold text-blue-600">{currentPregnancy.totalDays - currentPregnancy.currentDay} days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ultrasound Records */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Activity className="h-5 w-5" />
            Ultrasound Records ({ultrasounds.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Pregnancy Day</TableHead>
                  <TableHead className="font-semibold text-slate-700">Findings</TableHead>
                  <TableHead className="font-semibold text-slate-700">Veterinarian</TableHead>
                  <TableHead className="font-semibold text-slate-700">Images</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ultrasounds.map((ultrasound) => (
                  <TableRow key={ultrasound.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      {new Date(ultrasound.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        Day {ultrasound.day}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{ultrasound.findings}</TableCell>
                    <TableCell>{ultrasound.veterinarian}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{ultrasound.images} images</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Images
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Veterinary Checkups */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Calendar className="h-5 w-5" />
            Veterinary Checkups ({checkups.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Veterinarian</TableHead>
                  <TableHead className="font-semibold text-slate-700">Findings</TableHead>
                  <TableHead className="font-semibold text-slate-700">Next Checkup</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkups.map((checkup) => (
                  <TableRow key={checkup.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      {new Date(checkup.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {checkup.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{checkup.veterinarian}</TableCell>
                    <TableCell className="max-w-xs truncate">{checkup.findings}</TableCell>
                    <TableCell>
                      {checkup.nextDate && new Date(checkup.nextDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarePregnancyTable;
