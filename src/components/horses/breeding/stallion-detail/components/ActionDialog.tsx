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
import BreedingRecordDetails from "./details/BreedingRecordDetails";
import CollectedSemenDetails from "./details/CollectedSemenDetails";
import FrozenEmbryoDetails from "./details/FrozenEmbryoDetails";

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
      case 'add-breeding':
      case 'edit-breeding':
        return (
          <BreedingRecordForm
            stallionId={stallionId}
            initialData={existingRecord}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'view-breeding':
        return existingRecord ? (
          <>
            <BreedingRecordDetails 
              record={existingRecord as BreedingRecord} 
              onEdit={() => handleEditFromView(existingRecord)} 
            />
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Record details not available.</p>
          </div>
        );
      case 'view-frozen-embryo':
        return existingRecord ? (
          <>
            <FrozenEmbryoDetails 
              record={existingRecord as FrozenEmbryo} 
              onEdit={() => handleEditFromView(existingRecord)} 
            />
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Record details not available.</p>
          </div>
        );
      case 'view-collected-semen':
        return existingRecord ? (
          <>
            <CollectedSemenDetails 
              record={existingRecord as CollectedSemen} 
              onEdit={() => handleEditFromView(existingRecord)} 
            />
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground">Record details not available.</p>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <p className="text-muted-foreground">Unknown action type: {actionType}</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {renderFormContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;

