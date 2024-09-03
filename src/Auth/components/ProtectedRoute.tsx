import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(role || '')) {
    // Si el usuario no tiene el rol necesario, redirigir a una página de acceso denegado o alguna otra página
    return <Navigate to="/not-found" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;