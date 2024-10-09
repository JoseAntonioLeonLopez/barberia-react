import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Global Components/Loading";
import { API_URL } from "../../Service/Url";

interface BarberAppointmentsProps {
  barberId: number;
}

const BarberAppointments: React.FC<BarberAppointmentsProps> = ({ barberId }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    if (barberId <= 0) return; // Validación para evitar llamadas con barberId inválido

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}appointments/barber/${barberId}`, // Obtener citas por barberId
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        const appointmentData = await Promise.all(
          response.data.map(async (appointment: any) => {
            const clientDetails = await getClientDetails(appointment.clientId);
            return {
              ...appointment,
              clientDetails,
            };
          })
        );
        setAppointments(appointmentData);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments for barber:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [barberId]);

  const getClientDetails = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      return {
        name: response.data.name,
        phone: response.data.phoneNumber || "N/A",
        email: response.data.email || "N/A",
      };
    } catch (error) {
      console.error(`Error fetching client with ID ${id}:`, error);
      return { name: "Unknown", phone: "N/A", email: "N/A" };
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    { uid: "clientDetails", name: "Client Name" },
    { uid: "appointmentDate", name: "Date & Time" }
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center">
          {appointments.length > 0 ? (
            <table className="min-w-full bg-white dark:bg-dark-mode-bg2 text-black dark:text-dark-mode-text shadow-md rounded-lg overflow-hidden text-center">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.uid}
                      className="py-2 px-4 bg-barber-secondary dark:bg-dark-mode-bg text-white dark:text-dark-mode-text font-semibold"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b dark:border-dark-mode-bg2">
                    {columns.map((column) => (
                      <td key={column.uid} className="py-2 px-4 dark:bg-dark-mode-bg2 text-center">
                        {column.uid === "clientDetails" ? (
                          appointment.clientDetails.name
                        ) : column.uid === "appointmentDate" ? (
                          formatDateTime(appointment.appointmentDate)
                        ) : (
                          appointment[column.uid]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-3 font-barber">
              <h3>No hay citas</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BarberAppointments;
