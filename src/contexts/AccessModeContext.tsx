
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AccessMode = 'demo' | 'public' | 'auth';

interface AccessModeContextType {
  accessMode: AccessMode;
  setAccessMode: (mode: AccessMode) => void;
  isDemoMode: boolean;
  isPublicMode: boolean;
  isAuthMode: boolean;
}

const AccessModeContext = createContext<AccessModeContextType | undefined>(undefined);

interface AccessModeProviderProps {
  children: ReactNode;
}

export const AccessModeProvider = ({ children }: AccessModeProviderProps) => {
  const [accessMode, setAccessMode] = useState<AccessMode>('demo');

  const value: AccessModeContextType = {
    accessMode,
    setAccessMode,
    isDemoMode: accessMode === 'demo',
    isPublicMode: accessMode === 'public',
    isAuthMode: accessMode === 'auth',
  };

  return (
    <AccessModeContext.Provider value={value}>
      {children}
    </AccessModeContext.Provider>
  );
};

export const useAccessMode = () => {
  const context = useContext(AccessModeContext);
  if (context === undefined) {
    throw new Error('useAccessMode must be used within an AccessModeProvider');
  }
  return context;
};
