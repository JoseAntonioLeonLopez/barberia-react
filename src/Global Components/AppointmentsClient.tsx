import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../Service/Url";
import Loading from "./Loading";
import ModalEditAppointment from "./ModalEditAppointment.tsx";

interface ClientAppointmentsProps {
  clientId: number;
}

const ClientAppointments: React.FC<ClientAppointmentsProps> = ({ clientId }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBarberDetails = async (id: number): Promise<any> => {
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
      console.error(`Error fetching barber with ID ${id}:`, error);
      return { name: "Unknown", phone: "N/A", email: "N/A" };
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}appointments/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        const appointmentData = await Promise.all(
          response.data.map(async (appointment: any) => {
            const barberDetails = await getBarberDetails(appointment.barberId);
            return {
              ...appointment,
              barberDetails,
            };
          })
        );
        setAppointments(appointmentData);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments for client:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [clientId]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${API_URL}appointments/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          })
          .then(() => {
            setAppointments((prevAppointments) =>
              prevAppointments.filter((appointment) => appointment.id !== id)
            );
            Swal.fire("Eliminada!", "Tu cita ha sido eliminada.", "success");
          })
          .catch((error) => {
            console.error("Error deleting appointment:", error);
            Swal.fire(
              "Error!",
              "A ocurrido algo al eliminar tu cita.",
              "error"
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const handleEdit = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
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
    { uid: "barberDetails", name: "Barber Name" }, 
    { uid: "appointmentDate", name: "Date & Time" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {appointments.length > 0 ? (
            <table className="min-w-full bg-white dark:bg-dark-mode-bg2 text-black dark:text-dark-mode-text shadow-md rounded-lg overflow-hidden">
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
                  <tr
                    key={appointment.id}
                    className="border-b dark:border-dark-mode-bg2"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.uid}
                        className="py-2 px-4 dark:bg-dark-mode-bg2"
                      >
                        {column.uid === "actions" ? (
                          <div className="flex gap-4 justify-center">
                            <button
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
                              onClick={() => handleEdit(appointment)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                              onClick={() => handleDelete(appointment.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ) : column.uid === "barberDetails" ? (
                          appointment.barberDetails.name
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
        </>
      )}

      <ModalEditAppointment
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={() => {
          setLoading(true);
          setIsModalOpen(false);
          fetchAppointments();
        }}
      />
    </>
  );
};

export default ClientAppointments;