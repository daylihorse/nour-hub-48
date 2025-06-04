
import { Template } from "@/types/template";
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
  selectedTemplates: string[];
  onTemplateChange: (templateId: string, checked: boolean) => void;
  onPreview: (template: Template) => void;
}

const TemplateGrid = ({ templates, selectedTemplates, onTemplateChange, onPreview }: TemplateGridProps) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No templates found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplates.includes(template.id)}
          onSelectionChange={onTemplateChange}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
