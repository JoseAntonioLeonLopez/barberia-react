import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Mueve el scroll a la parte superior
  }, [pathname]); // Ejecuta el efecto cuando la ruta (pathname) cambia

  return null; // No necesita renderizar nada
};

export default ScrollToTop;
