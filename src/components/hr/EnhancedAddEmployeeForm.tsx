import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Import form sections
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";
import { PhoneSection } from "./form-sections/PhoneSection";
import { AddressSection } from "./form-sections/AddressSection";
import { EmploymentDetailsSection } from "./form-sections/EmploymentDetailsSection";
import { DepartmentsSection } from "./form-sections/DepartmentsSection";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  firstNameArabic: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  lastNameArabic: z.string().optional(),
  nickname: z.string().optional(),
  nicknameArabic: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
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
  position: z.string().min(1, "Position is required"),
  otherPosition: z.string().optional(),
  hireDate: z.date(),
  status: z.enum(['active', 'inactive', 'on-leave']),
  salary: z.number().optional(),
  currency: z.string().default("USD"),
  salaryType: z.enum(['daily', 'monthly']).default("monthly"),
});

type FormValues = z.infer<typeof formSchema>;

interface EnhancedAddEmployeeFormProps {
  onEmployeeAdded?: (employee: any) => void;
}

const EnhancedAddEmployeeForm = ({ onEmployeeAdded }: EnhancedAddEmployeeFormProps) => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());

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
      phones: [{
        id: "1",
        countryCode: "+1",
        number: "",
        hasWhatsapp: false,
        hasTelegram: false,
      }],
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      position: "",
      otherPosition: "",
      hireDate: new Date(),
      status: "active",
      salary: undefined,
      currency: "USD",
      salaryType: "monthly",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Employee data:', { ...data, departments: selectedDepartments });
      
      form.reset();
      setSelectedDepartments([]);
      toast({
        title: t('hr.submit'),
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
      });
      
      // If callback provided, call it
      if (onEmployeeAdded) {
        onEmployeeAdded({ ...data, departments: selectedDepartments });
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
          <UserPlus className="h-5 w-5" />
          {t('hr.add_employee')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className={`grid w-full grid-cols-4 ${language === 'ar' ? 'rtl:grid-flow-col-reverse' : ''}`}>
                <TabsTrigger value="personal" className="rtl:text-right">
                  {t('hr.personal_information')}
                </TabsTrigger>
                <TabsTrigger value="contact" className="rtl:text-right">
                  {t('hr.contact_information')}
                </TabsTrigger>
                <TabsTrigger value="address" className="rtl:text-right">
                  {t('hr.address_information')}
                </TabsTrigger>
                <TabsTrigger value="employment" className="rtl:text-right">
                  {t('hr.employment_details')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <PersonalInfoSection control={form.control} />
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <PhoneSection control={form.control} />
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <AddressSection control={form.control} />
              </TabsContent>

              <TabsContent value="employment" className="space-y-4">
                <EmploymentDetailsSection 
                  control={form.control} 
                  date={date} 
                  setDate={setDate} 
                />
                <DepartmentsSection 
                  control={form.control}
                  selectedDepartments={selectedDepartments}
                  setSelectedDepartments={setSelectedDepartments}
                />
              </TabsContent>
            </Tabs>

            <div className={`flex gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "..." : t('hr.submit')}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => form.reset()}>
                {t('hr.cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EnhancedAddEmployeeForm;