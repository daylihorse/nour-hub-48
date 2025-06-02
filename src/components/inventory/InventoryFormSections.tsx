
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryItemForm from "./InventoryItemForm";
import InventoryServiceForm from "./service-form/InventoryServiceForm";

interface InventoryFormSectionsProps {
  showItemForm: boolean;
  showServiceForm: boolean;
  onSaveItem: (data: any) => void;
  onSaveService: (data: any) => void;
  onCancel: () => void;
}

const InventoryFormSections = ({
  showItemForm,
  showServiceForm,
  onSaveItem,
  onSaveService,
  onCancel,
}: InventoryFormSectionsProps) => {
  if (showItemForm) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Add Item</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <InventoryItemForm onSave={onSaveItem} onCancel={onCancel} />
        </CardContent>
      </Card>
    );
  }

  if (showServiceForm) {
    return (
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Add Service</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <InventoryServiceForm onSave={onSaveService} onCancel={onCancel} />
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default InventoryFormSections;
