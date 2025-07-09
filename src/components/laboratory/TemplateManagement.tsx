import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Beaker, Search, Filter, ClipboardCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import ResultTemplatesList from "./template-management/ResultTemplatesList";
import ServiceTemplatesList from "./template-management/ServiceTemplatesList";
import QCTemplatesList from "./template-management/QCTemplatesList";
import CreateResultTemplateWizard from "./template-management/CreateResultTemplateWizard";
import CreateServiceTemplateWizard from "./template-management/CreateServiceTemplateWizard";
import CreateQCTemplateWizard from "./template-management/CreateQCTemplateWizard";
import TemplateStats from "./template-management/TemplateStats";

const TemplateManagement = () => {
  const [activeTab, setActiveTab] = useState("result-templates");
  const [showResultWizard, setShowResultWizard] = useState(false);
  const [showServiceWizard, setShowServiceWizard] = useState(false);
  const [showQCWizard, setShowQCWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Template Management</h2>
          <p className="text-muted-foreground">Create and manage result, service, and QC templates</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowResultWizard(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Result Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowServiceWizard(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Service Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowQCWizard(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New QC Template
          </Button>
        </div>
      </div>

      <TemplateStats />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Templates Library
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="result-templates" className="flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Result Templates
              </TabsTrigger>
              <TabsTrigger value="service-templates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Service Templates
              </TabsTrigger>
              <TabsTrigger value="qc-templates" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                QC Templates
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

export default TemplateManagement;
