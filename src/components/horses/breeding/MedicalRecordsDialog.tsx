
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Stethoscope, Search, Filter, Plus, Download } from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'surgery' | 'emergency';
  veterinarian: string;
  findings: string;
  status: 'normal' | 'completed' | 'attention' | 'critical';
  medications?: string[];
  followUp?: string;
  cost?: number;
  attachments?: string[];
}

interface MedicalRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId: string | null;
  mareName?: string;
}

const MedicalRecordsDialog = ({ open, onOpenChange, mareId, mareName }: MedicalRecordsDialogProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Enhanced mock medical records data
  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'checkup',
      veterinarian: 'Dr. Sarah Wilson',
      findings: 'Healthy pregnancy progression at 180 days',
      status: 'normal',
      medications: ['Prenatal vitamins'],
      followUp: 'Next checkup in 4 weeks',
      cost: 150
    },
    {
      id: '2',
      date: '2023-12-01',
      type: 'vaccination',
      veterinarian: 'Dr. Michael Brown',
      findings: 'Annual vaccination schedule completed',
      status: 'completed',
      medications: ['Flu vaccine', 'Tetanus booster'],
      cost: 85
    },
    {
      id: '3',
      date: '2023-11-20',
      type: 'treatment',
      veterinarian: 'Dr. Emily Carter',
      findings: 'Minor lameness in left front leg',
      status: 'attention',
      medications: ['Anti-inflammatory', 'Rest prescribed'],
      followUp: 'Re-examine in 2 weeks',
      cost: 220
    },
    {
      id: '4',
      date: '2023-10-05',
      type: 'emergency',
      veterinarian: 'Dr. James Martinez',
      findings: 'Colic episode - resolved with treatment',
      status: 'completed',
      medications: ['Pain management', 'IV fluids'],
      cost: 450
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'attention': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checkup': return 'bg-blue-100 text-blue-800';
      case 'vaccination': return 'bg-green-100 text-green-800';
      case 'treatment': return 'bg-yellow-100 text-yellow-800';
      case 'surgery': return 'bg-purple-100 text-purple-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || record.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalCost = mockRecords.reduce((sum, record) => sum + (record.cost || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records - {mareName || 'Mare'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockRecords.length}</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">${totalCost}</p>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {mockRecords.filter(r => r.status === 'attention').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Need Attention</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {mockRecords[0]?.date ? new Date(mockRecords[0].date).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>

          {/* Tabs for record types */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="checkup">Checkups</TabsTrigger>
              <TabsTrigger value="vaccination">Vaccines</TabsTrigger>
              <TabsTrigger value="treatment">Treatments</TabsTrigger>
              <TabsTrigger value="surgery">Surgery</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            {record.findings}
                          </CardTitle>
                          <Badge className={getTypeColor(record.type)}>
                            {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                          <span>Dr. {record.veterinarian}</span>
                          {record.cost && <span>${record.cost}</span>}
                        </div>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {record.medications && record.medications.length > 0 && (
                        <div>
                          <span className="font-medium text-sm">Medications: </span>
                          <span className="text-sm">{record.medications.join(', ')}</span>
                        </div>
                      )}
                      {record.followUp && (
                        <div>
                          <span className="font-medium text-sm">Follow-up: </span>
                          <span className="text-sm">{record.followUp}</span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordsDialog;
