import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getRoleFromToken } from '../../Service/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean; // Estado de carga
  updateAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para actualizar el estado de autenticación cuando cambie el token
  const updateAuth = () => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      setRole(getRoleFromToken(token));
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
    setLoading(false); // Estado de carga finalizado
  };

  // Efecto para actualizar el estado al montar el componente
  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, updateAuth }}>
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
