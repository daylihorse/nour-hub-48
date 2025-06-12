
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  TestTube, 
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCollectedSemenManagement } from "../../hooks/useCollectedSemenManagement";
import CollectedSemenForm from "../../forms/CollectedSemenForm";
import StallionDetailFilters from "../filters/StallionDetailFilters";
import ExportButtons from "@/components/inventory/ExportButtons";

interface CollectedSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const CollectedSemenTab = ({ stallionId, onActionClick }: CollectedSemenTabProps) => {
  const [showForm, setShowForm] = useState(false);
  
  const {
    collectedSemen,
    filters,
    setFilters,
    isLoading,
    addCollectedSemen,
    exportData
  } = useCollectedSemenManagement(stallionId);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    await addCollectedSemen(data);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fresh': return 'default';
      case 'Used': return 'secondary';
      case 'Frozen': return 'outline';
      case 'Discarded': return 'destructive';
      default: return 'secondary';
    }
  };

  const filterOptions = {
    status: ['Fresh', 'Used', 'Frozen', 'Discarded'],
    quality: ['Excellent', 'Good', 'Fair', 'Poor'],
    technician: ['Dr. Smith', 'Dr. Johnson', 'Dr. Wilson']
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Collected Semen</h3>
          <p className="text-muted-foreground">Fresh semen collections and quality data</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>

      <StallionDetailFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
      />

      <div className="grid gap-4">
        {collectedSemen.map((collection) => (
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
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(collection.status)}>
                    {collection.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
              {collection.notes && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="text-sm">{collection.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {collectedSemen.length} records
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('excel')}>
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('pdf')}>
            Export PDF
          </Button>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Semen Collection</DialogTitle>
          </DialogHeader>
          <CollectedSemenForm
            stallionId={stallionId}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollectedSemenTab;
