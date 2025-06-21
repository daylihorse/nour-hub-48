
import { createContext } from 'react';
import { AuthContext } from '@/types/tenant';

export const AuthContextProvider = createContext<AuthContext | null>(null);
