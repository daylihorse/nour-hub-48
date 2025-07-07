import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const LanguageSwitcher: React.FC = () => {
  const { language, direction, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "rtl:flex-row-reverse"
      )}
      dir={direction}
    >
      <Globe className={cn(
        "h-4 w-4 transition-transform duration-200",
        direction === 'rtl' && "scale-x-[-1]"
      )} />
      <span className="text-sm font-medium">
        {language === 'en' ? t('common.arabic', 'العربية') : t('common.english', 'English')}
      </span>
    </Button>
  );
};