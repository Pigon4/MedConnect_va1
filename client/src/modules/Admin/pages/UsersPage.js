import { useState } from "react";
import { Table, Button, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usersMock } from "../mock data/Users";

const roleVariant = {
  PATIENT: "primary",
  GUARDIAN: "warning",
  DOCTOR: "success",
};

const UsersPage = () => {
  const [users, setUsers] = useState(usersMock);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setSelectedRoles(user.roles.filter(r => r !== "DOCTOR"));
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setSelectedRoles([]);
  };

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const saveRoles = (id) => {
    if (selectedRoles.length === 0) {
      alert("Трябва да изберете поне една роля!");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, roles: [...selectedRoles, ...(u.roles.includes("DOCTOR") ? ["DOCTOR"] : [])] }
          : u
      )
    );
    cancelEditing();
  };

  return (
    <>
      <h2>Потребители</h2>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Име</th>
            <th>Email</th>
            <th>Роли</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const rolesOrdered = [];
            if (user.roles.includes("PATIENT")) rolesOrdered.push("PATIENT");
            if (user.roles.includes("GUARDIAN")) rolesOrdered.push("GUARDIAN");
            if (user.roles.includes("DOCTOR")) rolesOrdered.push("DOCTOR");

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {rolesOrdered.map((role) => (
                    <Badge key={role} bg={roleVariant[role]} className="me-1">
                      {role === "PATIENT" ? "Пациент" : role === "GUARDIAN" ? "Настойник" : "Лекар"}
                    </Badge>
                  ))}

                  {editingUserId === user.id && (
                    <div className="mt-2">
                      <Form.Check
                        inline
                        type="checkbox"
                        label="Пациент"
                        checked={selectedRoles.includes("PATIENT")}
                        onChange={() => toggleRole("PATIENT")}
                      />
                      <Form.Check
                        inline
                        type="checkbox"
                        label="Настойник"
                        checked={selectedRoles.includes("GUARDIAN")}
                        onChange={() => toggleRole("GUARDIAN")}
                      />
                      <div className="mt-1">
                        <Button size="sm" variant="success" onClick={() => saveRoles(user.id)} className="me-2">
                          Запази
                        </Button>
                        <Button size="sm" variant="secondary" onClick={cancelEditing}>
                          Откажи
                        </Button>
                      </div>
                    </div>
                  )}
                </td>
                <td>{user.isActive ? "Активен" : "Блокиран"}</td>
                <td>
                  <Link to={`/admin/users/${user.id}`}>
                    <Button size="sm" variant="outline-secondary" className="me-2">
                      Детайли
                    </Button>
                  </Link>

                  {!user.roles.includes("DOCTOR") && editingUserId !== user.id && (
                    <Button size="sm" variant="outline-primary" onClick={() => startEditing(user)} className="me-2">
                      Промяна на роля
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant={user.isActive ? "outline-danger" : "outline-success"}
                    onClick={() => toggleStatus(user.id)}
                    className="me-2"
                  >
                    {user.isActive ? "Блокирай" : "Активирай"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => console.log(`Трябва да изтрием потребител с id=${user.id}`)}
                  >
                    Изтрий
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersPage;