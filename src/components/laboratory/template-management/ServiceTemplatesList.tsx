
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
import EditServiceTemplateDialog from "./dialogs/EditServiceTemplateDialog";
import { useServiceTemplates } from "./hooks/useServiceTemplates";
import ServiceTemplateCard from "./components/ServiceTemplateCard";

interface ServiceTemplatesListProps {
  searchTerm: string;
}

const ServiceTemplatesList = ({ searchTerm }: ServiceTemplatesListProps) => {
  const {
    templates,
    editingTemplate,
    deletingTemplate,
    setEditingTemplate,
    setDeletingTemplate,
    handleViewTemplate,
    handleEditTemplate,
    handleSaveTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    confirmDeleteTemplate
  } = useServiceTemplates();

  const filteredTemplates = templates.filter(template =>
    template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.nameAr.includes(searchTerm) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <ServiceTemplateCard
            key={template.id}
            template={template}
            onView={handleViewTemplate}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </div>

      <EditServiceTemplateDialog
        template={editingTemplate}
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        onSave={handleSaveTemplate}
      />

      <DeleteConfirmationDialog
        isOpen={!!deletingTemplate}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={confirmDeleteTemplate}
        templateName={deletingTemplate?.nameEn || ""}
      />
    </div>
  );
};

export default ServiceTemplatesList;
