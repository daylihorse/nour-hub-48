
import { createContext, useContext, useState, ReactNode } from 'react';

interface AccessModeContextType {
  isPublicMode: boolean;
  setPublicMode: (isPublic: boolean) => void;
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
  const [isPublicMode, setIsPublicMode] = useState(false);

  const setPublicMode = (isPublic: boolean) => {
    setIsPublicMode(isPublic);
  };

  return (
    <AccessModeContext.Provider value={{ isPublicMode, setPublicMode }}>
      {children}
    </AccessModeContext.Provider>
  );
};
