
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { horseFormSchema } from "./form-schema/HorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { arabicFormStages } from "./config/arabicFormStages";
import ArabicFormProgressHeader from "./form-components/ArabicFormProgressHeader";
import ArabicStageNavigation from "./form-components/ArabicStageNavigation";
import ArabicStageContentRenderer from "./form-components/ArabicStageContentRenderer";
import ArabicFormNavigationButtons from "./form-components/ArabicFormNavigationButtons";

interface ArabicAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const ArabicAddHorseForm = ({ onSave, onCancel }: ArabicAddHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const form = useForm<HorseFormData>({
    resolver: zodResolver(horseFormSchema),
    defaultValues: {
      name: "",
      breed: "",
      gender: "mare",
      birthDate: new Date(),
      color: "",
      ownerType: "individual",
      ownerName: "",
      ownerContact: "",
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      trainingLevel: "untrained",
      insured: false,
      images: [],
      documents: [],
      status: "active",
    },
    mode: "onChange",
  });

  const progress = ((completedStages.size + (currentStage + 1)) / arabicFormStages.length) * 100;

  const validateCurrentStage = async () => {
    const stage = arabicFormStages[currentStage];
    const isValid = await form.trigger(stage.fields as any);
    
    if (isValid) {
      setCompletedStages(prev => new Set(prev).add(currentStage));
      return true;
    }
    return false;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStage();
    if (isValid && currentStage < arabicFormStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSubmit = async (data: HorseFormData) => {
    try {
      await onSave(data);
      toast({
        title: "نجح التسجيل",
        description: `تم تسجيل ${data.name} بنجاح.`,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الحصان. حاول مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6" dir="rtl">
      <ArabicFormProgressHeader 
        currentStage={currentStage}
        formStages={arabicFormStages}
        progress={progress}
      />

      <ArabicStageNavigation
        formStages={arabicFormStages}
        currentStage={currentStage}
        completedStages={completedStages}
        onStageClick={setCurrentStage}
      />

      <FormProvider {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <CardTitle>{arabicFormStages[currentStage].title}</CardTitle>
                  <p className="text-muted-foreground">{arabicFormStages[currentStage].description}</p>
                </div>
                <ArabicFormNavigationButtons
                  currentStage={currentStage}
                  formStages={arabicFormStages}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onCancel={onCancel}
                  onSubmit={form.handleSubmit(handleSubmit)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ArabicStageContentRenderer stage={arabicFormStages[currentStage]} />
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default ArabicAddHorseForm;
