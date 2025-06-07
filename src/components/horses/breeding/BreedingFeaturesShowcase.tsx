
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Star } from "lucide-react";

interface BreedingFeaturesShowcaseProps {
  onNavigateToBreeding: (tab: string) => void;
}

const BreedingFeaturesShowcase = ({ onNavigateToBreeding }: BreedingFeaturesShowcaseProps) => {
  const newFeatures = [
    {
      id: "certificates",
      title: "Certificate Generator",
      description: "Generate professional breeding certificates with official formatting and detailed breeding information",
      highlights: ["PDF Export", "Print Ready", "Official Format"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "pedigree",
      title: "Advanced Pedigree Trees",
      description: "Interactive family tree visualization with multi-generation support and detailed ancestry tracking",
      highlights: ["Interactive UI", "Multi-Generation", "Achievement Tracking"],
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: "analytics",
      title: "Performance Analytics",
      description: "Comprehensive breeding success metrics, trends analysis, and performance dashboards",
      highlights: ["Success Metrics", "Trend Analysis", "Data Insights"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "documents",
      title: "Document Management",
      description: "Centralized storage for all breeding-related documents with advanced search and categorization",
      highlights: ["Cloud Storage", "Smart Search", "Categories"],
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                New Breeding Features
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Discover our latest breeding management capabilities
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Star className="h-3 w-3 mr-1" />
            Latest Release
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {newFeatures.map((feature) => (
            <Card key={feature.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-4">
                <div className={`h-2 bg-gradient-to-r ${feature.gradient} rounded-full mb-4`} />
                <h4 className="font-semibold text-base mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {feature.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full group"
                  onClick={() => onNavigateToBreeding(feature.id)}
                >
                  Explore {feature.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingFeaturesShowcase;
