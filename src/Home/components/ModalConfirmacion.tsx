import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Service/Url";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ModalConfirmacionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string; // Fecha en formato string
  selectedTime: string; // Hora en formato string
  barber: string; // Este sería el ID del barbero
}

export function ModalConfirmacion({
  isOpen,
  onOpenChange,
  selectedDate,
  selectedTime,
  barber, // Barber es el ID del barbero
}: ModalConfirmacionProps) {
  const [barberName, setBarberName] = useState<string>(""); // Estado para almacenar el nombre del barbero
  const [clientId, setClientId] = useState<number | null>(null); // Estado para almacenar el clientId
  const token = sessionStorage.getItem("access_token"); // Obtener el token de sesión
  const navigate = useNavigate(); // Para redirigir al usuario

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

  const formatAppointmentDate = (date: string, time: string): string => {
    const [day, month, year] = date.split("/"); // Asumiendo que date está en formato dd/MM/yyyy
    return `${year}-${month}-${day}T${time}:00`; // Asegúrate de que 'time' esté en formato HH:mm
  };   
  
  const handleConfirm = async () => {
    try {
      const appointmentData = {
        clientId: clientId,
        barberId: barber,
        appointmentDate: formatAppointmentDate(selectedDate, selectedTime),
      };
  
      const response = await axios.post(`${API_URL}appointments`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Cierra el modal
      onOpenChange(false);

      // Redirige a la ruta principal
      navigate("/");

      // Muestra una notificación de éxito
      Swal.fire({
        icon: "success",
        title: "Cita guardada",
        text: "La cita ha sido creada exitosamente",
        confirmButtonText: "OK",
      });
  
      console.log("Cita guardada con éxito:", response.data);
    } catch (error) {
      console.error("Error al guardar la cita:", error);

      // Muestra un error si no se pudo guardar la cita
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar la cita, inténtalo nuevamente.",
        confirmButtonText: "OK",
      });
    }
  };  

  // Efecto para buscar el nombre del barbero cuando el modal esté abierto
  useEffect(() => {
    if (barber && isOpen) {
      const fetchBarberName = async () => {
        try {
          const response = await axios.get(`${API_URL}users/${barber}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBarberName(response.data.name); // Asignar el nombre del barbero al estado
        } catch (error) {
          console.error("Error fetching barber name:", error);
        }
      };
      fetchBarberName();
    }
  }, [barber, isOpen, token]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="font-barber"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex font-bold flex-col gap-1">
              Confirmar Cita
            </ModalHeader>
            <ModalBody>
              <p>
                <b>Fecha:</b> {selectedDate}
              </p>
              <p>
                <b>Hora:</b> {selectedTime}
              </p>
              <p>
                <b>Barbero:</b> {barberName || "Cargando..."}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleConfirm} // Llamar a la función que guarda la cita
                disabled={!clientId} // Deshabilitar el botón si no se ha cargado el clientId
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
