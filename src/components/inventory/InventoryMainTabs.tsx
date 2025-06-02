
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryTabs from "./InventoryTabs";
import InventoryDashboard from "./InventoryDashboard";
import ExportButtons from "./ExportButtons";
import { InventoryItemType } from "@/hooks/useInventoryState";

interface InventoryMainTabsProps {
  items: InventoryItemType[];
  onToggleItemStatus: (id: string) => void;
  onAddToStock: (id: string) => void;
  onWithdrawFromStock: (id: string) => void;
}

const InventoryMainTabs = ({
  items,
  onToggleItemStatus,
  onAddToStock,
  onWithdrawFromStock,
}: InventoryMainTabsProps) => {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryDashboard items={items} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="items">
        <InventoryTabs
          items={items}
          onToggleItemStatus={onToggleItemStatus}
          onAddToStock={onAddToStock}
          onWithdrawFromStock={onWithdrawFromStock}
        />
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

      <TabsContent value="export">
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ExportButtons />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InventoryMainTabs;
