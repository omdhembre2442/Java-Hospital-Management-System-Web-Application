import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function EditDoctor({ doctor, onClose }) {
  const [formData, setFormData] = useState({
    id: doctor?.id || "",
    name: doctor?.name || "",
    email: doctor?.email || "",
    specialization: doctor?.specialization || "",
    phone: doctor?.phone || "",
    experience: doctor?.experience || "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        phone: doctor.phone,
        experience: doctor.experience,
        gender: doctor.gender
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value === "true" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/doctor/${formData.id}/editDoctor`, formData);
      toast.success("Doctor details updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update doctor details!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg p-4 border-0 rounded-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                ✏️ Edit Doctor Details
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control type="number" name="experience" value={formData.experience} onChange={handleChange} required min={1} />
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
                  Save Changes
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

export default EditDoctor;
