
export interface TranslationKeys {
  navigation: {
    dashboard: string;
    horses: string;
    breeding: string;
    pedigree: string;
    training: string;
    health: string;
    performance: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    welcome: string;
  };
  horses: {
    title: string;
    subtitle: string;
  };
  breeding: {
    dashboard: string;
    mares: string;
    stallions: string;
    geldings: string;
    foaling: string;
    planning: string;
    analysis: string;
    documents: string;
    certificates: string;
    pregnancy: string;
    frozenEmbryo: string;
    heatCycles: string;
  };
  clients: {
    profile: {
      title: string;
      subtitle: string;
      details: string;
      clientId: string;
      comingSoon: string;
    };
  };
}

export const enTranslations: TranslationKeys = {
  navigation: {
    dashboard: "Dashboard",
    horses: "Horses",
    breeding: "Breeding",
    pedigree: "Pedigree",
    training: "Training",
    health: "Health",
    performance: "Performance"
  },
  dashboard: {
    title: "Dashboard",
    subtitle: "Manage your horse facility",
    welcome: "Welcome to Horse Management System"
  },
  horses: {
    title: "Horses Department",
    subtitle: "Manage all your horses and their information"
  },
  breeding: {
    dashboard: "Dashboard",
    mares: "Mares",
    stallions: "Stallions",
    geldings: "Geldings",
    foaling: "Foaling",
    planning: "Planning",
    analysis: "Analysis",
    documents: "Documents",
    certificates: "Certificates",
    pregnancy: "Pregnancy",
    frozenEmbryo: "Frozen Embryo",
    heatCycles: "Heat Cycles"
  },
  clients: {
    profile: {
      title: "Client Profile",
      subtitle: "View and manage client information",
      details: "Client Details",
      clientId: "Client ID",
      comingSoon: "Client profile features coming soon..."
    }
  }
};
