
import { useState } from "react";
import { BreedingRecord } from "@/types/breeding";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, Edit, Eye, Heart, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreedingRecordsListProps {
  records: BreedingRecord[];
  onEditRecord?: (record: BreedingRecord) => void;
  onViewDetails?: (record: BreedingRecord) => void;
  onDeleteRecord?: (record: BreedingRecord) => void;
}

const BreedingRecordsList = ({ 
  records,
  onEditRecord = () => {},
  onViewDetails = () => {},
  onDeleteRecord = () => {},
}: BreedingRecordsListProps) => {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No records found</h3>
          <p className="text-muted-foreground">
            No breeding records match your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "planned":
        return "outline";
      case "cancelled":
        return "destructive";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{record.horseName}</h3>
                  <Badge variant={getStatusColor(record.status) as any}>
                    {record.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <span className="capitalize">{record.type} Record</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {record.breedingDate ? formatDate(record.breedingDate) : 
                     record.pregnancyStartDate ? formatDate(record.pregnancyStartDate) : 
                     record.birthDate ? formatDate(record.birthDate) : "No date"}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {record.type === "breeding" && (
                    <>
                      {record.mateName && (
                        <span>Mare: <span className="font-medium">{record.mateName}</span></span>
                      )}
                      {record.stallionName && (
                        <span>Stallion: <span className="font-medium">{record.stallionName}</span></span>
                      )}
                      {record.breedingMethod && (
                        <span>Method: <span className="font-medium capitalize">{record.breedingMethod.replace("_", " ")}</span></span>
                      )}
                    </>
                  )}
                  
                  {record.type === "pregnancy" && (
                    <>
                      {record.expectedDueDate && (
                        <span>Due: <span className="font-medium">{formatDate(record.expectedDueDate)}</span></span>
                      )}
                      {record.pregnancyDuration && (
                        <span>Days: <span className="font-medium">{record.pregnancyDuration}</span></span>
                      )}
                      {record.stallionName && (
                        <span>Sire: <span className="font-medium">{record.stallionName}</span></span>
                      )}
                    </>
                  )}
                  
                  {record.type === "birth" && (
                    <>
                      {record.foalName && (
                        <span>Foal: <span className="font-medium">{record.foalName}</span></span>
                      )}
                      {record.foalGender && (
                        <span>Gender: <span className="font-medium capitalize">{record.foalGender}</span></span>
                      )}
                      {record.mateName && (
                        <span>Dam: <span className="font-medium">{record.mateName}</span></span>
                      )}
                      {record.stallionName && (
                        <span>Sire: <span className="font-medium">{record.stallionName}</span></span>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0" 
                  onClick={() => onViewDetails(record)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0" 
                  onClick={() => onEditRecord(record)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(record)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditRecord(record)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onDeleteRecord(record)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BreedingRecordsList;
