import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { FaEye, FaEdit } from "react-icons/fa";
import { API_URL } from "../../Service/Url";
import Loading from "../../Global Components/Loading";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("access_token");

  // Cargar usuarios al montar el componente
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en la petición
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleEdit = (id: number) => {
    alert(`Editing user ID: ${id}`);
  };

  const columns = [
    { uid: "id", name: "ID" },
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
    { uid: "phoneNumber", name: "Phone Number" },
    { uid: "roleId", name: "Role ID" },
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
                        <div className="flex gap-2 justify-center">
                          <Tooltip content="View Details">
                            <span className="cursor-pointer">
                              <FaEye />
                            </span>
                          </Tooltip>
                          <Tooltip content="Edit">
                            <span
                              className="cursor-pointer"
                              onClick={() => handleEdit(user.id)}
                            >
                              <FaEdit />
                            </span>
                          </Tooltip>
                        </div>
                      ) : (
                        user[column.uid]
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
    </>
  );
};

export default Users;
