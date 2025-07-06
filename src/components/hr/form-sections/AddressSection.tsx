import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface AddressSectionProps {
  control: Control<any>;
}

export const AddressSection = ({ control }: AddressSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="address.street"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t('hr.street_address')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.street_address_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.city')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.city_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.state')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.state_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.zip_code')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.zip_code_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.country')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.country_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};