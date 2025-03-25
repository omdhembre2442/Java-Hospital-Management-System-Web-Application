import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    specialization: "",
    phone: "",
    experience: "",
    gender: true
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value === "true" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      return;
    } else {
      console.log(formData);
      try {
        const res = await axios.post("http://localhost:8080/doctor/registration", formData);
        if (res.status === 201) {
          toast.success("Doctor Registered Successfully!");
          setFormData({
            name: "",
            email: "",
            password: "",
            cpassword: "",
            specialization: "",
            phone: "",
            experience: "",
            gender: true
          });
          navigate("/admindash");
        } else {
          toast.error("Doctor Already Registered!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                🩺 Doctor Registration
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="cpassword" placeholder="Re-enter password" value={formData.cpassword} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control type="text" name="specialization" placeholder="Enter specialization" value={formData.specialization} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" placeholder="Enter contact number" value={formData.phone} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control type="number" name="experience" placeholder="Enter years of experience" value={formData.experience} onChange={handleChange} min={1} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check 
                      inline 
                      label="Male" 
                      type="radio" 
                      name="gender" 
                      value="true" 
                      checked={formData.gender === true} 
                      onChange={handleGenderChange} 
                    />
                    <Form.Check 
                      inline 
                      label="Female" 
                      type="radio" 
                      name="gender" 
                      value="false" 
                      checked={formData.gender === false} 
                      onChange={handleGenderChange} 
                    />
                  </div>
                </Form.Group>

                <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none", padding: "10px", fontSize: "18px" }}>
                  Register
                </Button>

                <p className="mt-3 text-center">
                  Already have an account?{" "}
                  <span style={{ color: "#2DAA9E", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/login")}>
                    Login
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

export default DoctorRegistration;
