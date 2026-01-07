import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllRegisterRequests, acceptRegisterRequest } from "../../../api/adminApi";
import { useEffect, useState } from "react";


const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real data once on mount
  useEffect(() => {
    let mounted = true;

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getAllRegisterRequests(); // expect an array of doctors
        if (!mounted) return;
        setDoctors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
        if (mounted) setError("Неуспешно зареждане на лекарите.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDoctors();

    return () => {
      mounted = false;
    };
  }, []);

const updateStatus = async (id, newStatus) => {
  setDoctors(prev =>
    prev.map(doc => (doc.id === id ? { ...doc, status: newStatus } : doc))
  );

    try {

        await acceptRegisterRequest(id);
      
    } catch (err) {
      console.error(err);
      setError("Грешка при потвърждаване на заявката.");

      // rollback on error
      setDoctors(prev =>
        prev.map(doc => (doc.id === id ? { ...doc, status: "PENDING" } : doc))
      );
  }
};
  return (
    <>
      <h2>Непотвърдени лекари</h2>

      {error && <div className="text-danger mb-2">{error}</div>}

      {loading ? (
        <div>Зареждане...</div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Име</th>
              <th>Email</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => {
              const status = doctor?.status ?? "PENDING";

              return (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.firstName} {doctor.lastName}</td>
                  <td>{doctor.email}</td>
                  <td>
                    <Badge>
                      {status}
                    </Badge>
                  </td>
                  <td>
                    {status === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          className="me-2"
                          onClick={() => updateStatus(doctor.id, "ACCEPTED")}
                        >
                          Потвърди
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => updateStatus(doctor.id, "DENIED")}
                        >
                          Отхвърли
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DoctorsPage;
