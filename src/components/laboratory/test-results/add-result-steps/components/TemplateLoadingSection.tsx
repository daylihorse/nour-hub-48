
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";

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
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center gap-3">
        {hasValues ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <Download className="h-5 w-5 text-blue-600" />
        )}
        <div>
          <p className="font-medium">
            {hasValues ? "Template Parameters Loaded" : "Load Template Parameters"}
          </p>
          <p className="text-sm text-muted-foreground">
            {hasValues 
              ? `${parameterCount} parameters available for data entry`
              : `Click to load ${parameterCount} parameters from selected templates`
            }
          </p>
        </div>
      </div>
      
      {!hasValues && (
        <Button onClick={onLoadTemplate} className="ml-4">
          <Download className="h-4 w-4 mr-2" />
          Load Parameters
        </Button>
      )}
      
      {hasValues && (
        <Button variant="outline" onClick={onLoadTemplate} className="ml-4">
          Reload Parameters
        </Button>
      )}
    </div>
  );
};
