import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Beaker, Search, Filter, ClipboardCheck, Microscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import ResultTemplatesList from "./ResultTemplatesList";
import ServiceTemplatesList from "./ServiceTemplatesList";
import QCTemplatesList from "./QCTemplatesList";
import CreateResultTemplateWizard from "./CreateResultTemplateWizard";
import CreateServiceTemplateWizard from "./CreateServiceTemplateWizard";
import CreateQCTemplateWizard from "./CreateQCTemplateWizard";
import TemplateStats from "./TemplateStats";
import AdvancedTemplateFilters from "./AdvancedTemplateFilters";
import { useTemplateManagement } from "./hooks/useTemplateManagement";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const EnhancedTemplateManagement = () => {
  const { direction, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("result-templates");
  const [showResultWizard, setShowResultWizard] = useState(false);
  const [showServiceWizard, setShowServiceWizard] = useState(false);
  const [showQCWizard, setShowQCWizard] = useState(false);

  const {
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
    clearFilters,
    templates,
    loading
  } = useTemplateManagement();

  const getTabIcon = (tabValue: string) => {
    switch (tabValue) {
      case "result-templates": return <Beaker className="h-4 w-4" />;
      case "service-templates": return <FileText className="h-4 w-4" />;
      case "qc-templates": return <ClipboardCheck className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cn(
        "flex justify-between items-center",
        direction === 'rtl' && "flex-row-reverse"
      )}>
        <div className={cn(direction === 'rtl' && "text-right")}>
          <h2 className={cn(
            "text-2xl font-bold flex items-center gap-2",
            direction === 'rtl' && "flex-row-reverse"
          )}>
            <Microscope className="h-6 w-6" />
            {t('laboratory.management.title', 'Laboratory Template Management')}
          </h2>
          <p className="text-muted-foreground">
            {t('laboratory.management.description', 'Create and manage result, service, and QC templates')}
          </p>
        </div>
        <div className={cn(
          "flex gap-2",
          direction === 'rtl' && "flex-row-reverse"
        )}>
          <Button
            onClick={() => setShowResultWizard(true)}
            className={cn(
              "flex items-center gap-2 bg-primary hover:bg-primary/90 button-with-icon",
              direction === 'rtl' && "flex-row-reverse"
            )}
          >
            <Plus className="h-4 w-4" />
            {t('laboratory.templates.newResult', 'New Result Template')}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowServiceWizard(true)}
            className={cn(
              "flex items-center gap-2 button-with-icon",
              direction === 'rtl' && "flex-row-reverse"
            )}
          >
            <Plus className="h-4 w-4" />
            {t('laboratory.templates.newService', 'New Service Template')}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowQCWizard(true)}
            className={cn(
              "flex items-center gap-2 button-with-icon",
              direction === 'rtl' && "flex-row-reverse"
            )}
          >
            <Plus className="h-4 w-4" />
            {t('laboratory.templates.newQC', 'New QC Template')}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <TemplateStats />

      {/* Search and Filter Section */}
      <AdvancedTemplateFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        sampleTypeFilter={sampleTypeFilter}
        methodologyFilter={methodologyFilter}
        categories={categories}
        sampleTypes={sampleTypes}
        methodologies={methodologies}
        totalResults={templates.length}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onSampleTypeChange={setSampleTypeFilter}
        onMethodologyChange={setMethodologyFilter}
        onClearFilters={clearFilters}
      />

      {/* Templates Library */}
      <Card>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2",
            direction === 'rtl' && "flex-row-reverse text-right"
          )}>
            <FileText className="h-5 w-5" />
            {t('laboratory.templates.library', 'Templates Library')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="result-templates" 
                className={cn(
                  "flex items-center gap-2",
                  direction === 'rtl' && "flex-row-reverse"
                )}
              >
                {getTabIcon("result-templates")}
                {t('laboratory.templates.result', 'Result Templates')}
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  direction === 'rtl' ? "mr-1" : "ml-1"
                )}>18</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="service-templates" 
                className={cn(
                  "flex items-center gap-2",
                  direction === 'rtl' && "flex-row-reverse"
                )}
              >
                {getTabIcon("service-templates")}
                {t('laboratory.templates.service', 'Service Templates')}
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  direction === 'rtl' ? "mr-1" : "ml-1"
                )}>6</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="qc-templates" 
                className={cn(
                  "flex items-center gap-2",
                  direction === 'rtl' && "flex-row-reverse"
                )}
              >
                {getTabIcon("qc-templates")}
                {t('laboratory.templates.qc', 'QC Templates')}
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  direction === 'rtl' ? "mr-1" : "ml-1"
                )}>4</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="result-templates" className="mt-6">
              <ResultTemplatesList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="service-templates" className="mt-6">
              <ServiceTemplatesList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="qc-templates" className="mt-6">
              <QCTemplatesList searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Wizards */}
      <CreateResultTemplateWizard
        isOpen={showResultWizard}
        onClose={() => setShowResultWizard(false)}
      />

      <CreateServiceTemplateWizard
        isOpen={showServiceWizard}
        onClose={() => setShowServiceWizard(false)}
      />

      <CreateQCTemplateWizard
        isOpen={showQCWizard}
        onClose={() => setShowQCWizard(false)}
      />
    </div>
  );
};

export default EnhancedTemplateManagement;