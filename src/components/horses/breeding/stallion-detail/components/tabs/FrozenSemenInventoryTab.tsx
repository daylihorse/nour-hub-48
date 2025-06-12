
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Snowflake, 
  Calendar,
  Package,
  Plus,
  Filter
} from "lucide-react";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  // Mock data for frozen semen inventory
  const frozenInventory = [
    {
      id: "FS001",
      freezeDate: "2024-01-10",
      straws: 25,
      tank: "Tank A-3",
      quality: "Grade A",
      viability: "92%",
      location: "Section 2B",
      expiry: "2029-01-10"
    },
    {
      id: "FS002",
      freezeDate: "2024-01-05", 
      straws: 18,
      tank: "Tank B-1",
      quality: "Grade A",
      viability: "89%",
      location: "Section 1A",
      expiry: "2029-01-05"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Semen Inventory</h3>
          <p className="text-muted-foreground">Cryopreserved semen storage and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("freeze-semen", "Freeze New Semen")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Inventory
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {frozenInventory.map((item) => (
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
                <Badge variant="outline">
                  {item.quality}
                </Badge>
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
    </div>
  );
};

export default FrozenSemenInventoryTab;
