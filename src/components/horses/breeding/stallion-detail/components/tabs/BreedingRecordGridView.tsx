
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, CheckCircle, Clock, Eye, Edit2, Trash2 } from "lucide-react";
import { BreedingRecord } from "@/types/breeding/stallion-detail";

interface BreedingRecordGridViewProps {
  records: BreedingRecord[];
  onViewDetails: (record: BreedingRecord) => void;
  onEditRecord: (record: BreedingRecord) => void;
  onDeleteRecord: (record: BreedingRecord) => void;
}

const BreedingRecordGridView = ({ 
  records, 
  onViewDetails, 
  onEditRecord, 
  onDeleteRecord 
}: BreedingRecordGridViewProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{record.id}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{record.date}</span>
                </div>
              </div>
              <Badge variant={getStatusColor(record.status)}>
                {record.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Mare</p>
                <p className="font-medium">{record.mareName}</p>
                <p className="text-sm text-muted-foreground">{record.mareOwner}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Method</p>
                <p className="font-medium">{record.method}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {getResultIcon(record.result)}
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className={`font-medium ${getResultColor(record.result)}`}>
                    {record.result}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-muted-foreground">
                  Dr. {record.veterinarian}
                </span>
                <div className="flex gap-1">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BreedingRecordGridView;
