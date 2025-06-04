
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TestCompletionSectionProps {
  completedDate: string;
  onDateChange: (date: string) => void;
}

const TestCompletionSection = ({ completedDate, onDateChange }: TestCompletionSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Completion Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="completedDate">Completion Date</Label>
          <Input
            id="completedDate"
            type="date"
            value={completedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCompletionSection;
