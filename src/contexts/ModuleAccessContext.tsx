
import React, { createContext, useContext, useState, useEffect } from "react";

interface SubModule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isCore?: boolean;
}

interface ModuleCategory {
  category: string;
  modules: SubModule[];
}

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

interface ModuleAccessContextType {
  moduleConfigs: Record<string, ModuleConfig>;
  isModuleActive: (moduleId: string) => boolean;
  isSubmoduleActive: (moduleId: string, submoduleId: string) => boolean;
  toggleModule: (moduleId: string, isActive: boolean) => void;
  toggleSubmodule: (moduleId: string, submoduleId: string, isActive: boolean) => void;
  updateModuleConfig: (moduleId: string, config: ModuleConfig) => void;
}

const ModuleAccessContext = createContext<ModuleAccessContextType | undefined>(undefined);

// Default module configurations
const defaultModuleConfigs: Record<string, ModuleConfig> = {
  horses: {
    id: "horses",
    name: "Horse Management",
    description: "Comprehensive horse management system with breeding, health, and performance tracking",
    isActive: true,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "horse-registration", name: "Horse Registration", description: "Register and manage horse profiles", isActive: true, isCore: true },
          { id: "horse-health", name: "Health Records", description: "Track health records and medical history", isActive: true, isCore: true }
        ]
      },
      {
        category: "Breeding Management",
        modules: [
          { id: "breeding-contracts", name: "Breeding Contracts", description: "Create and manage breeding contracts", isActive: false },
          { id: "breeding-records", name: "Breeding Records", description: "Track breeding history and outcomes", isActive: false }
        ]
      }
    ]
  },
  hr: {
    id: "hr",
    name: "Human Resources",
    description: "Comprehensive HR management with employee records, payroll, and performance tracking",
    isActive: false,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "hr-overview", name: "HR Overview", description: "Dashboard with key HR metrics", isActive: true, isCore: true },
          { id: "employee-records", name: "Employee Records", description: "Manage employee information", isActive: true, isCore: true }
        ]
      },
      {
        category: "Payroll & Benefits",
        modules: [
          { id: "payroll-management", name: "Payroll Management", description: "Process payroll and compensation", isActive: false },
          { id: "benefits-admin", name: "Benefits Administration", description: "Manage employee benefits", isActive: false }
        ]
      }
    ]
  },
  inventory: {
    id: "inventory",
    name: "Inventory Management",
    description: "Comprehensive inventory control with stock tracking and analytics",
    isActive: true,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "inventory-overview", name: "Inventory Overview", description: "Dashboard with inventory metrics", isActive: true, isCore: true },
          { id: "stock-management", name: "Stock Management", description: "Track and manage inventory levels", isActive: true, isCore: true }
        ]
      },
      {
        category: "Supply Chain",
        modules: [
          { id: "supplier-management", name: "Supplier Management", description: "Manage vendor relationships", isActive: false },
          { id: "purchase-orders", name: "Purchase Orders", description: "Create and track purchase orders", isActive: false }
        ]
      }
    ]
  },
  "riding-reservations": {
    id: "riding-reservations",
    name: "Riding Reservations",
    description: "Comprehensive riding lesson and facility booking system",
    isActive: false,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "reservations-overview", name: "Reservations Overview", description: "Dashboard with booking metrics", isActive: true, isCore: true },
          { id: "lesson-booking", name: "Lesson Booking", description: "Book and manage riding lessons", isActive: true, isCore: true }
        ]
      }
    ]
  },
  movements: {
    id: "movements",
    name: "Movement Tracking",
    description: "Comprehensive movement and transportation management",
    isActive: true,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "movement-overview", name: "Movement Overview", description: "Dashboard with movement metrics", isActive: true, isCore: true },
          { id: "transportation-planning", name: "Transportation Planning", description: "Plan transportation routes", isActive: true, isCore: true }
        ]
      }
    ]
  },
  "stable-rooms": {
    id: "stable-rooms",
    name: "Stable & Rooms Management",
    description: "Comprehensive facility management with room assignments",
    isActive: false,
    submodules: [
      {
        category: "Core Features",
        modules: [
          { id: "facility-overview", name: "Facility Overview", description: "Dashboard with facility metrics", isActive: true, isCore: true },
          { id: "room-management", name: "Room Management", description: "Manage stable rooms and assignments", isActive: true, isCore: true }
        ]
      }
    ]
  }
};

export const ModuleAccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moduleConfigs, setModuleConfigs] = useState<Record<string, ModuleConfig>>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('moduleAccessConfigs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved module configs:', error);
      }
    }
    return defaultModuleConfigs;
  });

  // Save to localStorage whenever configs change
  useEffect(() => {
    localStorage.setItem('moduleAccessConfigs', JSON.stringify(moduleConfigs));
  }, [moduleConfigs]);

  const isModuleActive = (moduleId: string): boolean => {
    return moduleConfigs[moduleId]?.isActive ?? false;
  };

  const isSubmoduleActive = (moduleId: string, submoduleId: string): boolean => {
    const moduleConfig = moduleConfigs[moduleId];
    if (!moduleConfig || !moduleConfig.isActive) return false;
    
    for (const category of moduleConfig.submodules) {
      const submodule = category.modules.find(m => m.id === submoduleId);
      if (submodule) {
        return submodule.isActive;
      }
    }
    return false;
  };

  const toggleModule = (moduleId: string, isActive: boolean) => {
    setModuleConfigs(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        isActive,
        submodules: prev[moduleId]?.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule => ({
            ...submodule,
            isActive: isActive ? submodule.isActive : (submodule.isCore || false)
          }))
        })) || []
      }
    }));
  };

  const toggleSubmodule = (moduleId: string, submoduleId: string, isActive: boolean) => {
    setModuleConfigs(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        submodules: prev[moduleId]?.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule =>
            submodule.id === submoduleId
              ? { ...submodule, isActive }
              : submodule
          )
        })) || []
      }
    }));
  };

  const updateModuleConfig = (moduleId: string, config: ModuleConfig) => {
    setModuleConfigs(prev => ({
      ...prev,
      [moduleId]: config
    }));
  };

  return (
    <ModuleAccessContext.Provider value={{
      moduleConfigs,
      isModuleActive,
      isSubmoduleActive,
      toggleModule,
      toggleSubmodule,
      updateModuleConfig
    }}>
      {children}
    </ModuleAccessContext.Provider>
  );
};

export const useModuleAccess = () => {
  const context = useContext(ModuleAccessContext);
  if (context === undefined) {
    throw new Error('useModuleAccess must be used within a ModuleAccessProvider');
  }
  return context;
};
