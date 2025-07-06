import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

interface DepartmentsSectionProps {
  control: Control<any>;
  selectedDepartments: string[];
  setSelectedDepartments: (departments: string[]) => void;
}

const departments = [
  "Human Resources",
  "Finance",
  "Operations",
  "Training",
  "Veterinary",
  "Stable Management",
  "Breeding",
  "Administration",
  "Security",
  "Maintenance"
];

export const DepartmentsSection = ({ 
  control, 
  selectedDepartments, 
  setSelectedDepartments 
}: DepartmentsSectionProps) => {
  const { t } = useLanguage();
  
  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department]);
    } else {
      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
    }
  };

  return (
    <div className="space-y-4">
      <FormLabel>{t('hr.departments')}</FormLabel>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((department) => (
          <div key={department} className="flex items-center space-x-2 rtl:space-x-reverse rtl:flex-row-reverse">
            <Checkbox
              id={department}
              checked={selectedDepartments.includes(department)}
              onCheckedChange={(checked) => 
                handleDepartmentChange(department, checked as boolean)
              }
            />
            <label
              htmlFor={department}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl:text-right"
            >
              {department}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};