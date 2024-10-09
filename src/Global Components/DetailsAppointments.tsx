import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

// Interfaz para las props
interface DetailsAppointmentProps {
  appointment: any; // Tipo de la cita
  isOpen: boolean; // Controla si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
}

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const DetailsAppointment: React.FC<DetailsAppointmentProps> = ({
  appointment,
  isOpen,
  onClose,
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="top">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Detalles de la cita</ModalHeader>
            <ModalBody>
            <strong>Cliente</strong>
              <p>
                {appointment.clientDetails.name}
              </p>
              <p>
                +34 {appointment.clientDetails.phone}
              </p>
              <p>
                {appointment.clientDetails.email}
              </p>
              <strong className="mt-4">Barbero</strong>
              <p>
                {appointment.barberDetails.name}
              </p>
              <p>
                +34 {appointment.barberDetails.phone}
              </p>
              <p>
                {appointment.barberDetails.email}
              </p>
              <p className="mt-4">
                <strong>Fecha de la cita:</strong>{" "}
                {formatDateTime(appointment.appointmentDate)} {/* Formatear fecha */}
              </p>
              {/* Agrega más detalles según la estructura de tu cita */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailsAppointment;
