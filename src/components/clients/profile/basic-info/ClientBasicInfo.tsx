
import { Card, CardContent } from "@/components/ui/card";
import { Client } from "@/types/client";
import ClientContactInfo from "./ClientContactInfo";
import ClientTimeline from "./ClientTimeline";

interface ClientBasicInfoProps {
  client: Client;
}

const ClientBasicInfo = ({ client }: ClientBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <ClientContactInfo client={client} />
      <ClientTimeline client={client} />
    </div>
  );
};

export default ClientBasicInfo;
