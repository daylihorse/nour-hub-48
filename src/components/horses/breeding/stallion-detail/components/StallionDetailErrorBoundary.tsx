
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface StallionDetailErrorBoundaryProps {
  error: string | null;
  stallionId?: string;
  availableStallions: Array<{ id: string; horseName: string }>;
  onBackToStallions: () => void;
  children: React.ReactNode;
}

const StallionDetailErrorBoundary = ({ 
  error, 
  stallionId, 
  availableStallions, 
  onBackToStallions, 
  children 
}: StallionDetailErrorBoundaryProps) => {
  if (error) {
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
        
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Stallion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Debug Information:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Requested Stallion ID: {stallionId || 'undefined'}</p>
                <p>Available Stallions: {availableStallions.length}</p>
                {availableStallions.length > 0 && (
                  <div className="ml-4">
                    {availableStallions.map(stallion => (
                      <p key={stallion.id}>- {stallion.horseName} (ID: {stallion.id})</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <Button onClick={onBackToStallions}>
              Return to Stallion List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default StallionDetailErrorBoundary;
