import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí colocas la lógica para cerrar sesión (por ejemplo, eliminar tokens)
    sessionStorage.removeItem("access_token"); // Asegúrate de que esta clave coincide con la utilizada para almacenar el token

    // Redirigir al usuario a la página de autenticación
    navigate("/auth");
  }, [navigate]);

  return null; // Este componente no necesita renderizar nada
};

export default LogoutComponent;
