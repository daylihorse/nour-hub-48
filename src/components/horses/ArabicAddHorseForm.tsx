
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { enhancedHorseFormSchema } from "./form-schema/EnhancedHorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useStageValidation } from "@/hooks/useStageValidation";
import { arabicFormStages } from "./config/arabicFormStages";
import ArabicFormProgressHeader from "./form-components/ArabicFormProgressHeader";
import ArabicStageNavigation from "./form-components/ArabicStageNavigation";
import ArabicStageContentRenderer from "./form-components/ArabicStageContentRenderer";
import ArabicFormNavigationButtons from "./form-components/ArabicFormNavigationButtons";
import ArabicValidationFeedback from "./form-components/ArabicValidationFeedback";

interface ArabicAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const ArabicAddHorseForm = ({ onSave, onCancel }: ArabicAddHorseFormProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const { validateStage, getStageProgress, getOverallValidationStatus } = useStageValidation();

  const form = useForm<HorseFormData>({
    resolver: zodResolver(enhancedHorseFormSchema),
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

  const progress = getStageProgress(arabicFormStages, completedStages);
  const validationStatus = getOverallValidationStatus(arabicFormStages, completedStages);

  const handleNext = async () => {
    const stage = arabicFormStages[currentStage];
    const isValid = await validateStage(stage);
    
    if (isValid) {
      setCompletedStages(prev => new Set(prev).add(currentStage));
      if (currentStage < arabicFormStages.length - 1) {
        setCurrentStage(currentStage + 1);
      }
      toast({
        title: "تم إكمال المرحلة",
        description: `تم إكمال مرحلة ${stage.title} بنجاح`,
      });
    } else {
      toast({
        title: "يوجد أخطاء",
        description: "يرجى إصلاح الأخطاء قبل المتابعة",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageClick = async (stageIndex: number) => {
    // Allow navigation to previous stages or completed stages
    if (stageIndex <= currentStage || completedStages.has(stageIndex)) {
      setCurrentStage(stageIndex);
    } else {
      // Validate all stages up to the target stage
      let canNavigate = true;
      for (let i = currentStage; i < stageIndex; i++) {
        const isValid = await validateStage(arabicFormStages[i]);
        if (!isValid) {
          canNavigate = false;
          break;
        }
        setCompletedStages(prev => new Set(prev).add(i));
      }
      
      if (canNavigate) {
        setCurrentStage(stageIndex);
      } else {
        toast({
          title: "لا يمكن التنقل",
          description: "يجب إكمال المراحل السابقة أولاً",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (data: HorseFormData) => {
    // Validate all stages before submission
    const allStagesValid = await Promise.all(
      arabicFormStages.map(stage => validateStage(stage))
    );

    if (allStagesValid.every(Boolean)) {
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
    } else {
      toast({
        title: "يوجد أخطاء",
        description: "يرجى مراجعة جميع المراحل وإصلاح الأخطاء",
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
        validationStatus={validationStatus}
      />

      <ArabicStageNavigation
        formStages={arabicFormStages}
        currentStage={currentStage}
        completedStages={completedStages}
        onStageClick={handleStageClick}
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
            <CardContent className="space-y-6">
              <ArabicValidationFeedback
                stage={arabicFormStages[currentStage]}
                currentStage={currentStage}
                completedStages={completedStages}
              />
              <ArabicStageContentRenderer stage={arabicFormStages[currentStage]} />
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default ArabicAddHorseForm;
