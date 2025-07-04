
export const useTranslation = () => {
  const t = (key: string) => {
    // Simple key mapping for essential UI elements
    const translations: { [key: string]: string } = {
      'dashboard.title': 'Dashboard',
      'dashboard.subtitle': 'Welcome to your dashboard',
      'dashboard.welcome': 'Welcome',
      'navigation.dashboard': 'Dashboard',
      'navigation.horses': 'Horses',
      'navigation.breeding': 'Breeding',
      'navigation.pedigree': 'Pedigree',
      'horses.title': 'Horses Management',
      'horses.subtitle': 'Manage your horses and breeding records',
      'breeding.dashboard': 'Dashboard',
      'breeding.mares': 'Mares',
      'breeding.stallions': 'Stallions',
      'breeding.geldings': 'Geldings',
      'breeding.foaling': 'Foaling',
      'breeding.planning': 'Planning',
      'breeding.analysis': 'Analysis',
      'breeding.documents': 'Documents',
      'breeding.certificates': 'Certificates',
    };
    
    return translations[key] || key;
  };

  return { t };
};
