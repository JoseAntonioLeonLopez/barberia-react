import { DateValue } from "@react-types/calendar"; // Asegúrate de importar DateValue

// Verificar si el día seleccionado es un fin de semana
export const isWeekend = (date: DateValue) => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const dayOfWeek = jsDate.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Domingo, 6 = Sábado
};

export const generateTimeSlots = (startHour: number, endHour: number) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute of [0, 30]) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return slots;
};
