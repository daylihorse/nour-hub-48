
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useTemplateManagement } from "./hooks/useTemplateManagement";
import { Template } from "@/types/template";
import TemplatePreviewDialog from "./components/TemplatePreviewDialog";
import TemplateSearchFilters from "./components/TemplateSearchFilters";
import TemplateGrid from "./components/TemplateGrid";
import SelectedTemplatesSummary from "./components/SelectedTemplatesSummary";

interface TemplateSelectionSectionProps {
  selectedTemplates: string[];
  onTemplateChange: (templateId: string, checked: boolean) => void;
}

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

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

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
      
      <TemplateSearchFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        sampleTypeFilter={sampleTypeFilter}
        methodologyFilter={methodologyFilter}
        categories={categories}
        sampleTypes={sampleTypes}
        methodologies={methodologies}
        onSearchTermChange={setSearchTerm}
        onCategoryFilterChange={setCategoryFilter}
        onSampleTypeFilterChange={setSampleTypeFilter}
        onMethodologyFilterChange={setMethodologyFilter}
        onClearFilters={clearFilters}
      />

      <TemplateGrid
        templates={templates}
        selectedTemplates={selectedTemplates}
        onTemplateChange={onTemplateChange}
        onPreview={handlePreview}
      />

      <SelectedTemplatesSummary
        selectedTemplates={selectedTemplates}
        templates={templates}
      />

      {previewTemplate && (
        <TemplatePreviewDialog
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onOpenChange={(open) => !open && setPreviewTemplate(null)}
        />
      )}
    </div>
  );
};

export default TemplateSelectionSection;
