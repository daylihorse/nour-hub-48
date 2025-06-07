
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaboratoryDocumentHeader from "./documents/components/LaboratoryDocumentHeader";
import LaboratoryDocumentFilters from "./documents/components/LaboratoryDocumentFilters";
import LaboratoryDocumentGrid from "./documents/components/LaboratoryDocumentGrid";
import DocumentPagination from "@/components/shared/DocumentPagination";
import DocumentPaginationControls from "@/components/shared/DocumentPaginationControls";
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
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <Tabs defaultValue="grid">
              <TabsContent value="grid" className="m-0">
                <DocumentPaginationControls
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <TabsContent value="grid" className="mt-6 space-y-6">
          <LaboratoryDocumentGrid documents={paginatedDocuments} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDocumentManager;
