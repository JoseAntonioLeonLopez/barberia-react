import React from 'react';
import { Button } from '@nextui-org/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const LogoutButton: React.FC = () => {
  const navigate = useNavigate(); // Usamos el hook para la navegación

  const handleLogout = () => {
    navigate('/logout'); // Redirige al componente Logout
  };

  return (
    <Button
      onClick={handleLogout} // Maneja la navegación al hacer clic
      color="danger"
      variant="flat"
      aria-label="Cerrar sesión"
      size="sm"
    >
      <FaSignOutAlt /> {/* Ícono de cerrar sesión */}
    </Button>
  );
};

export default LogoutButton;
