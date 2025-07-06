import { Control, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useLanguage } from "@/contexts/LanguageContext";

interface PhoneSectionProps {
  control: Control<any>;
}

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
];

export const PhoneSection = ({ control }: PhoneSectionProps) => {
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  const addPhone = () => {
    append({
      id: uuidv4(),
      countryCode: "+1",
      number: "",
      hasWhatsapp: false,
      hasTelegram: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>{t('hr.phone_numbers')}</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={addPhone}>
          <Plus className="h-4 w-4 mr-2" />
          {t('hr.add_phone')}
        </Button>
      </div>
      
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
          <FormField
            control={control}
            name={`phones.${index}.countryCode`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('hr.country_code')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('hr.code')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name={`phones.${index}.number`}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('hr.phone_number')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('hr.phone_number_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>{t('hr.apps')}</FormLabel>
            <div className="flex flex-col space-y-2">
              <FormField
                control={control}
                name={`phones.${index}.hasWhatsapp`}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`whatsapp-${index}`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={`whatsapp-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('hr.whatsapp')}
                    </label>
                  </div>
                )}
              />
              
              <FormField
                control={control}
                name={`phones.${index}.hasTelegram`}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`telegram-${index}`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={`telegram-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('hr.telegram')}
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {fields.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          {t('hr.no_phones_message')}
        </div>
      )}
    </div>
  );
};