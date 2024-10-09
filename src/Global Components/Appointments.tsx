import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../Service/Url";
import DetailsAppointment from "./DetailsAppointments";
import Loading from "./Loading";
import ModalEditAppointment from "./ModalEditAppointment"; // Importar el modal de edición

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de detalles
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición

  const getUserDetails = async (id: number): Promise<any> => {
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
      console.error(`Error fetching user with ID ${id}:`, error);
      return { name: "Unknown", phone: "N/A", email: "N/A" };
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}appointments`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        const appointmentData = await Promise.all(
          response.data.map(async (appointment: any) => {
            const clientDetails = await getUserDetails(appointment.clientId);
            const barberDetails = await getUserDetails(appointment.barberId);
            return {
              ...appointment,
              clientDetails,
              barberDetails,
            };
          })
        );

        // Ordenar las citas por fecha
        appointmentData.sort((a, b) => {
          return (
            new Date(a.appointmentDate).getTime() -
            new Date(b.appointmentDate).getTime()
          );
        });

        setAppointments(appointmentData);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
    setSelectedAppointment(appointment); // Establecer la cita seleccionada
    setIsEditModalOpen(true); // Abrir modal de edición
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment); // Establecer la cita seleccionada
    setIsModalOpen(true); // Abrir modal de detalles
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
    { uid: "id", name: "ID" },
    { uid: "clientDetails", name: "Client Name" },
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
            <Table aria-label="Appointments Table">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    {columns.map((column) => (
                      <TableCell key={column.uid}>
                        {column.uid === "actions" ? (
                          <div className="flex gap-2">
                            <Tooltip content="View Details">
                              <span
                                className="cursor-pointer"
                                onClick={() => handleViewDetails(appointment)}
                              >
                                <FaEye />
                              </span>
                            </Tooltip>
                            <Tooltip content="Edit">
                              <span
                                className="cursor-pointer text-blue-400"
                                onClick={() => handleEdit(appointment)}
                              >
                                <FaEdit />
                              </span>
                            </Tooltip>
                            <Tooltip content="Delete" color="danger">
                              <span
                                className="cursor-pointer text-red-500"
                                onClick={() => handleDelete(appointment.id)}
                              >
                                <FaTrash />
                              </span>
                            </Tooltip>
                          </div>
                        ) : column.uid === "clientDetails" ? (
                          appointment.clientDetails.name
                        ) : column.uid === "barberDetails" ? (
                          appointment.barberDetails.name
                        ) : column.uid === "appointmentDate" ? (
                          formatDateTime(appointment.appointmentDate)
                        ) : (
                          appointment[column.uid]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center mt-3 font-barber">
              <h3>No hay citas</h3>
            </div>
          )}

          {/* Modal para detalles de la cita */}
          {selectedAppointment && (
            <DetailsAppointment
              appointment={selectedAppointment}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          {/* Modal para editar la cita */}
          {selectedAppointment && (
            <ModalEditAppointment
              appointment={selectedAppointment}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={fetchAppointments} // Actualizar citas después de la edición
            />
          )}
        </>
      )}
    </>
  );
};

export default Appointments;
