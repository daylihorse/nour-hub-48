
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, TestTube, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceTemplateStep2Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ServiceTemplateStep2 = ({ data, onDataChange }: ServiceTemplateStep2Props) => {
  const [selectedTests, setSelectedTests] = useState(data.testsServices || []);

  // Mock available tests
  const availableTests = [
    { id: "cbc", name: "Complete Blood Count", nameAr: "تعداد الدم الكامل", category: "Hematology", duration: 2 },
    { id: "bmp", name: "Basic Metabolic Panel", nameAr: "لوحة التمثيل الغذائي الأساسية", category: "Chemistry", duration: 3 },
    { id: "liver", name: "Liver Function Test", nameAr: "فحص وظائف الكبد", category: "Chemistry", duration: 2 },
    { id: "thyroid", name: "Thyroid Panel", nameAr: "لوحة الغدة الدرقية", category: "Endocrinology", duration: 4 },
    { id: "urinalysis", name: "Urinalysis", nameAr: "تحليل البول", category: "Clinical", duration: 1 },
    { id: "parasite", name: "Parasite Screen", nameAr: "فحص الطفيليات", category: "Microbiology", duration: 6 },
    { id: "drug", name: "Drug Screen", nameAr: "فحص المخدرات", category: "Toxicology", duration: 8 },
    { id: "cardiac", name: "Cardiac Markers", nameAr: "علامات القلب", category: "Chemistry", duration: 3 }
  ];

  const handleTestSelection = (test: any, checked: boolean) => {
    let updatedTests;
    if (checked) {
      updatedTests = [...selectedTests, test];
    } else {
      updatedTests = selectedTests.filter((t: any) => t.id !== test.id);
    }
    
    setSelectedTests(updatedTests);
    onDataChange({
      ...data,
      testsServices: updatedTests
    });
  };

  const isTestSelected = (testId: string) => {
    return selectedTests.some((test: any) => test.id === testId);
  };

  const totalDuration = selectedTests.reduce((total: number, test: any) => total + test.duration, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Available Laboratory Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableTests.map((test) => (
                  <div
                    key={test.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      isTestSelected(test.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Checkbox
                          checked={isTestSelected(test.id)}
                          onCheckedChange={(checked) => handleTestSelection(test, checked as boolean)}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{test.name}</div>
                          <div className="text-sm text-muted-foreground" dir="rtl">{test.nameAr}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{test.category}</Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {test.duration}h
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Selected Tests Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Total Tests</div>
                    <div className="text-2xl font-bold text-blue-600">{selectedTests.length}</div>
                  </div>
                  <div>
                    <div className="font-medium">Est. Duration</div>
                    <div className="text-2xl font-bold text-green-600">{totalDuration}h</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Selected Tests:</div>
                  {selectedTests.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedTests.map((test: any) => (
                        <div key={test.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="text-sm font-medium">{test.name}</div>
                            <div className="text-xs text-muted-foreground">{test.duration}h</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTestSelection(test, false)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No tests selected</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplateStep2;
