import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
} from "@nextui-org/react";

interface UserDetailsModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="top">
      <ModalContent>
        <ModalHeader>Detalles del usuario</ModalHeader>
        <ModalBody>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Apellidos:</strong> {user.firstSurname} {user.secondSurname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Rol:</strong> {user.roleName} {/* Cambiado a roleName */}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
