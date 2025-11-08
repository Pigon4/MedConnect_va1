import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const daysOfWeek = [
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
  "Неделя",
];

const Prescriptions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicine: "",
    dosage: "",
    days: [],
    times: [""],
  });

  const location = useLocation();
  const basePath = location.pathname.startsWith("/test")
    ? "/test/patient"
    : "/dashboard/patient";

  const [message, setMessage] = useState("");

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formData.times];
    updatedTimes[index] = value;
    setFormData({ ...formData, times: updatedTimes });
  };

  const addTimeField = () => {
    setFormData({ ...formData, times: [...formData.times, ""] });
  };

  const removeTimeField = (index) => {
    setFormData({
      ...formData,
      times: formData.times.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.medicine || !formData.dosage || !formData.days.length) {
      setMessage("❌ Моля, попълнете всички задължителни полета.");
      return;
    }

    setMessage("✅ Предписанието е успешно запазено!");
    console.log("Записано предписание:", formData);

    // След 2 сек — връщаме към home
    setTimeout(() => {
      navigate(`${basePath}/home`);
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="text-success mb-4">💊 Добавяне на предписание</h3>

        {message && (
          <Alert
            variant={message.startsWith("✅") ? "success" : "danger"}
            className="text-center"
          >
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Лекарство</Form.Label>
                <Form.Control
                  type="text"
                  name="medicine"
                  placeholder="Въведете име на лекарството"
                  value={formData.medicine}
                  onChange={(e) =>
                    setFormData({ ...formData, medicine: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Доза / Количество</Form.Label>
                <Form.Control
                  type="text"
                  name="dosage"
                  placeholder="Напр. 1 таблетка"
                  value={formData.dosage}
                  onChange={(e) =>
                    setFormData({ ...formData, dosage: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Избор на дни */}
          <Form.Group className="mb-3">
            <Form.Label>Изберете дни на прием</Form.Label>
            <Row>
              {daysOfWeek.map((day) => (
                <Col xs={6} md={3} key={day}>
                  <Form.Check
                    type="checkbox"
                    label={day}
                    checked={formData.days.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          {/* Избор на часове */}
          <Form.Group className="mb-3">
            <Form.Label>Часове на прием</Form.Label>
            {formData.times.map((time, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
                {formData.times.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => removeTimeField(index)}
                  >
                    ✖
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline-success"
              size="sm"
              onClick={addTimeField}
              className="mt-2"
            >
              ➕ Добави час
            </Button>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" type="submit" className="px-4">
              💾 Запази
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Prescriptions;
