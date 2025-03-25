import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImage from "./image/hospital2.jpg";

function About() {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-3 p-3" style={{ backgroundColor: "#E3D2C3" }}>
            <Card.Body>
              <h2 className="text-center" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                🏥 About Our Practice
              </h2>
              <p style={{ color: "#555", fontSize: "16px", textAlign: "justify" }}>
                Welcome to Practice Hospital Management System, a modern healthcare solution designed 
                to provide seamless patient care. We connect doctors, patients, and administrators through 
                a streamlined system for managing appointments, medical history, and more.
              </p>
              <p style={{ color: "#777", fontSize: "14px", textAlign: "justify" }}>
                Our mission is to deliver efficient, patient-centered healthcare with technology-driven 
                solutions, ensuring top-quality treatment and management for everyone.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="text-center">
          <img
            src={aboutImage}
            alt="Hospital"
            className="img-fluid rounded-3 shadow-lg"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default About;
