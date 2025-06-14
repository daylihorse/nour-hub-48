
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface PrescriptionSalesWorkflowProps {
  onAddToCart: (item: any, type: 'product' | 'service') => void;
  onStateChange: (updates: any) => void;
  posState: any;
}

const PrescriptionSalesWorkflow = ({ onAddToCart, onStateChange, posState }: PrescriptionSalesWorkflowProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Prescription Sales Workflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Prescription workflow coming soon. This will include prescription validation,
            medication dispensing, and regulatory compliance features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionSalesWorkflow;
