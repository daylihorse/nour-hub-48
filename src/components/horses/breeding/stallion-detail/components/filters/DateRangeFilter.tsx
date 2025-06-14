
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StallionDetailFilters } from '@/types/breeding/stallion-detail';

interface DateRangeFilterProps {
  dateRange?: { start: string; end: string };
  onDateRangeChange: (dateRange: { start?: string; end?: string }) => void;
}

const DateRangeFilter = ({ dateRange, onDateRangeChange }: DateRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Date Range</Label>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="date"
          placeholder="Start date"
          value={dateRange?.start || ''}
          onChange={(e) => onDateRangeChange({
            ...dateRange,
            start: e.target.value
          })}
        />
        <Input
          type="date"
          placeholder="End date"
          value={dateRange?.end || ''}
          onChange={(e) => onDateRangeChange({
            ...dateRange,
            end: e.target.value
          })}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
