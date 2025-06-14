
import { createContext, useContext } from 'react';
import { AuthContext } from '@/types/tenant';

export const AuthContextProvider = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
