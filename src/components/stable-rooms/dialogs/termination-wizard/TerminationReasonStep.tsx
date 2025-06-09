
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Assignment } from "@/types/stableRooms";
import { TerminationData } from "../EnhancedEndAssignmentDialog";

interface TerminationReasonStepProps {
  assignment: Assignment;
  terminationData: TerminationData;
  updateTerminationData: (updates: Partial<TerminationData>) => void;
  roomNumber?: string;
}

const terminationCategories = [
  { id: 'planned', name: 'Planned Departure', color: 'bg-green-500' },
  { id: 'emergency', name: 'Emergency Evacuation', color: 'bg-red-500' },
  { id: 'medical', name: 'Medical Transfer', color: 'bg-yellow-500' },
  { id: 'behavioral', name: 'Behavioral Issues', color: 'bg-orange-500' },
  { id: 'contract', name: 'Contract Completion', color: 'bg-blue-500' },
  { id: 'owner_request', name: 'Owner Request', color: 'bg-purple-500' }
];

const terminationReasons = {
  planned: [
    'Boarding period completed',
    'Training program finished',
    'Seasonal relocation',
    'Owner relocation'
  ],
  emergency: [
    'Facility emergency',
    'Weather evacuation',
    'Health quarantine',
    'Safety concerns'
  ],
  medical: [
    'Veterinary treatment required',
    'Specialized care needed',
    'Recovery at different facility',
    'Isolation required'
  ],
  behavioral: [
    'Aggression towards staff',
    'Damage to property',
    'Disruption to other animals',
    'Safety risk'
  ],
  contract: [
    'Lease agreement ended',
    'Service contract completed',
    'Trial period concluded',
    'Payment default'
  ],
  owner_request: [
    'Change of plans',
    'Financial constraints',
    'Dissatisfaction with service',
    'Moving to different facility'
  ]
};

const TerminationReasonStep = ({ 
  assignment, 
  terminationData, 
  updateTerminationData,
  roomNumber 
}: TerminationReasonStepProps) => {
  const selectedCategory = terminationCategories.find(cat => cat.id === terminationData.category);
  const availableReasons = terminationData.category ? terminationReasons[terminationData.category as keyof typeof terminationReasons] || [] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Termination Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {terminationCategories.map((category) => (
              <div
                key={category.id}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${terminationData.category === category.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-muted-foreground'
                  }
                `}
                onClick={() => {
                  updateTerminationData({ 
                    category: category.id,
                    reason: '' // Reset reason when category changes
                  });
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                {terminationData.category === category.id && (
                  <Badge variant="outline" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {terminationData.category && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Specific Reason</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reason">Select the specific reason for termination</Label>
              <Select 
                value={terminationData.reason} 
                onValueChange={(value) => updateTerminationData({ reason: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a reason..." />
                </SelectTrigger>
                <SelectContent>
                  {availableReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other (specify in notes)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={terminationData.notes}
                onChange={(e) => updateTerminationData({ notes: e.target.value })}
                placeholder="Provide any additional details about the termination..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCategory && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${selectedCategory.color}`} />
            <span className="font-medium">Category: {selectedCategory.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This will help us ensure proper procedures are followed and documentation is completed.
          </p>
        </div>
      )}
    </div>
  );
};

export default TerminationReasonStep;
