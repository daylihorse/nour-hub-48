
import { Badge } from "@/components/ui/badge";
import { Template } from "@/types/template";

interface SelectedTemplatesSummaryProps {
  selectedTemplates: string[];
  templates: Template[];
}

const SelectedTemplatesSummary = ({ selectedTemplates, templates }: SelectedTemplatesSummaryProps) => {
  if (selectedTemplates.length === 0) {
    return null;
  }

  return (
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
  );
};

export default SelectedTemplatesSummary;
