
import { useContext } from 'react';
import { AuthContextProvider } from '@/contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
