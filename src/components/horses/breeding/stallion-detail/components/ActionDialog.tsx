import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import CollectedSemenForm from "../forms/CollectedSemenForm";
import FrozenSemenForm from "../forms/FrozenSemenForm";
import FrozenEmbryoForm from "../forms/FrozenEmbryoForm";
import BreedingRecordForm from "../forms/BreedingRecordForm";
import { BreedingRecord, CollectedSemen, FrozenEmbryo } from "@/types/breeding/stallion-detail";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  title: string;
  stallionId?: string;
  initialData?: any;
}

const ActionDialog = ({ 
  isOpen, 
  onClose, 
  actionType, 
  title, 
  stallionId = "1",
  initialData
}: ActionDialogProps) => {
  const { toast } = useToast();
  const [existingRecord, setExistingRecord] = useState<any | null>(null);
  
  useEffect(() => {
    // Extract record data from initialData if available
    if ((actionType === 'edit-breeding' || 
         actionType === 'view-breeding' || 
         actionType === 'view-frozen-embryo' || 
         actionType === 'view-collected-semen') && 
        initialData?.record) {
      setExistingRecord(initialData.record);
    } else if (actionType === 'edit-breeding') {
      // Fallback to title extraction if no initialData is provided
      const recordIdMatch = title.match(/Edit Breeding Record\s+(\w+)/);
      const recordId = recordIdMatch ? recordIdMatch[1] : null;
      
      if (recordId) {
        // In a real app, this would fetch the record from API
        // For demo, create a mock record based on the ID
        setExistingRecord({
          id: recordId,
          date: new Date().toISOString().split('T')[0],
          mareName: "Sample Mare",
          mareOwner: "Sample Owner",
          method: "AI Fresh",
          result: "Pending",
          status: "Active",
          veterinarian: "Dr. Wilson",
          stallionId
        });
      }
    } else {
      setExistingRecord(null);
    }
  }, [actionType, title, stallionId, initialData]);

  const handleSubmit = async (data: any) => {
    try {
      console.log(`Submitting ${actionType}:`, data);
      // In a real app, this would call the appropriate API
      
      toast({
        title: "Success",
        description: actionType.includes('edit') 
          ? "Record updated successfully" 
          : "Record created successfully",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the record",
        variant: "destructive",
      });
    }
  };

  const handleEditFromView = (record: any) => {
    // Switch from view to edit mode
    let editType = '';
    let editTitle = '';
    
    if (actionType === 'view-breeding') {
      editType = 'edit-breeding';
      editTitle = `Edit Breeding Record ${record.id}`;
    } else if (actionType === 'view-frozen-embryo') {
      editType = 'edit-frozen-embryo';
      editTitle = `Edit Frozen Embryo ${record.id}`;
    } else if (actionType === 'view-collected-semen') {
      editType = 'edit-collected-semen';
      editTitle = `Edit Collected Semen ${record.id}`;
    }
    
    // Close the current dialog and open a new one in edit mode
    onClose();
    
    // In a real app, you would dispatch an action or use a state manager
    // For demo, we'll just simulate this with a timeout
    setTimeout(() => {
      const customEvent = new CustomEvent('edit-record', { 
        detail: { record, title: editTitle, type: editType } 
      });
      document.dispatchEvent(customEvent);
    }, 100);
  };

  const renderFormContent = () => {
    switch (actionType) {
      case 'collect-semen':
        return (
          <CollectedSemenForm
            stallionId={stallionId}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'freeze-semen':
        return (
          <FrozenSemenForm
            stallionId={stallionId}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'freeze-embryo':
        return (
          <FrozenEmbryoForm
            stallionId={stallionId}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'view-breeding':
        return existingRecord ? (
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Breeding Record Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditFromView(existingRecord)}
              >
                Edit Record
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Record ID</p>
                  <p className="font-medium">{existingRecord.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline">{existingRecord.status}</Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Breeding Date</p>
                <p className="font-medium">{existingRecord.date}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mare Name</p>
                  <p className="font-medium">{existingRecord.mareName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mare Owner</p>
                  <p className="font-medium">{existingRecord.mareOwner}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-medium">{existingRecord.method}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <Badge variant={existingRecord.result === 'Positive' ? 'default' : 'secondary'}>
                    {existingRecord.result}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Veterinarian</p>
                <p className="font-medium">{existingRecord.veterinarian}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Record details not available.</p>
          </div>
        );
      case 'view-frozen-embryo':
        return existingRecord ? (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Frozen Embryo Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{existingRecord.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{existingRecord.status}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Collection Date</p>
                <p className="font-medium">{existingRecord.collectionDate}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mare</p>
                  <p className="font-medium">{existingRecord.mareName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mare Owner</p>
                  <p className="font-medium">{existingRecord.mareOwner}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Storage Facility</p>
                  <p className="font-medium">{existingRecord.storageFacility}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Container ID</p>
                  <p className="font-medium">{existingRecord.containerId}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={onClose}
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                  onClick={() => handleEditFromView(existingRecord)}
                >
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Embryo details not available.</p>
          </div>
        );
      case 'view-collected-semen':
        return existingRecord ? (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Collected Semen Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{existingRecord.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{existingRecord.frozen ? "Frozen" : "Fresh"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Collection Date</p>
                <p className="font-medium">{existingRecord.collectionDate}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Volume</p>
                  <p className="font-medium">{existingRecord.volume} ml</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Collected By</p>
                  <p className="font-medium">{existingRecord.collectedBy}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Concentration</p>
                  <p className="font-medium">{existingRecord.concentration} million/ml</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Motility</p>
                  <p className="font-medium">{existingRecord.motility}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className="font-medium">{existingRecord.quality}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={onClose}
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                  onClick={() => handleEditFromView(existingRecord)}
                >
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Semen collection details not available.</p>
          </div>
        );
      case 'new-breeding':
      case 'edit-breeding':
        return (
          <BreedingRecordForm
            stallionId={stallionId}
            initialData={existingRecord}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      default:
        return (
          <div className="p-4">
            <p className="text-muted-foreground">
              {actionType} functionality will be implemented here.
            </p>
          </div>
        );
    }
  };

  const isViewMode = actionType.startsWith('view-');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isViewMode ? 'max-w-4xl' : 'max-w-3xl'} max-h-[90vh] overflow-y-auto`}>
        {!isViewMode && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="py-2">
          {renderFormContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;

