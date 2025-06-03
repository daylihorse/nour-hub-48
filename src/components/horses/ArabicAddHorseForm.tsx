
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HorseFormData } from "@/types/horse";
import { horseFormSchema } from "./form-schema/HorseFormSchema";
import { useToast } from "@/hooks/use-toast";
import { arabicFormStages } from "./config/arabicFormStages";
import ArabicBasicInformationStage from "./form-stages/ArabicBasicInformationStage";
import ArabicOwnershipDocumentationStage from "./form-stages/ArabicOwnershipDocumentationStage";
import ArabicHealthMedicalStage from "./form-stages/ArabicHealthMedicalStage";

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

  const renderCurrentStage = () => {
    switch (arabicFormStages[currentStage].id) {
      case "basic":
        return <ArabicBasicInformationStage />;
      case "ownership":
        return <ArabicOwnershipDocumentationStage />;
      case "health":
        return <ArabicHealthMedicalStage />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-right">
              <CardTitle className="text-2xl">إضافة حصان جديد</CardTitle>
              <p className="text-muted-foreground">تسجيل حصان جديد في الإسطبل</p>
            </div>
            <Badge variant="outline" className="text-sm">
              المرحلة {currentStage + 1} من {arabicFormStages.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-right">{Math.round(progress)}% مكتمل</p>
          </div>
        </CardHeader>
      </Card>

      {/* Stage Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 justify-end">
            {arabicFormStages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setCurrentStage(index)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all
                  ${index === currentStage 
                    ? 'bg-primary text-primary-foreground' 
                    : completedStages.has(index)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                <span>{stage.title}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <FormProvider {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-right">{arabicFormStages[currentStage].title}</CardTitle>
              <p className="text-muted-foreground text-right">{arabicFormStages[currentStage].description}</p>
            </CardHeader>
            <CardContent>
              {renderCurrentStage()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                إلغاء
              </Button>
              {currentStage > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  السابق
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStage < arabicFormStages.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  التالي
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleSubmit)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  تسجيل الحصان
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ArabicAddHorseForm;
