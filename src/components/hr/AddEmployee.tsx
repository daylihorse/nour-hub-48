
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";
import { EmploymentDetailsSection } from "./form-sections/EmploymentDetailsSection";
import { DepartmentsSection } from "./form-sections/DepartmentsSection";
import { PhoneSection } from "./form-sections/PhoneSection";

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  firstNameArabic: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  lastNameArabic: z.string().optional(),
  nickname: z.string().optional(),
  nicknameArabic: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  position: z.string().min(1, "Position is required"),
  positions: z.string().optional(),
  otherPosition: z.string().optional(),
  department: z.array(z.string()).min(1, "At least one department is required"),
  hireDate: z.date(),
  salary: z.number().min(0).optional(),
  currency: z.string().optional(),
  salaryType: z.enum(["daily", "monthly"]).optional(),
  status: z.enum(["active", "inactive", "on-leave"]),
  phones: z.array(z.object({
    id: z.string(),
    countryCode: z.string(),
    number: z.string(),
    hasWhatsapp: z.boolean(),
    hasTelegram: z.boolean(),
  })).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

interface AddEmployeeProps {
  onSubmit: (employee: Employee) => void;
}

const AddEmployee = ({ onSubmit }: AddEmployeeProps) => {
  const { toast } = useToast();
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [hireDate, setHireDate] = useState<Date>(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      status: "active" as const,
      department: [],
      hireDate: new Date(),
      currency: "USD",
      salaryType: "monthly" as const,
      phones: [{
        id: "1",
        countryCode: "1",
        number: "",
        hasWhatsapp: false,
        hasTelegram: false
      }]
    }
  });

  const handleFormSubmit = (data: any) => {
    const employeeData: Employee = {
      id: crypto.randomUUID(),
      ...data,
      department: selectedDepartments,
      hireDate: hireDate,
      phones: data.phones?.filter((phone: any) => phone.number.trim() !== "") || []
    };

    onSubmit(employeeData);
    reset();
    setSelectedDepartments([]);
    setHireDate(new Date());
    
    toast({
      title: "Employee Added",
      description: `${data.firstName} ${data.lastName} has been added successfully.`,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <PersonalInfoSection 
        control={control}
      />

      <EmploymentDetailsSection 
        control={control}
        date={hireDate}
        setDate={setHireDate}
      />

      <DepartmentsSection 
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
      />

      <PhoneSection 
        control={control}
      />

      <Button type="submit" className="w-full">
        Add Employee
      </Button>
    </form>
  );
};

export default AddEmployee;
