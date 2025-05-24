
import { Button } from "@/components/ui/button";

interface SalesInvoiceFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const SalesInvoiceForm = ({ onSave, onCancel }: SalesInvoiceFormProps) => {
  return (
    <div className="space-y-4">
      <p>Sales invoice form will be implemented here with customer selection, service/product selection, and pricing.</p>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Invoice</Button>
      </div>
    </div>
  );
};

export default SalesInvoiceForm;
