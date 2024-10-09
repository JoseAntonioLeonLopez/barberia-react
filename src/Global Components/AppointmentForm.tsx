import React, { useState, useMemo, useEffect } from "react";
import { Calendar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import axios from "axios";
import { isHoliday, formatDate } from "../Home/utils/dateUtils";
import { morning, afternoon } from "../Home/utils/timeUtils";
import { API_URL } from "../Service/Url";
import Loading from "./Loading";

interface AppointmentFormProps {
  initialData?: {
    selectedDate: string | null;
    selectedTime: string | null;
    selectedBarber: string | null;
  };
  onSubmit: (data: {
    selectedDate: DateValue | null;
    selectedTime: string | null;
    selectedBarber: string | null;
  }) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<"morning" | "afternoon" | null>(
    null
  );

  const [barbers, setBarbers] = useState<any[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("access_token");
  const todayDate = today(getLocalTimeZone());
  const maxDate = todayDate.add({ months: 3 });

  useEffect(() => {
    if (initialData) {
      const initialDate = initialData.selectedDate
        ? new CalendarDate(
            parseInt(initialData.selectedDate.split("-")[0]),
            parseInt(initialData.selectedDate.split("-")[1]),
            parseInt(initialData.selectedDate.split("-")[2])
          )
        : null;
  
      setSelectedDate(initialDate);
      setSelectedBarber(initialData.selectedBarber || null);
      setSelectedTime(initialData.selectedTime || null);
  
      if (initialData.selectedTime?.startsWith("09") || initialData.selectedTime?.startsWith("10")) {
        setTimePeriod("morning");
      } else {
        setTimePeriod("afternoon");
      }
    }
  }, [initialData]);

  const isDateUnavailable = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = jsDate.getDay();
    return date.compare(todayDate) < 0 || dayOfWeek === 0 || isHoliday(date);
  };

  const handleBarberChange = (value: string) => {
    setSelectedBarber(value);
    setSelectedDate(null);
    setTimePeriod(null);
    setSelectedTime(null);
    fetchAppointmentsForBarber(value);
  };

  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setTimePeriod(null);
    if (selectedBarber) {
      fetchAppointmentsForBarber(selectedBarber);
    }
  };

  const fetchAppointmentsForBarber = async (barberId: string) => {
    try {
      const response = await axios.get(
        `${API_URL}appointments/barber/${barberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const bookedTimes = response.data.map((appointment: any) => {
        const appointmentTime = new Date(appointment.appointmentDate);
        const hours = appointmentTime.getHours().toString().padStart(2, "0");
        const minutes = appointmentTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}`;
      });
      setBookedAppointments(bookedTimes);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime && selectedBarber) {
      onSubmit({
        selectedDate,
        selectedTime,
        selectedBarber,
      });
    }
  };

  const morningSlots = morning;
  const afternoonSlots = afternoon;

  const getCurrentTime = () => {
    const now = new Date();
    return (
      now.getHours() +
      ":" +
      (now.getMinutes() < 10 ? "0" : "") +
      now.getMinutes()
    );
  };

  const filterAvailableSlots = (slots: { key: string; label: string }[]) => {
    if (selectedDate && selectedDate.compare(todayDate) === 0) {
      const currentTime = getCurrentTime();
      return slots.filter(
        (slot) =>
          !bookedAppointments.includes(slot.key) && slot.key > currentTime
      );
    }
    return slots.filter((slot) => !bookedAppointments.includes(slot.key));
  };

  const availableSlots = useMemo(() => {
    const slots =
      timePeriod === "morning"
        ? morningSlots
        : timePeriod === "afternoon"
        ? afternoonSlots
        : [...morningSlots, ...afternoonSlots];
    return filterAvailableSlots(slots);
  }, [timePeriod, selectedDate, bookedAppointments]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}users/role/3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBarbers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barbers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isSaturday = selectedDate && new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).getDay() === 6;

  return (
    <div className="flex flex-col items-center p-4 font-barber bg-barber-bg dark:bg-dark-mode-bg2 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Select
            placeholder="Selecciona un barbero"
            fullWidth
            className="w-64 mb-4"
            value={selectedBarber || ""}
            onChange={(value) => handleBarberChange(value.target.value)}
          >
            {barbers.map((barber) => (
              <SelectItem key={barber.id} value={barber.id}>
                {barber.name}
              </SelectItem>
            ))}
          </Select>
        </>
      )}
      <Calendar
        minValue={todayDate}
        maxValue={maxDate}
        isDateUnavailable={isDateUnavailable}
        onChange={handleDateChange}
        value={selectedDate}
        isDisabled={!selectedBarber}
      />
      <div className="mt-4">
        <Input
          readOnly
          disabled
          value={formatDate(selectedDate)}
          label="Fecha seleccionada"
        />
      </div>
      {selectedDate && (
        <div className="mt-4 flex space-x-4">
          <Button
            onPress={() => setTimePeriod("morning")}
            color={timePeriod === "morning" ? "primary" : "default"}
            isDisabled={!selectedDate}
          >
            Mañana
          </Button>
          {/* Si es sábado, deshabilitar el botón de la tarde */}
          <Button
            onPress={() => setTimePeriod("afternoon")}
            color={timePeriod === "afternoon" ? "primary" : "default"}
            isDisabled={isSaturday || !selectedDate}
          >
            Tarde
          </Button>
        </div>
      )}
      {selectedDate && timePeriod && (
        <Select
          placeholder="Selecciona una hora"
          value={selectedTime || ""}
          onChange={(e) => handleTimeChange(e.target.value)}
          fullWidth
          className="w-64 mt-4"
          isDisabled={!timePeriod}
        >
          {availableSlots.map((slot) => (
            <SelectItem key={slot.key} value={slot.key}>
              {slot.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <Button
        disabled={!selectedDate || !selectedTime || !timePeriod}
        onPress={handleSubmit}
        className="mt-4 bg-barber-primary text-white"
      >
        Confirmar
      </Button>
    </div>
  );
};

export default AppointmentForm;
