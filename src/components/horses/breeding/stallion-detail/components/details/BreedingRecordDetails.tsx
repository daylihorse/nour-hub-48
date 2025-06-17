import { BreedingRecord } from "@/types/breeding/stallion-detail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BreedingRecordDetailsProps {
  record: BreedingRecord;
  onEdit?: () => void;
}

const BreedingRecordDetails = ({ record, onEdit }: BreedingRecordDetailsProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Breeding Record Details</h2>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit Record
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Record ID</p>
            <p className="font-medium">{record.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant="outline">{record.status}</Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Breeding Date</p>
          <p className="font-medium">{record.date}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Mare Name</p>
            <p className="font-medium">{record.mareName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mare Owner</p>
            <p className="font-medium">{record.mareOwner}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Method</p>
            <p className="font-medium">{record.method}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Result</p>
            <Badge variant={record.result === 'Positive' ? 'default' : 'secondary'}>
              {record.result}
            </Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Veterinarian</p>
          <p className="font-medium">{record.veterinarian}</p>
        </div>
      </div>
    </div>
  );
};

export default BreedingRecordDetails; 