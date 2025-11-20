// src/pages/Dashboard.js
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import DashboardPatient from "../dashboards/DashboardPatient";
import DashboardDoctor from "../dashboards/DashboardDoctor";
import DashboardGuardian from "../dashboards/DashboardGuardian";
import DashboardAdmin from "../dashboards/DashboardAdmin";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, isReady } = useAuth();
  // Ако auth още не е готов → чакаме
  if (!isReady) {
    return <Container className="mt-4">Зареждане...</Container>;
  }

  // Ако няма потребител → грешка
  if (!user) {
    return <Container className="mt-4">Не е намерен потребител.</Container>;
  }

  const role = user.role; // "patient", "doctor", "guardian", "admin"

  switch (role) {
    case "patient":
      return <DashboardPatient />;
    case "doctor":
      return <DashboardDoctor />;
    case "guardian":
      return <DashboardGuardian />;
    case "admin":
      return <DashboardAdmin />;
    default:
      return <Navigate to="/login" />;
  }
};

export default Dashboard;
