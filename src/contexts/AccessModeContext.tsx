
import { createContext, useContext, useState, ReactNode } from 'react';

export type AccessMode = 'demo' | 'public';

interface AccessModeContextType {
  accessMode: AccessMode;
  setAccessMode: (mode: AccessMode) => void;
  isPublicMode: boolean;
  isDemoMode: boolean;
}

const AccessModeContext = createContext<AccessModeContextType | null>(null);

export const useAccessMode = () => {
  const context = useContext(AccessModeContext);
  if (!context) {
    throw new Error('useAccessMode must be used within AccessModeProvider');
  }
  return context;
};

interface AccessModeProviderProps {
  children: ReactNode;
}

export const AccessModeProvider = ({ children }: AccessModeProviderProps) => {
  const [accessMode, setAccessMode] = useState<AccessMode>('public');

  const value: AccessModeContextType = {
    accessMode,
    setAccessMode,
    isPublicMode: accessMode === 'public',
    isDemoMode: accessMode === 'demo',
  };

  return (
    <AccessModeContext.Provider value={value}>
      {children}
    </AccessModeContext.Provider>
  );
};
