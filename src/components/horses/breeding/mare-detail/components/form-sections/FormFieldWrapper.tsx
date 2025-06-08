
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldWrapperProps {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}

const FormFieldWrapper = ({ id, label, children, className = "" }: FormFieldWrapperProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
};

export default FormFieldWrapper;
