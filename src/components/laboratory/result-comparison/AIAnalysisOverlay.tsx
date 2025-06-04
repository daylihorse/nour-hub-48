
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Download, Lightbulb } from "lucide-react";

interface AIAnalysisOverlayProps {
  horse: string;
  analysisType: string;
  onClose: () => void;
}

const AIAnalysisOverlay = ({ horse, analysisType, onClose }: AIAnalysisOverlayProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Analysis & Recommendations for {horse}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Positive Trends</span>
                  </div>
                  <ul className="text-sm space-y-1 text-green-700">
                    <li>• Hemoglobin levels showing steady improvement (+7% over 6 months)</li>
                    <li>• Red blood cell count consistently within optimal range</li>
                    <li>• Overall blood profile indicates good health</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Areas to Monitor</span>
                  </div>
                  <ul className="text-sm space-y-1 text-yellow-700">
                    <li>• White blood cell count showing slight upward trend</li>
                    <li>• Consider monitoring for signs of inflammation</li>
                    <li>• Schedule follow-up in 30 days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-600" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Insight</Badge>
                  <div>
                    <p className="font-medium">Seasonal Pattern Detected</p>
                    <p className="text-sm text-muted-foreground">
                      Blood parameters show consistent seasonal variation, with hemoglobin levels typically higher in spring months.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">Pattern</Badge>
                  <div>
                    <p className="font-medium">Stable Baseline Established</p>
                    <p className="text-sm text-muted-foreground">
                      Four consecutive tests show consistent baseline values, indicating stable health status.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Badge variant="outline" className="bg-green-100 text-green-800">Success</Badge>
                  <div>
                    <p className="font-medium">Excellent Health Trajectory</p>
                    <p className="text-sm text-muted-foreground">
                      All parameters remain within optimal ranges with positive trending indicators.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Continue Current Protocol</p>
                    <p className="text-sm text-muted-foreground">
                      Maintain current nutrition and exercise regimen as it's showing positive results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Schedule Routine Follow-up</p>
                    <p className="text-sm text-muted-foreground">
                      Next blood work recommended in 3 months to maintain monitoring schedule.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Monitor for Changes</p>
                    <p className="text-sm text-muted-foreground">
                      Watch for any sudden changes in activity level or appetite that might indicate health issues.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
            <Button onClick={onClose}>
              Close Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisOverlay;
