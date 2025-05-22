
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Import form section components
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";
import { PhoneSection } from "./form-sections/PhoneSection";
import { DepartmentsSection } from "./form-sections/DepartmentsSection";
import { EmploymentDetailsSection } from "./form-sections/EmploymentDetailsSection";

interface AddEmployeeProps {
  onSubmit: (employee: Employee) => void;
}

// Create a form schema that matches our Employee interface
const formSchema = z.object({
  firstName: z.string().optional(),
  firstNameArabic: z.string().optional(),
  lastName: z.string().optional(),
  lastNameArabic: z.string().optional(),
  nickname: z.string().optional(),
  nicknameArabic: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phones: z.array(
    z.object({
      id: z.string(),
      countryCode: z.string(),
      number: z.string(),
      hasWhatsapp: z.boolean(),
      hasTelegram: z.boolean(),
    })
  ).default([]),
  position: z.string().optional(),
  positions: z.string().optional(),
  otherPosition: z.string().optional(),
  department: z.array(z.string()),
  hireDate: z.date(),
  status: z.enum(["active", "inactive", "on-leave"]),
  salary: z.number().optional(),
  currency: z.string().optional(),
  salaryType: z.enum(["daily", "monthly"]),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
}).refine(data => {
  // Require at least first name or last name in one language
  return (!!data.firstName || !!data.firstNameArabic) && 
         (!!data.lastName || !!data.lastNameArabic);
}, {
  message: "You must provide at least first name and last name in English or Arabic",
  path: ["firstName"],
});

type FormValues = z.infer<typeof formSchema>;

const AddEmployee = ({ onSubmit }: AddEmployeeProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      firstNameArabic: "",
      lastName: "",
      lastNameArabic: "",
      nickname: "",
      nicknameArabic: "",
      email: "",
      phones: [],
      position: "",
      positions: "",
      otherPosition: "",
      department: [],
      hireDate: new Date(),
      status: "active",
      salary: undefined,
      currency: "USD",
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
    // Parse positions if it exists
    let positions: string[] = [];
    try {
      if (data.positions) {
        positions = JSON.parse(data.positions);
      }
    } catch (e) {
      console.error("Error parsing positions:", e);
    }

    // Ensure each phone object has all required fields with default values if missing
    const formattedPhones = data.phones.map(phone => ({
      id: phone.id || uuidv4(),
      countryCode: phone.countryCode || "",
      number: phone.number || "",
      hasWhatsapp: phone.hasWhatsapp || false,
      hasTelegram: phone.hasTelegram || false
    }));

    const newEmployee: Employee = {
      id: uuidv4(),
      ...data,
      department: selectedDepartments,
      // Add positions to the employee
      position: positions.length > 0 ? positions.join(", ") : data.position || "",
      phones: formattedPhones
    };
    
    onSubmit(newEmployee);
    
    toast({
      title: "Employee Added",
      description: `${data.firstName || data.firstNameArabic} ${data.lastName || data.lastNameArabic} has been added successfully.`,
    });
    
    form.reset();
    setDate(new Date());
    setSelectedDepartments([]);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="bg-muted/20 p-4 rounded-md">
              <PersonalInfoSection control={form.control} />
            </div>
          </div>
          
          {/* Phone Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="bg-muted/20 p-4 rounded-md">
              <PhoneSection control={form.control} />
            </div>
          </div>
          
          {/* Position & Employment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Employment Details</h3>
            <div className="bg-muted/20 p-4 rounded-md">
              <EmploymentDetailsSection 
                control={form.control} 
                date={date} 
                setDate={setDate}
              />
            </div>
          </div>
          
          {/* Departments */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Department Assignment</h3>
            <div className="bg-muted/20 p-4 rounded-md">
              <DepartmentsSection 
                selectedDepartments={selectedDepartments} 
                setSelectedDepartments={setSelectedDepartments}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </form>
    </Form>
  );
};

export default AddEmployee;
