
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface ClientManagementPanelProps {
  selectedClient?: any;
  onClientSelect: (client: any) => void;
  onSendNotification: (clientId: string, prescriptionId: string) => void;
}

const ClientManagementPanel = ({ selectedClient, onClientSelect, onSendNotification }: ClientManagementPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Client Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Client management panel coming soon. This will include client lookup,
            prescription history, and notification management.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientManagementPanel;
