import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import AppointmentForm from "./AppointmentForm"; // Importar el componente reutilizable
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../Service/Url";

interface ModalEditAppointmentProps {
  appointment: any; // Los datos actuales de la cita
  isOpen: boolean; // Controla si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  onUpdate: () => void; // Función para actualizar la lista de citas
}

const ModalEditAppointment: React.FC<ModalEditAppointmentProps> = ({
  appointment,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const handleSubmit = async (updatedAppointment: any) => {
    // Convertir la fecha seleccionada al formato requerido por el backend
    const formattedDate = `${updatedAppointment.selectedDate.year}-${String(
      updatedAppointment.selectedDate.month
    ).padStart(2, "0")}-${String(updatedAppointment.selectedDate.day).padStart(
      2,
      "0"
    )}T${updatedAppointment.selectedTime}:00`;

    const payload = {
      clientId: appointment.clientId,
      barberId: updatedAppointment.selectedBarber,
      appointmentDate: formattedDate,
    };

    // Lógica para actualizar la cita
    try {
      const response = await axios.put(
        `${API_URL}appointments/${appointment.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Actualizada!",
          "La cita ha sido actualizada con éxito.",
          "success"
        );
        onUpdate(); // Refrescar la lista de citas después de la actualización
        onClose(); // Cerrar el modal
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la cita.", "error");
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      className="bg-barber-bg dark:bg-dark-mode-bg2"
    >
      <ModalContent className="flex flex-col items-center">
        <>
          <ModalHeader className="text-2xl font-bold mt-2 text-barber-primary">
            Editar Cita
          </ModalHeader>
          <ModalBody>
            {/* Renderizar el formulario con los datos actuales de la cita */}
            {appointment && (
              <AppointmentForm
                initialData={{
                  selectedDate: appointment.appointmentDate
                    ? appointment.appointmentDate.split("T")[0]
                    : "", // Proveer un valor por defecto si es null
                  selectedTime: appointment.appointmentDate
                    ? appointment.appointmentDate.split("T")[1].slice(0, 5)
                    : "", // Proveer un valor por defecto si es null
                  selectedBarber: appointment.barberId?.toString() || "", // Proveer un valor por defecto si es null
                }}
                onSubmit={handleSubmit}
              />
            )}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditAppointment;
