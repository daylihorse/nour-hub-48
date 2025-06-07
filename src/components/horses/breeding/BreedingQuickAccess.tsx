
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, FileText, TreePine, BarChart, FolderOpen, Calendar, Users, Zap } from "lucide-react";

interface BreedingQuickAccessProps {
  onNavigateToBreeding: (tab: string) => void;
}

const BreedingQuickAccess = ({ onNavigateToBreeding }: BreedingQuickAccessProps) => {
  const quickActions = [
    {
      id: "records",
      title: "Breeding Records",
      description: "Manage breeding activities",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      count: "12 active"
    },
    {
      id: "certificates",
      title: "Certificates",
      description: "Generate breeding certificates",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      count: "5 pending"
    },
    {
      id: "pedigree",
      title: "Pedigree Trees",
      description: "Interactive family trees",
      icon: TreePine,
      color: "text-green-600",
      bgColor: "bg-green-50",
      count: "63 horses"
    },
    {
      id: "analytics",
      title: "Performance Analytics",
      description: "Breeding success metrics",
      icon: BarChart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      count: "85.5% success"
    },
    {
      id: "documents",
      title: "Document Management",
      description: "Store breeding documents",
      icon: FolderOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      count: "47 files"
    },
    {
      id: "planning",
      title: "Breeding Planner",
      description: "Strategic breeding plans",
      icon: Calendar,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      count: "8 planned"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Breeding Quick Access</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fast access to breeding management features
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Users className="h-3 w-3 mr-1" />
            New Features
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card key={action.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {action.count}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
                <Button 
                  size="sm" 
                  className="w-full h-8 text-xs"
                  onClick={() => onNavigateToBreeding(action.id)}
                >
                  Open {action.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingQuickAccess;
