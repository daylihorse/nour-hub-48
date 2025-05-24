import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Filter, Plus, Trash2, Edit, Box, Wrench } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryItemForm from "@/components/inventory/InventoryItemForm";
import InventoryServiceForm from "@/components/inventory/service-form/InventoryServiceForm";
import { toast } from "@/hooks/use-toast";

// Sample data for demonstration
const inventoryItems = [
  {
    id: "1",
    name: "Chia Seeds",
    enabled: true,
    expiryDate: "2024-01-14",
    currentStock: 12,
    purchaseDate: "2023-08-28",
    type: "Feed Materials",
    supplier: "Al-Russaifi Stores for Herbal Products",
    image: "🌱"
  },
  {
    id: "2",
    name: "Orniboral",
    enabled: true,
    expiryDate: "2024-05-26",
    currentStock: 4,
    purchaseDate: "2023-10-15",
    type: "Medical Supplies",
    supplier: "Arabian Horse Pharmacy",
    image: "💊"
  }
];

type InventoryItemType = {
  id: string;
  name: string;
  enabled: boolean;
  expiryDate: string;
  currentStock: number;
  purchaseDate: string;
  type: string;
  supplier: string;
  image?: string;
};

const InventoryManagement = () => {
  const [showItemForm, setShowItemForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [items, setItems] = useState<InventoryItemType[]>(inventoryItems);
  const [formType, setFormType] = useState<"item" | "service">("item");
  
  const handleAddItem = () => {
    setFormType("item");
    setShowItemForm(true);
    setShowServiceForm(false);
  };

  const handleAddService = () => {
    setFormType("service");
    setShowServiceForm(true);
    setShowItemForm(false);
  };

  const handleToggleItemStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
    toast({
      title: "Status Updated",
      description: "Item status has been updated successfully",
    });
  };

  const handleAddToStock = (id: string) => {
    // This would open a modal to add to stock in real implementation
    toast({
      title: "Add to Stock",
      description: "Opening add to stock form",
    });
  };

  const handleWithdrawFromStock = (id: string) => {
    // This would open a modal to withdraw from stock in real implementation
    toast({
      title: "Withdraw from Stock",
      description: "Opening withdraw from stock form",
    });
  };

  const handleCancelForm = () => {
    setShowItemForm(false);
    setShowServiceForm(false);
  };

  const handleSaveItem = (data: any) => {
    // In a real implementation, you would save the item to the database
    console.log("Saving item:", data);
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully",
    });
    setShowItemForm(false);
  };

  const handleSaveService = (data: any) => {
    // In a real implementation, you would save the service to the database
    console.log("Saving service:", data);
    toast({
      title: "Service Added",
      description: "New service has been added successfully",
    });
    setShowServiceForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage items, supplies, and services</p>
        </div>
        
        {!showItemForm && !showServiceForm && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2" />
                Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleAddItem}>
                <Box className="mr-2" />
                Add Item
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddService}>
                <Wrench className="mr-2" />
                Add Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {showItemForm && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Add Item</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <InventoryItemForm onSave={handleSaveItem} onCancel={handleCancelForm} />
          </CardContent>
        </Card>
      )}

      {showServiceForm && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Add Service</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <InventoryServiceForm onSave={handleSaveService} onCancel={handleCancelForm} />
          </CardContent>
        </Card>
      )}
      
      {!showItemForm && !showServiceForm && (
        <Tabs defaultValue="items">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{item.image}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.supplier}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={item.enabled} 
                            onCheckedChange={() => handleToggleItemStatus(item.id)}
                          />
                          <span className="text-sm">{item.enabled ? 'Enabled' : 'Disabled'}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-4">
                        <div>
                          <p className="text-muted-foreground">Expiry Date</p>
                          <p>{item.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Current Stock</p>
                          <p>{item.currentStock}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purchase Date</p>
                          <p>{item.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p>{item.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-amber-500 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          onClick={() => handleWithdrawFromStock(item.id)}
                        >
                          Withdraw from Stock
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1 border-green-500 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleAddToStock(item.id)}
                        >
                          Add to Stock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Current Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No services available.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {!showItemForm && !showServiceForm && (
        <div className="flex justify-between mt-4">
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              EXCEL
            </Button>
            <Button variant="outline" size="sm">
              CSV
            </Button>
            <Button variant="outline" size="sm">
              PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
