/**
 * RTL-aware form components for consistent Arabic/Hebrew support
 */

import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Button } from "./button";

// RTL-aware Input component
export interface RTLInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const RTLInput = React.forwardRef<HTMLInputElement, RTLInputProps>(
  ({ className, label, error, required, ...props }, ref) => {
    const { direction } = useLanguage();
    
    return (
      <div className={cn("space-y-2", direction === 'rtl' && "text-right")}>
        {label && (
          <Label className={cn(
            "text-sm font-medium",
            direction === 'rtl' && "text-right block",
            required && "after:content-['*'] after:ml-1 after:text-destructive"
          )}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          className={cn(
            className,
            direction === 'rtl' && "text-right",
            error && "border-destructive"
          )}
          dir={direction}
          {...props}
        />
        {error && (
          <p className={cn(
            "text-sm text-destructive",
            direction === 'rtl' && "text-right"
          )}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
RTLInput.displayName = "RTLInput";

// RTL-aware Textarea component
export interface RTLTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const RTLTextarea = React.forwardRef<HTMLTextAreaElement, RTLTextareaProps>(
  ({ className, label, error, required, ...props }, ref) => {
    const { direction } = useLanguage();
    
    return (
      <div className={cn("space-y-2", direction === 'rtl' && "text-right")}>
        {label && (
          <Label className={cn(
            "text-sm font-medium",
            direction === 'rtl' && "text-right block",
            required && "after:content-['*'] after:ml-1 after:text-destructive"
          )}>
            {label}
          </Label>
        )}
        <Textarea
          ref={ref}
          className={cn(
            className,
            direction === 'rtl' && "text-right",
            error && "border-destructive"
          )}
          dir={direction}
          {...props}
        />
        {error && (
          <p className={cn(
            "text-sm text-destructive",
            direction === 'rtl' && "text-right"
          )}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
RTLTextarea.displayName = "RTLTextarea";

// RTL-aware Select component
export interface RTLSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RTLSelect: React.FC<RTLSelectProps> = ({
  label,
  error,
  required,
  placeholder,
  value,
  onValueChange,
  children,
  className
}) => {
  const { direction } = useLanguage();
  
  return (
    <div className={cn("space-y-2", direction === 'rtl' && "text-right")}>
      {label && (
        <Label className={cn(
          "text-sm font-medium",
          direction === 'rtl' && "text-right block",
          required && "after:content-['*'] after:ml-1 after:text-destructive"
        )}>
          {label}
        </Label>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn(
          className,
          direction === 'rtl' && "text-right",
          error && "border-destructive"
        )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
      {error && (
        <p className={cn(
          "text-sm text-destructive",
          direction === 'rtl' && "text-right"
        )}>
          {error}
        </p>
      )}
    </div>
  );
};

// RTL-aware Button with icon support
export interface RTLButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "start" | "end";
  asChild?: boolean;
}

export const RTLButton = React.forwardRef<HTMLButtonElement, RTLButtonProps>(
  ({ 
    className, 
    children, 
    icon: Icon, 
    iconPosition = "start", 
    variant = "default",
    size = "default",
    ...props 
  }, ref) => {
    const { direction } = useLanguage();
    
    const shouldReverse = (direction === 'rtl' && iconPosition === "start") || 
                         (direction === 'ltr' && iconPosition === "end");
    
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "flex items-center gap-2",
          shouldReverse && "flex-row-reverse",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Button>
    );
  }
);
RTLButton.displayName = "RTLButton";

// RTL-aware Form Section
export interface RTLFormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const RTLFormSection: React.FC<RTLFormSectionProps> = ({
  title,
  description,
  children,
  className
}) => {
  const { direction } = useLanguage();
  
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className={cn("space-y-1", direction === 'rtl' && "text-right")}>
          {title && (
            <h3 className="text-lg font-medium">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// RTL-aware Grid Layout
export interface RTLGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export const RTLGrid: React.FC<RTLGridProps> = ({
  children,
  columns = 2,
  className
}) => {
  const { direction } = useLanguage();
  
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-2";
  
  return (
    <div className={cn(
      "grid gap-4",
      gridCols,
      direction === 'rtl' && "direction-rtl",
      className
    )}>
      {children}
    </div>
  );
};