import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react"; 
import { useNavigate } from "react-router-dom";
import ClientAppointments from "../../Global Components/AppointmentsClient";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "../../Service/Url";

const InicioComponent: React.FC = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState<number | null>(null); // Estado para almacenar el clientId

  const token = sessionStorage.getItem("access_token");

  // Decodificar el token JWT para obtener el número de teléfono
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
            setClientId(response.data.id); // Asignar el clientId obtenido
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
    <div className="w-full min-h-screen bg-dark-mode-bg text-white relative font-barber">
      {/* Fondo visualmente atractivo */}
      <img
        src="https://d159pl2qjrokxm.cloudfront.net/ar/ece7a98269e64c09a3f8aba621e5a0a9/1072-HOUSE-OF-CUT-caballito.JPEG?size=640x427"
        alt="Barber Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="text-center mb-40">
          {/* Texto de bienvenida */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-barber-primary">
            Bienvenido a nuestra barbería
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-2xl">
            Cuidamos tu estilo con los mejores servicios
          </p>

          {/* Espaciado */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {/* Botones de acción */}
            <Button
              className="w-full sm:w-auto shadow-lg bg-barber-primary text-sm sm:text-base"
              size="lg"
              onPress={() => navigate("/services")}
            >
              Ver Servicios
            </Button>

            <Button
              color="primary"
              className="w-full sm:w-auto shadow-lg text-sm sm:text-base"
              size="lg"
              onPress={() => navigate("/booking")}
            >
              Reservar Cita
            </Button>
          </div>

          {/* Componente de citas del cliente */}
          <div className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-barber-primary mb-4">
              Tus citas
            </h2>
            {/* Componente para mostrar las citas del cliente */}
            {clientId ? (
              <ClientAppointments clientId={clientId} />
            ) : (
              <p>Cargando citas...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioComponent;
