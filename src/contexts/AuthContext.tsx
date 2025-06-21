
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant, AuthContext } from '@/types/tenant';
import { useAccessMode } from '@/contexts/AccessModeContext';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { usePublicAuthState } from '@/hooks/auth/usePublicAuthState';

export const AuthContextProvider = createContext<AuthContext | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProviderComponent: React.FC<AuthProviderProps> = ({ children }) => {
  const { isPublicMode } = useAccessMode();
  
  // Use different auth states based on access mode
  const authState = useAuthState();
  const publicAuthState = usePublicAuthState();
  
  const currentAuthState = isPublicMode ? publicAuthState : authState;

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', email);
    return { data: null, error: null };
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log('Sign up attempt:', email);
    return { data: null, error: null };
  };

  const logout = async () => {
    console.log('Logout');
  };

  const hasPermission = (permission: string) => {
    return true; // Demo mode - all permissions granted
  };

  const hasRole = (role: string) => {
    return true; // Demo mode - all roles granted
  };

  const contextValue: AuthContext = {
    ...currentAuthState,
    login,
    signUp,
    logout,
    hasPermission,
    hasRole,
    isAuthenticated: true,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
};
