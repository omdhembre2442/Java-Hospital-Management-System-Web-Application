import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    blood: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      return;
    }else{
      console.log(formData);
      try {
        const res = await axios.post('http://localhost:8080/patient/registration',formData);
        if(res.status === 201){
         toast.success("User Registered Sucessfully!");
         setFormData({  name: "", email: "", password: "", cpassword: "", age: "", gender: "", phone: "", address: "", blood: "",});
         navigate('/login') 
        }else{
          toast.error("User Already Registered!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                🏥 Patient Registration
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="cpassword"
                    placeholder="Re-enter password"
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter contact number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    rows={3}
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select name="blood" value={formData.blood} onChange={handleChange}>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#2DAA9E", border: "none", padding: "10px", fontSize: "18px" }}
                >
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

export default Registration;
