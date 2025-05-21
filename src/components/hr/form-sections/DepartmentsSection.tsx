
import { useState } from "react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface DepartmentsSectionProps {
  selectedDepartments: string[];
  setSelectedDepartments: (deps: string[]) => void;
}

const departments = [
  "Horses",
  "Laboratory",
  "Clinic",
  "Finance",
  "HR",
  "Inventory",
  "Training",
  "Maintenance",
];

export const DepartmentsSection = ({ selectedDepartments, setSelectedDepartments }: DepartmentsSectionProps) => {
  const toggleDepartment = (department: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter(d => d !== department)
        : [...selectedDepartments, department]
    );
  };

  return (
    <div>
      <FormLabel className="block mb-2">Departments</FormLabel>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {departments.map((dept) => (
            <div key={dept} className="flex items-center space-x-2">
              <Checkbox 
                id={`dept-${dept}`}
                checked={selectedDepartments.includes(dept)}
                onCheckedChange={() => toggleDepartment(dept)}
              />
              <label 
                htmlFor={`dept-${dept}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {dept}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedDepartments.length > 0 ? (
            selectedDepartments.map(dept => (
              <Badge 
                key={dept} 
                variant="secondary" 
                className="flex items-center gap-1"
              >
                {dept}
                <button 
                  type="button"
                  onClick={() => toggleDepartment(dept)}
                  className="ml-1 h-4 w-4 rounded-full bg-muted/20 inline-flex items-center justify-center text-muted-foreground hover:bg-muted"
                >
                  ×
                </button>
              </Badge>
            ))
          ) : (
            <FormDescription>No departments selected</FormDescription>
          )}
        </div>
      </div>
    </div>
  );
};
