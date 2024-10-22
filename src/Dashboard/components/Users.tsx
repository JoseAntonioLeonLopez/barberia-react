import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../../Service/Url";
import Loading from "../../Global Components/Loading";
import UserDetailsModal from "./UserDetailsModal";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const token = sessionStorage.getItem("access_token");

  // Función para obtener el nombre del rol
  const getRoleName = async (roleId: number) => {
    try {
      const response = await axios.get(`${API_URL}roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.name; // Suponiendo que la respuesta contiene un campo 'name'
    } catch (error) {
      console.error("Error fetching role:", error);
      return "Unknown Role"; // Retornar un valor por defecto en caso de error
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token en la petición
          },
        });

        // Obtener el nombre del rol para cada usuario
        const usersWithRoles = await Promise.all(
          response.data.map(async (user: { roleId: number; }) => {
            const roleName = await getRoleName(user.roleId);
            return { ...user, roleName }; // Incluir el nombre del rol en el objeto del usuario
          })
        );

        setUsers(usersWithRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${API_URL}users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            Swal.fire("¡Eliminado!", "El usuario se ha eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("¡Error!", "Ocurrió un error al eliminar el usuario.", "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const columns = [
    { uid: "id", name: "ID" },
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
    { uid: "phoneNumber", name: "Phone Number" },
    { uid: "roleName", name: "Role Name" }, // Cambiado a 'roleName'
    { uid: "actions", name: "Actions" },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Table aria-label="Users Table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  {columns.map((column) => (
                    <TableCell key={column.uid}>
                      {column.uid === "actions" ? (
                        <div className="flex gap-2">
                          <Tooltip content="View Details">
                            <span
                              className="cursor-pointer"
                              onClick={() => handleViewDetails(user)}
                            >
                              <FaEye />
                            </span>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <span
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(user.id)}
                            >
                              <FaTrash />
                            </span>
                          </Tooltip>
                        </div>
                      ) : (
                        user[column.uid] // Esto ahora incluirá el nombre del rol
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Modal para detalles del usuario */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Users;
