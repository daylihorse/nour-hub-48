
import { Calendar } from "lucide-react";
import { calculateAge, calculateAgeArabic } from "../utils/ageCalculation";

interface AgeDisplayProps {
  birthDate: Date | string;
  isArabic?: boolean;
  className?: string;
}

const AgeDisplay = ({ birthDate, isArabic = false, className = "" }: AgeDisplayProps) => {
  if (!birthDate) return null;

  const date = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const age = isArabic ? calculateAgeArabic(date) : calculateAge(date);
  
  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground mt-1 ${className}`}>
      <Calendar className="h-4 w-4" />
      <span className="font-medium">
        {isArabic ? "العمر المحسوب: " : "Calculated Age: "}
      </span>
      <span>{age}</span>
    </div>
  );
};

export default AgeDisplay;
