import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#f2f2f2",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h3>Navigation</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/users">Users</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/doctors">Doctors</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/appointments">Appointments</Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/reviews">Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
