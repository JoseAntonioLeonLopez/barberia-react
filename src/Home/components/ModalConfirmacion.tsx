import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

interface ModalConfirmacionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string;
  selectedTime: string;
}

export function ModalConfirmacion({
  isOpen,
  onOpenChange,
  selectedDate,
  selectedTime,
}: ModalConfirmacionProps) {
  const [name, setName] = useState(""); // Estado para almacenar el nombre

  // Actualizar el valor del nombre
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Manejar la confirmación
  const handleConfirm = () => {
    if (name.trim()) {
      // Solo cerrar el modal si el nombre es válido
      onOpenChange(false);

      // Mostrar la confirmación de la cita en un alert
      alert(
        `Cita confirmada para ${name} el ${selectedDate} a las ${selectedTime}`
      );
    }
  };

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
              <Input
                autoFocus
                label="Nombre"
                placeholder="Escribe tu nombre"
                variant="underlined"
                value={name} // Vincular el valor del input al estado
                onChange={handleNameChange} // Actualizar el nombre cuando el usuario escribe
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              {/* Deshabilitar si name está vacío o contiene solo espacios */}
              <Button
                color="primary"
                disabled={!name.trim()} // Deshabilitar si el nombre está vacío
                onPress={handleConfirm} // Solo cerrar si el nombre es válido
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
