
import React from 'react';
import { AuthContextProviderComponent } from '@/contexts/AuthContext.tsx';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContextProviderComponent>
      {children}
    </AuthContextProviderComponent>
  );
};
