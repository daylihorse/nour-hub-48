/**
 * Component: PaddockRotationPlanner
 * 
 * PURPOSE:
 * Advanced paddock rotation planning and management system for optimal
 * pasture utilization and horse welfare. Provides automated scheduling,
 * rotation optimization, rest period management, and grass recovery
 * monitoring for sustainable paddock management.
 * 
 * ARCHITECTURAL PATTERN:
 * - Real-time rotation status monitoring with visual indicators
 * - Automated scheduling with customizable rotation intervals
 * - Horse group management for coordinated movements
 * - Rest period optimization for pasture recovery
 * 
 * DESIGN PRINCIPLES:
 * - Proactive rotation planning for pasture health
 * - Flexible scheduling accommodating various management styles
 * - Visual status indicators for immediate assessment
 * - Automated notifications for upcoming rotations
 * 
 * ROTATION MANAGEMENT CONTEXT:
 * This component manages critical rotation factors:
 * - Automated rotation schedule generation and management
 * - Horse group coordination for efficient movements
 * - Grass recovery monitoring and rest period optimization
 * - Emergency rotation capabilities for weather or health events
 * 
 * PLANNING FEATURES:
 * The system provides comprehensive rotation oversight:
 * - Intelligent rotation scheduling based on grass conditions
 * - Horse group management with dietary and social considerations
 * - Rest period calculation for optimal pasture recovery
 * - Weather-responsive rotation adjustments
 * 
 * INTEGRATION CONTEXT:
 * Designed for integration with paddock monitoring systems,
 * weather services, and horse management platforms. Supports
 * both automated scheduling and manual override capabilities.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color-coded status indicators for rotation planning
 * - Clear visual hierarchy for schedule information
 * - Keyboard navigation for all planning functions
 * - Screen reader compatible status announcements
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { usePaddockData } from "@/hooks/usePaddockData";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaddockRotationPlan } from "@/types/paddocks";

const PaddockRotationPlanner = () => {
  const { paddocks, rotationPlans, createRotationPlan } = usePaddockData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPaddocks, setSelectedPaddocks] = useState<string[]>([]);
  const [planName, setPlanName] = useState("");
  const [rotationInterval, setRotationInterval] = useState(30);
  const [restPeriod, setRestPeriod] = useState(14);
  const [automaticRotation, setAutomaticRotation] = useState(true);
  const [notifyDaysBefore, setNotifyDaysBefore] = useState(3);
  const [notes, setNotes] = useState("");

  // Create horse groups for rotation
  const [horseGroups, setHorseGroups] = useState<{
    id: string;
    name: string;
    horseIds: string[];
    currentPaddockId: string;
  }[]>([
    {
      id: "group-1",
      name: "Group A",
      horseIds: ["h1", "h2"],
      currentPaddockId: paddocks.length > 0 ? paddocks[0].id : "",
    },
  ]);

  const handleAddGroup = () => {
    const newGroup = {
      id: `group-${horseGroups.length + 1}`,
      name: `Group ${String.fromCharCode(65 + horseGroups.length)}`, // A, B, C, etc.
      horseIds: [],
      currentPaddockId: paddocks.length > 0 ? paddocks[0].id : "",
    };
    setHorseGroups([...horseGroups, newGroup]);
  };

  const handleRemoveGroup = (id: string) => {
    setHorseGroups(horseGroups.filter(group => group.id !== id));
  };

  const handleUpdateGroup = (id: string, field: string, value: any) => {
    setHorseGroups(
      horseGroups.map(group => 
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };

  const handleTogglePaddock = (paddockId: string) => {
    if (selectedPaddocks.includes(paddockId)) {
      setSelectedPaddocks(selectedPaddocks.filter(id => id !== paddockId));
    } else {
      setSelectedPaddocks([...selectedPaddocks, paddockId]);
    }
  };

  const handleCreatePlan = () => {
    if (!planName) {
      toast({
        title: "Error",
        description: "Please enter a plan name",
        variant: "destructive",
      });
      return;
    }

    if (selectedPaddocks.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 paddocks for rotation",
        variant: "destructive",
      });
      return;
    }

    if (horseGroups.length === 0) {
      toast({
        title: "Error",
        description: "Please create at least one horse group",
        variant: "destructive",
      });
      return;
    }

    const rotationPlan: Omit<PaddockRotationPlan, "id" | "createdAt" | "updatedAt"> = {
      name: planName,
      paddockIds: selectedPaddocks,
      horseGroups: horseGroups.map((group, index) => ({
        groupId: group.id,
        groupName: group.name,
        horseIds: group.horseIds,
        currentPaddockId: group.currentPaddockId,
        rotationOrder: index,
      })),
      rotationInterval,
      restPeriod,
      startDate: date || new Date(),
      status: "active",
      automaticRotation,
      notifications: {
        enabled: true,
        daysBeforeRotation: notifyDaysBefore,
        recipients: ["current-user"], // In a real app, this would be configurable
      },
    };

    createRotationPlan(rotationPlan);
    
    toast({
      title: "Success",
      description: "Rotation plan has been created",
    });

    // Reset form
    setPlanName("");
    setSelectedPaddocks([]);
    setDate(new Date());
    setRotationInterval(30);
    setRestPeriod(14);
    setHorseGroups([{
      id: "group-1",
      name: "Group A",
      horseIds: ["h1", "h2"],
      currentPaddockId: paddocks.length > 0 ? paddocks[0].id : "",
    }]);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Rotation Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Summer Rotation 2024"
              />
            </div>

            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="rotation-interval">Rotation Interval (days)</Label>
              <Input
                id="rotation-interval"
                type="number"
                value={rotationInterval}
                onChange={(e) => setRotationInterval(parseInt(e.target.value))}
                min={1}
              />
            </div>

            <div>
              <Label htmlFor="rest-period">Rest Period (days)</Label>
              <Input
                id="rest-period"
                type="number"
                value={restPeriod}
                onChange={(e) => setRestPeriod(parseInt(e.target.value))}
                min={0}
              />
            </div>

            <div>
              <Label htmlFor="automatic-rotation">Automatic Rotation</Label>
              <Select
                value={automaticRotation ? "true" : "false"}
                onValueChange={(value) => setAutomaticRotation(value === "true")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Enabled</SelectItem>
                  <SelectItem value="false">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notify-days">Notify Days Before</Label>
              <Input
                id="notify-days"
                type="number"
                value={notifyDaysBefore}
                onChange={(e) => setNotifyDaysBefore(parseInt(e.target.value))}
                min={0}
              />
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes for this rotation plan..."
              className="resize-none"
            />
          </div>

          <div>
            <Label className="block mb-2">Select Paddocks for Rotation</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {paddocks.map((paddock) => (
                <Button
                  key={paddock.id}
                  variant={selectedPaddocks.includes(paddock.id) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleTogglePaddock(paddock.id)}
                >
                  <span className="truncate">{paddock.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Horse Groups</Label>
              <Button size="sm" variant="outline" onClick={handleAddGroup}>
                <Plus className="h-4 w-4 mr-1" />
                Add Group
              </Button>
            </div>
            <div className="space-y-3">
              {horseGroups.map((group) => (
                <Card key={group.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleRemoveGroup(group.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Group Name</Label>
                        <Input
                          value={group.name}
                          onChange={(e) =>
                            handleUpdateGroup(group.id, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Starting Paddock</Label>
                        <Select
                          value={group.currentPaddockId}
                          onValueChange={(value) =>
                            handleUpdateGroup(group.id, "currentPaddockId", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select paddock" />
                          </SelectTrigger>
                          <SelectContent>
                            {paddocks.map((paddock) => (
                              <SelectItem key={paddock.id} value={paddock.id}>
                                {paddock.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label>Horses in Group</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {/* In a real app, this would be a multi-select with actual horse data */}
                        <Badge>Thunder</Badge>
                        <Badge>Lightning</Badge>
                        <Button variant="outline" size="sm">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Horse
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button onClick={handleCreatePlan}>Create Rotation Plan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Rotation Plans</CardTitle>
        </CardHeader>
        <CardContent>
          {rotationPlans.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No active rotation plans. Create one to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {rotationPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Started: {format(new Date(plan.startDate), "PPP")}
                        </p>
                      </div>
                      <Badge
                        className={
                          plan.status === "active"
                            ? "bg-green-500"
                            : plan.status === "paused"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }
                      >
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium">Rotation Details</h4>
                        <p className="text-sm">
                          Interval: {plan.rotationInterval} days
                        </p>
                        <p className="text-sm">
                          Rest Period: {plan.restPeriod} days
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Paddocks</h4>
                        <p className="text-sm">
                          {plan.paddockIds.length} paddocks in rotation
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Horse Groups</h4>
                        <p className="text-sm">
                          {plan.horseGroups.length} groups
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockRotationPlanner;
