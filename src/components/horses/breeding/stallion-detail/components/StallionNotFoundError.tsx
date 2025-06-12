
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

interface StallionNotFoundErrorProps {
  stallionId: string;
  availableStallions: Array<{ id: string; horseName: string }>;
  onBackToStallions: () => void;
}

const StallionNotFoundError = ({ 
  stallionId, 
  availableStallions, 
  onBackToStallions 
}: StallionNotFoundErrorProps) => {
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBackToStallions}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Stallions
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Stallion Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The stallion with ID "{stallionId}" could not be found.
          </p>
          
          {availableStallions.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Available Stallions:</p>
              <div className="grid gap-2">
                {availableStallions.map(stallion => (
                  <div key={stallion.id} className="p-2 border rounded text-sm">
                    <span className="font-medium">{stallion.horseName}</span>
                    <span className="text-muted-foreground ml-2">(ID: {stallion.id})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No stallions are currently available in the system.
            </p>
          )}
          
          <Button onClick={onBackToStallions}>
            Return to Stallion List
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StallionNotFoundError;
