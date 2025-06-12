
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Snowflake, 
  Calendar,
  Package,
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
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";
import FrozenSemenForm from "../../forms/FrozenSemenForm";
import StallionDetailFilters from "../filters/StallionDetailFilters";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  const [showForm, setShowForm] = useState(false);
  
  const {
    frozenSemen,
    filters,
    setFilters,
    isLoading,
    addFrozenSemen,
    exportData
  } = useFrozenSemenManagement(stallionId);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    await addFrozenSemen(data);
    setShowForm(false);
  };

  const filterOptions = {
    quality: ['Grade A', 'Grade B', 'Grade C']
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Semen Inventory</h3>
          <p className="text-muted-foreground">Cryopreserved semen storage and management</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add to Inventory
        </Button>
      </div>

      <StallionDetailFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
      />

      <div className="grid gap-4">
        {frozenSemen.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Snowflake className="h-4 w-4 text-blue-500" />
                    {item.id}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Frozen: {item.freezeDate}</span>
                    <span>•</span>
                    <span>Expires: {item.expiry}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {item.quality}
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
                  <Package className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Straws</p>
                    <p className="font-medium">{item.straws}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tank</p>
                  <p className="font-medium">{item.tank}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Viability</p>
                  <p className="font-medium">{item.viability}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{item.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {frozenSemen.length} records • {frozenSemen.reduce((sum, item) => sum + item.straws, 0)} total straws
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
            <DialogTitle>Add Frozen Semen to Inventory</DialogTitle>
          </DialogHeader>
          <FrozenSemenForm
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

export default FrozenSemenInventoryTab;
