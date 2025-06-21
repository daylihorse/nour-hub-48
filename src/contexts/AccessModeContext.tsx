
import React, { createContext, useContext, useState } from 'react';

type AccessMode = 'demo' | 'production' | 'public';

interface AccessModeContextType {
  accessMode: AccessMode;
  setAccessMode: (mode: AccessMode) => void;
  isPublicMode: boolean;
  isDemoMode: boolean;
}

const AccessModeContext = createContext<AccessModeContextType | undefined>(undefined);

export const useAccessMode = () => {
  const context = useContext(AccessModeContext);
  if (context === undefined) {
    throw new Error('useAccessMode must be used within an AccessModeProvider');
  }
  return context;
};

interface AccessModeProviderProps {
  children: React.ReactNode;
}

export const AccessModeProvider: React.FC<AccessModeProviderProps> = ({ children }) => {
  const [accessMode, setAccessMode] = useState<AccessMode>('demo');

  const isPublicMode = accessMode === 'public';
  const isDemoMode = accessMode === 'demo';

  return (
    <AccessModeContext.Provider value={{ 
      accessMode, 
      setAccessMode, 
      isPublicMode, 
      isDemoMode 
    }}>
      {children}
    </AccessModeContext.Provider>
  );
};
