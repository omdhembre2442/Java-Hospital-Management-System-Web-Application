import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

import doctor1 from "./image/doctor1.png";
import doctor2 from "./image/doctor2.png";
import doctor3 from "./image/doctor3.png";
import doctor4 from "./image/doctor4.png";
import doctor5 from "./image/doctor5.png";

const dummyDoctorImages = [doctor1, doctor2, doctor3, doctor4, doctor5];

function HomeDoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/doctor/getDoctors");
      setDoctors(response.data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching doctor list:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
        🩺 Meet Our Doctors
      </h2>

      <Row className="justify-content-center">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <Col key={doctor.id} md={3} className="mb-4">
              <Card className="shadow-lg border-0 rounded-3" style={{ backgroundColor: "#E3D2C3" }}>
                <Card.Img 
                  variant="top" 
                  src={doctor.photoUrl || dummyDoctorImages[index % dummyDoctorImages.length]} 
                  alt={doctor.name} 
                  style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} 
                />
                <Card.Body className="text-center">
                  <h5 style={{ color: "#2DAA9E", fontWeight: "bold" }}>{doctor.name}</h5>
                  <p style={{ color: "#555", fontSize: "16px" }}>{doctor.specialization}</p>
                  <p style={{ color: "#777", fontSize: "14px" }}>Experience: {doctor.experience} years</p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No doctors available.</p>
        )}
      </Row>
    </Container>
  );
}

export default HomeDoctorList;
