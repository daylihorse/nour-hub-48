
import React, { createContext, useContext, useState } from 'react';

type AccessMode = 'demo' | 'production';

interface AccessModeContextType {
  accessMode: AccessMode;
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
  children: React.ReactNode;
}

export const AccessModeProvider: React.FC<AccessModeProviderProps> = ({ children }) => {
  const [accessMode, setAccessMode] = useState<AccessMode>('demo');

  return (
    <AccessModeContext.Provider value={{ accessMode, setAccessMode }}>
      {children}
    </AccessModeContext.Provider>
  );
};
