
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";

// Import form section components
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";
import { PhoneSection } from "./form-sections/PhoneSection";
import { DepartmentsSection } from "./form-sections/DepartmentsSection";
import { EmploymentDetailsSection } from "./form-sections/EmploymentDetailsSection";

interface AddEmployeeProps {
  onSubmit: (employee: Employee) => void;
}

const AddEmployee = ({ onSubmit }: AddEmployeeProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  
  const form = useForm<Omit<Employee, "id">>({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      phone: {
        countryCode: "+1",
        number: "",
        hasWhatsapp: false,
        hasTelegram: false
      },
      position: "",
      department: [],
      hireDate: new Date(),
      status: "active",
      salary: undefined,
      salaryType: "monthly",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const newEmployee: Employee = {
      id: uuidv4(),
      ...data,
      department: selectedDepartments,
    };
    
    onSubmit(newEmployee);
    
    toast({
      title: "Employee Added",
      description: `${data.firstName} ${data.lastName} has been added successfully.`,
    });
    
    form.reset();
    setDate(new Date());
    setSelectedDepartments([]);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <PersonalInfoSection control={form.control} />
          
          {/* Phone Information */}
          <PhoneSection control={form.control} />
          
          {/* Position & Employment Details */}
          <EmploymentDetailsSection 
            control={form.control} 
            date={date} 
            setDate={setDate}
          />
          
          {/* Departments */}
          <DepartmentsSection 
            selectedDepartments={selectedDepartments} 
            setSelectedDepartments={setSelectedDepartments}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </form>
    </Form>
  );
};

export default AddEmployee;
