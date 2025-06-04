
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SampleDetailsCardProps {
  horseName: string;
  horsePhoto?: string;
  sampleId: string;
  clientName: string;
  clientPhone: string;
}

const SampleDetailsCard = ({ horseName, horsePhoto, sampleId, clientName, clientPhone }: SampleDetailsCardProps) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="pt-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={horsePhoto} alt={horseName} />
            <AvatarFallback>{horseName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold">{horseName}</h3>
            <p className="text-sm text-muted-foreground">Sample ID: {sampleId}</p>
            <p className="text-sm text-muted-foreground">Client: {clientName}</p>
            <p className="text-sm text-muted-foreground">Phone: {clientPhone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleDetailsCard;
