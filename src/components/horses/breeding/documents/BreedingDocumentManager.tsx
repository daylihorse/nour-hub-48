
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentHeader from "./components/DocumentHeader";
import DocumentFilters from "./components/DocumentFilters";
import DocumentGrid from "./components/DocumentGrid";
import DocumentList from "./components/DocumentList";
import DocumentCategories from "./components/DocumentCategories";
import DocumentPagination from "@/components/shared/DocumentPagination";
import DocumentPaginationControls from "@/components/shared/DocumentPaginationControls";
import { useDocumentManagement } from "./hooks/useDocumentManagement";
import { mockDocuments } from "./data/mockDocuments";

const BreedingDocumentManager = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    itemsPerPage,
    setItemsPerPage,
    filteredDocuments,
    pagination,
  } = useDocumentManagement(mockDocuments);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = pagination;

  return (
    <div className="space-y-6">
      <DocumentHeader />

      <DocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        documents={mockDocuments}
      />

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
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
          <DocumentGrid documents={paginatedDocuments} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-6 space-y-6">
          <DocumentList documents={paginatedDocuments} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <DocumentCategories documents={filteredDocuments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingDocumentManager;
