
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, CheckCircle, Clock, Eye, Edit2, Trash2 } from "lucide-react";
import { BreedingRecord } from "@/types/breeding/stallion-detail";

interface BreedingRecordListViewProps {
  records: BreedingRecord[];
  onViewDetails: (record: BreedingRecord) => void;
  onEditRecord: (record: BreedingRecord) => void;
  onDeleteRecord: (record: BreedingRecord) => void;
}

const BreedingRecordListView = ({ 
  records, 
  onViewDetails, 
  onEditRecord, 
  onDeleteRecord 
}: BreedingRecordListViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'Monitoring': return 'outline';
      default: return 'secondary';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Confirmed Pregnant': return 'text-green-600';
      case 'Live Foal': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'Confirmed Pregnant': return <Heart className="h-4 w-4 text-pink-500" />;
      case 'Live Foal': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {records.map((record) => (
            <div key={record.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{record.id}</h4>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mare</p>
                      <p className="font-medium">{record.mareName}</p>
                      <p className="text-muted-foreground">{record.mareOwner}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Method & Date</p>
                      <p className="font-medium">{record.method}</p>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{record.date}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Result</p>
                      <div className="flex items-center gap-2">
                        {getResultIcon(record.result)}
                        <p className={`font-medium ${getResultColor(record.result)}`}>
                          {record.result}
                        </p>
                      </div>
                      <p className="text-muted-foreground">Dr. {record.veterinarian}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(record)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEditRecord(record)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteRecord(record)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingRecordListView;
