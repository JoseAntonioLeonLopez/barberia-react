import React, { createContext, useContext, ReactNode } from 'react';
import { getRoleFromToken } from '../../Service/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = sessionStorage.getItem('access_token');
  const isAuthenticated = !!token; // Verifica si hay un token
  const role = token ? getRoleFromToken(token) : null; // Extrae el rol del token

  return (
    <AuthContext.Provider value={{ isAuthenticated, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};