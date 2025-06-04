
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertTriangle, CheckCircle } from "lucide-react";

interface TemplateLoadingSectionProps {
  hasValues: boolean;
  parameterCount: number;
  onLoadTemplate: () => void;
}

export const TemplateLoadingSection = ({ 
  hasValues, 
  parameterCount, 
  onLoadTemplate 
}: TemplateLoadingSectionProps) => {
  if (hasValues) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Template parameters loaded successfully. Enter values for each parameter.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          No parameters loaded yet. Click below to load the template parameters.
        </AlertDescription>
      </Alert>
      <div className="text-center py-4">
        <Button onClick={onLoadTemplate} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Load Template Parameters ({parameterCount} parameters)
        </Button>
      </div>
    </>
  );
};
