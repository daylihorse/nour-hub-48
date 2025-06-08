
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Baby, Calendar, Activity } from "lucide-react";

interface MareHeaderProps {
  mare: {
    name: string;
    id?: string;
    status: string;
  };
  onBackToMares: () => void;
}

const MareHeader = ({ mare, onBackToMares }: MareHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pregnant": return "bg-blue-500";
      case "open": return "bg-green-500";
      case "nursing": return "bg-purple-500";
      case "bred": return "bg-orange-500";
      case "retired": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pregnant": return <Baby className="h-4 w-4" />;
      case "nursing": return <Heart className="h-4 w-4" />;
      case "open": return <Calendar className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToMares}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mares
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{mare.name}</h1>
          <p className="text-muted-foreground">Mare ID: {mare.id}</p>
        </div>
      </div>
      <Badge className={`${getStatusColor(mare.status)} text-white flex items-center gap-1`}>
        {getStatusIcon(mare.status)}
        {mare.status.toUpperCase()}
      </Badge>
    </div>
  );
};

export default MareHeader;
