import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí colocas la lógica para cerrar sesión (por ejemplo, eliminar tokens)
    localStorage.removeItem("token"); // Eliminar el token o cualquier dato de sesión
    // Redirigir al usuario a la página de autenticación
    navigate("/auth");
  }, [navigate]);

  return null; // Este componente no necesita renderizar nada
};

export default LogoutComponent;
