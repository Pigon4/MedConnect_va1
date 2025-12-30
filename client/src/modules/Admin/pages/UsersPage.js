import { useState } from "react";
import { Table, Button, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usersMock } from "../mock data/Users";

const roleVariant = {
  PATIENT: "primary",
  GUARDIAN: "warning",
  DOCTOR: "success",
};

const roleLabel = {
  PATIENT: "Пациент",
  GUARDIAN: "Настойник",
  DOCTOR: "Лекар",
};

const UsersPage = () => {
  const [users, setUsers] = useState(usersMock);
  const [editingId, setEditingId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleStatus = (id) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setSelectedRoles(user.roles.filter(r => r !== "DOCTOR"));
  };

  const saveRoles = (id) => {
    if (!selectedRoles.length) {
      alert("Изберете поне една роля");
      return;
    }
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, roles: [...selectedRoles, ...(u.roles.includes("DOCTOR") ? ["DOCTOR"] : [])] }
          : u
      )
    );
    setEditingId(null);
    setSelectedRoles([]);
  };

  return (
    <>
      <h2>Потребители</h2>

      <Table striped bordered hover className="mt-3">
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
          {users.map(user => {
            const orderedRoles = ["PATIENT", "GUARDIAN", "DOCTOR"]
              .filter(r => user.roles.includes(r));

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {orderedRoles.map(r => (
                    <Badge key={r} bg={roleVariant[r]} className="me-1">
                      {roleLabel[r]}
                    </Badge>
                  ))}

                  {editingId === user.id && (
                    <div className="mt-2">
                      <Form.Check
                        inline
                        label="Пациент"
                        checked={selectedRoles.includes("PATIENT")}
                        onChange={() =>
                          setSelectedRoles(prev =>
                            prev.includes("PATIENT")
                              ? prev.filter(r => r !== "PATIENT")
                              : [...prev, "PATIENT"]
                          )
                        }
                      />
                      <Form.Check
                        inline
                        label="Настойник"
                        checked={selectedRoles.includes("GUARDIAN")}
                        onChange={() =>
                          setSelectedRoles(prev =>
                            prev.includes("GUARDIAN")
                              ? prev.filter(r => r !== "GUARDIAN")
                              : [...prev, "GUARDIAN"]
                          )
                        }
                      />
                      <div className="mt-2">
                        <Button size="sm" variant="success" onClick={() => saveRoles(user.id)} className="me-2">
                          Запази
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                          Откажи
                        </Button>
                      </div>
                    </div>
                  )}
                </td>
                <td>
                  {user.isActive ? "Активен" : "Блокиран"}
                </td>
                <td>
                  <Link to={`/admin/users/${user.id}`}>
                    <Button size="sm" variant="outline-secondary" className="me-2">
                      Детайли
                    </Button>
                  </Link>

                  {!user.roles.includes("DOCTOR") && editingId !== user.id && (
                    <Button size="sm" variant="outline-primary" onClick={() => startEditing(user)} className="me-2">
                      Промяна на роля
                    </Button>
                  )}

                  <Button size="sm" variant="outline-danger" onClick={() => {}}>
                    Изтрий
                  </Button>

                  <Button size="sm" variant={user.isActive ? "outline-danger" : "outline-success"} onClick={() => toggleStatus(user.id)} className="ms-2">
                    {user.isActive ? "Блокирай" : "Активирай"}
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
