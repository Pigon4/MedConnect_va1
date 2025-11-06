import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // Определяме към кой dashboard да води бутона
  const getDashboardPath = () => {
    if (!isAuthenticated) return "/dashboard"; // ако не е логнат
    switch (role) {
      case "patient":
        return "/dashboard/patient/home";
      case "doctor":
        return "/dashboard/doctor/home";
      case "guardian":
        return "/dashboard/guardian/home";
      case "admin":
        return "/dashboard/admin/home";
      default:
        return "/dashboard";
    }
  };

  const handleDashboardClick = () => {
    navigate(getDashboardPath());
  };

  return (
    <Navbar expand="lg" className="navbar-dark shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MedConnect+
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Начало
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Вход
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Регистрация
            </Nav.Link>
            <Button
              onClick={handleDashboardClick}
              variant="light"
              className="ms-3 px-3 rounded-pill"
            >
              Вашето табло
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
