
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  TestTube, 
  Clock,
  Plus,
  Filter
} from "lucide-react";

interface CollectedSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const CollectedSemenTab = ({ stallionId, onActionClick }: CollectedSemenTabProps) => {
  // Mock data for collected semen
  const semenCollections = [
    {
      id: "CS001",
      collectionDate: "2024-01-15",
      volume: "50ml",
      concentration: "150M/ml",
      motility: "85%",
      quality: "Excellent",
      technician: "Dr. Smith",
      status: "Fresh"
    },
    {
      id: "CS002", 
      collectionDate: "2024-01-12",
      volume: "45ml",
      concentration: "140M/ml",
      motility: "82%",
      quality: "Good",
      technician: "Dr. Johnson",
      status: "Used"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fresh': return 'default';
      case 'Used': return 'secondary';
      case 'Frozen': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Collected Semen</h3>
          <p className="text-muted-foreground">Fresh semen collections and quality data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("collect-semen", "Collect New Semen")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {semenCollections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{collection.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{collection.collectionDate}</span>
                    <span>•</span>
                    <span>{collection.technician}</span>
                  </div>
                </div>
                <Badge variant={getStatusColor(collection.status)}>
                  {collection.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{collection.volume}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Concentration</p>
                  <p className="font-medium">{collection.concentration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Motility</p>
                  <p className="font-medium">{collection.motility}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className="font-medium">{collection.quality}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollectedSemenTab;
