
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  Save, 
  Play,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  Settings
} from "lucide-react";

interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
}

interface ReportFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: string;
}

interface ReportConfig {
  name: string;
  description: string;
  type: 'table' | 'chart' | 'summary';
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  fields: ReportField[];
  filters: ReportFilter[];
  groupBy?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const ReportBuilder = () => {
  const [config, setConfig] = useState<ReportConfig>({
    name: '',
    description: '',
    type: 'table',
    fields: [],
    filters: []
  });

  const [isBuilding, setIsBuilding] = useState(false);

  const availableFields = [
    { id: 'horse_name', name: 'Horse Name', type: 'text' as const },
    { id: 'age', name: 'Age', type: 'number' as const },
    { id: 'breed', name: 'Breed', type: 'text' as const },
    { id: 'owner', name: 'Owner', type: 'text' as const },
    { id: 'registration_date', name: 'Registration Date', type: 'date' as const },
    { id: 'health_status', name: 'Health Status', type: 'select' as const }
  ];

  const handleAddField = (fieldId: string) => {
    const field = availableFields.find(f => f.id === fieldId);
    if (field && !config.fields.find(f => f.id === fieldId)) {
      setConfig(prev => ({
        ...prev,
        fields: [...prev.fields, { ...field, required: false }]
      }));
    }
  };

  const handleRemoveField = (fieldId: string) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  const handleAddFilter = () => {
    const newFilter: ReportFilter = {
      id: Date.now().toString(),
      field: '',
      operator: 'equals',
      value: ''
    };
    setConfig(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter]
    }));
  };

  const handleRemoveFilter = (filterId: string) => {
    setConfig(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== filterId)
    }));
  };

  const handleBuildReport = async () => {
    setIsBuilding(true);
    try {
      console.log('Building report with config:', config);
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsBuilding(false);
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'table': return <FileText className="h-4 w-4" />;
      case 'chart': return <BarChart3 className="h-4 w-4" />;
      case 'summary': return <PieChart className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter report name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select 
                value={config.type} 
                onValueChange={(value: 'table' | 'chart' | 'summary') => 
                  setConfig(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table Report</SelectItem>
                  <SelectItem value="chart">Chart Report</SelectItem>
                  <SelectItem value="summary">Summary Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this report shows"
              rows={3}
            />
          </div>

          {/* Chart Type Selection (if chart report) */}
          {config.type === 'chart' && (
            <div className="space-y-2">
              <Label>Chart Type</Label>
              <Select 
                value={config.chartType || 'bar'} 
                onValueChange={(value: 'bar' | 'line' | 'pie' | 'area') => 
                  setConfig(prev => ({ ...prev, chartType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fields Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Report Fields</CardTitle>
            <Badge variant="outline">
              {config.fields.length} selected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableFields.map(field => (
              <Button
                key={field.id}
                variant={config.fields.find(f => f.id === field.id) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (config.fields.find(f => f.id ===

field.id)) {
                    handleRemoveField(field.id);
                  } else {
                    handleAddField(field.id);
                  }
                }}
                className="justify-start"
              >
                {config.fields.find(f => f.id === field.id) ? (
                  <Trash2 className="h-3 w-3 mr-2" />
                ) : (
                  <Plus className="h-3 w-3 mr-2" />
                )}
                {field.name}
              </Button>
            ))}
          </div>

          {config.fields.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Fields</Label>
              <div className="flex flex-wrap gap-2">
                {config.fields.map(field => (
                  <Badge key={field.id} variant="secondary">
                    {field.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-2"
                      onClick={() => handleRemoveField(field.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Build Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
        <Button 
          onClick={handleBuildReport}
          disabled={isBuilding || !config.name || config.fields.length === 0}
        >
          {isBuilding ? (
            <>
              <Settings className="h-4 w-4 mr-2 animate-spin" />
              Building...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Build Report
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportBuilder;
