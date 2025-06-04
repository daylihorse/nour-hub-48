
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ViewTemplateDialog from "./dialogs/ViewTemplateDialog";
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
import EditResultTemplateDialog from "./dialogs/EditResultTemplateDialog";
import { useResultTemplates } from "./hooks/useResultTemplates";
import ResultTemplateRow from "./components/ResultTemplateRow";

interface ResultTemplatesListProps {
  searchTerm: string;
}

const ResultTemplatesList = ({ searchTerm }: ResultTemplatesListProps) => {
  const {
    templates,
    viewingTemplate,
    editingTemplate,
    deletingTemplate,
    setViewingTemplate,
    setEditingTemplate,
    setDeletingTemplate,
    handleViewTemplate,
    handleEditTemplate,
    handleSaveTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    confirmDeleteTemplate
  } = useResultTemplates();

  const filteredTemplates = templates.filter(template =>
    template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.nameAr.includes(searchTerm) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Normal Ranges</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTemplates.map((template) => (
            <ResultTemplateRow
              key={template.id}
              template={template}
              onView={handleViewTemplate}
              onEdit={handleEditTemplate}
              onDuplicate={handleDuplicateTemplate}
              onDelete={handleDeleteTemplate}
            />
          ))}
        </TableBody>
      </Table>

      <ViewTemplateDialog
        template={viewingTemplate}
        isOpen={!!viewingTemplate}
        onClose={() => setViewingTemplate(null)}
      />

      <EditResultTemplateDialog
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

export default ResultTemplatesList;
