
import { useContext } from 'react';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { AuthContext } from '@/types/tenant';

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContextProvider);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
