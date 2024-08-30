import { CalendarDate, parseDate } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";

// Definir los días festivos con el tipo CalendarDate
export const holidays: CalendarDate[] = [
  parseDate("2024-01-01"),
  parseDate("2024-03-19"),
  parseDate("2024-12-25"),
];

// Verificar si la fecha es festiva
export const isHoliday = (date: DateValue) => {
  return holidays.some(
    (holiday) => holiday.compare(date) === 0
  );
};

// Formatear la fecha como día/mes/año
export const formatDate = (date: DateValue | null) => {
  if (!date) return "";
  const jsDate = new Date(date.year, date.month - 1, date.day);
  return `${jsDate.getDate().toString().padStart(2, '0')}/${(jsDate.getMonth() + 1).toString().padStart(2, '0')}/${jsDate.getFullYear()}`;
};
