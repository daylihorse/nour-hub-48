
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Horse,
  Search,
  Sync,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Pill,
  Activity,
  FileText
} from "lucide-react";

const HorseRecordsIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [syncFilter, setSyncFilter] = useState("all");

  const horseMedicationRecords = [
    {
      id: "HR001",
      horseId: "H001",
      horseName: "Thunder",
      lastMedication: "Penicillin Injectable",
      lastMedicationDate: "2024-01-15",
      totalMedications: 12,
      activePrescriptions: 2,
      vaccinationStatus: "up_to_date",
      nextVaccination: "2024-04-15",
      syncStatus: "synced",
      lastSync: "2024-01-15 14:30",
      healthAlerts: ["Due for dental check"],
      medicationHistory: [
        { date: "2024-01-15", medication: "Penicillin Injectable", indication: "Respiratory infection" },
        { date: "2024-01-10", medication: "Banamine Paste", indication: "Pain management" },
        { date: "2023-12-20", medication: "Vitamin E & Selenium", indication: "Nutritional supplement" }
      ]
    },
    {
      id: "HR002",
      horseId: "H002",
      horseName: "Lightning",
      lastMedication: "Dexamethasone",
      lastMedicationDate: "2024-01-14",
      totalMedications: 8,
      activePrescriptions: 1,
      vaccinationStatus: "partial",
      nextVaccination: "2024-02-01",
      syncStatus: "pending",
      lastSync: "2024-01-13 09:15",
      healthAlerts: ["Vaccination overdue", "Follow-up exam needed"],
      medicationHistory: [
        { date: "2024-01-14", medication: "Dexamethasone", indication: "Joint inflammation" },
        { date: "2024-01-05", medication: "Bute Tablets", indication: "Anti-inflammatory" }
      ]
    },
    {
      id: "HR003",
      horseId: "H003",
      horseName: "Storm",
      lastMedication: "Vitamin E & Selenium",
      lastMedicationDate: "2024-01-13",
      totalMedications: 15,
      activePrescriptions: 0,
      vaccinationStatus: "up_to_date",
      nextVaccination: "2024-06-13",
      syncStatus: "error",
      lastSync: "2024-01-12 16:45",
      healthAlerts: [],
      medicationHistory: [
        { date: "2024-01-13", medication: "Vitamin E & Selenium", indication: "Preventive care" },
        { date: "2024-01-01", medication: "Ivermectin", indication: "Deworming" }
      ]
    }
  ];

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case "synced": return "bg-green-500";
      case "pending": return "bg-orange-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getVaccinationStatusColor = (status: string) => {
    switch (status) {
      case "up_to_date": return "text-green-600";
      case "partial": return "text-orange-600";
      case "overdue": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const filteredRecords = horseMedicationRecords.filter(record => {
    const matchesSearch = record.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.lastMedication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSync = syncFilter === 'all' || record.syncStatus === syncFilter;
    
    return matchesSearch && matchesSync;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Horse className="h-6 w-6 text-green-500" />
            Horse Records Integration
          </h2>
          <p className="text-muted-foreground">Sync medication records with horse profiles</p>
        </div>
        <Button>
          <Sync className="h-4 w-4 mr-2" />
          Sync All Records
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search horse records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={syncFilter} onValueChange={setSyncFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sync Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="synced">Synced</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Horse Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Horse className="h-5 w-5" />
                    {record.horseName}
                    <span className="text-sm text-muted-foreground">({record.horseId})</span>
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>Last medication: {record.lastMedication}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {record.lastMedicationDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getSyncStatusColor(record.syncStatus)} text-white mb-2`}>
                    {record.syncStatus}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Last sync: {record.lastSync}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{record.totalMedications}</div>
                    <p className="text-xs text-muted-foreground">Total Medications</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{record.activePrescriptions}</div>
                    <p className="text-xs text-muted-foreground">Active Prescriptions</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className={`text-lg font-bold ${getVaccinationStatusColor(record.vaccinationStatus)}`}>
                      {record.vaccinationStatus.replace('_', ' ')}
                    </div>
                    <p className="text-xs text-muted-foreground">Vaccination Status</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{record.nextVaccination}</div>
                    <p className="text-xs text-muted-foreground">Next Vaccination</p>
                  </div>
                </div>

                {/* Health Alerts */}
                {record.healthAlerts.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Health Alerts
                    </p>
                    <div className="space-y-1">
                      {record.healthAlerts.map((alert, index) => (
                        <Badge key={index} variant="outline" className="mr-2 text-orange-700 border-orange-300">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Medication History */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Recent Medication History
                  </p>
                  <div className="space-y-2">
                    {record.medicationHistory.slice(0, 3).map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center gap-2">
                          <Pill className="h-3 w-3" />
                          <span className="text-sm font-medium">{med.medication}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{med.indication}</p>
                          <p className="text-xs text-muted-foreground">{med.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    View Full History
                  </Button>
                  {record.syncStatus !== "synced" && (
                    <Button size="sm">
                      <Sync className="h-3 w-3 mr-1" />
                      Sync Now
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Horse className="h-3 w-3 mr-1" />
                    Open Horse Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Horse className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No horse records found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HorseRecordsIntegration;
