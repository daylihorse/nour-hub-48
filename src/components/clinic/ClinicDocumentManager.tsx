
import ClinicDocumentHeader from "./documents/components/ClinicDocumentHeader";
import ClinicDocumentFilters from "./documents/components/ClinicDocumentFilters";
import ClinicDocumentGrid from "./documents/components/ClinicDocumentGrid";
import DocumentPagination from "@/components/shared/DocumentPagination";
import { mockClinicDocuments } from "./documents/data/mockDocuments";
import { useClinicDocumentManagement } from "./documents/hooks/useClinicDocumentManagement";

const ClinicDocumentManager = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    itemsPerPage,
    setItemsPerPage,
    filteredDocuments,
    pagination,
  } = useClinicDocumentManagement(mockClinicDocuments);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = pagination;

  return (
    <div className="space-y-6">
      <ClinicDocumentHeader />

      <ClinicDocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <ClinicDocumentGrid documents={paginatedDocuments} />

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

export default ClinicDocumentManager;
