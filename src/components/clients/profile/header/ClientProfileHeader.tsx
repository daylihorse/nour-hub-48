
import { User, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/types/client";
import ClientChatButton from "@/components/chat/ClientChatButton";

interface ClientProfileHeaderProps {
  client: Client;
  onEditClient: () => void;
}

const ClientProfileHeader = ({ client, onEditClient }: ClientProfileHeaderProps) => {
  const isHorseOwner = client.type === "Horse Owner";

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${isHorseOwner ? 'bg-purple-500' : 'bg-blue-500'}`}>
              <User className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">{client.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge className={`${
                  client.type === "Horse Owner" 
                    ? "bg-purple-100 text-purple-800 border-purple-200" 
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}>
                  {client.type}
                </Badge>
                <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                  {client.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <ClientChatButton client={client} />
            <Button size="sm" variant="outline" onClick={onEditClient}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ClientProfileHeader;
