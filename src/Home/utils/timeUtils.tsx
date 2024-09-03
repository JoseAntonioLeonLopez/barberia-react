import { DateValue } from "@react-types/calendar"; // Asegúrate de importar DateValue

// Verificar si el día seleccionado es un fin de semana
export const isWeekend = (date: DateValue) => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const dayOfWeek = jsDate.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Domingo, 6 = Sábado
};

export const morning = [
  {key: "09:00", label: "09:00"},
  {key: "09:30", label: "09:30"},
  {key: "10:00", label: "10:00"},
  {key: "10:30", label: "10:30"},
  {key: "11:00", label: "11:00"},
  {key: "11:30", label: "11:30"},
  {key: "12:00", label: "12:00"},
  {key: "12:30", label: "12:30"},
  {key: "13:00", label: "13:00"},
  {key: "13:30", label: "13:30"},
];

export const afternoon = [
  {key: "17:00", label: "17:00"},
  {key: "17:30", label: "17:30"},
  {key: "18:00", label: "18:00"},
  {key: "18:30", label: "18:30"},
  {key: "19:00", label: "19:00"},
  {key: "19:30", label: "19:30"},
  {key: "20:00", label: "20:00"},
  {key: "20:30", label: "20:30"},
];
