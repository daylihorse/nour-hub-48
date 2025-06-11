
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, ChevronDown, Eye, Edit2, Trash2 } from "lucide-react";
import { useRecords } from "./RecordsProvider";
import { RecordFilters, RecordType, RecordStatus, RecordPriority } from "@/types/breeding/unified-records";
import { getRecordStatusColor, getRecordPriorityColor, getRecordTypeLabel, getRecordTypeIcon } from "./utils/recordUtils";

interface RecordsListViewProps {
  horseId?: string;
  showFilters?: boolean;
  showStats?: boolean;
}

const RecordsListView = ({ 
  horseId, 
  showFilters = true, 
  showStats = true 
}: RecordsListViewProps) => {
  const { 
    records, 
    stats, 
    filters, 
    setFilters, 
    searchTerm, 
    setSearchTerm,
    updateRecord,
    deleteRecord 
  } = useRecords();
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter records by horse if horseId is provided
  const filteredRecords = horseId 
    ? records.filter(record => record.horseId === horseId)
    : records;

  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        const dateA = a.scheduledDate || a.createdAt;
        const dateB = b.scheduledDate || b.createdAt;
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleFilterChange = (key: keyof RecordFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const recordTypes: RecordType[] = [
    'veterinary_checkup',
    'ultrasound', 
    'medication',
    'appointment',
    'breeding',
    'pregnancy',
    'foaling',
    'health_assessment',
    'heat_cycle'
  ];

  const recordStatuses: RecordStatus[] = [
    'draft',
    'scheduled',
    'in_progress',
    'completed',
    'cancelled',
    'overdue'
  ];

  const recordPriorities: RecordPriority[] = ['low', 'medium', 'high', 'urgent'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Records</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.byStatus.completed}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={filters.type?.[0] || ''}
                      onValueChange={(value) => handleFilterChange('type', value ? [value as RecordType] : undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        {recordTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {getRecordTypeLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={filters.status?.[0] || ''}
                      onValueChange={(value) => handleFilterChange('status', value ? [value as RecordStatus] : undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        {recordStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={filters.priority?.[0] || ''}
                      onValueChange={(value) => handleFilterChange('priority', value ? [value as RecordPriority] : undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All priorities</SelectItem>
                        {recordPriorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="type">Type</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Records ({sortedRecords.length})</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'} {sortBy}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {sortedRecords.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No records found matching your criteria.
            </div>
          ) : (
            <div className="divide-y">
              {sortedRecords.map((record) => {
                const IconComponent = getRecordTypeIcon(record.type);
                return (
                  <div key={record.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{record.title}</h3>
                            <Badge className={getRecordStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                            <Badge className={getRecordPriorityColor(record.priority)}>
                              {record.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {record.horseName} • {getRecordTypeLabel(record.type)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {record.scheduledDate?.toLocaleDateString() || record.createdAt.toLocaleDateString()}
                            {record.veterinarian && ` • ${record.veterinarian}`}
                          </p>
                          {record.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {record.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordsListView;
