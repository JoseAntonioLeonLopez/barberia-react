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
            <ModalHeader>Appointment Details</ModalHeader>
            <ModalBody>
              <p>
                <strong>Client Name:</strong> {appointment.clientDetails.name}
              </p>
              <p>
                <strong>Client Phone:</strong> {appointment.clientDetails.phone}
              </p>
              <p>
                <strong>Client Email:</strong> {appointment.clientDetails.email}
              </p>
              <p>
                <strong>Barber Name:</strong> {appointment.barberDetails.name}
              </p>
              <p>
                <strong>Barber Phone:</strong> {appointment.barberDetails.phone}
              </p>
              <p>
                <strong>Barber Email:</strong> {appointment.barberDetails.email}
              </p>
              <p>
                <strong>Appointment Date:</strong>{" "}
                {appointment.appointmentDate}
              </p>
              {/* Agrega más detalles según la estructura de tu cita */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailsAppointment;
