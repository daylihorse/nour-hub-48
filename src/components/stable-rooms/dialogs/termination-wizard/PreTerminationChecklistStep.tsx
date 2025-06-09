
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Wrench,
  DollarSign,
  FileText,
  Truck,
  Shield
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { TerminationData } from "../EnhancedEndAssignmentDialog";

interface PreTerminationChecklistStepProps {
  assignment: Assignment;
  terminationData: TerminationData;
  updateTerminationData: (updates: Partial<TerminationData>) => void;
  roomNumber?: string;
}

const checklistItems = [
  {
    id: 'room_inspection',
    title: 'Room Inspection Completed',
    description: 'Physical inspection of the room for damage, cleanliness, and condition',
    icon: Eye,
    required: true,
    category: 'Facility'
  },
  {
    id: 'equipment_check',
    title: 'Equipment & Fixtures Check',
    description: 'Verify all equipment is present and in good condition',
    icon: Wrench,
    required: true,
    category: 'Equipment'
  },
  {
    id: 'billing_cleared',
    title: 'Billing & Payments Cleared',
    description: 'All outstanding payments settled and final billing completed',
    icon: DollarSign,
    required: true,
    category: 'Financial'
  },
  {
    id: 'documentation_collected',
    title: 'Documentation Collected',
    description: 'All relevant documents and certificates collected',
    icon: FileText,
    required: false,
    category: 'Documentation'
  },
  {
    id: 'transportation_arranged',
    title: 'Transportation Arranged',
    description: 'Transportation has been organized for departure',
    icon: Truck,
    required: false,
    category: 'Logistics'
  },
  {
    id: 'insurance_notified',
    title: 'Insurance Notified',
    description: 'Insurance providers notified of termination if applicable',
    icon: Shield,
    required: false,
    category: 'Insurance'
  },
  {
    id: 'emergency_contacts',
    title: 'Emergency Contacts Updated',
    description: 'Emergency contact information updated for post-departure',
    icon: AlertTriangle,
    required: false,
    category: 'Safety'
  }
];

const PreTerminationChecklistStep = ({ 
  assignment, 
  terminationData, 
  updateTerminationData 
}: PreTerminationChecklistStepProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Facility', 'Equipment', 'Financial']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const updateChecklistItem = (itemId: string, checked: boolean) => {
    updateTerminationData({
      checklistItems: {
        ...terminationData.checklistItems,
        [itemId]: checked
      }
    });
  };

  const categories = [...new Set(checklistItems.map(item => item.category))];
  const requiredItems = checklistItems.filter(item => item.required);
  const completedRequired = requiredItems.filter(item => terminationData.checklistItems[item.id]).length;
  const totalRequired = requiredItems.length;

  const getItemsByCategory = (category: string) => {
    return checklistItems.filter(item => item.category === category);
  };

  const getCategoryProgress = (category: string) => {
    const items = getItemsByCategory(category);
    const completed = items.filter(item => terminationData.checklistItems[item.id]).length;
    return { completed, total: items.length };
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Pre-Termination Checklist</span>
            <Badge variant={completedRequired === totalRequired ? "default" : "secondary"}>
              {completedRequired}/{totalRequired} Required Items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Required for termination</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Recommended</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const items = getItemsByCategory(category);
          const progress = getCategoryProgress(category);
          const isExpanded = expandedCategories.includes(category);
          
          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-medium text-left"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {progress.completed}/{progress.total}
                    </Badge>
                    {progress.completed === progress.total ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isChecked = terminationData.checklistItems[item.id] || false;
                      
                      return (
                        <div
                          key={item.id}
                          className={`
                            flex items-start gap-3 p-3 rounded-lg border
                            ${isChecked ? 'border-green-200 bg-green-50' : 'border-muted'}
                          `}
                        >
                          <Checkbox
                            id={item.id}
                            checked={isChecked}
                            onCheckedChange={(checked) => updateChecklistItem(item.id, checked as boolean)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <label 
                                htmlFor={item.id}
                                className={`font-medium cursor-pointer ${isChecked ? 'line-through text-muted-foreground' : ''}`}
                              >
                                {item.title}
                              </label>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Warning for incomplete required items */}
      {completedRequired < totalRequired && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                Complete all required items to proceed with termination
              </span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              {totalRequired - completedRequired} required item(s) remaining
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreTerminationChecklistStep;
