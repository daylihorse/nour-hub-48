
import { useCallback } from "react";

export interface UseRecordActionsProps {
  mareId: string;
  onActionClick?: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

export const useRecordActions = ({ mareId, onActionClick }: UseRecordActionsProps) => {
  const handleEdit = useCallback((recordId: string, recordType: string) => {
    console.log(`Edit ${recordType} record ${recordId} for mare:`, mareId);
  }, [mareId]);

  const handleView = useCallback((recordId: string, recordType: string) => {
    console.log(`View ${recordType} record ${recordId} for mare:`, mareId);
  }, [mareId]);

  const handleAddRecord = useCallback((type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => {
    if (onActionClick) {
      onActionClick(type, title);
    }
  }, [onActionClick]);

  return {
    handleEdit,
    handleView,
    handleAddRecord
  };
};
