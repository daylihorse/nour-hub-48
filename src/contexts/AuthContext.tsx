
import { createContext } from 'react';
import { User, Tenant, AuthContext } from '@/types/tenant';

export const AuthContextProvider = createContext<AuthContext | null>(null);
