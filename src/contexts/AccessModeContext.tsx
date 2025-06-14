
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Initialize from localStorage or default to 'public'
  const [accessMode, setAccessModeState] = useState<AccessMode>(() => {
    const saved = localStorage.getItem('accessMode');
    return (saved === 'demo' || saved === 'public') ? saved : 'public';
  });

  // Save to localStorage when mode changes
  const setAccessMode = (mode: AccessMode) => {
    console.log('Setting access mode to:', mode);
    localStorage.setItem('accessMode', mode);
    setAccessModeState(mode);
  };

  // Log current mode for debugging
  useEffect(() => {
    console.log('Access mode initialized:', accessMode);
  }, [accessMode]);

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
