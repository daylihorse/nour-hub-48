
import { useLanguage } from '@/contexts/LanguageContext';
import { enTranslations } from '@/i18n/translations/en';
import { arTranslations } from '@/i18n/translations/ar';

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), String(val));
      }, value);
    }

    return value;
  };

  return { t, language };
};
