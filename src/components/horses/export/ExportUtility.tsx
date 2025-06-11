
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileSpreadsheet, Printer } from "lucide-react";

interface ExportField {
  id: string;
  label: string;
  description?: string;
  category: string;
}

interface ExportUtilityProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any[];
  filename?: string;
  title?: string;
}

const ExportUtility = ({ 
  open, 
  onOpenChange, 
  data, 
  filename = "export", 
  title = "Export Data" 
}: ExportUtilityProps) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'xlsx'>('csv');
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Available export fields (configurable based on data type)
  const availableFields: ExportField[] = [
    { id: 'name', label: 'Name', category: 'Basic Info' },
    { id: 'breed', label: 'Breed', category: 'Basic Info' },
    { id: 'gender', label: 'Gender', category: 'Basic Info' },
    { id: 'birthDate', label: 'Birth Date', category: 'Basic Info' },
    { id: 'sire', label: 'Sire', category: 'Pedigree' },
    { id: 'dam', label: 'Dam', category: 'Pedigree' },
    { id: 'offspring', label: 'Offspring Count', category: 'Breeding' },
    { id: 'pedigreeComplete', label: 'Pedigree Status', category: 'Status' },
    { id: 'achievements', label: 'Achievements', category: 'Performance' },
  ];

  const fieldCategories = [...new Set(availableFields.map(field => field.category))];

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAllInCategory = (category: string) => {
    const categoryFields = availableFields
      .filter(field => field.category === category)
      .map(field => field.id);
    
    const allSelected = categoryFields.every(fieldId => selectedFields.includes(fieldId));
    
    if (allSelected) {
      setSelectedFields(prev => prev.filter(id => !categoryFields.includes(id)));
    } else {
      setSelectedFields(prev => [...new Set([...prev, ...categoryFields])]);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate export progress
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Filter data based on selected fields
      const exportData = data.map(item => {
        const filteredItem: any = {};
        selectedFields.forEach(fieldId => {
          filteredItem[fieldId] = item[fieldId];
        });
        return filteredItem;
      });

      // Generate export based on format
      switch (exportFormat) {
        case 'csv':
          downloadCSV(exportData);
          break;
        case 'pdf':
          generatePDF(exportData);
          break;
        case 'xlsx':
          generateExcel(exportData);
          break;
      }

      console.log('Export completed:', { format: exportFormat, fields: selectedFields, records: exportData.length });
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      onOpenChange(false);
    }
  };

  const downloadCSV = (data: any[]) => {
    if (data.length === 0) return;

    const headers = selectedFields.join(',');
    const rows = data.map(item => 
      selectedFields.map(field => {
        const value = item[field];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value || '';
      }).join(',')
    );

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const generatePDF = (data: any[]) => {
    console.log('Generating PDF report with data:', data);
    // TODO: Implement PDF generation
  };

  const generateExcel = (data: any[]) => {
    console.log('Generating Excel file with data:', data);
    // TODO: Implement Excel generation
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={exportFormat === 'csv' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('csv')}
                  className="flex flex-col items-center gap-2 h-20"
                >
                  <FileText className="h-6 w-6" />
                  <span>CSV</span>
                </Button>
                <Button
                  variant={exportFormat === 'xlsx' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('xlsx')}
                  className="flex flex-col items-center gap-2 h-20"
                >
                  <FileSpreadsheet className="h-6 w-6" />
                  <span>Excel</span>
                </Button>
                <Button
                  variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('pdf')}
                  className="flex flex-col items-center gap-2 h-20"
                >
                  <Printer className="h-6 w-6" />
                  <span>PDF</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Field Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Fields to Export</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldCategories.map(category => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{category}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAllInCategory(category)}
                      >
                        {availableFields
                          .filter(f => f.category === category)
                          .every(f => selectedFields.includes(f.id))
                          ? 'Deselect All'
                          : 'Select All'
                        }
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {availableFields
                        .filter(field => field.category === category)
                        .map(field => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={field.id}
                              checked={selectedFields.includes(field.id)}
                              onCheckedChange={() => handleFieldToggle(field.id)}
                            />
                            <label
                              htmlFor={field.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {field.label}
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Progress */}
          {isExporting && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exporting...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">
                <p><strong>Records to export:</strong> {data.length}</p>
                <p><strong>Selected fields:</strong> {selectedFields.length}</p>
                <p><strong>Format:</strong> {exportFormat.toUpperCase()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport} 
              disabled={selectedFields.length === 0 || isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Export {exportFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportUtility;
