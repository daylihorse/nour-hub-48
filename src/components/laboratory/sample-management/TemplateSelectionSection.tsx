
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Beaker, Search, Filter, Eye, X } from "lucide-react";
import { useTemplateManagement } from "./hooks/useTemplateManagement";
import { Template } from "@/services/templateService";

interface TemplateSelectionSectionProps {
  selectedTemplates: string[];
  onTemplateChange: (templateId: string, checked: boolean) => void;
}

const TemplatePreviewDialog = ({ template }: { template: Template }) => {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Beaker className="h-5 w-5" />
          {template.nameEn}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Template Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Arabic Name:</span>
                <span dir="rtl">{template.nameAr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{template.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sample Type:</span>
                <span>{template.sampleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Methodology:</span>
                <span>{template.methodology}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Turnaround Time:</span>
                <span>{template.turnaroundTime}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Parameters ({template.parametersCount})</h4>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {template.parameters.map((param, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium">{param.nameEn}</div>
                  <div className="text-xs text-muted-foreground" dir="rtl">{param.nameAr}</div>
                  <div className="text-xs">
                    Unit: {param.unit} | Range: {param.normalRangeMin}-{param.normalRangeMax}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const TemplateSelectionSection = ({
  selectedTemplates,
  onTemplateChange
}: TemplateSelectionSectionProps) => {
  const {
    templates,
    loading,
    searchTerm,
    categoryFilter,
    sampleTypeFilter,
    methodologyFilter,
    categories,
    sampleTypes,
    methodologies,
    setSearchTerm,
    setCategoryFilter,
    setSampleTypeFilter,
    setMethodologyFilter,
    clearFilters
  } = useTemplateManagement();

  const [showFilters, setShowFilters] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const hasActiveFilters = searchTerm || categoryFilter || sampleTypeFilter || methodologyFilter;

  if (loading) {
    return (
      <div>
        <Label className="block mb-3">Required Test Templates *</Label>
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading templates...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Label className="block mb-3">Required Test Templates *</Label>
      
      {/* Search and Filter Controls */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sampleTypeFilter} onValueChange={setSampleTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by sample type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sample Types</SelectItem>
                {sampleTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={methodologyFilter} onValueChange={setMethodologyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by methodology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Methodologies</SelectItem>
                {methodologies.map(methodology => (
                  <SelectItem key={methodology} value={methodology}>{methodology}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplates.includes(template.id) 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onTemplateChange(template.id, !selectedTemplates.includes(template.id))}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedTemplates.includes(template.id)}
                    onCheckedChange={(checked) => onTemplateChange(template.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {template.nameEn}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground" dir="rtl">
                      {template.nameAr}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <TemplatePreviewDialog template={template} />
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Sample: {template.sampleType}</span>
                  <span>{template.methodology}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{template.turnaroundTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Beaker className="h-3 w-3" />
                    <span>{template.parametersCount} parameters</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No templates found matching your criteria.
        </div>
      )}

      {/* Selected Templates Summary */}
      {selectedTemplates.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-800 mb-2">
            Selected Templates ({selectedTemplates.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTemplates.map((templateId) => {
              const template = templates.find(t => t.id === templateId);
              return template ? (
                <Badge key={templateId} variant="default" className="text-xs">
                  {template.nameEn}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelectionSection;
