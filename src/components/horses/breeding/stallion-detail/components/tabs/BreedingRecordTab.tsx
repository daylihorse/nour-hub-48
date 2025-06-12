
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Heart,
  CheckCircle,
  Clock,
  Plus,
  Filter
} from "lucide-react";

interface BreedingRecordTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const BreedingRecordTab = ({ stallionId, onActionClick }: BreedingRecordTabProps) => {
  // Mock data for breeding records
  const breedingRecords = [
    {
      id: "BR001",
      date: "2024-01-20",
      mareName: "Golden Mare",
      mareOwner: "Smith Ranch",
      method: "AI Fresh",
      result: "Confirmed Pregnant",
      status: "Active",
      expectedFoaling: "2025-01-15",
      veterinarian: "Dr. Wilson"
    },
    {
      id: "BR002",
      date: "2024-01-15",
      mareName: "Silver Beauty",
      mareOwner: "Johnson Stables",
      method: "AI Frozen",
      result: "Pending",
      status: "Monitoring",
      expectedFoaling: "TBD",
      veterinarian: "Dr. Brown"
    },
    {
      id: "BR003",
      date: "2024-01-10",
      mareName: "Black Diamond",
      mareOwner: "Wilson Farm",
      method: "Natural Cover",
      result: "Live Foal",
      status: "Completed",
      expectedFoaling: "2024-12-05",
      veterinarian: "Dr. Davis"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'Monitoring': return 'outline';
      default: return 'secondary';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Confirmed Pregnant': return 'text-green-600';
      case 'Live Foal': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Breeding Records</h3>
          <p className="text-muted-foreground">Complete breeding history and outcomes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("new-breeding", "Record New Breeding")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {breedingRecords.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{record.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{record.date}</span>
                    <span>•</span>
                    <span>{record.veterinarian}</span>
                  </div>
                </div>
                <Badge variant={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mare</p>
                    <p className="font-medium">{record.mareName}</p>
                    <p className="text-sm text-muted-foreground">{record.mareOwner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Method</p>
                    <p className="font-medium">{record.method}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {record.result === 'Confirmed Pregnant' && <Heart className="h-4 w-4 text-pink-500" />}
                    {record.result === 'Live Foal' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {record.result === 'Pending' && <Clock className="h-4 w-4 text-orange-500" />}
                    <div>
                      <p className="text-sm text-muted-foreground">Result</p>
                      <p className={`font-medium ${getResultColor(record.result)}`}>
                        {record.result}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Foaling</p>
                    <p className="font-medium">{record.expectedFoaling}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BreedingRecordTab;
