import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getRoleFromToken, decodeJwt } from '../../Service/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
  updateAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para remover el token y actualizar el estado de autenticación
  const removeTokenAndLogout = () => {
    sessionStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setRole(null);
  };

  // Función para verificar el tiempo restante del token
  const checkTokenExpiration = (token: string) => {
    const decodedToken = decodeJwt(token);
    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();

      // Si el token ya ha expirado, eliminarlo inmediatamente
      if (currentTime >= expirationTime) {
        removeTokenAndLogout();
      } else {
        // Configurar un temporizador para eliminar el token cuando expire
        const timeUntilExpiration = expirationTime - currentTime;
        setTimeout(() => {
          removeTokenAndLogout();
        }, timeUntilExpiration);
      }
    }
  };

  // Función para actualizar el estado de autenticación cuando cambie el token
  const updateAuth = () => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      setRole(getRoleFromToken(token));

      // Verificar si el token ha caducado y configurarlo para que expire
      checkTokenExpiration(token);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
    setLoading(false);
  };

  // Efecto para actualizar el estado al montar el componente
  useEffect(() => {
    updateAuth();
  }, []);

  // Verificar y actualizar el estado cuando el token cambie
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      updateAuth();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, updateAuth }}>
      {!loading && children}
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
