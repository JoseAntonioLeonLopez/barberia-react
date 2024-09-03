import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { API_URL } from "../../Service/Url";
import Loading from "../../Global Components/Loading";

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editing appointment ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      alert(`Deleted appointment ID: ${id}`);
    }
  };

  const columns = [
    { uid: "id", name: "ID" },
    { uid: "clientId", name: "Client ID" },
    { uid: "barberId", name: "Barber ID" },
    { uid: "appointmentDate", name: "Date & Time" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
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
                            <span className="cursor-pointer">
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
                      ) : (
                        appointment[column.uid]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No appointments found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Appointments;
