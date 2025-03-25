import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function EditAppointment({ id: propId, onClose }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams(); // Get ID from URL
  const appointmentId = routeId || propId; // Use either route ID or prop

  const [formData, setFormData] = useState({
    patientName: "Loading...",
    doctorName: "Loading...",
    date: "",
    notes: "",
    status: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    console.log("🟢 Received routeId:", routeId);
    console.log("🟢 Received propId:", propId);
    console.log("✅ Final appointment ID:", appointmentId);

    if (appointmentId) {
      fetchAppointmentDetails(appointmentId);
    } else {
      console.warn("❌ No appointment ID provided.");
    }
  }, [appointmentId]);

  const fetchAppointmentDetails = async (appointmentId) => {
    try {
      console.log("🔍 Fetching details for ID:", appointmentId);
      const response = await axios.get(
        `http://localhost:8080/appointment/${appointmentId}/getAppointmentById`
      );
      console.log("✅ API Response:", response.data);

      setFormData({
        patientName: response.data.patient?.name || "Unknown",
        doctorName: response.data.doctor?.name || "Unknown",
        date: response.data.date || "",
        notes: response.data.notes || "",
        status: response.data.status || "",
      });
    } catch (error) {
      console.error("❌ Error fetching appointment:", error);
      toast.error("Failed to load appointment details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.notes || !formData.status) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/appointment/${appointmentId}/edit`,
        formData
      );
      toast.success("Appointment updated successfully!");
      onClose?.(); // Close modal if function exists
      navigate("/appointmentsList");
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error("Failed to update appointment.");
    }
  };

  if (!appointmentId) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">Error: No appointment ID provided.</Alert>
      </Container>
    );
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center mt-3 mb-3"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg p-4 border-0 rounded-3"
        style={{ backgroundColor: "#FFFFFF", width: "400px" }}
      >
        <Card.Body>
          <h2
            className="text-center mb-4"
            style={{ color: "#2DAA9E", fontWeight: "bold" }}
          >
            ✏️ Edit Appointment
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={formData.patientName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                name="doctorName"
                value={formData.doctorName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Admitted">Admitted</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E" }}>
              Update Appointment
            </Button>

            <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate("/appointmentsList")}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditAppointment;
