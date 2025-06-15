
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/types/client";

interface ClientContactInfoProps {
  client: Client;
}

const ClientContactInfo = ({ client }: ClientContactInfoProps) => {
  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Phone className="h-4 w-4 mr-2 text-blue-500" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <Phone className="h-3 w-3 mr-2 text-gray-500" />
            <span className="text-sm">{client.phone}</span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <Mail className="h-3 w-3 mr-2 text-gray-500" />
            <span className="text-sm">{client.email}</span>
          </div>
        </div>
        {client.address && (
          <div className="flex items-start p-2 rounded-lg bg-gray-50">
            <MapPin className="h-3 w-3 mr-2 text-gray-500 mt-0.5" />
            <span className="text-sm">{client.address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientContactInfo;
