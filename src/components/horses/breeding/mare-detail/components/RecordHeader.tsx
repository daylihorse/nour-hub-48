
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Grid, List, Table } from "lucide-react";

interface RecordHeaderProps {
  title: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onAddRecord: () => void;
  addButtonText: string;
  exportLabel: string;
}

const RecordHeader = ({ 
  title, 
  viewMode, 
  onViewModeChange, 
  onAddRecord, 
  addButtonText, 
  exportLabel 
}: RecordHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={(value: 'grid' | 'list' | 'table') => onViewModeChange(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">
                  <div className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Grid
                  </div>
                </SelectItem>
                <SelectItem value="list">
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    List
                  </div>
                </SelectItem>
                <SelectItem value="table">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    Table
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={onAddRecord}>
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {exportLabel}
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default RecordHeader;
