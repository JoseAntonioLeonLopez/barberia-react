import React, { useState } from "react";
import { Calendar, Button, Input, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { isHoliday, formatDate } from "../utils/dateUtils";
import { afternoon, morning } from "../utils/timeUtils";
import { ModalConfirmacion } from "./ModalConfirmacion"; // Importar el modal de confirmación

const ReservarCitaComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<"morning" | "afternoon" | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Usar useDisclosure para el modal

  // Obtener la fecha actual con formato de CalendarDate
  const todayDate = today(getLocalTimeZone());
  const maxDate = todayDate.add({ months: 3 });

  // Verificar si la fecha está disponible
  const isDateUnavailable = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = jsDate.getDay();
    return (
      date.compare(todayDate) < 0 || dayOfWeek === 0 || isHoliday(date)
    );
  };

  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setTimePeriod(null);
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      // Abrir el modal de confirmación
      onOpen();
    }
  };

  const isSaturday = selectedDate
    ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).getDay() === 6
    : false;

  const morningSlots = morning;
  const afternoonSlots = afternoon;
  const availableSlots = timePeriod === "morning" ? morningSlots : timePeriod === "afternoon" ? afternoonSlots : [...morningSlots, ...afternoonSlots];

  return (
    <div className="flex flex-col items-center p-4 font-barber bg-barber-bg dark:bg-dark-mode-bg2 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-barber-primary">Reservar Cita</h1>

      {/* Calendario para elegir fecha */}
      <Calendar
        minValue={todayDate}
        maxValue={maxDate}
        isDateUnavailable={isDateUnavailable}
        onChange={handleDateChange}
        value={selectedDate}
      />

      {/* Mostrar la fecha seleccionada */}
      <div className="mt-4">
        <Input readOnly disabled value={formatDate(selectedDate)} label="Fecha seleccionada" />
      </div>

      {/* Botones para seleccionar Mañana o Tarde */}
      {selectedDate && (
        <div className="mt-4 flex space-x-4">
          {!isSaturday && (
            <>
              <Button onPress={() => setTimePeriod("morning")} color={timePeriod === "morning" ? "primary" : "default"}>
                Mañana
              </Button>
              <Button onPress={() => setTimePeriod("afternoon")} color={timePeriod === "afternoon" ? "primary" : "default"}>
                Tarde
              </Button>
            </>
          )}
          {isSaturday && (
            <Button onPress={() => setTimePeriod("morning")} color={timePeriod === "morning" ? "primary" : "default"}>
              Mañana
            </Button>
          )}
        </div>
      )}

      {/* Selección de hora */}
      {selectedDate && timePeriod && (
        <Select placeholder="Selecciona una hora" value={selectedTime || ""} onChange={(e) => handleTimeChange(e.target.value)} fullWidth className="w-64 mt-4">
          {availableSlots.map((slot) => (
            <SelectItem key={slot.key}>{slot.label}</SelectItem>
          ))}
        </Select>
      )}

      {/* Botón para confirmar la cita */}
      <Button disabled={!selectedDate || !selectedTime || !timePeriod} onPress={handleSubmit} className="mt-4 bg-barber-primary text-white">
        Confirmar Cita
      </Button>

      {/* Modal de confirmación */}
      <ModalConfirmacion
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedDate={selectedDate ? formatDate(selectedDate) : ""}
        selectedTime={selectedTime || ""}
      />
    </div>
  );
};

export default ReservarCitaComponent;
