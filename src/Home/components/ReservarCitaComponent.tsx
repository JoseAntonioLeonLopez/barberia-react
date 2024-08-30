import React, { useState } from "react";
import { Calendar, Button, Input } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { isHoliday, formatDate } from "../utils/dateUtils"; // Importar las utilidades

const ReservarCitaComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  // Obtener la fecha actual con formato de CalendarDate
  const todayDate = today(getLocalTimeZone());

  // Limitar a 3 meses en el futuro
  const maxDate = todayDate.add({ months: 3 });

  // Verificar si la fecha está disponible
  const isDateUnavailable = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day); // Convertir DateValue a Date
    const dayOfWeek = jsDate.getDay();

    return (
      date.compare(todayDate) < 0 || // Bloquear fechas pasadas
      dayOfWeek === 0 || // Bloquear domingos
      isHoliday(date) // Bloquear días festivos
    );
  };

  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      alert(`Cita reservada para el ${formatDate(selectedDate)}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 font-barber bg-barber-bg dark:bg-dark-mode-bg2 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-barber-primary">Reservar Cita</h1>

      {/* Calendario para elegir fecha */}
      <Calendar
        minValue={todayDate} // Bloquear días anteriores a hoy
        maxValue={maxDate} // Limitar a 3 meses
        isDateUnavailable={isDateUnavailable} // Validaciones de fecha
        onChange={handleDateChange} // Manejar cambio de fecha
        value={selectedDate}
      />

      {/* Mostrar la fecha seleccionada */}
      <div className="mt-4">
        <Input
          readOnly
          value={formatDate(selectedDate)}
          label="Fecha seleccionada"
        />
      </div>

      {/* Botón para confirmar la cita */}
      <Button
        disabled={!selectedDate}
        onPress={handleSubmit}
        className="mt-4 bg-barber-primary text-white"
      >
        Confirmar Cita
      </Button>
    </div>
  );
};

export default ReservarCitaComponent;
