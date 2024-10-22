import React, { useState } from "react";
import { DateValue, useDisclosure } from "@nextui-org/react";
import { ModalConfirmacion } from "./ModalConfirmacion";
import { formatDate } from "../utils/dateUtils";
import AppointmentForm from "../../Global Components/AppointmentForm";

const ReservarCitaComponent: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [appointmentData, setAppointmentData] = useState<{
    selectedDate: string | null;
    selectedTime: string | null;
    selectedBarber: string | null;
  }>({
    selectedDate: null,
    selectedTime: null,
    selectedBarber: null,
  });

  const handleSubmit = (data: {
    selectedDate: DateValue | null;
    selectedTime: string | null;
    selectedBarber: string | null;
  }) => {
    setAppointmentData({
      selectedDate: data.selectedDate ? formatDate(data.selectedDate) : null,
      selectedTime: data.selectedTime,
      selectedBarber: data.selectedBarber,
    });
    onOpen(); // Abre el modal de confirmación
  };

  return (
    <div className="flex flex-col items-center p-4 font-barber bg-barber-bg dark:bg-dark-mode-bg2 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-barber-primary">
        Reservar Cita
      </h1>
      <h2 className="text-xl mb-2">Selecciona el barbero</h2>
      <h2>👇👇👇</h2>
      {/* Uso del componente AppointmentForm */}
      <AppointmentForm onSubmit={handleSubmit} />

      {/* Modal de confirmación */}
      <ModalConfirmacion
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedDate={appointmentData.selectedDate || ""}
        selectedTime={appointmentData.selectedTime || ""}
        barber={appointmentData.selectedBarber || ""}
      />
    </div>
  );
};

export default ReservarCitaComponent;
