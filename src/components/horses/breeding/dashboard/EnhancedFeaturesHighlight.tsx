
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText, TreePine, BarChart, FolderOpen } from "lucide-react";

const EnhancedFeaturesHighlight = () => {
  return (
    <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enhanced Breeding Features
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore our advanced breeding management capabilities
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            New
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-sm">Certificate Generator</h4>
              <p className="text-xs text-muted-foreground">Professional breeding certificates</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <TreePine className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-medium text-sm">Pedigree Trees</h4>
              <p className="text-xs text-muted-foreground">Interactive family trees</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <BarChart className="h-6 w-6 text-purple-600" />
            <div>
              <h4 className="font-medium text-sm">Performance Analytics</h4>
              <p className="text-xs text-muted-foreground">Advanced success metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <FolderOpen className="h-6 w-6 text-orange-600" />
            <div>
              <h4 className="font-medium text-sm">Document Management</h4>
              <p className="text-xs text-muted-foreground">Centralized document storage</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFeaturesHighlight;
