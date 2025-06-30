
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Phone, Mail } from "lucide-react";
import { Client } from "@/types/client";
import { getAllClients } from "@/data/clients";

interface ClientSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClient: (client: Client) => void;
  onSelectWalkIn: () => void;
}

const ClientSelectionDialog = ({
  isOpen,
  onClose,
  onSelectClient,
  onSelectWalkIn
}: ClientSelectionDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const clients = getAllClients();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.phone && client.phone.includes(searchTerm))
  );

  const handleSelectClient = (client: Client) => {
    onSelectClient(client);
    onClose();
  };

  const handleWalkIn = () => {
    onSelectWalkIn();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Walk-in Customer Option */}
          <Card className="border-dashed border-2 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={handleWalkIn}>
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium">Walk-in Customer</p>
              <p className="text-sm text-muted-foreground">No client account needed</p>
            </CardContent>
          </Card>

          {/* Client List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredClients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No clients found matching your search.
              </div>
            ) : (
              filteredClients.map((client) => (
                <Card key={client.id} 
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleSelectClient(client)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{client.name}</h3>
                          <Badge variant={client.statusDisplay === 'Active' ? 'default' : 'secondary'}>
                            {client.statusDisplay}
                          </Badge>
                          <Badge variant="outline">{client.type}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {client.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientSelectionDialog;
