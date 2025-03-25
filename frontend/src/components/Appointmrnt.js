import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function Appointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientId: Number(sessionStorage.getItem("patientId")) || "",
    doctorId: "",
    date: "",
    time: "",
    notes: "",
    status: "Pending",
  });

  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/doctor/getDoctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.doctorId) {
      toast.error("Please select a doctor, date, and time slot!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/appointment/book", formData);
      if (res.status === 201) {
        toast.success("Appointment Booked Successfully!");
        setFormData({ patientId: formData.patientId, doctorId: "", date: "", time: "", notes: "", status: "Pending" });
        navigate("/appointments");
      } else {
        toast.error("Failed to book appointment!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                📅 Book an Appointment
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Patient Id</Form.Label>
                  <Form.Control type="text" value={formData.patientId} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Doctor</Form.Label>
                  <Form.Select name="doctorId" value={formData.doctorId} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

          
                <Form.Group className="mb-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Select Time Slot</Form.Label>
                  <Form.Select name="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Choose a Time Slot</option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                    <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                    <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                    <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
                    <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} name="notes" placeholder="Any additional notes..." value={formData.notes} onChange={handleChange} />
                </Form.Group>

                <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none", padding: "10px", fontSize: "18px" }}>
                  Book Appointment
                </Button>

                <p className="mt-3 text-center">
                  Need help?{" "}
                  <span style={{ color: "#2DAA9E", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/contact")}>
                    Contact Us
                  </span>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointment;
