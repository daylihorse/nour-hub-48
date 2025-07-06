import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface PersonalInfoSectionProps {
  control: Control<any>;
}

export const PersonalInfoSection = ({ control }: PersonalInfoSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.first_name')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.first_name')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="firstNameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.first_name_arabic')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.first_name_arabic')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.last_name')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.last_name')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="lastNameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.last_name_arabic')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.last_name_arabic')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.nickname')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.nickname')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="nicknameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-start">{t('hr.nickname_arabic')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.nickname_arabic')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="text-start">{t('hr.email')}</FormLabel>
            <FormControl>
              <Input type="email" placeholder={t('hr.email')} {...field} className="rtl:text-right" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};