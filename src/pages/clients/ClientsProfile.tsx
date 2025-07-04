
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientsProfile = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className={`container mx-auto py-8 px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div>
          <h1 className="text-3xl font-bold">{t('clients.profile.title')}</h1>
          <p className="text-muted-foreground">{t('clients.profile.subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('clients.profile.details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('clients.profile.clientId')}</label>
                <p className="text-lg">{clientId}</p>
              </div>
              
              <div className="text-muted-foreground">
                <p>{t('clients.profile.comingSoon')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientsProfile;
