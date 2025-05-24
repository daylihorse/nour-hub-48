
import { Button } from "@/components/ui/button";

const ExportButtons = () => {
  return (
    <div className="flex justify-between mt-4">
      <div className="space-x-2">
        <Button variant="outline" size="sm">
          EXCEL
        </Button>
        <Button variant="outline" size="sm">
          CSV
        </Button>
        <Button variant="outline" size="sm">
          PDF
        </Button>
      </div>
    </div>
  );
};

export default ExportButtons;
