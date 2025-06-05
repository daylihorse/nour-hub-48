
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Settings, HelpCircle, Download, ExternalLink } from "lucide-react";

const BreedingSystemGuide = () => {
  const downloadGuide = (type: string) => {
    console.log(`Downloading ${type} guide...`);
    // In a real implementation, this would trigger a PDF download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Breeding System Documentation</h2>
          <p className="text-muted-foreground">
            Comprehensive guide to using the breeding management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => downloadGuide('user')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            User Guide PDF
          </Button>
          <Button variant="outline" onClick={() => downloadGuide('technical')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Technical Docs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="troubleshooting">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What is the Breeding Management System?</h3>
                <p className="text-muted-foreground">
                  A comprehensive solution for managing horse breeding operations, from stallion and mare 
                  management to genetic analysis, pregnancy tracking, and foaling records.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Stallion Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Track stallion performance, availability, and breeding schedules.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Mare Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor mare breeding history, heat cycles, and health status.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Genetic Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced genetic compatibility analysis and breeding recommendations.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Pregnancy Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete pregnancy monitoring from conception to foaling.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Contract Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Handle breeding agreements, bookings, and financial tracking.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Planning & Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Strategic breeding planning and performance analytics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800">1</Badge>
                  <div>
                    <h4 className="font-medium">Set Up Your Horses</h4>
                    <p className="text-sm text-muted-foreground">
                      Register your stallions and mares in the Horse Registry before using breeding features.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800">2</Badge>
                  <div>
                    <h4 className="font-medium">Configure Breeding Parameters</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up stallion availability, mare breeding status, and breeding preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800">3</Badge>
                  <div>
                    <h4 className="font-medium">Plan Your Breeding Season</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the breeding planner to schedule optimal breeding times and genetic matches.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800">4</Badge>
                  <div>
                    <h4 className="font-medium">Record Breeding Activities</h4>
                    <p className="text-sm text-muted-foreground">
                      Document breeding events, track pregnancies, and monitor mare heat cycles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800">5</Badge>
                  <div>
                    <h4 className="font-medium">Analyze and Optimize</h4>
                    <p className="text-sm text-muted-foreground">
                      Use analytics and reports to improve breeding success rates and outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Stallion and Mare Registry
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Breeding Record Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Pregnancy Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Foaling Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Heat Cycle Tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Genetic Compatibility Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Breeding Contract Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Strategic Breeding Planning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Performance Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Multilingual Support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Workflows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Complete Breeding Process</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">Mare Selection</Badge>
                  <span>→</span>
                  <Badge variant="outline">Stallion Matching</Badge>
                  <span>→</span>
                  <Badge variant="outline">Genetic Analysis</Badge>
                  <span>→</span>
                  <Badge variant="outline">Breeding Event</Badge>
                  <span>→</span>
                  <Badge variant="outline">Pregnancy Confirmation</Badge>
                  <span>→</span>
                  <Badge variant="outline">Monitoring</Badge>
                  <span>→</span>
                  <Badge variant="outline">Foaling</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Contract Management Flow</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">Initial Inquiry</Badge>
                  <span>→</span>
                  <Badge variant="outline">Availability Check</Badge>
                  <span>→</span>
                  <Badge variant="outline">Contract Creation</Badge>
                  <span>→</span>
                  <Badge variant="outline">Booking Confirmation</Badge>
                  <span>→</span>
                  <Badge variant="outline">Service Delivery</Badge>
                  <span>→</span>
                  <Badge variant="outline">Follow-up</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Heat Cycle Monitoring</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">Cycle Start</Badge>
                  <span>→</span>
                  <Badge variant="outline">Daily Monitoring</Badge>
                  <span>→</span>
                  <Badge variant="outline">Optimal Window</Badge>
                  <span>→</span>
                  <Badge variant="outline">Breeding Decision</Badge>
                  <span>→</span>
                  <Badge variant="outline">Post-Breeding</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Troubleshooting & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Common Issues</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Cannot find horse in breeding forms</h5>
                    <p className="text-xs text-muted-foreground">
                      Ensure the horse is registered in the Horse Registry first. Only registered horses appear in breeding forms.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Genetic analysis not showing results</h5>
                    <p className="text-xs text-muted-foreground">
                      Check that both stallion and mare have complete pedigree information and genetic profiles.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Contract booking conflicts</h5>
                    <p className="text-xs text-muted-foreground">
                      Verify stallion availability schedule and check for existing bookings on the requested dates.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Getting Help</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Online Help Center
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingSystemGuide;
