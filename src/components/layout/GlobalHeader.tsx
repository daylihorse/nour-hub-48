
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const GlobalHeader = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-brown ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`flex h-14 items-center px-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Global Sidebar Toggle - Always Visible */}
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:shadow-brown" />
          <div className="hidden sm:block">
            <h1 className={`text-lg font-semibold text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('dashboard.welcome')}
            </h1>
          </div>
        </div>

        {/* Right side actions */}
        <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} flex items-center gap-2`}>
          <LanguageToggle />
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
