import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Asegúrate de que estás importando correctamente jwtDecode
import BarberAppointments from "../components/BarberAppointments";
import NavbarComponent from "../components/Navbar";
import { API_URL } from "../../Service/Url";

const Barber: React.FC = () => {
  const [barberId, setBarberId] = useState<number | null>(null); // Estado para almacenar el barberId
  const token = sessionStorage.getItem("access_token");

  // Decodificar el token JWT para obtener el barberId
  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const phoneNumber = decodedToken.phoneNumber; // Asegúrate de que 'phoneNumber' está presente en el token

        // Hacer una solicitud para obtener el usuario por el número de teléfono
        const fetchUserByPhoneNumber = async () => {
          try {
            const response = await axios.get(`${API_URL}users/phone/${phoneNumber}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setBarberId(response.data.id); // Asignar el barberId obtenido
          } catch (error) {
            console.error("Error al obtener el usuario por teléfono:", error);
          }
        };

        fetchUserByPhoneNumber();
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [token]);

  return (
    <div className="bg-white dark:bg-dark-mode-bg2 min-h-screen">
      <NavbarComponent />
      {barberId && barberId > 0 ? ( // Mostrar las citas solo si el barberId es válido
        <BarberAppointments barberId={barberId} />
      ) : (
        <p>Cargando información del barbero...</p>
      )}
      <Outlet />
    </div>
  );
};

export default Barber;
