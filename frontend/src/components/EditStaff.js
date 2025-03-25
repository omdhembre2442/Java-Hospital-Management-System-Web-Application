import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function EditStaff({ staffId, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    contact: "",
    status: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const fetchStaffDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/staff/${staffId}/getStaffUsingId`);
      setFormData(response.data);
    } catch (error) {
      console.log(staffId)
      console.error("Error fetching staff details:", error);
      toast.error("Failed to load staff details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.role || !formData.status) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/staff/${staffId}/editStaff`, formData);
      toast.success("Staff details updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update staff.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-3 mb-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                ✏️ Edit Staff
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Ward Boy">Ward Boy</option>
                    <option value="Technician">Technician</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control type="text" name="contact" placeholder="Enter contact number" value={formData.contact} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none", padding: "10px", fontSize: "18px" }}>
                  Update Staff
                </Button>

                <Button variant="secondary" className="w-100 mt-2" onClick={onClose}>
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditStaff;
