
import LaboratoryDocumentHeader from "./documents/components/LaboratoryDocumentHeader";
import LaboratoryDocumentFilters from "./documents/components/LaboratoryDocumentFilters";
import LaboratoryDocumentGrid from "./documents/components/LaboratoryDocumentGrid";
import DocumentPagination from "@/components/shared/DocumentPagination";
import { mockLaboratoryDocuments } from "./documents/data/mockDocuments";
import { useLaboratoryDocumentManagement } from "./documents/hooks/useLaboratoryDocumentManagement";

const LaboratoryDocumentManager = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    itemsPerPage,
    setItemsPerPage,
    filteredDocuments,
    pagination,
  } = useLaboratoryDocumentManagement(mockLaboratoryDocuments);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = pagination;

  return (
    <div className="space-y-6">
      <LaboratoryDocumentHeader />

      <LaboratoryDocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <LaboratoryDocumentGrid documents={paginatedDocuments} />

      <DocumentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredDocuments.length}
        onPageChange={goToPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default LaboratoryDocumentManager;
