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

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  ); // Estado para manejar la cita seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

  // Función para obtener la información detallada de un usuario (tanto clientes como barberos)
  const getUserDetails = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Añadir token
        },
      });
      return {
        name: response.data.name,
        phone: response.data.phoneNumber || "N/A", // Asegurarse de que haya un valor para el teléfono
        email: response.data.email || "N/A", // Asegurarse de que haya un valor para el correo electrónico
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return { name: "Unknown", phone: "N/A", email: "N/A" }; // Valores por defecto en caso de error
    }
  };

  // Cargar citas y obtener detalles de clientes y barberos
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}appointments`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Añadir token
          },
        });

        // Iterar sobre cada cita y obtener los detalles de cliente y barbero
        const appointmentData = await Promise.all(
          response.data.map(async (appointment: any) => {
            const clientDetails = await getUserDetails(appointment.clientId);
            const barberDetails = await getUserDetails(appointment.barberId);
            return {
              ...appointment,
              clientDetails, // Agregamos todos los detalles del cliente
              barberDetails, // Agregamos todos los detalles del barbero
            };
          })
        );

        setAppointments(appointmentData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Lógica de eliminar cita con SweetAlert2
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${API_URL}appointments/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Añadir token
            },
          })
          .then(() => {
            setAppointments((prevAppointments) =>
              prevAppointments.filter((appointment) => appointment.id !== id)
            );
            Swal.fire("Deleted!", "Your appointment has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting appointment:", error);
            Swal.fire("Error!", "There was an issue deleting the appointment.", "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const handleEdit = (id: number) => {
    alert(`Editing appointment ID: ${id}`);
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment); // Setear la cita seleccionada
    setIsModalOpen(true); // Abrir modal
  };

  const columns = [
    { uid: "id", name: "ID" },
    { uid: "clientDetails", name: "Client Name" }, // Mostrar el nombre del cliente
    { uid: "barberDetails", name: "Barber Name" }, // Mostrar el nombre del barbero
    { uid: "appointmentDate", name: "Date & Time" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Table aria-label="Appointments Table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    {columns.map((column) => (
                      <TableCell key={column.uid}>
                        {column.uid === "actions" ? (
                          <div className="flex gap-2 justify-center">
                            <Tooltip content="View Details">
                              <span
                                className="cursor-pointer"
                                onClick={() => handleViewDetails(appointment)} // Manejar clic en ver detalles
                              >
                                <FaEye />
                              </span>
                            </Tooltip>
                            <Tooltip content="Edit">
                              <span
                                className="cursor-pointer"
                                onClick={() => handleEdit(appointment.id)}
                              >
                                <FaEdit />
                              </span>
                            </Tooltip>
                            <Tooltip content="Delete" color="danger">
                              <span
                                className="cursor-pointer"
                                onClick={() => handleDelete(appointment.id)}
                              >
                                <FaTrash />
                              </span>
                            </Tooltip>
                          </div>
                        ) : column.uid === "clientDetails" ? (
                          appointment.clientDetails.name // Mostrar el nombre del cliente
                        ) : column.uid === "barberDetails" ? (
                          appointment.barberDetails.name // Mostrar el nombre del barbero
                        ) : (
                          appointment[column.uid] // Mostrar otros campos
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Modal para detalles de la cita */}
          {selectedAppointment && (
            <DetailsAppointment
              appointment={selectedAppointment}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Appointments;
