import React, { useState } from "react";
import { Calendar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { isHoliday, formatDate } from "../utils/dateUtils";
import { generateTimeSlots } from "../utils/timeUtils";

const ReservarCitaComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<"morning" | "afternoon" | null>(null);

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
    setSelectedTime(null); // Reiniciar la selección de tiempo al cambiar la fecha
    setTimePeriod(null); // Reiniciar la selección de periodo de tiempo
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      alert(`Cita reservada para el ${formatDate(selectedDate)} a las ${selectedTime}`);
    }
  };

  // Determinar si es sábado
  const isSaturday = selectedDate ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).getDay() === 6 : false;

  // Generar las opciones de tiempo
  const morningSlots = generateTimeSlots(10, 13.30);
  const afternoonSlots = generateTimeSlots(17, 20.30);

  // Obtener los slots de tiempo basados en el periodo seleccionado
  const availableSlots = timePeriod === "morning" ? morningSlots : timePeriod === "afternoon" ? afternoonSlots : [...morningSlots, ...afternoonSlots];

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
          disabled
          value={formatDate(selectedDate)}
          label="Fecha seleccionada"
        />
      </div>

      {/* Botones para seleccionar Mañana o Tarde */}
      {selectedDate && (
        <div className="mt-4 flex space-x-4">
          {!isSaturday && (
            <>
              <Button
                onPress={() => setTimePeriod("morning")}
                color={timePeriod === "morning" ? "primary" : "default"}
              >
                Mañana
              </Button>
              <Button
                onPress={() => setTimePeriod("afternoon")}
                color={timePeriod === "afternoon" ? "primary" : "default"}
              >
                Tarde
              </Button>
            </>
          )}
          {isSaturday && (
            <Button
              onPress={() => setTimePeriod("morning")}
              color={timePeriod === "morning" ? "primary" : "default"}
            >
              Mañana
            </Button>
          )}
        </div>
      )}

      {/* Selección de hora */}
      {selectedDate && timePeriod && (
        <div className="mt-4 flex flex-col items-center">
          <Select
            placeholder="Selecciona una hora"
            value={selectedTime || ""}
            onChange={(e) => handleTimeChange(e.target.value)}
            fullWidth
          >
            {availableSlots.map(slot => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}

      {/* Botón para confirmar la cita */}
      <Button
        disabled={!selectedDate || !selectedTime}
        onPress={handleSubmit}
        className="mt-4 bg-barber-primary text-white"
      >
        Confirmar Cita
      </Button>
    </div>
  );
};

export default ReservarCitaComponent;
