import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function RegisterStaff() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
    contact: "",
    status:""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/staff/register", formData);
      if (res.status === 201) {
        toast.success("Staff Registered Successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          cpassword: "",
          role: "",
          contact: "",
          status:""
        });
        navigate("/admindash");
      } else if(res.status===200) {
        toast.error("Staff Already Registered!");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Failed to register staff.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                🏥 Staff Registration
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="cpassword" placeholder="Re-enter password" value={formData.cpassword} onChange={handleChange} required />
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
                    <option value="Inactive">In-Active</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none", padding: "10px", fontSize: "18px" }}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterStaff;
