import { FrozenEmbryo } from "@/types/breeding/stallion-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FrozenEmbryoDetailsProps {
  record: FrozenEmbryo;
  onEdit?: () => void;
}

const FrozenEmbryoDetails = ({ record, onEdit }: FrozenEmbryoDetailsProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Frozen Embryo Details</h2>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit Record
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="font-medium">{record.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant="outline">{record.status}</Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Collection Date</p>
          <p className="font-medium">{record.collectionDate}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Mare</p>
            <p className="font-medium">{record.mareName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mare Owner</p>
            <p className="font-medium">{record.mareOwner}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Storage Location</p>
            <p className="font-medium">{record.storageLocation}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quality Grade</p>
            <Badge variant={record.qualityGrade === 'A' ? 'default' : 'secondary'}>
              {record.qualityGrade}
            </Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Notes</p>
          <p className="font-medium">{record.notes || 'No notes available'}</p>
        </div>
      </div>
    </div>
  );
};

export default FrozenEmbryoDetails; 