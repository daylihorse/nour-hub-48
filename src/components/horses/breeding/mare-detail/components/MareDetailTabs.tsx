
import ScrollableHorseDetailTabs from "./ScrollableHorseDetailTabs";

interface MareDetailTabsProps {
  mareId: string;
  activeTab: string;
  viewMode: 'grid' | 'list' | 'table';
  onActiveTabChange: (tab: string) => void;
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareDetailTabs = ({ 
  mareId, 
  activeTab, 
  viewMode, 
  onActiveTabChange, 
  onViewModeChange, 
  onActionClick 
}: MareDetailTabsProps) => {
  return (
    <ScrollableHorseDetailTabs
      mareId={mareId}
      activeTab={activeTab}
      viewMode={viewMode}
      onActiveTabChange={onActiveTabChange}
      onViewModeChange={onViewModeChange}
      onActionClick={onActionClick}
    />
  );
};

export default MareDetailTabs;
