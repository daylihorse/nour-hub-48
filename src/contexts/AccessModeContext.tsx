
import { createContext, useContext, useState, ReactNode } from 'react';

export type AccessMode = 'public' | 'demo';

interface AccessModeContextType {
  isPublicMode: boolean;
  isDemoMode: boolean;
  accessMode: AccessMode;
  setPublicMode: (isPublic: boolean) => void;
  setAccessMode: (mode: AccessMode) => void;
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
  children: ReactNode;
}

export const AccessModeProvider = ({ children }: AccessModeProviderProps) => {
  const [accessMode, setAccessMode] = useState<AccessMode>('demo');

  const setPublicMode = (isPublic: boolean) => {
    setAccessMode(isPublic ? 'public' : 'demo');
  };

  const isPublicMode = accessMode === 'public';
  const isDemoMode = accessMode === 'demo';

  return (
    <AccessModeContext.Provider value={{ 
      isPublicMode, 
      isDemoMode,
      accessMode,
      setPublicMode,
      setAccessMode
    }}>
      {children}
    </AccessModeContext.Provider>
  );
};
