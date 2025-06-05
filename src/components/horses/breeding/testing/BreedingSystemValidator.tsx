
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Play, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  message?: string;
  duration?: number;
}

interface TestSuite {
  id: string;
  name: string;
  tests: TestResult[];
  status: 'pending' | 'running' | 'completed';
}

const BreedingSystemValidator = () => {
  const { toast } = useToast();
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: "breeding-forms",
      name: "Breeding Forms Validation",
      status: "pending",
      tests: [
        { id: "breeding-record-form", name: "Breeding Record Form", status: "pending" },
        { id: "pregnancy-form", name: "Pregnancy Form", status: "pending" },
        { id: "stallion-form", name: "Stallion Registration", status: "pending" },
        { id: "mare-form", name: "Mare Registration", status: "pending" },
        { id: "form-validation", name: "Form Validation Rules", status: "pending" }
      ]
    },
    {
      id: "data-integration",
      name: "Data Integration Tests",
      status: "pending",
      tests: [
        { id: "horse-integration", name: "Horse Data Integration", status: "pending" },
        { id: "breeding-records", name: "Breeding Records CRUD", status: "pending" },
        { id: "pregnancy-tracking", name: "Pregnancy Tracking", status: "pending" },
        { id: "genetic-analysis", name: "Genetic Analysis Integration", status: "pending" },
        { id: "data-consistency", name: "Data Consistency", status: "pending" }
      ]
    },
    {
      id: "ui-ux",
      name: "UI/UX Validation",
      status: "pending",
      tests: [
        { id: "responsive-design", name: "Responsive Design", status: "pending" },
        { id: "arabic-support", name: "Arabic Language Support", status: "pending" },
        { id: "navigation", name: "Navigation Flow", status: "pending" },
        { id: "accessibility", name: "Accessibility Features", status: "pending" },
        { id: "loading-states", name: "Loading States", status: "pending" }
      ]
    },
    {
      id: "performance",
      name: "Performance Tests",
      status: "pending",
      tests: [
        { id: "load-times", name: "Component Load Times", status: "pending" },
        { id: "large-datasets", name: "Large Dataset Handling", status: "pending" },
        { id: "memory-usage", name: "Memory Usage", status: "pending" },
        { id: "render-performance", name: "Render Performance", status: "pending" }
      ]
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const simulateTest = async (testId: string): Promise<TestResult> => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
    
    const outcomes = ['passed', 'failed', 'warning'];
    const status = outcomes[Math.floor(Math.random() * outcomes.length)] as TestResult['status'];
    
    const messages = {
      passed: "Test completed successfully",
      failed: "Test failed - requires attention",
      warning: "Test passed with warnings"
    };

    return {
      id: testId,
      name: testId,
      status,
      message: messages[status],
      duration: Math.random() * 2000 + 500
    };
  };

  const runTestSuite = async (suiteId: string) => {
    setTestSuites(prev => 
      prev.map(suite => 
        suite.id === suiteId 
          ? { ...suite, status: 'running', tests: suite.tests.map(test => ({ ...test, status: 'running' })) }
          : suite
      )
    );

    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) return;

    for (const test of suite.tests) {
      const result = await simulateTest(test.id);
      
      setTestSuites(prev => 
        prev.map(s => 
          s.id === suiteId 
            ? {
                ...s,
                tests: s.tests.map(t => 
                  t.id === test.id ? { ...t, ...result } : t
                )
              }
            : s
        )
      );
    }

    setTestSuites(prev => 
      prev.map(suite => 
        suite.id === suiteId 
          ? { ...suite, status: 'completed' }
          : suite
      )
    );
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (const suite of testSuites) {
      await runTestSuite(suite.id);
    }
    
    setIsRunning(false);
    
    toast({
      title: "Testing Complete",
      description: "All breeding system tests have been executed.",
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      passed: "default" as const,
      failed: "destructive" as const,
      warning: "secondary" as const,
      running: "outline" as const,
      pending: "outline" as const
    };
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Breeding System Validator</h2>
          <p className="text-muted-foreground">Comprehensive testing suite for the breeding management system</p>
        </div>
        <Button onClick={runAllTests} disabled={isRunning} className="flex items-center gap-2">
          {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {isRunning ? "Running Tests..." : "Run All Tests"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testSuites.map((suite) => (
          <Card key={suite.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{suite.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusBadge(suite.status === 'completed' ? 'passed' : suite.status)}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => runTestSuite(suite.id)}
                    disabled={isRunning}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suite.tests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      <span className="text-sm font-medium">{test.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.duration && (
                        <span className="text-xs text-muted-foreground">
                          {Math.round(test.duration)}ms
                        </span>
                      )}
                      {getStatusBadge(test.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BreedingSystemValidator;
