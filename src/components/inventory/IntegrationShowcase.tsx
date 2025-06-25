import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Pill, 
  Store, 
  Globe,
  Package,
  ArrowRight,
  CheckCircle,
  Heart,
  ShoppingCart,
  Users,
  Plus
} from "lucide-react";

const IntegrationShowcase = () => {
  const scenarios = [
    {
      title: "Stable Owner Scenario",
      description: "Adding medication for personal horse care",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      example: {
        item: "Penicillin Injectable",
        classification: "Antibiotic",
        usage: "Personal Use",
        modules: ["Inventory", "Pharmacy"],
        forSale: false
      },
      flow: [
        { module: "Inventory", active: true, description: "Always included for tracking" },
        { module: "Pharmacy", active: true, description: "Medical item compliance" },
        { module: "Store", active: false, description: "Not for sale" },
        { module: "Marketplace", active: false, description: "Not for sale" }
      ]
    },
    {
      title: "Pharmacy Owner Scenario",
      description: "Adding medication for commercial sale",
      icon: <Pill className="h-5 w-5 text-green-500" />,
      example: {
        item: "Horse Vitamins Premium",
        classification: "Vitamin Supplement",
        usage: "For Sale",
        modules: ["Inventory", "Pharmacy", "Store", "Marketplace"],
        forSale: true
      },
      flow: [
        { module: "Inventory", active: true, description: "Stock management" },
        { module: "Pharmacy", active: true, description: "Medical compliance" },
        { module: "Store", active: true, description: "Point of sale" },
        { module: "Marketplace", active: true, description: "Online sales" }
      ]
    },
    {
      title: "Mixed Business Scenario",
      description: "Flexible usage based on item intent",
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
      example: {
        item: "Anti-inflammatory Paste",
        classification: "Pain Management",
        usage: "Both Personal & Sale",
        modules: ["Inventory", "Pharmacy", "Store"],
        forSale: true
      },
      flow: [
        { module: "Inventory", active: true, description: "Complete tracking" },
        { module: "Pharmacy", active: true, description: "Medical oversight" },
        { module: "Store", active: true, description: "Selective sales" },
        { module: "Marketplace", active: false, description: "Internal use only" }
      ]
    }
  ];

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Inventory': return <Package className="h-4 w-4" />;
      case 'Pharmacy': return <Pill className="h-4 w-4" />;
      case 'Store': return <Store className="h-4 w-4" />;
      case 'Marketplace': return <Globe className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const benefits = [
    {
      title: "Automatic Module Detection",
      description: "System automatically determines which modules to sync based on item type and business context",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    {
      title: "Business-Specific Defaults",
      description: "Smart defaults adapt to your business type - pharmacy owners get sales-ready setups, stable owners get personal use configs",
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Compliance Tracking",
      description: "Medical items automatically include pharmacy compliance fields like prescription requirements and storage conditions",
      icon: <Pill className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Cross-Module Synchronization",
      description: "Changes in inventory automatically update pharmacy stock, store pricing, and marketplace listings",
      icon: <ArrowRight className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Inventory-Pharmacy Integration
          </CardTitle>
          <CardDescription>
            Seamless integration between Inventory and Pharmacy modules that adapts to your business type and automatically syncs data across relevant systems.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Key Benefits</CardTitle>
          <CardDescription>
            How this integration streamlines your operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                {benefit.icon}
                <div>
                  <h4 className="font-semibold text-sm">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Business Scenarios</CardTitle>
          <CardDescription>
            See how the system adapts to different business types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scenarios.map((scenario, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {scenario.icon}
                  <div>
                    <h3 className="font-semibold">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </div>
                </div>

                {/* Example Item */}
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Example: {scenario.example.item}</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{scenario.example.classification}</Badge>
                    <Badge variant={scenario.example.forSale ? "default" : "secondary"}>
                      {scenario.example.usage}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically syncs to: {scenario.example.modules.join(", ")}
                  </p>
                </div>

                {/* Module Flow */}
                <div className="flex items-center justify-between">
                  {scenario.flow.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center">
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          step.active 
                            ? 'bg-green-100 border-2 border-green-500' 
                            : 'bg-gray-100 border-2 border-gray-300'
                        }`}>
                          {getModuleIcon(step.module)}
                        </div>
                        <p className={`text-sm font-medium ${
                          step.active ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {step.module}
                        </p>
                        <p className="text-xs text-muted-foreground max-w-20 text-center">
                          {step.description}
                        </p>
                      </div>
                      {stepIndex < scenario.flow.length - 1 && (
                        <ArrowRight className={`h-4 w-4 mx-2 ${
                          scenario.flow[stepIndex + 1].active ? 'text-green-500' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            The technical implementation behind the integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Smart Classification</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The system automatically detects medical items based on classification keywords:
                </p>
                <div className="flex flex-wrap gap-1">
                  {['medical', 'vet', 'antibiotic', 'vitamin', 'vaccine', 'sedative'].map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Business Logic</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Module selection follows business-specific rules:
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Medical items → Always include Pharmacy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    For sale items → Include Store & Marketplace
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Pharmacy owners → Default to sales mode
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Data Synchronization</h4>
              <p className="text-sm text-blue-700">
                When you add an item to inventory, the system automatically creates corresponding records 
                in the Pharmacy module (for medical items), Store module (for items marked for sale), 
                and Marketplace (for public sales). All pricing, stock levels, and compliance information 
                stays synchronized across modules.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to Experience the Integration?</h3>
          <p className="text-muted-foreground mb-4">
            Try adding items in the Inventory Management tab to see the automatic synchronization in action.
          </p>
          <div className="flex justify-center gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sample Medical Item
            </Button>
            <Button variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              View in Pharmacy Module
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationShowcase; 