
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

// Mock data
const storeServices = [
  {
    id: "1",
    name: "Wound Stitching Service",
    category: "Veterinary Services",
    price: 150.00,
    available: true,
    isListedInMarketplace: true,
    image: "🏥",
  },
];

const StoreServiceList = () => {
  const handleToggleMarketplace = (id: string, listed: boolean) => {
    console.log(`Toggle marketplace listing for service ${id}: ${listed}`);
  };

  return (
    <div className="space-y-4">
      {storeServices.map((service) => (
        <Card key={service.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{service.image}</div>
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{service.category}</Badge>
                    <span>{service.available ? "Available" : "Unavailable"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold">${service.price}</div>
                  <div className="flex items-center gap-2 text-sm">
                    {service.isListedInMarketplace ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={service.isListedInMarketplace ? "text-green-600" : "text-gray-400"}>
                      {service.isListedInMarketplace ? "Listed" : "Unlisted"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.isListedInMarketplace}
                    onCheckedChange={(checked) => handleToggleMarketplace(service.id, checked)}
                  />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {storeServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No services added yet. Click "Add Service" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default StoreServiceList;
