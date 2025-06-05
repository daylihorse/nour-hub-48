
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertTriangle, Database, Users, Calendar } from "lucide-react";

interface IntegrationTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  details?: string;
}

const IntegrationTestSuite = () => {
  const [dataTests, setDataTests] = useState<IntegrationTest[]>([
    {
      id: "horse-breeding-link",
      name: "Horse-Breeding Data Link",
      description: "Verify breeding records connect to horse profiles",
      status: "pending"
    },
    {
      id: "stallion-mare-relation",
      name: "Stallion-Mare Relationships", 
      description: "Test breeding pair creation and validation",
      status: "pending"
    },
    {
      id: "pregnancy-tracking",
      name: "Pregnancy Timeline Tracking",
      description: "Validate pregnancy milestone tracking",
      status: "pending"
    },
    {
      id: "genetic-data-flow",
      name: "Genetic Analysis Data Flow",
      description: "Test genetic analysis with breeding data",
      status: "pending"
    }
  ]);

  const [workflowTests, setWorkflowTests] = useState<IntegrationTest[]>([
    {
      id: "breeding-workflow",
      name: "Complete Breeding Workflow",
      description: "From stallion selection to foal registration",
      status: "pending"
    },
    {
      id: "contract-management",
      name: "Contract Management Flow",
      description: "Booking to completion workflow",
      status: "pending"
    },
    {
      id: "heat-cycle-breeding",
      name: "Heat Cycle to Breeding",
      description: "Optimal timing workflow integration",
      status: "pending"
    },
    {
      id: "pregnancy-foaling",
      name: "Pregnancy to Foaling",
      description: "Complete pregnancy management workflow",
      status: "pending"
    }
  ]);

  const [performanceTests, setPerformanceTests] = useState<IntegrationTest[]>([
    {
      id: "large-dataset-load",
      name: "Large Dataset Loading",
      description: "Performance with 1000+ breeding records",
      status: "pending"
    },
    {
      id: "concurrent-users",
      name: "Concurrent User Access",
      description: "Multiple users accessing breeding data",
      status: "pending"
    },
    {
      id: "real-time-updates",
      name: "Real-time Data Updates",
      description: "Live updates across breeding modules",
      status: "pending"
    },
    {
      id: "search-performance",
      name: "Search & Filter Performance",
      description: "Complex queries across breeding data",
      status: "pending"
    }
  ]);

  const runTest = async (testId: string, category: 'data' | 'workflow' | 'performance') => {
    const setTests = category === 'data' ? setDataTests : 
                     category === 'workflow' ? setWorkflowTests : setPerformanceTests;

    // Set test to running
    setTests(prev => 
      prev.map(test => 
        test.id === testId 
          ? { ...test, status: 'running' }
          : test
      )
    );

    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate result
    const outcomes: IntegrationTest['status'][] = ['passed', 'failed'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    setTests(prev => 
      prev.map(test => 
        test.id === testId 
          ? { 
              ...test, 
              status: result,
              details: result === 'passed' 
                ? "Integration test completed successfully"
                : "Integration test failed - check data connections"
            }
          : test
      )
    );
  };

  const getStatusIcon = (status: IntegrationTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default: return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const TestCard = ({ 
    test, 
    category 
  }: { 
    test: IntegrationTest; 
    category: 'data' | 'workflow' | 'performance' 
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(test.status)}
              <h3 className="font-medium">{test.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
            {test.details && (
              <p className="text-xs text-muted-foreground italic">{test.details}</p>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => runTest(test.id, category)}
            disabled={test.status === 'running'}
          >
            {test.status === 'running' ? 'Running...' : 'Test'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integration Test Suite</h2>
        <p className="text-muted-foreground">
          Comprehensive testing of breeding system integration points
        </p>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Integration
          </TabsTrigger>
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Workflows
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTests.map(test => (
              <TestCard key={test.id} test={test} category="data" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflowTests.map(test => (
              <TestCard key={test.id} test={test} category="workflow" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceTests.map(test => (
              <TestCard key={test.id} test={test} category="performance" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationTestSuite;
